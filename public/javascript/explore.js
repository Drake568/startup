displayFriends();

async function addFriendRequest() {
  const searchInput = document.getElementById("search-input");
  if (searchInput.value === "" || searchInput.value === null) {
    alert("Please enter a username to send a friend request to.");
    return;
  } else if (searchInput.value === localStorage.getItem("username")) {
    alert("You cannot send a friend request to yourself.");
    return;
  }
  await sendFriendRequest(localStorage.getItem("username"), searchInput.value);
}

async function sendFriendRequest(sender, receiver) {
  try {
    const response = await fetch(
      `/api/sendFriendRequest/${sender}/${receiver}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response status is in the range of 2xx
    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Access the message property in the response
      alert(data.message);
    } else {
      // The request encountered an error (e.g., 404 Not Found)
      const data = await response.json();
      console.error(data.error); // Access the error property in the response
    }

    // No need to return response here
  } catch (error) {
    // Handle network or other errors
    console.error("Error:", error);
    throw error; // Re-throw the error to let the caller handle it if needed
  }
}

// async function getFriends(username) {
//   try {
//     const response = await fetch(`/api/getFriends/${username}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.ok) {
//       const friends = await response.json();
//       console.log("Friends:", friends);
//       return friends;
//     } else {
//       const data = await response.json();
//       console.error(data.error);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// }

function displayFriends() {
  const friends = JSON.parse(localStorage.getItem("friends"));
  const friendList = document.getElementById("friendList");

  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    const friendDiv = document.createElement("div");
    const friendLink = document.createElement("a");
    friendLink.href = friend;
    friendLink.textContent = friend;
    friendLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.setItem("studiesToDisplay", friend);
      window.location.reload();
    });
    friendDiv.appendChild(friendLink);
    friendList.appendChild(friendDiv);
  }
}
