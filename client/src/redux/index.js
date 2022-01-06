import { combineReducers, createStore } from "redux";
import user from "./reducers/user";
import post from "./reducers/post";
import showAlert from "./reducers/showAlert";
import context from "./reducers/context";

const reducer = combineReducers({
  user,
  showAlert,
  context,
  post
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
