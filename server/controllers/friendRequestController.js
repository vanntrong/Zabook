import FriendRequest from "../models/FriendRequest.js";
import * as errorController from "../controllers/errorController.js";
import * as factoryController from "../controllers/factoryController.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export async function createFriendRequestHandler(req, res) {
  try {
    if (req.user.id !== req.body.requester) {
      return errorController.errorHandler(res, "You can only send friend request by yourself", 403);
    }
    if (req.user.id === req.body.receiver) {
      return errorController.errorHandler(res, "You can't send friend request to yourself", 403);
    }
    const existingFriendRequest = await FriendRequest.findOne({
      requester: req.body.requester,
      receiver: req.body.receiver,
    });
    if (existingFriendRequest) {
      return errorController.errorHandler(res, "You already sent friend request to this user", 403);
    }
    // await factoryController.createOne(FriendRequest, req.body, res);
    const friendRequest = await FriendRequest.create(req.body);
    const fullFriendRequest = await FriendRequest.findById(friendRequest._id).populate({
      path: "requester",
      select: "fullName avatar fullName username",
    });

    const newNotification = new Notification({
      type: "friendRequest",
      content: "sent you a friend request",
      from: fullFriendRequest.requester._id,
      to: [fullFriendRequest.receiver],
      link: `/${fullFriendRequest.requester.username}`,
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

    res.status(201).json({ friendRequest: fullFriendRequest, notification: fullNotification });
  } catch (error) {
    errorController.serverErrorHandler(res, error);
  }
}

export async function acceptFriendRequestHandler(req, res) {
  try {
    const friendRequest = await factoryController.findOne(FriendRequest, { _id: req.params.requestId });

    if (!friendRequest) {
      return errorController.errorHandler(res, "Friend request not found", 404);
    }

    if (friendRequest.receiver.toString() !== req.user.id) {
      return errorController.errorHandler(res, "You can only accept friend request by yourself", 403);
    }

    if (friendRequest.status !== 0) {
      return errorController.errorHandler(res, "Friend request is already accepted or declined", 403);
    }

    await User.findByIdAndUpdate(friendRequest.requester, { $push: { friends: friendRequest.receiver } });
    await User.findByIdAndUpdate(friendRequest.receiver, { $push: { friends: friendRequest.requester } });

    const user = await User.findById(friendRequest.receiver);

    const newNotification = new Notification({
      type: "friendAccepted",
      content: "accepted your friend request",
      from: friendRequest.receiver,
      to: [friendRequest.requester],
      link: `/${user.username}`,
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

    await friendRequest.deleteOne();
    res.status(200).json({ message: "Friend request accepted", notification: fullNotification });
  } catch (error) {
    errorController.serverErrorHandler(res, error);
  }
}

export async function declineFriendRequestHandler(req, res) {
  try {
    const friendRequest = await factoryController.findOne(FriendRequest, { _id: req.params.requestId });
    if (!friendRequest) {
      return errorController.errorHandler(res, "Friend request not found", 404);
    }
    if (friendRequest.receiver.toString() !== req.user.id) {
      return errorController.errorHandler(res, "You can only decline friend request by yourself", 403);
    }
    if (friendRequest.status !== 0) {
      return errorController.errorHandler(res, "Friend request is already accepted or declined", 403);
    }
    await friendRequest.deleteOne();
    res.status(200).json("Friend request declined");
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function deleteFriendRequestHandler(req, res) {
  try {
    const friendRequest = await factoryController.findOne(FriendRequest, {
      requester: req.query.requester,
      receiver: req.query.receiver,
    });
    if (!friendRequest) {
      return errorController.errorHandler(res, "Friend request not found", 404);
    }
    if (friendRequest.requester.toString() !== req.user.id) {
      return errorController.errorHandler(res, "You can only delete friend request by yourself", 403);
    }
    await friendRequest.deleteOne();
    res.status(200).json("Friend request deleted");
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getFriendRequestHandler(req, res) {
  try {
    if (req.user.id !== req.query.requester && req.user.id !== req.query.receiver) {
      return errorController.errorHandler(res, "You can only get friend request by yourself", 403);
    }
    const existingFriendRequest = await FriendRequest.findOne({
      requester: req.query.requester,
      receiver: req.query.receiver,
    })
      .limit(10)
      .skip(10 * req.query.page || 0)
      .sort({ createdAt: -1 });
    // if (!existingFriendRequest) {
    //   return res.status(200).json({
    //     status: "request not found",
    //   });
    // } else {
    //   return res.status(200).json({
    //     status: "request found",
    //   });
    // }
    // res.status(200).json(existingFriendRequest);
    if (!existingFriendRequest) {
      return res.status(200).json({
        isFound: false,
        friendRequest: existingFriendRequest,
      });
    }
    res.status(200).json({
      isFound: true,
      friendRequest: existingFriendRequest,
    });
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getAllFriendRequestHandler(req, res) {
  try {
    const friendRequest = await FriendRequest.find({ receiver: req.user.id })
      .populate({
        path: "requester",
        select: "fullName avatar username",
      })
      .limit(10)
      .skip(10 * req.query.page)
      .sort({ createdAt: -1 });
    return res.status(200).json(friendRequest);
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
