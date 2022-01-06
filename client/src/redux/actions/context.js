export const contextStatus = {
  SET_CONTEXT: "setContext"
};

export const setContext = context => ({
  type: contextStatus.SET_CONTEXT,
  context
});
