import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

{
  /* <WebSocketProvider>
    <App />
  </WebSocketProvider> */
}

//   import React, { useEffect } from 'react';
// import { useWebSocket } from './WebSocketContext';

// const ExampleComponent = () => {
//   const socket = useWebSocket();

//   useEffect(() => {
//     // Use the WebSocket connection
//     // ...

//     return () => {
//       // Cleanup or disconnect logic if needed
//     };
//   }, [socket]);

//   return (
//     // Component JSX
//   );
// };

// export default ExampleComponent;

const WebSocketContext = createContext<WebSocket | null>(null);

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    function getFriends() {
      const friendsFromStorage = localStorage.getItem("friends");
      const friends = friendsFromStorage ? JSON.parse(friendsFromStorage) : [];
      return friends;
    }

    socket.addEventListener("open", () => {
      console.log("WebSocket connection opened");
      toast.success("Logged into websocket");
      socket.send(
        JSON.stringify({
          type: "login",
          username: localStorage.getItem("username"),
          friends: getFriends(),
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
            // Perform actions related to friend request, e.g., displayNotifications()
            break;
          // Add more cases for other message types if needed
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    socket.onopen = () => {
      console.log("WebSocket connected");
      toast.success("WebSocket connected");
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      toast.error("WebSocket closed");
    };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []); // This effect runs only once when the component mounts

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => {
  const socket = useContext(WebSocketContext);

  if (!socket) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  return socket;
};

export { WebSocketProvider, useWebSocket };

// let socket = null;

// initializeWebSocket();

// function initializeWebSocket() {
//   const protocol = window.location.protocol === "http:" ? "ws" : "wss";
//   socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

//   socket.addEventListener("open", () => {
//     console.log("WebSocket connection opened");
//     socket.send(
//       JSON.stringify({
//         type: "login",
//         username: localStorage.getItem("username"),
//         friends: JSON.parse(localStorage.getItem("friends")),
//       })
//     );
//   });

//   socket.addEventListener("error", (error) => {
//     console.error("WebSocket error:", error);
//   });

//   socket.addEventListener("close", () => {
//     console.log("WebSocket connection closed");
//     // You can perform additional actions on connection close if needed
//   });

//   socket.addEventListener("message", (event) => {
//     try {
//       const data = JSON.parse(event.data);

//       switch (data.type) {
//         case "friendRequest":
//           console.log("Received friend request");
//           // Trigger the get friend requests API call or handle as needed
//           break;
//         // Handle other message types as needed
//       }
//     } catch (error) {
//       console.error("Error parsing message:", error);
//     }
//   });
// }

// function sendFriendRequestNotification(friendUsername) {
//   console.log("Sending friend request notification");
//   socket.send(
//     JSON.stringify({
//       type: "friendRequest",
//       friendUsername,
//     })
//   );
// }
