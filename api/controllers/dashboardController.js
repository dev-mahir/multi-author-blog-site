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
  }
};
