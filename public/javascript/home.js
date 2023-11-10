const notifications = document.getElementById("notifications");

const friendRequestsJSON = localStorage.getItem("friend-requests");
const friendRequests = JSON.parse(friendRequestsJSON);

if (friendRequests.length !== 0) {
  const header = document.createElement("h2");
  header.textContent = "Notifications";
  notifications.appendChild(header);
}

for (let i = 0; i < friendRequests.length; i++) {
  const friendRequest = friendRequests[i];
  const friendRequestElement = document.createElement("div");
  friendRequestElement.classList.add("notification");
  friendRequestElement.textContent = `${friendRequest} wants to be your friend!`;
  const acceptButton = document.createElement("button");
  acceptButton.textContent = "Accept";
  acceptButton.addEventListener("click", function () {
    acceptFriendRequest(friendRequest);
  });
  friendRequestElement.appendChild(acceptButton);
  const rejectButton = document.createElement("button");
  rejectButton.textContent = "Reject";
  rejectButton.addEventListener("click", function () {
    rejectFriendRequest(friendRequest);
  });
  friendRequestElement.appendChild(rejectButton);
  notifications.appendChild(friendRequestElement);
}

function acceptFriendRequest(request) {
  const friends = JSON.parse(localStorage.getItem("friends")) || [];
  friends.push(request);
  localStorage.setItem("friends", JSON.stringify(friends));
  const friendRequests =
    JSON.parse(localStorage.getItem("friend-requests")) || [];
  for (let i = 0; i < friendRequests.length; i++) {
    if (friendRequests[i] === request) {
      friendRequests.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("friend-requests", JSON.stringify(friendRequests));
  window.location.reload();
}
function rejectFriendRequest(request) {
  const friendRequests =
    JSON.parse(localStorage.getItem("friend-requests")) || [];
  for (let i = 0; i < friendRequests.length; i++) {
    if (friendRequests[i] === request) {
      friendRequests.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("friend-requests", JSON.stringify(friendRequests));
  window.location.reload();
}
