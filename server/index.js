import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import tokenRouter from "./routes/token.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8800;

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postRoute);
app.use("/token", tokenRouter);

mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) console.log(err);
  else {
    console.log("Connected to DB");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
