import { deleteCookie, setCookie } from "../../utilis/cookies.js";
import {
  LOGIN_SUCCESS,
  CHECK_EMPTY_FIELD,
  CHANGE_USER_ROLE,
  EMAIL_VERIFY,
  USER_LOGIN,
  CHECK_TOKEN,
  USER_LOGOUT,
  GET_ALL_USER,
  USER_BLOCK,
} from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      setCookie("authToken", payload.token);
      return {
        ...state,
        authenticate: true,
        userInfo: payload.user,
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
        user: payload,
      };
    case CHECK_TOKEN:
      return {
        ...state,
        authenticate: true,
        userInfo: payload,
      };

    case USER_BLOCK:
      return {
        ...state,
        user: [
          ...state.user.filter((item) => item._id !== payload._id),
          payload,
        ],
      };

    case CHANGE_USER_ROLE:
      return {
        ...state,
        user: [
          ...state.user.filter((item) => item._id !== payload._id),
          payload,
        ],
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
