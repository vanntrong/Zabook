import * as errorController from "./errorController.js";
import Notification from "../models/Notification.js";

export async function getAllNotifications(req, res) {
  try {
    const notifications = await Notification.find({
      to: req.user.id,
    })
      .populate("from", "username fullName avatar")
      .populate("to", "username fullName avatar")
      .limit(30)
      .skip(30 * req.query.page)
      .sort({
        createdAt: -1,
      });

    if (!notifications) {
      return errorController.errorHandler(res, "No notifications found", 404);
    }

    return res.status(200).json(notifications);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function createNotification(req, res) {
  try {
    if (!req.body.type || !req.body.content || !req.body.from || !req.body.to) {
      return errorController.errorHandler(res, "Missing required fields", 400);
    }
    const newNotification = new Notification({
      type: req.body.type,
      content: req.body.content,
      from: req.body.from,
      to: [req.body.to],
      link: req.body.link,
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

    return res.status(201).json(fullNotification);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function seenNotification(req, res) {
  try {
    if (!req.body.id) {
      return errorController.errorHandler(res, "Missing required fields", 400);
    }

    const notification = await Notification.findOneAndUpdate({ _id: req.body.id, to: req.user.id }, { isRead: true })
      .populate([
        {
          path: "from",
          select: "fullName username avatar",
        },
        {
          path: "to",
          select: "username fullName avatar",
        },
      ])
      .sort({
        createdAt: -1,
      });

    if (!notification) {
      return errorController.errorHandler(res, "Notification not found", 404);
    }

    return res.status(200).json(notification);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function seenAllNotifications(req, res) {
  try {
    const notifications = await Notification.updateMany({ to: req.user.id }, { isRead: true });

    if (!notifications) {
      return errorController.errorHandler(res, "No notifications found", 404);
    }

    return res.status(200).json(notifications);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function deleteNotification(req, res) {
  try {
    if (!req.params.id) {
      return errorController.errorHandler(res, "Missing required fields", 400);
    }
    const notification = await Notification.findOneAndDelete({ _id: req.params.id, to: req.user.id });

    if (!notification) {
      return errorController.errorHandler(res, "Notification not found", 404);
    }

    return res.status(200).json(notification);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}
