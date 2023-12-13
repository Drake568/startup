const userService = require("./userService");
const bcrypt = require("bcrypt");

async function loginUser(username, password) {
  const user = await userService.getUser(username);

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const data = user.friends;
      return data; // Login successful
    }
  }

  return false; // Invalid username or password
}

module.exports = {
  loginUser,
};
