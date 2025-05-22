import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: null,
    isFetching: false,
    error: null,
    selectedRequest: null,
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    addRequest: (state, action) => {
      state.requests = [action.payload, ...state.requests];
    },
    updateRequest: (state, action) => {
      state.requests = state.requests.map((req) =>
        req._id === action.payload._id ? action.payload : req
      );
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(
        (req) => req._id !== action.payload
      );
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setRequests,
  setSelectedRequest,
  addRequest,
  updateRequest,
  deleteRequest,
  setFetching,
  setError,
  clearError,
} = requestSlice.actions;

export default requestSlice.reducer;
