import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_TAG,
  DELETE_TAG,
  GET_SINGLE_TAG,
  GET_TAG,
  TAG_UPDATED,
} from "./actionTypes";

export const add_tag = (data, setInput, setAddShow) => async (dispatch) => {
  try {
    axios
      .post("/api/v1/tag", data)
      .then((res) => {
        setInput({
          name: "",
        });
        setAddShow(false);
        dispatch({ type: ADD_TAG, payload: res.data.tag });
        toast.success("tag added");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const get_tag = (page, search, limit) => async (dispatch) => {
  try {
    axios
      .get(`/api/v1/tag/get?page=${page}&limit=${limit}`, search)
      .then((res) => {
        dispatch({ type: GET_TAG, payload: res.data.tag });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const delete_tag = (id, setShow) => async (dispatch) => {
  try {
    axios
      .delete(`/api/v1/tag/${id}`)
      .then((res) => {
        setShow(false);
        toast.success("tag deleted");
        dispatch({ type: DELETE_TAG, payload: res.data.tag });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const get_single_tag = (id) => async (dispatch) => {
  try {
    axios
      .get(`/api/v1/tag/${id}`)
      .then((res) => {
        dispatch({ type: GET_SINGLE_TAG, payload: res.data.tag });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const edit_tag = (id, data, setShow) => async (dispatch) => {
  try {
    axios
      .patch(`/api/v1/tag/${id}`, data)
      .then((res) => {
        setShow(false);
        toast.success("Tag updated");
        dispatch({ type: TAG_UPDATED, payload: res.data.tag });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
