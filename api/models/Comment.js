import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    article_id: {
      type: String,
      // required: true,
    },
    comment_text: {
      type: String,
      // required: true,
    },
    user_name: {
      type: String,
      // required: true,
    },
    user_image: {
      type: String,
      // required: true,
    },
    reply_comment: [
      {
        reply_name: {
          type: String,
          // requred: true,
        },
        reply_image: {
          type: String,
          // requred: true,
        },
        reply_time: {
          type: String,
          // requred: true,
        },
        reply_text: {
          type: String,
          // requred: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Comment", commentSchema);
