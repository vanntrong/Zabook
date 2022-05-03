import Story from "../models/Story.js";
import User from "../models/User.js";
import * as errorController from "./errorController.js";
import * as factoryController from "./factoryController.js";

export async function createStoryHandler(req, res) {
  try {
    if (req.body.userPost !== req.user.id) {
      return errorController.errorHandler(res, "You are not authorized to create a story", 403);
    }
    if (req.body.asset) {
      const result = await factoryController.uploadFile(req.body.asset, "story", "image");
      req.body.asset = result.secure_url;
    }
    const newStory = await Story.create(req.body);
    res.status(201).json(newStory);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getStoryHandler(req, res) {
  try {
    const stories = await Story.find({ userPost: req.query.userPost })
      .where("createdAt")
      .lte(Date.now() + 24 * 60 * 60 * 1000)
      .populate({
        path: "userPost",
        select: "username avatar fullName",
      });
    await res.status(200).json(stories);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deleteStoryHandler(req, res) {
  try {
    const story = await Story.findByIdAndDelete(req.params.storyId);
    if (!story) {
      return errorController.errorHandler(res, "Story not found", 404);
    }
    if (story.userPost.toString() !== req.user.id) {
      return errorController.errorHandler(res, "You are not authorized to delete this story", 403);
    }
    res.status(200).json(story);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getAllStoriesHandler(req, res) {
  try {
    const currentUser = await User.findById(req.user.id);
    const storiesOfCurrentUser = await Story.aggregate([
      {
        $match: {
          $and: [
            { userPost: currentUser._id },
            {
              createdAt: {
                $lte: Date.now() + 24 * 60 * 60 * 1000,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$userPost",
          userPost: {
            $first: "$userPost",
          },
          storyId: { $push: "$_id" },
          count: { $sum: 1 },
          createdAt: { $first: "$createdAt" },
          asset: { $first: "$asset" },
          content: { $first: "$content" },
          views: { $first: "$views" },
          timing: { $first: "$timing" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userPost",
          foreignField: "_id",
          as: "userPost",
        },
      },
      {
        $unwind: {
          path: "$userPost",
        },
      },
      {
        $project: {
          _id: 1,
          storyId: 1,
          count: 1,
          userPost: {
            _id: 1,
            username: 1,
            avatar: 1,
            fullName: 1,
          },
          asset: 1,
          content: 1,
          timing: 1,
          createdAt: 1,
          views: 1,
        },
      },
      {
        $limit: 10,
      },
      {
        $skip: 10 * req.query.page,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    const stories = await Story.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ userPost: { $in: currentUser.friends } }] },
            {
              createdAt: {
                $lte: Date.now() + 24 * 60 * 60 * 1000,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$userPost",
          userPost: {
            $first: "$userPost",
          },
          storyId: { $push: "$_id" },
          count: { $sum: 1 },
          createdAt: { $first: "$createdAt" },
          asset: { $first: "$asset" },
          content: { $first: "$content" },
          views: { $first: "$views" },
          timing: { $first: "$timing" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userPost",
          foreignField: "_id",
          as: "userPost",
        },
      },
      {
        $unwind: {
          path: "$userPost",
        },
      },
      {
        $project: {
          _id: 1,
          storyId: 1,
          count: 1,
          userPost: {
            _id: 1,
            username: 1,
            avatar: 1,
            fullName: 1,
          },
          asset: 1,
          content: 1,
          timing: 1,
          createdAt: 1,
          views: 1,
        },
      },
      {
        $limit: 10,
      },
      {
        $skip: 10 * req.query.page,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.status(200).json(storiesOfCurrentUser.concat(stories));
    // res.status(200).json(stories);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function viewStoryHandler(req, res) {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return errorController.errorHandler(res, "Story not found", 404);
    }
    if (story.views.includes(req.user.id)) {
      return errorController.errorHandler(res, "You have already viewed this story", 403);
    }
    story.views.push(req.user.id);
    const newStory = await story.save();
    res.status(200).json(newStory);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
