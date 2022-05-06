import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoute from "./routes/auth.js";
import conversationRoute from "./routes/conversation.js";
import friendRoute from "./routes/friend.js";
import messageRoute from "./routes/message.js";
import postRoute from "./routes/posts.js";
import searchRoute from "./routes/search.js";
import storyRoute from "./routes/story.js";
import tokenRoute from "./routes/token.js";
import usersRoute from "./routes/users.js";
import { Server } from "socket.io";
import * as socketController from "./socket/index.js";
dotenv.config();
const app = express();

//middleware
app.use(cors());
// app.use(morgan("combined"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8800;

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postRoute);
app.use("/token", tokenRoute);
app.use("/search", searchRoute);
app.use("/friend", friendRoute);
app.use("/story", storyRoute);
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);

mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) console.log(err);
  else {
    console.log("Connected to DB");
  }
});

const server = app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User connect: ", userData._id);
    socketController.addNewUser(userData, socket.id, onlineUsers);
    socket.emit("onlineUsers", onlineUsers);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined chat: ", room);
  });

  socket.on("newMessage", ({ message, conversation }) => {
    const userReceived = conversation.members.filter((member) => member._id !== message.sender._id);

    userReceived.forEach((user) => {
      const socketId = socketController.getSocketId(user._id, onlineUsers);
      io.to(socketId).emit("getMessage", { message, conversation });
    });
  });

  socket.on("createConversation", ({ creator, conversation }) => {
    const userReceived = conversation.members.filter((member) => member._id !== creator);

    userReceived.forEach((user) => {
      const socketId = socketController.getSocketId(user._id, onlineUsers);
      io.to(socketId).emit("getConversation", { conversation });
    });
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("disconnect", () => {
    socketController.removeUser(socket.id, onlineUsers);
    socket.emit("onlineUsers", onlineUsers);
  });
});
