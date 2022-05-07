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
import { instrument } from "@socket.io/admin-ui";
import { createServer } from "http";
dotenv.config();
const app = express();

const httpServer = createServer(app);

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

httpServer.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

let onlineUsers = [];

const addNewUser = (userData, socketId) => {
  !onlineUsers.some((user) => user.userData._id === userData._id) && onlineUsers.push({ userData, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userData._id === userId);
};

const getSocketId = (userId) => {
  return onlineUsers.find((user) => user.userData._id === userId)?.socketId;
};

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log("User connect: ", userData._id);
    addNewUser(userData, socket.id);
    socket.emit("onlineUsers", onlineUsers);
  });

  socket.on("join chat", (room) => {
    // // check if user joined room
    // let previousRoom = null;
    // // socket.rooms is Set so use rooms.values()
    // const iterator = socket.rooms.values();
    // // the first value is the socket.id
    // iterator.next().value;
    // // the second value is the room
    // previousRoom = iterator.next().value;
    // if (previousRoom) {
    //   // if user is already in a room, leave the room
    //   socket.leave(previousRoom);
    // }
    // // join the room
    socket.join(room);
    console.log("User joined chat: ", room);
  });

  socket.on("newMessage", (message) => {
    socket.in(message.conversation).emit("getMessage", message);
  });

  socket.on("createConversation", ({ creator, conversation }) => {
    const userReceived = conversation.members.filter((member) => member._id !== creator);

    userReceived.forEach((user) => {
      const socketId = getSocketId(user._id);
      io.to(socketId).emit("getConversation", { conversation });
    });
  });

  socket.on("change-group-info", (userChange, group, message) => {
    const userReceived = group.members.filter((member) => member._id !== userChange._id);

    userReceived.forEach((user) => {
      const socketId = getSocketId(user._id);
      io.to(socketId).emit("get-change-group-info", { userChange, group });
    });

    if (message) {
      group.members.forEach((member) => {
        const socketId = getSocketId(member._id);
        io.to(socketId).emit("getMessage", message);
      });
    }
  });

  // socket.on("change-group-name", (userChange, group) => {
  //   const userReceived = group.members.filter((member) => member._id !== userChange._id);
  //   userReceived.forEach((user) => {
  //     const socketId = getSocketId(user._id);
  //     io.to(socketId).emit("get-group-name-change", {
  //       userChange,
  //       message: `${userChange.fullName} changed the group name to ${group.chatName}`,
  //       group,
  //     });
  //   });
  // });

  // socket.on("change-group-avatar", (userChange, group) => {
  //   const userReceived = group.members.filter((member) => member._id !== userChange._id);
  //   userReceived.forEach((user) => {
  //     const socketId = getSocketId(user._id);
  //     io.to(socketId).emit("get-group-avatar-change", {
  //       userChange,
  //       message: `${userChange.fullName} changed the group avatar`,
  //       group,
  //     });
  //   });
  // });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("disconnect", () => {
    console.log("User disconnect");
    removeUser(socket.id);
    socket.emit("onlineUsers", onlineUsers);
  });
});
instrument(io, {
  auth: false,
});
