import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["message", "asset", "file", "notification"],
      default: "message",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    asset: { url: String, media_type: String },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
