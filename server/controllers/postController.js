import Post from "../models/Post.js";
import User from "../models/User.js";
import * as errorController from "../controllers/errorController.js";
import * as factoryController from "../controllers/factoryController.js";
import Comment from "../models/Comment.js";
import Notification from "../models/Notification.js";

export async function createPostHandler(req, res) {
  try {
    if (req.body.userPost !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to create this post", 403);
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
    const post = await Post.findById(req.params.postId).populate([
      {
        path: "userPost",
        select: "fullName username avatar",
      },
      {
        path: "comments",
        select: "content createdAt",
        populate: { path: "userComment", select: "fullName username avatar" },
      },
      {
        path: "tagsPeople",
        select: "_id fullName username",
      },
    ]);
    if (!post) {
      return errorController.errorHandler(res, "Post not found", 404);
    }
    res.status(200).json(post);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function updatePostHandler(req, res) {
  try {
    if (req.body.userPost !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to update this post", 403);
    }
    await factoryController.updateOne(Post, req.params.postId, { $set: req.body }, res, [
      {
        path: "userPost",
        select: "fullName avatar username",
      },
      {
        path: "comments",
        select: "content createdAt",
        populate: { path: "userComment", select: "fullName username avatar" },
      },
    ]);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deletePostHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return errorController.errorHandler(res, "Post not found", 404);
    }
    if (existingPost.userPost.toString() !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to delete this post", 403);
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
    // Check if post exists
    if (!existingPost) {
      return errorController.errorHandler(res, "Post not found", 404);
    }

    // Check if request is made by the same user
    if (req.body.userId !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to like this post", 403);
    }
    // Check if user has already liked this post
    if (existingPost.likes.includes(req.body.userId)) {
      existingPost.likes = existingPost.likes.filter((like) => like.toString() !== req.body.userId);
      // save post
      const newPost = await existingPost.save();
      const fullPost = await newPost.populate([
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
      ]);

      return res.status(200).json({ post: fullPost });
    } else {
      existingPost.likes.push(req.body.userId);
      // save post
      const newPost = await existingPost.save();
      const fullPost = await newPost.populate([
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
      ]);
      // create notification
      const newNotification = new Notification({
        type: "like",
        content: "liked your post",
        from: req.body.userId,
        to: [existingPost.userPost],
        link: `/posts/${existingPost._id}`,
      });

      const notification = await newNotification.save();
      const fullNotification = await notification.populate([
        {
          path: "from",
          select: "fullName username avatar",
        },
        {
          path: "to",
          select: "username fullName avatar",
        },
      ]);
      return res.status(200).json({ post: fullPost, notification: fullNotification });
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function createCommentHandler(req, res) {
  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return errorController.errorHandler(res, "Post not found", 404);
    }
    if (req.body.userComment !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to comment this post", 403);
    }
    const data = { ...req.body, postId: req.params.postId };

    const comment = await Comment.create(data);
    const commentWithUserInfo = await comment.populate({
      path: "userComment",
      select: "fullName username avatar",
    });

    const newNotification = new Notification({
      type: "comment",
      content: "commented on your post",
      from: req.body.userComment,
      to: [existingPost.userPost],
      link: `/posts/${existingPost._id}`,
    });

    const notification = await newNotification.save();
    const fullNotification = await notification.populate([
      {
        path: "from",
        select: "fullName username avatar",
      },
      {
        path: "to",
        select: "username fullName avatar",
      },
    ]);
    res.status(200).json({ comment: commentWithUserInfo, notification: fullNotification });
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function updateCommentHandler(req, res) {
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
      return errorController.errorHandler(res, "Comment not found", 404);
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
      return errorController.errorHandler(res, "No comments found", 404);
    }
    res.status(200).json(postComment.comments);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deleteCommentHandler(req, res) {
  try {
    const existingComment = await Comment.findById(req.params.commentId);
    if (!existingComment) {
      return errorController.errorHandler(res, "Comment not found", 404);
    }
    if (existingComment.userComment.toString() !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to delete this comment", 403);
    }
    await existingComment.delete();
    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
