import { createSlice }  from "@reduxjs/toolkit";

const initialState = {
    user : null ,
    role : null ,
    isFetching : false ,
}

const authSlice = createSlice({
    name : "auth" ,
    initialState ,
    reducers : {
        setIsFetching  :(state , action) => {
            state.isFetching = action.payload ;
        } ,
        setUser : (state , action)=>{
            state.user = action.payload;
            state.role = action.payload?.role || null;
        }
    }
});

export const {setIsFetching , setUser} = authSlice.actions ;
export default authSlice.reducer ;