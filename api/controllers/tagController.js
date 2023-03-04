import Tag from "../models/Tag.js";
import createError from "../utilis/createError.js";
import { createSlug } from "../utilis/createSlug.js";

export const add_tag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(createError(404, "All fields are required"));
    } else {
      const tagCheck = await Tag.findOne({ name });
      if (tagCheck) {
        return next(createError(404, "Tag already added"));
      } else {
        const tag = await Tag.create({
          ...req.body,
          slug: createSlug(name),
        });
        res.status(200).json({
          message: "Tag added",
          tag
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const get_tag = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const search = new RegExp(req.body.search, "i");
    console.log(req.body);
    const tag = await Tag.find({ name: search }).skip(skip).limit(limit);
    res.status(200).json({
      message: "Success",
      tag,
    });
  } catch (error) {
    console.log(error);
  }
};

export const delete_tag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Tag deleted",
      tag,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const update_tag = async (req, res, next) => {

  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Tag updated",
      tag,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
export const get_single_tag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    res.status(200).json({
      message: "Tag got",
      tag,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
