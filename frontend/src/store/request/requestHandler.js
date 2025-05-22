import axios from "axios";
import { toast } from "react-hot-toast";
import {
  setRequests,
  setSelectedRequest,
  addRequest,
  updateRequest,
  deleteRequest,
  setFetching,
  setError,
} from "./requestSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get requests based on role
export const getRequests = () => async (dispatch, getState) => {
  try {
    dispatch(setFetching(true));
    const { role } = getState().auth;

    let endpoint = "/print";
    if (role === "department") {
      endpoint = "/print/department";
    } else if (role === "printer") {
      endpoint = "/print/printer";
    }

    const response = await axios.get(`${API_URL}${endpoint}`, {
      withCredentials: true,
    });

    dispatch(setRequests(response.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to fetch requests"));
    toast.error(error.response?.data?.message || "Failed to fetch requests");
  }
};

// Create new print request (teacher only)
export const createRequest = (requestData) => async (dispatch, getState) => {
  try {
    dispatch(setFetching(true));
    const { role } = getState().auth;

    if (role !== "teacher") {
      throw new Error("Only teachers can create print requests");
    }

    const formData = new FormData();
    Object.keys(requestData).forEach((key) => {
      formData.append(key, requestData[key]);
    });

    const response = await axios.post(`${API_URL}/print`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(addRequest(response.data.data));
    toast.success("Print request created successfully");
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to create request"));
    toast.error(error.response?.data?.message || "Failed to create request");
    throw error;
  }
};

// Update print request (teacher only)
export const updateRequestStatus = (requestId, status) => async (dispatch, getState) => {
  try {
    dispatch(setFetching(true));
    const { role } = getState().auth;

    if (!["department", "printer"].includes(role)) {
      throw new Error("Only department and printer can update request status");
    }

    const response = await axios.patch(
      `${API_URL}/print/${requestId}/status`,
      { status },
      { withCredentials: true }
    );

    dispatch(updateRequest(response.data.data));
    toast.success("Request status updated successfully");
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to update request status"));
    toast.error(error.response?.data?.message || "Failed to update request status");
    throw error;
  }
};

// Update print request details (teacher only)
export const updateRequestDetails = (requestId, requestData) => async (dispatch, getState) => {
  try {
    dispatch(setFetching(true));
    const { role } = getState().auth;

    if (role !== "teacher") {
      throw new Error("Only teachers can update request details");
    }

    const formData = new FormData();
    Object.keys(requestData).forEach((key) => {
      formData.append(key, requestData[key]);
    });

    const response = await axios.patch(
      `${API_URL}/print/${requestId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(updateRequest(response.data.data));
    toast.success("Request updated successfully");
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to update request"));
    toast.error(error.response?.data?.message || "Failed to update request");
    throw error;
  }
};

// Delete print request (teacher only)
export const deleteRequestById = (requestId) => async (dispatch, getState) => {
  try {
    dispatch(setFetching(true));
    const { role } = getState().auth;

    if (role !== "teacher") {
      throw new Error("Only teachers can delete requests");
    }

    await axios.delete(`${API_URL}/print/${requestId}`, {
      withCredentials: true,
    });

    dispatch(deleteRequest(requestId));
    toast.success("Request deleted successfully");
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to delete request"));
    toast.error(error.response?.data?.message || "Failed to delete request");
    throw error;
  }
};

// Get single request details
export const getRequestDetails = (requestId) => async (dispatch, getState) => {
  try {
    const { requests } = getState().request;
      
    if (!requests) {
      throw new Error("No requests available");
      toast.error("No requests available");
    }

    const request = requests.find((req) => req._id === requestId);

    if (!request) {
      throw new Error("Request not found");
      toast.error("Request not found");
    }

    dispatch(setSelectedRequest(request));
    return { data: request };
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(error.message);
    throw error;
  }
};
