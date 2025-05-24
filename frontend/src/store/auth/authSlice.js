import { createSlice }  from "@reduxjs/toolkit";

// Get initial state from sessionStorage if available
const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return {
        user,
        role: user?.role || null,
        isFetching: false
      };
    }
  }
  return {
    user: null,
    role: null,
    isFetching: false
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.role = action.payload?.role || null;
            
            // Save to sessionStorage
            if (typeof window !== 'undefined') {
                if (action.payload) {
                    sessionStorage.setItem('user', JSON.stringify(action.payload));
                } else {
                    sessionStorage.removeItem('user');
                }
            }
        }
    }
});

export const { setIsFetching, setUser } = authSlice.actions;
export default authSlice.reducer;