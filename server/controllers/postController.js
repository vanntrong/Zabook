import Post from "../models/Post.js";
import User from "../models/User.js";

export async function createPostHandler(req, res) {
  try {
    const newPost = new Post({ ...req.body });
    await newPost.save();
    await User.findByIdAndUpdate(req.body.userPost, { $push: { posts: newPost._id } });
    res.status(201).json(newPost._doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPostHandler(req, res) {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: "userPost",
      select: "firstName lastName avatar",
    });
    if (!post) {
      res.status(404).json({ message: "No post with this id" });
    }
    res.status(200).json(post?._doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePostHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (existingPost.userPost.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to update this post" });
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { $set: req.body }, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deletePostHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (existingPost.userPost.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to delete this post" });
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
