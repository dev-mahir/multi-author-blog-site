import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../api/api";
import { GET_NOTIFICATION, VISITOR_COUNT } from "./actionTypes";

export const visitors_count = () => async (dispatch) => {
  try {
    axios
      .post(`${API_BASE_URL}/api/v1/visitors-count`)
      .then((res) => {
        dispatch({ type: VISITOR_COUNT, payload: res.data.count });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const get_notification = () => async (dispatch) => {
  try {
    axios
      .get(`${API_BASE_URL}/api/v1/notification/get`)
      .then((res) => {
        dispatch({ type: GET_NOTIFICATION, payload: res.data.notification });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const create_notification = (data) => async (dispatch) => {
  try {
    axios
      .post(`${API_BASE_URL}/api/v1/notification/create`, data)
      .then((res) => {
        // dispatch({ type: GET_NOTIFICATION });
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};



export const update_notification = (id) => async (dispatch) => {
  try {
    axios
      .patch(`${API_BASE_URL}/api/v1/notification/update/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


