// loginService.js

const userService = require("./userService");
const DB = require("../database.js");

async function loginUser(username, password) {
  const user = await userService.getUser(username);

  if (user && user.password === password) {
    return true; // Login successful
  } else {
    return false; // Invalid username or password
  }
}

module.exports = {
  loginUser,
};
