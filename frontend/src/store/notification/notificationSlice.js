const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  notification: [],
  num: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
      state.num = action.payload.length;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
