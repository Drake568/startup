const userService = require("./userService");

const DB = require("../database.js");

let friendMap = new Map();
let friendRequests = new Map();

function addFriendRequest(sender, receiver) {
  if (!friendRequests.has(receiver)) {
    friendRequests.set(receiver, new Set([sender]));
  } else {
    friendRequests.get(receiver).add(sender);
  }
}

function acceptFriendRequest(sender, receiver) {
  if (friendRequests.has(receiver)) {
    friendRequests.get(receiver).delete(sender);
  }
  addFriend(sender, receiver);
}

function rejectFriendRequest(sender, receiver) {
  if (friendRequests.has(receiver)) {
    friendRequests.get(receiver).delete(sender);
  }
}

function addFriend(userA, userB) {
  if (!friendMap.has(userA)) {
    friendMap.set(userA, new Set([userB]));
  } else {
    friendMap.get(userA).add(userB);
  }

  if (!friendMap.has(userB)) {
    friendMap.set(userB, new Set([userA]));
  } else {
    friendMap.get(userB).add(userA);
  }
}

function getFriends(username) {
  return friendMap.get(username) || new Set();
}

function areFriends(userA, userB) {
  const userAFriends = friendMap.get(userA) || new Set();
  return userAFriends.has(userB);
}

function getFriendRequests(username) {
  return friendRequests.get(username) || new Set();
}

module.exports = {
  addFriend,
  getFriends,
  areFriends,
  addFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
};
