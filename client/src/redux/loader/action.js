import { LOADER_END, LOADER_START } from "./actionTypes";



export const loader_start = () => (dispatch) => {
  dispatch({ type: LOADER_START });
};

export const loader_end= () => (dispatch) => {
  dispatch({ type: LOADER_END });
};
