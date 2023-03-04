import {
  ADD_TAG,
  DELETE_TAG,
  GET_SINGLE_TAG,
  GET_TAG,
  TAG_UPDATED,
} from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer
const tagReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TAG:
      return {
        ...state,
        tag: [...state.tag, payload],
      };

    case GET_TAG:
      return {
        ...state,
        tag: payload,
      };

    case DELETE_TAG:
      const newTag = state.tag.filter((data) => data._id !== payload._id);
      return {
        ...state,
        tag: newTag,
      };

    case TAG_UPDATED:
      const newTags = state.tag.filter((data) => data._id !== payload._id);
      return {
        ...state,
        tag: [...newTags, payload],
      };

    case GET_SINGLE_TAG:
      return {
        ...state,
        single_tag: payload,
      };

    default:
      return state;
  }
};

export default tagReducer;
