import {
  LOADER_END,
  LOADER_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SPINNER_START,
  SPINNER_STOP,
} from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer

const loaderTopReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADER_START:
      return {
        ...state,
        loader: 100,
      };
    case LOADER_END:
      return {
        ...state,
        loader: 0,
      };
    case SPINNER_START:
      return {
        ...state,
        spinner: true,
      };
    case SPINNER_STOP:
      return {
        ...state,
        spinner: false,
      };

    default:
      return state;
  }
};

export default loaderTopReducer;
