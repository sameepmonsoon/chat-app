import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";

const app = express();
const port = 8000;

const users = [];

app.use(cors());
app.get("/", (req, res) => {
  res.send("HELL ITS WORKING");
});

const server = http.createServer(app);

const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log("New Connection success!");

  socket.on("joined", ({ userName }) => {
    users[socket.id] = userName;
    console.log(`${userName} has joined `);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined the chat.`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat,${users[socket.id]} `,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("leave", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} left the chat.`,
    });
    console.log(`${users[socket.id]} left the chat.`);
  });
});

server.listen(port, () => {
  console.log(`server is working`);
});
