import { setNotification } from "./notificationSlice";

export const getNotification = (data) => (dispatch) => {
  const notification = data.filter((item) => {
    return item.status === "pending";
  });

  dispatch(setNotification(notification));
};
