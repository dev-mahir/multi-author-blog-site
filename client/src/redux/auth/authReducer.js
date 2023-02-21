import {
  LOGIN_SUCCESS,
  CHECK_EMPTY_FIELD,
  LOADER_START,
  LOADER_STOP,
} from "./actionTypes.js";
import initialState from "./initialState.js";




// create reducer
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADER_START:
      return {
        ...state,
        loader: true,
      };
    case LOADER_STOP:
      return {
        ...state,
        loader: false,
        errorMessage: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loader: false,
        authenticate: true,
        successMessage: payload.message,
        userInfo: payload.admin,
      };
    case "CHECK_TOKEN":
      return {
        ...state,
        authenticate: true,

      };

    case CHECK_EMPTY_FIELD:
      return {
        ...state,
        loader: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
