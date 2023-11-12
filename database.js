const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("simon");
const userCollection = db.collection("users");
const studyCollection = db.collection("studies");
const friendRequestCollection = db.collection("friendRequests");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

async function addStudy(study) {
  const result = await studyCollection.insertOne(study);
  return result;
}

async function addUser(user) {
  const result = await userCollection.insertOne(user);
  return result;
}

async function addFriendRequest(request) {
  const result = await friendRequestCollection.insertOne(request);
  return result;
}

async function getStudies(username) {
  const result = await studyCollection
    .find({ associatedUser: username })
    .toArray();
  return result;
}

async function getFriendStudies(username) {
  const result = await studyCollection
    .find({ associatedUser: username, shared: true })
    .toArray();
  return result;
}

async function getFriendRequests(sender, receiver) {
  const result = await friendRequestCollection.findOne({
    to: receiver,
    from: sender,
  });
  return result;
}

async function getUser(username) {
  const result = await userCollection.findOne({ username: username });
  return result;
}

async function usernameExists(username) {
  const existingUser = await userCollection.findOne({ username: username });
  return !!existingUser; // Returns true if the username exists, false if not.
}

module.exports = {
  addStudy,
  addFriendRequest,
  addUser,
  getStudies,
  getFriendStudies,
  getFriendRequests,
  getUser,
  usernameExists,
};
