const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Socket.IO setup
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("draw", (data) => {
  socket.broadcast.emit("draw", data);
  });

  
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
