import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/drwm3i3g4/image/upload/v1649813072/User/user-avatar_dplbyo.jpg",
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  city: String,
  relationship: {
    type: String,
    enum: ["Single", "Date", "Married"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  school: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// userSchema.virtual("posts", {
//   ref: "Post",
//   localField: "_id",
//   foreignField: "userPost",
// });

export default mongoose.model("User", userSchema);
