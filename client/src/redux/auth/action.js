import axios from "axios";
import { LOGIN_SUCCESS, LOADER_START, LOADER_STOP } from "./actionTypes";

export const admin_login = (data, setInput, navigate) => async (dispatch) => {
  dispatch({ type: LOADER_START });

  try {
    axios
      .post("/api/v1/admin/login", data)
      .then((res) => {
        setInput({
          email: "",
          password: "",
        });
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        // localStorage.setItem('blog_token', res.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        dispatch({ type: LOADER_STOP, payload: error.response.data.message });
        console.log(error);
      });
  } catch (error) {
    dispatch({ type: LOADER_STOP });
    console.log(error);
  }
};







export const check_token = (data) => async (dispatch) => {
  dispatch({ type:  "CHECK_TOKEN", payload: data });
};
