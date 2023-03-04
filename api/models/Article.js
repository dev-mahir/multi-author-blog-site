import mongoose from "mongoose";

const articleSchema = mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    admin_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    tag: {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
    image: {
      type: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },

    like_userId: [
      {
        type: String,
      },
    ],
    dislike_userId: [
      {
        type: String,
      },
    ],

    views: {
      type: Number,
      default: 0,
    },




    viewer_ip: [
      {
        ip: {
          type: String,
        },
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Article", articleSchema);
