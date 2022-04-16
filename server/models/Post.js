import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assets: [
    {
      media_type: String,
      url: String,
    },
  ],
  content: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Post", postSchema);
