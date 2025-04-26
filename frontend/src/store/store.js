import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import notificationReducer from './notification/notificationSlice.js'
import requestReducer from './request/requestSlice.js'
import loaderReducer from './LoaderSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification : notificationReducer,
    request : requestReducer ,
    loader : loaderReducer
  },
});

export default store ;
