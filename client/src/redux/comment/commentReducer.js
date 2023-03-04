import {
  ADD_COMMENT, GET_COMMENT,
} from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer
const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT:
      return {
        ...state,
      };
    case GET_COMMENT:
      return {
        ...state,
        comments: payload
      };

    default:
      return state;
  }
};

export default commentReducer;
