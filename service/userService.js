// userService.js

const DB = require("../database.js");

let userMap = new Map();

async function registerUser(user) {
  try {
    const exists = await checkUserExists(user.username);
    if (exists) {
      return false;
    }
    await DB.addUser(user);
    console.log("User saved to the database.");
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
}

async function getUser(username) {
  try {
    const user = await DB.getUser(username);
    console.log("User retrieved from the database.");
    return user;
  } catch (error) {
    console.error("Error retrieving user from the database:", error);
    return undefined;
  }
}

function updateUser(username, newEmail, newPassword) {
  const user = userMap.get(username);

  if (user) {
    // Update the properties if they are provided
    if (newEmail !== undefined) {
      user.email = newEmail;
    }

    if (newPassword !== undefined) {
      user.password = newPassword;
    }
    return true; // Update successful
  } else {
    return false; // User not found
  }
}

async function checkUserExists(username) {
  try {
    const exists = await DB.usernameExists(username);
    console.log("Checked if user exists.");
    return exists;
  } catch (error) {
    console.error("Error checking username", error);
    return undefined;
  }
}

module.exports = {
  registerUser,
  getUser,
  updateUser,
  checkUserExists,
};
