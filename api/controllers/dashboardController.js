import Notification from "../models/Notifications.js";
import Tag from "../models/Tag.js";
import Visitor from "../models/Visitor.js";
import createError from "../utilis/createError.js";

export const userVisitorsCount = async (req, res, next) => {
  try {
    const visitor = await Visitor.findOne();
    visitor.count++;
    await visitor.save();
    res.status(200).json({ count: visitor.count });
  } catch (error) {
    next(createError(500, "Internal server error"));
    console.log(error);
  }
};

export const create_notification = async (req, res, next) => {
  try {
    const notification = await Notification.create(req.body);

    res.status(200).json({
      message: "Notification created",
      notification,
    });
  } catch (error) {
    next(createError(500, "Internal server error.Try again."));
    console.log(error);
  }
};

export const get_notification = async (req, res, next) => {
  try {
    const notification = await Notification.find();
    res.status(200).json({
      message: "Notification created",
      notification,
    });
  } catch (error) {
    next(createError(500, "Internal server error.Try again."));
    console.log(error);
  }
};

export const update_notification_status = async (req, res, next) => {
  try {
    const checkStatus = await Notification.findById(req.params.id);
    if (checkStatus.status === true) {
      const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { status: false },
        { new: true }
      );
      res.status(200).json({
        message: "Notification created",
        notification,
      });
    } else {
      res.end();
    }
  } catch (error) {
    next(createError(500, "Internal server error.Try again."));
    console.log(error);
  }
};
