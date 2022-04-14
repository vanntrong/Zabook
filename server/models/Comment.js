import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Comment", commentSchema);
