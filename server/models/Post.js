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
    tagsPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
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
