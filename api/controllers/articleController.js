import Article from "../models/Article.js";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import Tag from "../models/Tag.js";
import createError from "../utilis/createError.js";
import { createSlug } from "../utilis/createSlug.js";

export const add_article = async (req, res, next) => {
  try {
    console.log(req.admin);
    const article = await Article.create({
      ...req.body,
      image: req.file.filename,
      adminId: req.admin.id,
      admin_name: req.admin.name,
    });

    res.status(200).json({
      message: "Article added",
      article,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
    console.log(error);
  }
};

export const delete_article = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Article deleted",
      article,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const get_all_article = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const search = new RegExp(req.body.search, "i");

    const skip = (page - 1) * limit;

    const article = await Article.find({ title: search })
      .skip(skip)
      .limit(limit)
      .populate("category", "name slug")
      .populate("tag", "name slug");

    const count = await Article.find().countDocuments();

    res.status(200).json({
      message: "Article added",
      article,
      count,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const get_users_article = async (req, res, next) => {
  try {
    if (req.admin.role === "admin") {
      const article = await Article.find({});

      res.status(200).json({
        message: "Success",
        article,
      });
    } else {
      const article = await Article.find({ adminId: req.admin.id });
      res.status(200).json({
        message: "Success",
        article,
      });
    }
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const get_article = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const search = new RegExp(req.body.search, "i");

    const skip = (page - 1) * limit;

    const [article, count] = await Promise.all([
      Article.find({ title: search }).skip(skip).limit(2),
      Article.countDocuments({ title: search }),
    ]);

    res.status(200).json({
      message: "Success",
      article: { article, count },
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};

export const get_category_article = async (req, res, next) => {
  try {
    let { slug } = req.params;
    slug = createSlug(slug);
    const category = await Category.findOne({ slug: slug });
    if (category) {
      const article = await Article.find({ category: category._id })
        .populate("category", "name slug")
        .populate("tag", "name slug");
      res.status(200).json({
        message: "Success",
        article,
      });
    }
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const get_tag_article = async (req, res, next) => {
  try {
    let { slug } = req.params;
    slug = createSlug(slug);
    const tag = await Tag.findOne({ slug: slug });

    if (tag) {
      const article = await Article.find({ tag: tag._id })
        .populate("category", "name slug")
        .populate("tag", "name slug");
      res.status(200).json({
        message: "Success",
        article,
      });
    } else {
      next(createError(404, "Invalid tag slug"));
    }
  } catch (error) {
    next(createError(500, "Internal server error"));
    console.log(error);
  }
};
export const search_article = async (req, res, next) => {
  try {
    const { value } = req.params;

    const search = new RegExp(value, "i");
  
    const article = await Article.find({ title: search });
      res.status(200).json({
        message: "Success",
        article,
      });
    
  } catch (error) {
    next(createError(500, "Internal server error"));
    console.log(error);
  }
};

export const get_old_article = async (req, res, next) => {
  try {
    const article = await Article.aggregate([
      {
        $match: {},
      },
      {
        $sample: {
          size: 3,
        },
      },
    ]);
    res.status(200).json({
      message: "Succesds",
      article,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};


export const get_single_article = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug })
      
      .populate("tag", "name slug")
      .populate("category", "name slug");
    article.views += 1;

    await article.save();

    res.status(200).json({
      message: "Success",
      article,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
    console.log(error);
  }
};

export const update_article = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req?.file?.filename || req.body.image,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Success",
      article,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};

export const add_like_dislike = async (req, res, next) => {
  try {
    const { type, articleId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return next(createError(404, "Please login first"));
    }
    // type like
    if (type === "like") {
      const singleArticle = await Article.findById(articleId);
      const checkLike = singleArticle.like_userId.includes(userId);
      if (!checkLike) {
        const incrementLike = await Article.findByIdAndUpdate(
          articleId,
          {
            $inc: { like: 1 },
            $push: { like_userId: userId },
          },
          { new: true }
        );

        res.status(200).json({
          message: "Success",
          article: incrementLike,
        });
      } else {
        const decrementLike = await Article.findByIdAndUpdate(
          articleId,
          {
            $inc: { like: -1 },
            $pull: { like_userId: userId },
          },
          { new: true }
        );
        res.status(200).json({
          message: "Success",
          article: decrementLike,
        });
      }
    }

    // type dislike
    if (type === "dislike") {
      const singleArticle = await Article.findById(articleId);
      const checkLike = singleArticle.dislike_userId.includes(userId);
      if (!checkLike) {
        const incrementLike = await Article.findByIdAndUpdate(
          articleId,
          {
            $inc: { dislike: 1 },
            $push: { dislike_userId: userId },
          },
          { new: true }
        );

        res.status(200).json({
          message: "Success",
          article: incrementLike,
        });
      } else {
        const decrementLike = await Article.findByIdAndUpdate(
          articleId,
          {
            $inc: { dislike: -1 },
            $pull: { dislike_userId: userId },
          },
          { new: true }
        );
        res.status(200).json({
          message: "Success",
          article: decrementLike,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};

export const add_comment = async (req, res, next) => {
  try {
    const {
      article_id,
      article_slug,
      article_title,
      user_name,
      user_image,
      comment_text,
    } = req.body;

    const user_comment = await Comment.create({
      article_id,
      comment_text,
      user_image,
      user_name,
    });
    res.status(201).json({
      message: "Comment added",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};

export const get_comment = async (req, res, next) => {
  try {
    const comment = await Comment.find({ article_id: req.params.id });
    res.status(201).json({
      message: "Comment got",
      comment,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const add_reply = async (req, res, next) => {
  try {
    const { id } = req.params;

    const replyComment = await Comment.findByIdAndUpdate(
      id,
      {
        $push: { reply_comment: req.body },
      },
      { new: true }
    );
    res.status(201).json({
      message: "Added reply",
      comment: replyComment,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};


export const popular_article = async (req, res, next) => {
  try {
    
    const article = await Article.aggregate([
      { $match: {} },
      { $sort: 'views' }
    ]);

    

    res.status(201).json({
      message: "Success",
      comment: replyComment,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};
