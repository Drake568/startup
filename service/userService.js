// userService.js

let userMap = new Map();

function registerUser(user) {
  if (!userMap.has(user.username)) {
    userMap.set(user.username, user);
    return true; // Registration successful
  } else {
    return false; // Username already exists
  }
}

function getUser(username) {
  let i = 0;
  return userMap.get(username) || null;
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

function checkUserExists(username) {
  return userMap.has(username);
}

module.exports = {
  registerUser,
  getUser,
  updateUser,
  checkUserExists,
};
