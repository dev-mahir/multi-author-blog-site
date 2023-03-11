import {
  BLOCK_CIRCLE_LOADER_START,
  BLOCK_CIRCLE_LOADER_STOP,
  CIRCLE_LOADER_START,
  CIRCLE_LOADER_STOP,
  SPINNER_START,
  SPINNER_STOP,
  TOP_LOADER_START,
  TOP_LOADER_STOP,
} from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer

const loaderTopReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOP_LOADER_START:
      return {
        ...state,
        loader: 100,
      };
    case TOP_LOADER_STOP:
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
    case CIRCLE_LOADER_START:
      return {
        ...state,
        circle_loader: true,
      };
    case CIRCLE_LOADER_STOP:
      return {
        ...state,
        circle_loader: false,
      };
    case BLOCK_CIRCLE_LOADER_START:
      return {
        ...state,
        block_circle_loader: true,
      };
    case BLOCK_CIRCLE_LOADER_STOP:
      return {
        ...state,
        block_circle_loader: false,
      };
    default:
      return state;
  }
};

export default loaderTopReducer;
