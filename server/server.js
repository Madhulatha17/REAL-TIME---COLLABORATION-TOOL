const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let sharedNote = "";

io.on("connection", (socket) => {

  socket.emit("load-note", sharedNote);

  socket.on("note-change", (data) => {

    sharedNote = data;

    socket.broadcast.emit(
      "receive-note",
      sharedNote
    );

  });

});

server.listen(5000, () => {
  console.log(
    "Collaboration Server Running On Port 5000"
  );
});
