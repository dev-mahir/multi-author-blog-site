import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_TAG,
  DELETE_TAG,
  GET_SINGLE_TAG,
  GET_TAG,
  TAG_UPDATED,
  VISITOR_COUNT,
} from "./actionTypes";


export const visitors_count = () => async (dispatch) => {
  try {
    axios
      .post("/api/v1/visitors-count")
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

