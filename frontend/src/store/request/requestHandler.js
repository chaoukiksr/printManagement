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

    const response = await axios.get(`${API_URL}/print`, {
      withCredentials: true,
    });

    // Define status priority order
    const statusPriority = {
      'pending': 1,
      'wf_printer': 2,
      'wf_teacher': 3,
      'completed': 4,
      'refused': 5
    };

    // Sort requests based on status priority
    const sortedRequests = response.data.data.sort((a, b) => {
      return statusPriority[a.status] - statusPriority[b.status];
    });

    dispatch(setRequests(sortedRequests));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to fetch requests"));
    toast.error(error.response?.data?.message || "Failed to fetch requests");
  } finally {
    dispatch(setFetching(false));
  }
};

// Create new print request (teacher only)
export const createRequest = (formData) => async (dispatch, getState) => {
  try {
    dispatch(setFetching(true));
    const { role } = getState().auth;

    if (role !== "teacher") {
      throw new Error("Only teachers can create print requests");
    }

    // Validate required fields
    if (!formData.get('type') || !formData.get('quantity')) {
      throw new Error("Type and quantity are required");
    }

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
  } finally {
    dispatch(setFetching(false));
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
  }finally{
    dispatch(setFetching(false));
  }
};

// Update print request details (teacher only)
export const updateRequestDetails = (requestId, formData) => async (dispatch, getState) => {
  try {
    dispatch(setFetching(true));
    const { role } = getState().auth;

    if (role !== "teacher") {
      throw new Error("Only teachers can update request details");
    }

    // Validate required fields
    if (!formData.get('type') || !formData.get('quantity')) {
      throw new Error("Type and quantity are required");
    }

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
  }finally{
    dispatch(setFetching(false));
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
  }finally{
    dispatch(setFetching(false));
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
