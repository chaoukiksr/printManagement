import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import notificationReducer from './notification/notificationSlice.js'
import requestReducer from './request/requestSlice.js'
import loaderReducer from './LoaderSlice.js'
import departmentReducer from './department/departmentSlice.js'
import userReducer from './user/userSlice.js'
import invitationReducer from './invitation/invitationSlice.js'
import statisticReducer from './statistic/statisticSlice.js'


const store = configureStore({
  reducer: {
    auth: authReducer,
    notification : notificationReducer,
    request : requestReducer ,
    loader : loaderReducer,
    department : departmentReducer,
    user : userReducer,
    invitations : invitationReducer,
    statistics: statisticReducer,
  },
});

export default store ;
