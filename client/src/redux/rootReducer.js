import { combineReducers } from "redux";
import articleReducer from "./article/articleReducer.js";
import authReducer from "./auth/authReducer.js";
import catReducer from "./category/catReducer.js";
import commentReducer from "./comment/commentReducer.js";
import dashboardReducer from "./dashboard/dashboardReducer.js";
import loaderReducer from "./loader/loadarReducer.js";
import tagReducer from "./tag/tagReducer.js";

// create root reducer 

const rootReducer = combineReducers({
  auth: authReducer,
  cat: catReducer,
  tag: tagReducer,
  article: articleReducer,
  loader: loaderReducer,
  commentReducer: commentReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;