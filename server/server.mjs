import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);
const port = 8000;
const users = [{}];
httpServer.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("joined", ({ userName }) => {
    users[socket.id] = userName;

    socket.emit("joined", {
      user: `${users[socket.id]}`,
      message: `${users[socket.id]} welcome to the chat`,
    });

    socket.broadcast.emit("userjoined", {
      user: `${users[socket.id]}`,
      message: `${users[socket.id]} joined the chat.`,
    });
  });
  socket.on("leave", () => {
    socket.broadcast.emit("left the chat", {
      user: "Admin",
      message: "Left the chat",
    });
  });
});

app.get("/", (req, res) => {
  res.send("its working");
});
