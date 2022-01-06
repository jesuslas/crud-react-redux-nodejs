import { UserStatus } from "../actions/auth";

const stringUser = sessionStorage.user || null;
const initialState = JSON.parse(stringUser);

const user = (state = initialState, { user = {}, type }) => {
  let expirationDate = new Date(new Date().getTime() + 60000 * 1);
  const { auth } = user;
  switch (type) {
    case UserStatus.SIGN_IN:
      const data = { ...state, ...user, ...(auth && { auth }), expirationDate };
      sessionStorage.setItem("user", JSON.stringify(data));
      return data;
    case UserStatus.SIGN_UP:
      user.hasSignedUp = "SUCCESS_SIGNED";
      const res = { ...state, ...user, expirationDate };
      sessionStorage.setItem("user", JSON.stringify(res));
      return res;
    case UserStatus.LOG_OUT:
      sessionStorage.removeItem("user");
      return null;
    default:
      return state;
  }
};

export default user;
