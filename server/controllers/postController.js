import Post from "../models/Post.js";
import User from "../models/User.js";
import * as errorController from "../controllers/errorController.js";

export async function createPostHandler(req, res) {
  try {
    const newPost = new Post({ ...req.body });
    await newPost.save();
    await User.findByIdAndUpdate(req.body.userPost, { $push: { posts: newPost._id } });
    res.status(201).json(newPost._doc);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getPostHandler(req, res) {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: "userPost",
      select: "firstName lastName avatar",
    });
    if (!post) {
      res.status(404).json("No post with this id");
    }
    res.status(200).json(post?._doc);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function updatePostHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json("Post not found");
    }
    if (existingPost.userPost.toString() !== req.user.id) {
      return res.status(403).json("You are not allowed to update this post");
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { $set: req.body }, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deletePostHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json("Post not found");
    }
    if (existingPost.userPost.toString() !== req.user.id) {
      return res.status(403).json("You are not allowed to delete this post");
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
