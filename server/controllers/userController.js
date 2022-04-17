import Post from "../models/Post.js";
import User from "../models/User.js";
import * as errorController from "./errorController.js";
import * as factoryController from "./factoryController.js";

export async function updateUserHandler(req, res) {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json("You are not allowed to update this user");
    }
    factoryController.updateOne(User, req.params.userId, { $set: req.body }, res);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deleteUserHandler(req, res) {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json("You are not allowed to delete this user");
    }
    factoryController.deleteOne(User, req.params.userId, res);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getPostsHandler(req, res) {
  try {
    const userPost = await factoryController.findAll(User, { _id: req.params.userId }, 0, {
      path: "posts",
      options: {
        limit: 10,
        skip: 10 * 0,
        sort: { createdAt: -1 },
      },
    });
    if (!userPost || userPost.length === 0) {
      return res.status(404).json("Posts not found");
    }
    res.status(200).json(userPost[0].posts);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getOtherUserProfileHandler(req, res) {
  try {
    const user = await factoryController.findOne(User, { username: req.params.username }, null);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function addAndRemoveFriendHandler(req, res) {
  try {
    //find user
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(404).json("User not found");
    }
    if (req.user.id !== currentUser._id.toString()) {
      return res.status(403).json("You are not allowed to add or remove friend");
    }
    const friend = await User.findById(req.body.friendId);
    if (!friend) {
      return res.status(404).json("Friend not found");
    }
    //if friend is not in current user's friend list
    if (!currentUser.friends.includes(friend._id.toString())) {
      await currentUser.updateOne({ $push: { friends: friend._id } });
      await friend.updateOne({ $push: { friends: currentUser._id } });
      res.status(200).json("Friend added");
    }
    //if friend is in current user's friend list
    if (currentUser.friends.includes(friend._id.toString())) {
      await currentUser.updateOne({ $pull: { friends: friend._id } });
      await friend.updateOne({ $pull: { friends: currentUser._id } });
      res.status(200).json("Friend removed");
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function searchUserHandler(req, res) {
  try {
    const regex = new RegExp(factoryController.escapeRegex(req.query.q), "gi");
    const result = await User.find({ fullName: regex }).limit(10).select("username avatar fullName _id");
    res.status(200).json(result);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
