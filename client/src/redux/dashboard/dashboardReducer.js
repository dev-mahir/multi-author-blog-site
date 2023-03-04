import { VISITOR_COUNT } from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer
const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VISITOR_COUNT:
      console.log(payload);
      return {
        ...state,
        views: payload
      };

    default:
      return state;
  }
};

export default dashboardReducer;
