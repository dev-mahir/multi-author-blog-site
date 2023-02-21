import { combineReducers } from "redux";
import authReducer from "./auth/authReducer.js";
import catReducer from "./category/catReducer.js";
import loaderReducer from "./loader/loadarReducer.js";

// create root reducer 

const rootReducer = combineReducers({
  auth: authReducer,
  cat: catReducer,
  loader: loaderReducer,
});

export default rootReducer;