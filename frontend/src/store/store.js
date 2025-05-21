import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import notificationReducer from './notification/notificationSlice.js'
import requestReducer from './request/requestSlice.js'
import loaderReducer from './LoaderSlice.js'
import departmentReducer from './department/departmentSlice.js'


const store = configureStore({
  reducer: {
    auth: authReducer,
    notification : notificationReducer,
    request : requestReducer ,
    loader : loaderReducer,
    department : departmentReducer
  },
});

export default store ;
