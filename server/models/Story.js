import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    userPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    asset: String,
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
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

export default mongoose.model("Story", StorySchema);
