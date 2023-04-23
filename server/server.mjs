import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);
const port = 8000;

httpServer.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("new connection");
});

app.get("/", (req, res) => {
  res.send("its working");
});
