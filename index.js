const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const studyService = require("./studyService");
const userService = require("./userService");
const friendService = require("./friendService");
const loginService = require("./loginService");
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
apiRouter.get("/getStudies/:username/:shared?", (req, res) => {
  try {
    const username = req.params.username;
    const shared = req.params.shared === "true";
    const studies = studyService.getStudies(username, shared);
    res.json(studies);
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
apiRouter.post("/registerUser", (req, res) => {
  try {
    const newUser = req.body;
    const registrationResult = userService.registerUser(newUser);

    if (registrationResult) {
      res.json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ error: "Username already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get user information
apiRouter.get("/getUser/:username", (req, res) => {
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

apiRouter.post("/login", (req, res) => {
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

apiRouter.post("/addFriend/:username/:friendUsername", (req, res) => {
  try {
    const username = req.params.username;
    const friendUsername = req.params.friendUsername;

    friendService.addFriend(username, friendUsername);
    res.json({ message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get friends for a user
apiRouter.get("/getFriends/:username", (req, res) => {
  try {
    const username = req.params.username;
    const friends = friendService.getFriends(username);
    res.json(Array.from(friends)); // Convert Set to array for easier serialization
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to check if two users are friends
apiRouter.get("/areFriends/:userA/:userB", (req, res) => {
  try {
    const userA = req.params.userA;
    const userB = req.params.userB;
    const areFriends = friendService.areFriends(userA, userB);
    res.json({ areFriends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
