import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../api/api";
import {
  BLOCK_CIRCLE_LOADER_START,
  BLOCK_CIRCLE_LOADER_STOP,
  SPINNER_START,
  SPINNER_STOP,
} from "../loader/actionTypes";
import {
  EMAIL_VERIFY,
  USER_LOGIN,
  CHECK_TOKEN,
  USER_LOGOUT,
  USER_REGISTRATION,
  GET_ALL_USER,
  USER_BLOCK,
  CHANGE_USER_ROLE,
} from "./actionTypes";

export const user_registration =
  (data, setInput, setImgPreview, e, navigate) => async (dispatch) => {
    dispatch({ type: SPINNER_START });
    try {
      axios
        .post(`${API_BASE_URL}/api/v1/user/register`, data, {
          withCredentials: true,
        })
        .then((res) => {
          setInput({
            email: "",
            password: "",
            name: "",
            image: "",
          });
          setImgPreview("");
          e.target.reset();
          dispatch({ type: SPINNER_STOP });
          dispatch({ type: USER_REGISTRATION, payload: res.data });
          navigate("/user/email-verify");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          dispatch({ type: SPINNER_STOP });
        });
    } catch (error) {
      dispatch({ type: SPINNER_STOP });
      toast.error(error.response.data.message);
    }
  };

export const email_verify = (data, setInput, navigate) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .post(
        `${API_BASE_URL}/api/v1/user/email-verify`,
        { otp: data },
        { withCredentials: true }
      )
      .then((res) => {
        setInput("");
        dispatch({ type: EMAIL_VERIFY, payload: res.data });
        navigate("/");
        dispatch({ type: SPINNER_STOP });
      })
      .catch((error) => {
        dispatch({ type: SPINNER_STOP });
        console.log(error);
      });
  } catch (error) {
    dispatch({ type: SPINNER_STOP });
    console.log(error);
  }
};

export const user_login = (data, setInput, navigate) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .post(`${API_BASE_URL}/api/v1/user/login`, data)
      .then((res) => {
        setInput({
          email: "",
          password: "",
        });

        dispatch({ type: SPINNER_STOP });
        dispatch({ type: USER_LOGIN, payload: res.data });
        navigate(-1);
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
  dispatch({ type: BLOCK_CIRCLE_LOADER_START });
  try {
    axios
      .get(`${API_BASE_URL}/api/v1/user`)
      .then((res) => {
        dispatch({ type: BLOCK_CIRCLE_LOADER_STOP });
        dispatch({ type: GET_ALL_USER, payload: res.data.user });
      })
      .catch((error) => {
        dispatch({ type: BLOCK_CIRCLE_LOADER_STOP });
        toast.error(error.response.data.message);
      });
  } catch (error) {
    dispatch({ type: BLOCK_CIRCLE_LOADER_STOP });
    toast.error(error.response.data.message);
  }
};

export const block_user = (id) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .put(`${API_BASE_URL}/api/v1/user/block/${id}`)
      .then((res) => {
        dispatch({ type: SPINNER_STOP });
        dispatch({ type: USER_BLOCK, payload: res.data.user });
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

export const change_user_role = (id) => async (dispatch) => {
  dispatch({ type: SPINNER_START });
  try {
    axios
      .put(`${API_BASE_URL}/api/v1/user/role/${id}`)
      .then((res) => {
        dispatch({ type: SPINNER_STOP });
        dispatch({ type: CHANGE_USER_ROLE, payload: res.data.user });
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
  navigate("/login");
};
