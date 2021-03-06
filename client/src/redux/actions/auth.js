export const UserStatus = {
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
  LOG_OUT: "logOut"
};

export const userSignIn = user => ({
  type: UserStatus.SIGN_IN,
  user
});

export const userSigUp = () => ({
  type: UserStatus.SIGN_UP
});

export const userLogOut = () => ({
  type: UserStatus.LOG_OUT
});
