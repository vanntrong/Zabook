import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import searchRoute from "./routes/search.js";
import tokenRoute from "./routes/token.js";
import usersRoute from "./routes/users.js";
import friendRoute from "./routes/friend.js";
import storyRoute from "./routes/story.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(morgan("combined"));
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

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
