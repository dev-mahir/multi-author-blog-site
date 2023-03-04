import axios from 'axios';
import { toast } from 'react-toastify';
import { ADD_COMMENT, GET_COMMENT} from './actionTypes'


export const add_comment = (data, setCommentText) => async (dispatch) => {
  try {
    axios
      .post("/api/v1/article/add-comment", data)
      .then((res) => {
        console.log(res);
        setCommentText("");
        dispatch({ type: ADD_COMMENT, payload: res.data.comment });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export const add_reply = (id,data, setReplyText) => async (dispatch) => {
  try {
    axios
      .patch(`/api/v1/article/reply-comment/${id}`, data)
      .then((res) => {
        console.log(res.data.comment);
        
        setReplyText("");
        dispatch({ type: ADD_COMMENT, payload: res.data.article });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};





export const get_comment = (id) => async (dispatch) => {
  try {
    axios
      .get(`/api/v1/article/comment/${id}`)
      .then((res) => {
        dispatch({ type: GET_COMMENT, payload: res.data.comment });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
