const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const studyService = require("./service/studyService");
const userService = require("./service/userService");
const friendService = require("./service/friendService");
const loginService = require("./service/loginService");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 4000;
const secretKey = "niExQ5k8jYASvh1tFwM5";

app.use(bodyParser.json());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
const apiRouter = express.Router();
app.use("/api", apiRouter);

// Middleware to check if the request has a valid token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

// Endpoint to add a study
apiRouter.post("/addStudy", (req, res) => {
  try {
    const newStudy = req.body;
    studyService.addStudyToMap(newStudy);
    res.json({ message: "Study added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get studies
apiRouter.get("/getStudies/:username", authenticateToken, async (req, res) => {
  try {
    const authenticatedUsername = req.user.username;
    const requestedUsername = req.params.username;

    if (authenticatedUsername === requestedUsername) {
      const studies = await studyService.getStudies(requestedUsername);
      res.json(studies);
    } else {
      if (friendService.areFriends(authenticatedUsername, requestedUsername)) {
        const studies = await studyService.getFriendStudies(requestedUsername);
        res.json(studies);
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update a study
apiRouter.put("/updateStudy/:username/:studyId", (req, res) => {
  try {
    const username = req.params.username;
    const studyId = parseInt(req.params.studyId);
    const { newNote, newLinks } = req.body;
    studyService.updateStudy(username, studyId, newNote, newLinks);
    res.json({ message: "Study updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to register a new user
apiRouter.post("/registerUser", async (req, res) => {
  try {
    const newUser = req.body;
    const registrationResult = userService.registerUser(newUser);
    const username = newUser.username;

    if (registrationResult) {
      const token = jwt.sign({ username }, secretKey);
      res.json({ message: "User registered successfully", token });
    } else {
      res.status(400).json({ error: "Username already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get user information
apiRouter.get("/getUser/:username", authenticateToken, async (req, res) => {
  try {
    const username = req.params.username;
    const user = userService.getUser(username);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update user information
apiRouter.put("/updateUser/:username", (req, res) => {
  try {
    const username = req.params.username;
    const { newEmail, newPassword } = req.body;
    const updateResult = userService.updateUser(
      username,
      newEmail,
      newPassword
    );

    if (updateResult) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginResult = loginService.loginUser(username, password);

    if (loginResult) {
      // Create a token and send it in the response
      const token = jwt.sign({ username }, secretKey);
      res.json({ message: "Login successful", token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRouter.post("/sendFriendRequest/:sender/:receiver", (req, res) => {
  try {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    if (!userService.checkUserExists(receiver)) {
      res.json({ message: "User doesn't exist" });
      return;
    }
    friendService.addFriendRequest(sender, receiver);
    res.json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/acceptFriendRequest/:sender/:receiver", (req, res) => {
  try {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    friendService.acceptFriendRequest(sender, receiver);
    res.json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/rejectFriendRequest/:sender/:receiver", (req, res) => {
  try {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    friendService.rejectFriendRequest(sender, receiver);
    res.json({ message: "Friend request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/addFriend/:userA/:userB", (req, res) => {
  try {
    const userA = req.params.userA;
    const userB = req.params.userB;
    friendService.addFriend(userA, userB);
    res.json({ message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/getFriends/:username", authenticateToken, async (req, res) => {
  try {
    const username = req.params.username;
    const friends = friendService.getFriends(username);
    res.json([...friends]); // Convert set to array for response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get(
  "/areFriends/:userA/:userB",
  authenticateToken,
  async (req, res) => {
    try {
      const userA = req.params.userA;
      const userB = req.params.userB;
      const result = friendService.areFriends(userA, userB);
      res.json({ areFriends: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

apiRouter.get(
  "/getFriendRequests/:username",
  authenticateToken,
  async (req, res) => {
    try {
      const username = req.params.username;
      const friendRequests = friendService.getFriendRequests(username);
      res.json([...friendRequests]); // Convert set to array for response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// module.exports = app;
