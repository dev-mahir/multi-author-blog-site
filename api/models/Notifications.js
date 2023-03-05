import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    post_slug: {
      type: String,
    },
    subject: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Notification", notificationSchema);

