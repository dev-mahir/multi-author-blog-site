import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
   
    status: {
      type: Boolean,
      default: false,
    },
    trash: {
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
