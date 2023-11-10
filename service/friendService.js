// friendService.js

let friendMap = new Map();

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

module.exports = {
  addFriend,
  getFriends,
  areFriends,
};
