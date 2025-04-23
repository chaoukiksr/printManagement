import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import notificationReducer from './notification/notificationSlice.js'
import requestReducer from './request/requestSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification : notificationReducer,
    request : requestReducer ,
  },
});

export default store ;
