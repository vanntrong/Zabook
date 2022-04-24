import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
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
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

export default mongoose.model("Post", postSchema);
