import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { SPINNER_START, SPINNER_STOP } from "../loader/actionTypes";
import {
  EMAIL_VERIFY,
  USER_LOGIN,
  CHECK_TOKEN,
  USER_LOGOUT,
  USER_REGISTRATION,
  GET_ALL_USER,
} from "./actionTypes";



export const user_registration =
  (data, setInput, setImgPreview, e, navigate) => async (dispatch) => {
    dispatch({ type: SPINNER_START });
    try {
      axios
        .post("/api/v1/admin/user/register", data)
        .then((res) => {
          setInput({
            email: "",
            password: "",
            name: "",
            image: "",
          });
          setImgPreview("");
          e.target.reset();
          dispatch({ type:SPINNER_STOP });
          dispatch({ type: USER_REGISTRATION, payload: res.data });
          navigate("/user/email-verify");
        })
        .catch((error) => {
          dispatch({ type: SPINNER_STOP });
        });
    } catch (error) {
      dispatch({ type: SPINNER_STOP });
    }
  };

export const email_verify = (data, setInput, navigate) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .post("/api/v1/admin/user/email-verify", { otp: data })
      .then((res) => {
        setInput("");
        dispatch({ type: EMAIL_VERIFY, payload: res.data });
        navigate("/");
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

export const user_login = (data, setInput) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .post("/api/v1/admin/user/login", data)
      .then((res) => {
        setInput({
          email: "",
          password: "",
        });
        dispatch({ type: SPINNER_STOP });
        dispatch({ type: USER_LOGIN, payload: res.data.user });
      })
      .catch((error) => {
        dispatch({ type: SPINNER_STOP });
        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: SPINNER_STOP });
    toast.error(error.response.data.message);
  }
};

export const get_all_user = () => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .get("/api/v1/admin/user")
      .then((res) => {
        dispatch({ type: SPINNER_STOP });
        dispatch({ type: GET_ALL_USER, payload: res.data.user });
      })
      .catch((error) => {
        dispatch({ type: SPINNER_STOP });
        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: SPINNER_STOP });
    toast.error(error.response.data.message);
  }
};


export const block_user = (id) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .get(`/api/v1/admin/user/block-user/${id}`)
      .then((res) => {
        dispatch({ type: SPINNER_STOP });
        dispatch({ type: GET_ALL_USER, payload: res.data.user });
      })
      .catch((error) => {
        dispatch({ type: SPINNER_STOP });
        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: SPINNER_STOP });
    toast.error(error.response.data.message);
  }
};



export const check_token = (authToken) => async (dispatch) => {
  const token = authToken;
  if (token) {
    const { ...user } = jwt_decode(token);
    dispatch({ type: CHECK_TOKEN, payload: user });
  }
};


export const user_logout = (navigate) => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  navigate("/");
};
