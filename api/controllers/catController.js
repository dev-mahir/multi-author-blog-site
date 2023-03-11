import Article from "../models/Article.js";
import Category from "../models/Category.js";
import createError from "../utilis/createError.js";
import { createSlug } from "../utilis/createSlug.js";

export const add_category = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(createError(404, "All fields are required"));
    } else {
      const categoryCheck = await Category.findOne({ name });
      if (categoryCheck) {
        return next(createError(404, "Category already added"));
      } else {
        const category = await Category.create({
          ...req.body,
          slug: createSlug(name),
        });
        res.status(200).json({
          message: "Category added",
          category,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const get_category = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const skip = (page - 1) * limit;
    const search = new RegExp(req.body.search, "i");
    const category = await Category.find({ name: search })
      .skip(skip)
      .limit(limit);
    
  
    res.status(200).json({
      message: "Success",
      category,
    });
  } catch (error) {
    console.log(error);
  }
};










export const delete_category = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Category deleted",
      category,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const update_category = async (req, res, next) => {
  console.log(req.body);
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Category updated",
      category,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
export const get_single_category = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      message: "Category got",
      category,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
