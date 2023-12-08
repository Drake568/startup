const DB = require("../service/database.js");
const bcrypt = require("bcrypt");

async function registerUser(user) {
  try {
    // Check if the username already exists
    const exists = await checkUserExists(user.username);
    if (exists) {
      return false; // Username already exists
    }

    // Hash the user's password with bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Replace the user's password with the hashed password
    user.password = hashedPassword;

    // Save the user to the database
    await DB.addUser(user);
    console.log("User saved to the database.");
    return true; // Registration successful
  } catch (error) {
    console.error("Error registering user:", error);
    return false; // Registration failed
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

// function updateUser(username, newEmail, newPassword) {
// TODO: need to add functionality for DB and UI
// }

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
  checkUserExists,
};
