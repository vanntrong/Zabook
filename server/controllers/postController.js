import Post from "../models/Post.js";
import User from "../models/User.js";
import * as errorController from "../controllers/errorController.js";
import * as factoryController from "../controllers/factoryController.js";

export async function createPostHandler(req, res) {
  try {
    if (req.body.userPost !== req.user.id) {
      return res.status(403).json("You are not allowed to create this post");
    }
    if (req.body.assets) {
      const results = await Promise.all(
        req.body.assets.map(async (file) => {
          const result = await factoryController.uploadFile(file.url, "post", file.media_type);
          return {
            media_type: result.resource_type,
            url: result.secure_url,
          };
        })
      );
      console.log(results);
      const { assets, ...other } = req.body;
      const data = { ...other };
      data.assets = results;
      await factoryController.createOne(Post, data, res);
    } else {
      await factoryController.createOne(Post, req.body, res);
    }
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
    if (req.body.userPost !== req.user.id) {
      return res.status(403).json("You are not allowed to update this post");
    }
    await factoryController.updateOne(Post, req.params.postId, { $set: req.body }, res);
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
