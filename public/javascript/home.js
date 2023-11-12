const notifications = document.getElementById("notifications");

displayNotifications();

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
          authorization: localStorage.getItem("token"),
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
          authorization: localStorage.getItem("token"),
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
          authorization: localStorage.getItem("token"),
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
