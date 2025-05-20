import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: [],
    isFetching: false,
    error: null
};

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setDepartments: (state, action) => {
            state.departments = action.payload;
            state.error = null;
        },
        addDepartment: (state, action) => {
            state.departments.push(action.payload);
            state.error = null;
        },
        updateDepartment: (state, action) => {
            const index = state.departments.findIndex(
                (dept) => dept._id === action.payload._id
            );
            if (index !== -1) {
                state.departments[index] = action.payload;
            }
            state.error = null;
        },
        removeDepartment: (state, action) => {
            state.departments = state.departments.filter(
                (dept) => dept._id !== action.payload
            );
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setIsFetching,
    setDepartments,
    addDepartment,
    updateDepartment,
    removeDepartment,
    setError
} = departmentSlice.actions;

export default departmentSlice.reducer; 