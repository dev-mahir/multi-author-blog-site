import axios from "axios";
import { SPINNER_START, SPINNER_STOP } from "../loader/actionTypes";
import { ADD_CAT } from "./actionTypes";

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
      })
      .catch((error) => {
        dispatch({ type: SPINNER_STOP, payload: error.response.data.message });
        console.log(error);
      });
  } catch (error) {
    dispatch({ type: SPINNER_STOP });
    console.log(error);
  }
};
