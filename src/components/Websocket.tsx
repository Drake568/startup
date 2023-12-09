// WebSocketContext.js
import { set } from "lodash";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

type WebSocketContextType = {
  socket: WebSocket | null;
  createWebSocket: () => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const createWebSocket = () => {
    // toast.success("Logged into websocket");
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    newSocket.addEventListener("open", () => {
      //   toast.success("added");
      console.log("WebSocket connection opened");
      newSocket.send(
        JSON.stringify({
          type: "login",
          username: localStorage.getItem("username"),
          friends: [],
        })
      );
    });

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
      // You can perform additional actions on connection close if needed
    });

    newSocket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "friendRequest":
            toast.success("Friend request received");
            break;
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    setSocket(newSocket);

    // Close the WebSocket connection when the component unmounts
    return () => {
      //   toast.error("Logged out of websocket");
      newSocket.close();
    };
  };

  return (
    <WebSocketContext.Provider value={{ socket, createWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
