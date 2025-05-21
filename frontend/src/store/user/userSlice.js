import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState : {
        printers : null,
        admins : null,
        teachers : null,
    } ,
    reducers : {
        setPrinters : (state, action) => {
            state.printers = action.payload;
        },
        setAdmins : (state, action) => {
            state.admins = action.payload;
        },
        setTeachers : (state, action) => {
            state.teachers = action.payload;
        },
    }
});

export const { setPrinters, setAdmins, setTeachers } = userSlice.actions;
export default userSlice.reducer;
