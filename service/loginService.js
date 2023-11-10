// loginService.js

const userService = require("./userService");

function loginUser(username, password) {
  const user = userService.getUser(username);

  if (user && user.password === password) {
    return true; // Login successful
  } else {
    return false; // Invalid username or password
  }
}

module.exports = {
  loginUser,
};
