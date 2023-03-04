import { deleteCookie } from "../../utilis/cookies.js";
import {
  LOGIN_SUCCESS,
  CHECK_EMPTY_FIELD,
  LOADER_START,
  LOADER_STOP,
  USER_REGISTRATION,
  EMAIL_VERIFY,
  USER_LOGIN,
  CHECK_TOKEN,
  USER_LOGOUT,
  GET_ALL_USER,
} from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        authenticate: true,
        userInfo: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loader: false,
        authenticate: true,
        successMessage: payload.message,
        userInfo: payload.admin,
      };
    case EMAIL_VERIFY:
      return {
        ...state,
        authenticate: true,
      };
    case GET_ALL_USER:
      return {
        ...state,
        user:payload
      };
    case CHECK_TOKEN:
      return {
        ...state,
        authenticate: true,
        userInfo: payload,
      };

    case CHECK_EMPTY_FIELD:
      return {
        ...state,
        loader: false,
        errorMessage: payload,
      };
    case USER_LOGOUT:
      deleteCookie("authToken");
      return {
        ...state,
        authenticate: false,
        userInfo: {},
      };

    default:
      return state;
  }
};

export default authReducer;
