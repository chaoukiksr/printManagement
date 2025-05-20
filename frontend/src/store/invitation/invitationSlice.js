import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invitations: [],
    isFetching: false,
    error: null
};

const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setInvitations: (state, action) => {
            state.invitations = action.payload;
            state.error = null;
        },
        addInvitation: (state, action) => {
            state.invitations.push(action.payload);
            state.error = null;
        },
        removeInvitation: (state, action) => {
            state.invitations = state.invitations.filter(
                (invitation) => invitation._id !== action.payload
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
    setInvitations,
    addInvitation,
    removeInvitation,
    setError
} = invitationSlice.actions;

export default invitationSlice.reducer;
