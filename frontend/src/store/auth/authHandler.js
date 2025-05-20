import axios from "axios";
import { setIsFetching, setUser } from "./authSlice";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Register new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Verify OTP
export const verifyOTP = async (otpData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

// Login user
export const login = async (credentials, dispatch) => {
  try {
    dispatch(setIsFetching(true));
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true,
    });

    if (response.data.success && response.data.isVerified) {
      dispatch(setUser(response.data.data));
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data.message);
    throw error.response?.data || { message: "Login failed" };
  } finally {
    dispatch(setIsFetching(false));
  }
};

// Logout user
export const logout = async (dispatch) => {
  try {
    dispatch(setIsFetching(true));
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      dispatch(setUser(null));
    }
    
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
    throw error.response?.data || { message: "Logout failed" };
  } finally {
    dispatch(setIsFetching(false));
  }
};

// Check authentication status
export const checkAuth = async (dispatch) => {
  try {
    dispatch(setIsFetching(true));
    const response = await axios.get(`${API_URL}/auth/check`, {
      withCredentials: true,
    });

    if (response.data.success) {
      dispatch(setUser(response.data.data || null));
    } else {
      dispatch(setUser(null));
    }
    return response.data;
  } catch (error) {
    dispatch(setUser(null));
    throw error.response?.data || { message: "Authentication check failed" };
  } finally {
    dispatch(setIsFetching(false));
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

// Verify invitation and register
export const verifyInvitation = async (invitationData) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/verify-invitation`,
      invitationData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Invitation verification failed" };
  }
};

// Resend OTP
export const resendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resend-otp`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to resend OTP" };
  }
};
