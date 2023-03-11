import {
  DELETE_ARTICLE,
  GET_ARTICLE,
  GET_CATEGORY_ARTICLE,
  GET_OLD_ARTICLE,
  GET_SINGLE_ARTICLE,
  GET_TAG_ARTICLE,
  GET_USERS_ARTICLE,
  LIKE_DISLIKE_CLICK,
  POPULAR_ARTICLE,
  SEARCH_ARTICLE,
} from "./actionTypes.js";
import initialState from "./initialState.js";

// create reducer
const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLE:
      return {
        ...state,
        all_article: payload.article,
        count: payload.count,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        users_article: state.users_article.filter(
          (data) => data._id !== payload._id
        ),
        count: payload.count - 1,
      };
    case GET_CATEGORY_ARTICLE:
      return {
        ...state,
        cat_article: payload,
        search_article: [],
        tag_article: [],
      };
    case GET_TAG_ARTICLE:
      return {
        ...state,
        tag_article: payload,
        search_article: [],
        cat_article: [],
      };
    case SEARCH_ARTICLE:
      return {
        ...state,
        search_article: payload,
        tag_article: [],
        cat_article: [],
      };

    case GET_SINGLE_ARTICLE:
      return {
        ...state,
        single_article: payload,
      };
    case GET_USERS_ARTICLE:
      return {
        ...state,
        users_article: payload,
      };
    case GET_OLD_ARTICLE:
      return {
        ...state,
        old_article: payload,
      };
    case POPULAR_ARTICLE:
      return {
        ...state,
        popular_article: payload,
      };
    case LIKE_DISLIKE_CLICK:
      return {
        ...state,
        single_article: payload
      }
    default:
      return state;
  }
};

export default articleReducer;
