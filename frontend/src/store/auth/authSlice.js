import { createSlice }  from "@reduxjs/toolkit";

const initialState = {
    username : "Belkacemi" ,
    // role : "department",
    role : "admin",
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