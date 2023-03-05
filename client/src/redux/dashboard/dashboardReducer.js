import { GET_NOTIFICATION, VISITOR_COUNT } from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer
const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VISITOR_COUNT:
      return {
        ...state,
        views: payload,
      };
    case GET_NOTIFICATION:
      return {
        ...state,
        notification: payload
      };

    default:
      return state;
  }
};

export default dashboardReducer;
