import { toast } from "react-toastify";
import Study from "./model/study";
import FriendRequest from "./model/friendRequest";

export async function fetchStudies(userName) {
  try {
    const response = await fetch(`/api/getStudies/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const studies = await response.json();
    return studies;
  } catch (error) {
    console.error("Error fetching studies:", error);
    throw error;
  }
}

export function postStudy(study: Study) {
  fetch("/api/addStudy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ study }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("POST request successful:", data);
    })
    .catch((error) => {
      console.error("Error making POST request:", error);
    });
  toast.success("Study posted");
  return true;
}

export async function sendFriendRequest(sender, receiver) {
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

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      if (data.message === "Friend request already exists") {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
      // sendFriendRequestNotification(receiver);
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getFriendRequests() {
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

export async function acceptFriendRequest(request: FriendRequest) {
  try {
    const response = await fetch(
      `/api/acceptFriendRequest/${request.from}/${request.to}`,
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
      toast.success(data.message);
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

export async function rejectFriendRequest(request: FriendRequest) {
  try {
    const response = await fetch(
      `/api/rejectFriendRequest/${request.from}/${request.to}`,
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
      toast.success(data.message);
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
