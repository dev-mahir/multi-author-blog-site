import {
  ADD_CAT,
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
    default:
      return state;
  }
};

export default catReducer;
