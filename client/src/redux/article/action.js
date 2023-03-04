import axios from "axios";
import { toast } from "react-toastify";
import {
  CIRCLE_LOADER_START,
  CIRCLE_LOADER_STOP,
  SPINNER_START,
  SPINNER_STOP,
} from "../loader/actionTypes";
import {
  DELETE_ARTICLE,
  GET_ARTICLE,
  GET_CATEGORY_ARTICLE,
  GET_OLD_ARTICLE,
  GET_SINGLE_ARTICLE,
  GET_TAG_ARTICLE,
  GET_USERS_ARTICLE,
  SEARCH_ARTICLE,
} from "./actionTypes";

export const add_article =
  (data, setInput, setText, setImagePrev, e) => async (dispatch) => {
    dispatch({ type: SPINNER_START });
    try {
      axios
        .post("/api/v1/article", data)
        .then((res) => {
          setInput({
            title: "",
            tag: "",
            category: "",
            slug: "",
          });
          setText("");
          setImagePrev("");
          e.target.reset();
          dispatch({ type: SPINNER_STOP });
          toast.success("Article added");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
    } catch (error) {
      dispatch({ type: SPINNER_STOP });
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

export const edit_article =
  (id, data, setInput, setText, setImagePrev, e) => async (dispatch) => {
    dispatch({ type: SPINNER_START });
    try {
      axios
        .patch(`/api/v1/article/update/${id}`, data)
        .then((res) => {
          setInput({
            title: "",
            tag: "",
            category: "",
            slug: "",
          });
          setText("");
          setImagePrev("");
          e.target.reset();
          dispatch({ type: SPINNER_STOP });
          toast.success("Article updated");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
    } catch (error) {
      dispatch({ type: SPINNER_STOP });
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

export const get_article = (page, limit, search) => async (dispatch) => {
  dispatch({ type: CIRCLE_LOADER_START });
  try {
    axios
      .get(`/api/v1/article/get/all?page=${page}&limit=${limit}`, search)
      .then((res) => {
        dispatch({ type: GET_ARTICLE, payload: res.data });
        dispatch({ type: CIRCLE_LOADER_STOP });
      })
      .catch((error) => {
        dispatch({ type: CIRCLE_LOADER_STOP });

        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: CIRCLE_LOADER_STOP });

    toast.error(error.response.data.message);
  }
};

export const delete_article = (id, setShow) => async (dispatch) => {
  try {
    axios
      .delete(`/api/v1/article/delete/${id}`)
      .then((res) => {
        setShow(false);
        toast.success("Article deleted");
        dispatch({ type: DELETE_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const get_search_article = (value) => async (dispatch) => {
  dispatch({ type: CIRCLE_LOADER_START });
  try {
    axios
      .get(`/api/v1/article/search/${value}`)
      .then((res) => {
        dispatch({ type: CIRCLE_LOADER_STOP });
        dispatch({ type: SEARCH_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        dispatch({ type: CIRCLE_LOADER_STOP });
        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: CIRCLE_LOADER_STOP });
    toast.error(error.response.data.message);
  }
};


export const get_category_article = (slug) => async (dispatch) => {
  dispatch({ type: CIRCLE_LOADER_START });
  try {
    axios
      .get(`/api/v1/article/category/${slug}`)
      .then((res) => {
        dispatch({ type: CIRCLE_LOADER_STOP });
        dispatch({ type: GET_CATEGORY_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        dispatch({ type: CIRCLE_LOADER_STOP });
        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: CIRCLE_LOADER_STOP });
    toast.error(error.response.data.message);
  }
};

export const get_tag_article = (slug) => async (dispatch) => {
  try {
    axios
      .get(`/api/v1/article/tag/${slug}`)
      .then((res) => {
        dispatch({ type: GET_TAG_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const get_users_article = () => async (dispatch) => {
  try {
    axios
      .get(`/api/v1/article/users-article`)
      .then((res) => {
        dispatch({ type: GET_USERS_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const get_single_article = (slug) => async (dispatch) => {
  dispatch({ type: CIRCLE_LOADER_START });
  try {
    axios
      .get(`/api/v1/article/${slug}`)
      .then((res) => {
        dispatch({ type: CIRCLE_LOADER_STOP });
        dispatch({ type: GET_SINGLE_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        dispatch({ type: CIRCLE_LOADER_STOP });

        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: CIRCLE_LOADER_STOP });
    toast.error(error.response.data.message);
  }
};

export const get_old_article = () => async (dispatch) => {
  try {
    axios
      .get(`/api/v1/article/old-article`)
      .then((res) => {
        dispatch({ type: GET_OLD_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const like_dislike = (id, type, data) => async (dispatch) => {
  try {
    axios
      .post(`/api/v1/article/single-article/${type}/${id}`, data)
      .then((res) => {
        dispatch({ type: GET_SINGLE_ARTICLE, payload: res.data.article });
      })

      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
