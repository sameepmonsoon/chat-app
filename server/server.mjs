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
    console.log(userName);
    socket.broadcast.emit("joined", {
      user: "admin",
      message: `${users[socket.id]} has joined`,
    });
    socket.emit("joined", {
      user: "admin",
      message: `${users[socket.id]} welcome to the chat`,
    });
  });
});
app.get("/", (req, res) => {
  res.send("its working");
});
