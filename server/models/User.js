import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: String,
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/drwm3i3g4/image/upload/v1649813072/User/user-avatar_dplbyo.jpg",
    },
    dateOfBirth: {
      type: Date,
      required: true,
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
      require: true,
    },
    bio: String,
    school: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    historySearch: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "userPost",
});

userSchema.pre("save", function (next) {
  this.fullName = [this.firstName, this.lastName].filter(Boolean).join(" ");
  next();
});

export default mongoose.model("User", userSchema.index({ "$**": "text" }));
