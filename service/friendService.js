const userService = require("./userService.js");
const DB = require("./database.js");

async function addFriendRequest(sender, receiver) {
  try {
    const friendRequest = { from: sender, to: receiver };
    const response = await DB.addFriendRequest(friendRequest);
    console.log("Friend request saved to the database.");
    return response;
  } catch (error) {
    console.error("Error saving friend request to the database:", error);
  }
}

async function acceptFriendRequest(sender, receiver) {
  try {
    const userA = await userService.getUser(sender);
    const userB = await userService.getUser(receiver);
    const addedA = await DB.addFriend(userA.username, userB.username);
    const addedB = await DB.addFriend(userB.username, userA.username);
    const requestRemoved = await DB.removeFriendRequest(sender, receiver);

    if (addedA && addedB && requestRemoved) {
      return { success: true, message: "Friend request accepted" };
    } else {
      return { success: false, message: "Error accepting friend request" };
    }
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return { success: false, message: "Error accepting friend request" };
  }
}

async function rejectFriendRequest(sender, receiver) {
  try {
    const requestRemoved = await DB.removeFriendRequest(sender, receiver);
    if (requestRemoved) {
      return { success: true, message: "Friend request rejected" };
    } else {
      return { success: false, message: "Error rejecting friend request" };
    }
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    return { success: false, message: "Error rejecting friend request" };
  }
}

async function getFriendRequests(username) {
  try {
    const requests = await DB.getFriendRequests(username);
    console.log("Friend requests retrieved from the database.");
    return requests;
  } catch (error) {
    console.error("Error retrieving friend requests from the database:", error);
    return undefined;
  }
}

async function areFriends(userA, userB) {
  try {
    const user = await userService.getUser(userA);
    if (user.friends.includes(userB)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      "Error retrieving friendship status from the database:",
      error
    );
    return undefined;
  }
}

module.exports = {
  addFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  areFriends,
};
