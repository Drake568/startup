function searchUsers() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const results = users.filter((user) => {
    const username = user.username.toLowerCase();
    const name = user.name.toLowerCase();

    return username.includes(searchInput) || name.includes(searchInput);
  });

  displaySearchResults(results);
}

function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = "";

  if (results.length === 0) {
    searchResultsContainer.textContent = "No matching users found.";
    return;
  }

  results.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.textContent = `${user.username} (${user.name}) `;
    const addFriendButton = document.createElement("button");
    addFriendButton.textContent = "Add Friend";
    addFriendButton.addEventListener("click", () => {
      //Send friend request through websocket
      alert("Friend Request Sent!");
      const friends = JSON.parse(localStorage.getItem("friends")) || [];
      friends.push(user.username);
      localStorage.setItem("friends", JSON.stringify(friends));
    });
    userDiv.appendChild(addFriendButton);
    searchResultsContainer.appendChild(userDiv);
  });
}

// Get the "name" from local storage
const friendsJSON = localStorage.getItem("friends");
const friends = JSON.parse(friendsJSON);

const friendList = document.getElementById("friendList");

for (let i = 0; i < friends.length; i++) {
  const friend = friends[i];
  const friendDiv = document.createElement("div");
  const friendLink = document.createElement("a");
  friendLink.href = friend; // Assuming 'username' is the property with the link
  friendLink.textContent = friend; // Assuming 'username' is the property with the text
  friendLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    localStorage.setItem("studiesToDisplay", friend);
    window.location.href = "explore.html";
  });
  friendDiv.appendChild(friendLink);
  friendList.appendChild(friendDiv);
}

// Update the header with the stored name
const headerName = document.getElementById("header-name");
if (storedName) {
  headerName.textContent = storedName;
} else {
  headerName.textContent = "Default Name"; // Provide a default name if "name" is not found in local storage
}
