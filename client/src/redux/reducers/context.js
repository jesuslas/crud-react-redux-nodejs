import { contextStatus } from "../actions/context";
const { innerWidth } = window;
const defaultCpmtext = { innerWidth };
const sessionContext = sessionStorage.context || null;
const initialState = !sessionContext
  ? defaultCpmtext
  : JSON.parse(sessionContext);
const context = (state = initialState, { context = {}, type }) => {
  let expirationDate = new Date(new Date().getTime() + 60000 * 1);
  switch (type) {
    case contextStatus.SET_CONTEXT:
      const data = { ...state, ...context, expirationDate };
      sessionStorage.setItem("context", JSON.stringify(data));
      return data;
    default:
      return state;
  }
};

export default context;
