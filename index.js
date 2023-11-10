const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const studyService = require("./studyService");
const userService = require("./userService");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
const apiRouter = express.Router();
app.use("/api", apiRouter);

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
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
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
