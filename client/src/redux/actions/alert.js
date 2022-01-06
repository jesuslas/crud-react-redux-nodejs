export const alertStatus = {
  SET_ALERT: "setShowAlert",
  UPDATE_ALERT: "updateAlert",
  CLOSE_ALERT: "closeAlert"
};

export const setShowAlert = showAlert => ({
  type: alertStatus.SET_ALERT,
  showAlert
});

export const updateAlert = () => ({
  type: alertStatus.UPDATE_ALERT
});

export const closeAlert = () => ({
  type: alertStatus.CLOSE_ALERT
});
