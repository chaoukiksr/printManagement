import { createSlice }  from "@reduxjs/toolkit";

const initialState = {
    username : "Belkacemi" ,
    role : "admin",
    // role : "department",
}

const authSlice = createSlice({
    name : "auth" ,
    initialState ,
    reducers : {
        isChecking :() => {

        } 
    }
});


export default authSlice.reducer ;