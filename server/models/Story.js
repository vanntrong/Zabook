import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    userPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    asset: {
      url: String,
      media_type: String,
    },
    content: String,
    timing: {
      type: Number,
      default: 10,
    },
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    createdAt: {
      type: Number,
      default: Date.now(),
    },
    expiredAt: {
      type: Number,
      default: Date.now() + 24 * 60 * 60 * 1000,
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

export default mongoose.model("Story", StorySchema);
