import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    sur_name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      default: "",
    },
    secondary_name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Custom"],
      required: true,
    },

    birth_date: {
      type: String,
      required: true,
    },
    birth_month: {
      type: String,
      required: true,
    },
    birth_year: {
      type: String,
      required: true,
    },

    profile_photo: {
      type: String,
      default: null,
    },
    cover_photo: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    work: {
      type: Array,
      default: [],
    },
    edu: {
      type: Array,
      default: [],
    },
    living: {
      type: String,
      default: null,
    },
    home_town: {
      type: String,
      default: null,
    },
    relationship: {
      type: String,
      enum: ["Married", "Single", "In a relationship"],
    },
    joined: {
      type: Date,
    },
    socail: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    request: {
      type: Array,
      default: [],
    },
    block: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    featured: {
      type: Array,
      default: [],
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    access_token: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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
