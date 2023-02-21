import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk];

// create store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // in development mode
  )
);

export default store;
