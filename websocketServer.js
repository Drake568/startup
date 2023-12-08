const WebSocket = require("ws");

const initializeWebSocketServer = (httpServer) => {
  const wss = new WebSocket.Server({ noServer: true });
  const clients = new Map();

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);

        switch (data.type) {
          case "login":
            handleLogin(ws, data.username, data.friends);
            break;
          case "friendRequest":
            handleFriendRequest(ws, data.friendUsername);
            break;
          // Add more message types and handlers as needed
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    ws.on("close", () => {
      handleDisconnect(ws);
    });
  });

  function handleLogin(ws, username, friendList) {
    clients.set(ws, { username, friendList });
    console.log(clients);
    ws.send(
      JSON.stringify({ type: "welcome", message: `Welcome, ${username}!` })
    );
  }

  function handleFriendRequest(ws, friendUsername) {
    // Check if the friendUsername is online
    const friendSocket = Array.from(clients.entries()).find(
      ([ws, clientData]) => clientData.username === friendUsername
    );

    if (friendSocket) {
      const friendSocketWs = friendSocket[0];
      friendSocketWs.send(
        JSON.stringify({
          type: "friendRequest",
          fromUsername: clients.get(ws).username,
        })
      );
    } else {
      console.log(`User ${friendUsername} is not online.`);
    }
  }

  function handleDisconnect(ws) {
    clients.delete(ws);
  }

  // Integrate WebSocket server with HTTP server
  httpServer.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
};

module.exports = initializeWebSocketServer;
