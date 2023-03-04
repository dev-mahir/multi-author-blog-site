import {
  ADD_CAT,
  GET_CAT,
  GET_SINGLE_CAT,
  LOADER_START,
} from "./actionTypes.js";
import initialState from "./initialState.js";




// create reducer
const catReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CAT:
      return {
        ...state,
      };
    case GET_CAT:
      return {
        ...state,
        category: payload,
      };
    case GET_SINGLE_CAT:
      return {
        ...state,
        single_category: payload,
      };

    default:
      return state;
  }
};

export default catReducer;
