const notifications = document.getElementById("notifications");

displayNotifications();

let socket = null;

initializeWebSocket();

async function initializeWebSocket() {
  socket = new WebSocket("ws://localhost:4000");

  socket.addEventListener("open", () => {
    console.log("WebSocket connection opened");
    socket.send(
      JSON.stringify({
        type: "login",
        username: localStorage.getItem("username"),
        friends: JSON.parse(localStorage.getItem("friends")),
      })
    );
  });

  socket.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });

  socket.addEventListener("close", () => {
    console.log("WebSocket connection closed");
    // You can perform additional actions on connection close if needed
  });

  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "friendRequest":
          console.log("Received friend request");
          displayNotifications();
          break;
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });
}

async function displayNotifications() {
  const friendRequests = await getFriendRequests();
  console.log("Friend Requests:", friendRequests);

  if (friendRequests.length !== 0) {
    const header = document.createElement("h2");
    header.textContent = "Notifications";
    notifications.appendChild(header);
  }

  for (let i = 0; i < friendRequests.length; i++) {
    const requester = friendRequests[i].from;
    const friendRequestElement = document.createElement("div");
    friendRequestElement.classList.add("notification");
    friendRequestElement.textContent = `${requester} wants to be your friend!`;
    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.addEventListener("click", function () {
      acceptFriendRequest(requester);
    });
    friendRequestElement.appendChild(acceptButton);
    const rejectButton = document.createElement("button");
    rejectButton.textContent = "Reject";
    rejectButton.addEventListener("click", function () {
      rejectFriendRequest(requester);
    });
    friendRequestElement.appendChild(rejectButton);
    notifications.appendChild(friendRequestElement);
  }
}

async function getFriendRequests() {
  try {
    const response = await fetch(
      `/api/getFriendRequests/${localStorage.getItem("username")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function acceptFriendRequest(requester) {
  try {
    const response = await fetch(
      `/api/acceptFriendRequest/${requester}/${localStorage.getItem(
        "username"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      alert(data.message);
      window.location.reload();
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function rejectFriendRequest(requester) {
  try {
    const response = await fetch(
      `/api/rejectFriendRequest/${requester}/${localStorage.getItem(
        "username"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      alert(data.message);
      window.location.reload();
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
