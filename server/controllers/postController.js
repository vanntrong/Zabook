import Post from "../models/Post.js";
import User from "../models/User.js";
import * as errorController from "../controllers/errorController.js";
import * as factoryController from "../controllers/factoryController.js";
import Comment from "../models/Comment.js";

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
      const { assets, ...other } = req.body;
      const data = { ...other };
      data.assets = results;
      await factoryController.createPostThenReturnWithUserInfo(Post, data, res);
    } else {
      await factoryController.createPostThenReturnWithUserInfo(Post, req.body, res);
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getPostHandler(req, res) {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: "comments",
      select: "content createdAt",
      populate: { path: "userComment", select: "fullName username avatar" },
    });
    if (!post) {
      res.status(404).json("No post with this id");
    }
    res.status(200).json(post);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function updatePostHandler(req, res) {
  try {
    if (req.body.userPost !== req.user.id) {
      return res.status(403).json("You are not allowed to update this post");
    }
    await factoryController.updateOne(Post, req.params.postId, { $set: req.body }, res, {
      path: "userPost",
      select: "firstName lastName avatar",
    });
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

export async function likePostHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json("Post not found");
    }
    if (req.body.userId !== req.user.id) {
      return res.status(403).json("You are not allowed to like this post");
    }
    if (existingPost.likes.includes(req.body.userId)) {
      existingPost.likes = existingPost.likes.filter((like) => like.toString() !== req.body.userId);
    } else {
      existingPost.likes.push(req.body.userId);
    }
    const newPost = await existingPost.save();
    newPost.populate(
      [
        //selecting the user who created the post
        {
          path: "userPost",
          select: "fullName username avatar",
        },
        //selecting the user who comment the post
        {
          path: "comments",
          select: "content createdAt",
          populate: { path: "userComment", select: "fullName username avatar" },
        },
      ],
      (err, post) => {
        if (err) {
          errorController.serverErrorHandler(err, res);
        }
        res.status(200).json(post);
      }
    );
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function createCommentHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json("Post not found");
    }
    if (req.body.userComment !== req.user.id) {
      return res.status(403).json("You are not allowed to comment on this post");
    }
    const data = { ...req.body, postId: req.params.postId };
    await Comment.create(data).then(async (comment) => {
      const commentWithUserInfo = await comment.populate({
        path: "userComment",
        select: "fullName username avatar",
      });
      res.status(200).json(commentWithUserInfo);
    });
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function updateCommentHandler(req, res) {
  console.log(req.body);
  try {
    const newComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { $set: req.body },
      { new: true }
    ).populate({
      path: "userComment",
      select: "fullName username avatar",
    });
    if (!newComment) {
      return res.status(404).json("Comment not found");
    }
    res.status(200).json(newComment);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getCommentsHandler(req, res) {
  try {
    const postComment = await Post.findById(req.params.postId).populate({
      path: "comments",
      select: "content createdAt",
      populate: { path: "userComment", select: "fullName username avatar" },
      options: {
        limit: req.query.limit,
      },
    });
    if (!postComment) {
      return res.status(404).json("No comments found");
    }
    res.status(200).json(postComment.comments);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
