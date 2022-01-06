import { alertStatus, closeAlert } from "../actions/alert";
const defaultAlert = { open: false, onClose: () => closeAlert() };
const stringUser = sessionStorage.showAlert || null;
const initialState = !stringUser ? defaultAlert : JSON.parse(stringUser);
const showAlert = (state = initialState, { showAlert = {}, type }) => {
  let expirationDate = new Date(new Date().getTime() + 60000 * 1);
  switch (type) {
    case alertStatus.SET_ALERT:
      const data = { ...state, ...showAlert, expirationDate };
      sessionStorage.setItem("showAlert", JSON.stringify(data));
      return data;
    case alertStatus.CLOSE_ALERT:
      const res = { ...defaultAlert, expirationDate };
      sessionStorage.setItem("showAlert", JSON.stringify(res));
      return res;
    default:
      return state;
  }
};

export default showAlert;
