import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../api/api";
import { SPINNER_START, SPINNER_STOP } from "../loader/actionTypes";
import { ADD_CAT, GET_CAT, GET_SINGLE_CAT } from "./actionTypes";

export const add_cat = (data, setInput) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .post("/api/v1/category/add", data)
      .then((res) => {
        setInput({
          name: "",
          description: "",
        });
        dispatch({ type: SPINNER_STOP });
        dispatch({ type: ADD_CAT, payload: res.data });
        toast.success("Category added");
      })
      .catch((error) => {
        dispatch({ type: SPINNER_STOP, payload: error.response.data.message });
        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: SPINNER_STOP });
    toast.error(error.response.data.message);
  }
};

export const get_cat = (page, search, limit) => async (dispatch) => {
  try {
    axios
      .get(
        `${API_BASE_URL}/api/v1/category/get?page=${page}&limit=${limit}`,
        search
      )
      .then((res) => {
        dispatch({ type: GET_CAT, payload: res.data.category });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};



export const delete_catategory = (id, setShow) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .delete(`${API_BASE_URL}/api/v1/category/${id}`)
      .then((res) => {
        dispatch({ type: SPINNER_STOP });
        setShow(false);
        dispatch(get_cat());
        toast.success("Category deleted");
      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: SPINNER_STOP, payload: error.response.data.message });
      });
  } catch (error) {
    // dispatch({ type: SPINNER_STOP });
    console.log(error);
  }
};

export const get_single_category = (id) => async (dispatch) => {
  try {
    axios
      .get(`${API_BASE_URL}/api/v1/category/${id}`)
      .then((res) => {
        dispatch({ type: GET_SINGLE_CAT, payload: res.data.category });
      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: SPINNER_STOP, payload: error.response.data.message });
      });
  } catch (error) {
    // dispatch({ type: SPINNER_STOP });
    console.log(error);
  }
};

export const edit_category = (id, data, setShow) => async (dispatch) => {
  try {
    axios
      .patch(`${API_BASE_URL}/api/v1/category/${id}`, data)
      .then((res) => {
        setShow(false);
        toast.success("Category updated");
        dispatch(get_cat());
      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: SPINNER_STOP, payload: error.response.data.message });
      });
  } catch (error) {
    // dispatch({ type: SPINNER_STOP });
    console.log(error);
  }
};
