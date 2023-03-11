import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      // select: false, can't get this when we find or another method
    },
    profilephoto: {
      type: String,
    },
    loginMethod: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    access_status: {
      type: String,
      default: "unblock",
    },
    access_token: {
      type: String,
      default: "",
    },
    activate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
