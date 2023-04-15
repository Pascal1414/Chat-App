import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", function () {
  console.log("Connected to server");
});
socket.on("disconnect", function () {
  console.log("Disconnected from server");
});

socket.on("error", function (err) {
  console.log("Error: " + err);
});

socket.on("success", function (data) {
  console.log("Success: " + data);
});

const funcions = {
  createRoom(name: string) {
    socket.emit("create-room", name);
  },
  joinRoom(name: string) {
    socket.emit("join-room", name);
  }
};
export default funcions;