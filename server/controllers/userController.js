import Post from "../models/Post.js";
import User from "../models/User.js";
import * as errorController from "./errorController.js";
import * as factoryController from "./factoryController.js";
import fullTextSearch from "fulltextsearch";
import mongoose from "mongoose";
const fullTextSearchVi = fullTextSearch.vi;

export async function updateUserHandler(req, res) {
  try {
    if (req.params.userId !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to update this user", 403);
    }
    if (req.body.avatar) {
      const result = await factoryController.uploadFile(req.body.avatar, "user", "image");
      req.body.avatar = result.secure_url;
    }
    factoryController.updateOne(User, req.params.userId, { $set: req.body }, res);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deleteUserHandler(req, res) {
  try {
    if (req.params.userId !== req.user.id) {
      return errorController.errorHandler(res, "You are not allowed to delete this user", 403);
    }
    factoryController.deleteOne(User, req.params.userId, res);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getPostsHandler(req, res) {
  try {
    const existUser = await User.findById(req.params.userId);
    if (req.params.userId !== req.user.id) {
      if (existUser.friends.includes(req.user.id)) {
        const posts = await Post.find({
          $or: [{ userPost: req.params.userId }, { tagsPeople: { $in: req.params.userId } }],
        })
          .populate([
            {
              path: "userPost",
              select: "fullName username avatar",
            },
            {
              path: "tagsPeople",
              select: "_id fullName username",
            },
            {
              path: "comments",
              select: "_id",
            },
          ])
          .where("audience")
          .in(["public", "friends"])
          .limit(req.query.limit)
          .skip(req.query.limit * req.query.page)
          .sort({ createdAt: -1 });
        return res.status(200).json(posts);
      }
      if (!existUser.friends.includes(req.user.id)) {
        const posts = await Post.find({
          $or: [{ userPost: req.params.userId }, { tagsPeople: { $in: req.params.userId } }],
        })
          .populate([
            {
              path: "userPost",
              select: "fullName username avatar",
            },
            {
              path: "tagsPeople",
              select: "_id fullName username",
            },
            {
              path: "comments",
              select: "_id",
            },
          ])
          .where("audience")
          .equals("public")
          .limit(req.query.limit)
          .skip(req.query.limit * req.query.page)
          .sort({ createdAt: -1 });
        return res.status(200).json(posts);
      }
    }
    if (req.params.userId === req.user.id) {
      const posts = await Post.find({
        $or: [{ userPost: req.params.userId }, { tagsPeople: { $in: req.params.userId } }],
      })
        .populate([
          {
            path: "userPost",
            select: "fullName username avatar",
          },
          {
            path: "tagsPeople",
            select: "_id fullName username",
          },
          {
            path: "comments",
            select: "_id",
          },
        ])
        .limit(req.query.limit)
        .skip(req.query.limit * req.query.page)
        .sort({ createdAt: -1 });
      return res.status(200).json(posts);
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getOtherUserProfileHandler(req, res) {
  try {
    const user = await factoryController.findOne(User, { username: req.params.username }, null);
    if (!user) {
      return errorController.errorHandler(res, "User not found", 404);
    }
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getFriendListHandler(req, res) {
  try {
    const friendList = await User.findById(req.params.userId).populate({
      path: "friends",
      select: "fullName username avatar email",
      options: {
        limit: 20,
        skip: 20 * req.query.page,
        sort: { fullName: 1 },
      },
    });

    res.status(200).json(friendList.friends);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function searchUserHandler(req, res) {
  try {
    const regex = new RegExp(fullTextSearchVi(factoryController.escapeRegex(req.query.q)), "gi");
    const result = await User.find({ fullName: regex }).limit(10).select("username avatar fullName _id");
    res.status(200).json(result);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function addHistorySearchHandler(req, res) {
  try {
    if (req.user.id !== req.params.userId) {
      return errorController.errorHandler(res, "You are not allowed to add this user to searchHistory", 403);
    }
    const newUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { historySearch: req.body.searchId, $position: 0 } },
      { new: true }
    );
    res.status(200).json(newUser.historySearch);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getHistoryInfo(req, res) {
  try {
    if (req.user.id !== req.params.userId) {
      return errorController.errorHandler(res, "You are not allowed to get this user's history", 403);
    }
    const user = await User.findById(req.params.userId).populate({
      path: "historySearch",
      select: "fullName username avatar",
    });
    res.status(200).json(user.historySearch);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deleteHistoryHandler(req, res) {
  try {
    if (req.user.id !== req.params.userId) {
      return errorController.errorHandler(res, "You are not allowed to delete this user's history", 403);
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { historySearch: req.params.historyId } },
      { new: true }
    );
    res.status(200).json(user.historySearch);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deleteFriendHandler(req, res) {
  try {
    if (req.user.id !== req.params.userId) {
      return errorController.errorHandler(res, "You are not allowed to delete this user's friend", 403);
    }
    const currentUser = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!currentUser || !friend) {
      return errorController.errorHandler(res, "User not found", 404);
    }
    // const updatedUser = await currentUser.updateOne({ $pull: { friends: req.params.friendId } }, { new: true });
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    await friend.updateOne({ $pull: { friends: req.params.userId } });
    res.status(200).json(updatedUser.friends);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getFriendPostHandler(req, res) {
  try {
    if (req.user.id !== req.params.userId) {
      return errorController.errorHandler(res, "You are not allowed to get this user's friend post", 403);
    }
    const user = await User.findById(req.params.userId).populate({
      path: "friends",
      select: "_id",
      populate: {
        path: "posts",
        populate: [
          {
            path: "userPost",
            select: "fullName username avatar",
          },
          {
            path: "tagsPeople",
            select: "_id fullName username",
          },
          {
            path: "comments",
            select: "_id",
          },
        ],
        options: {
          limit: 10,
          skip: 10 * req.query.page,
          sort: { createdAt: -1 },
        },
      },
    });

    // "$or", ['friends.posts.audience.includes("public")', 'friends.posts.audience.includes("friends")']
    //format data
    const posts = user.friends
      .map((friends) => friends.posts.filter((post) => post.audience === "public" || post.audience === "friends"))
      .flat(Infinity);
    res.status(200).json(posts);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getOnlineHandler(req, res) {
  try {
    if (!req.body.onlineList) {
      return errorController.errorHandler(res, "Not found", 404);
    }
    const users = await User.find({ _id: { $in: req.body.onlineList } }).select("username fullName avatar");
    res.status(200).json(users);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function getSuggestionHandler(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const userFriends = user.friends;
    const usersSuggest = User.find({}).select("username fullName avatar").limit(20).sort({ createdAt: 1 });
    res
      .status(200)
      .json((await usersSuggest).filter((user) => user.id !== req.user.id && !userFriends.includes(user.id)));
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}
