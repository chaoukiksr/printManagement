import axios from "axios";
import { toast } from "react-hot-toast";
import {
    setIsFetching,
    setInvitations,
    addInvitation,
    removeInvitation,
    setError
} from "./invitationSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create invitation
export const createInvitation = async (invitationData, dispatch) => {
    try {
        dispatch(setIsFetching(true));
        const response = await axios.post(
            `${API_URL}/invite`,
            invitationData,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(addInvitation(response.data.data));
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to create invitation";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    } finally {
        dispatch(setIsFetching(false));
    }
};

// Get invitations
export const getInvitations = async (from, dispatch) => {
    try {
        dispatch(setIsFetching(true));
        const response = await axios.get(
            `${API_URL}/invitations?from=${from}`,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(setInvitations(response.data.data));
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch invitations";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    } finally {
        dispatch(setIsFetching(false));
    }
};

// Delete invitation
export const deleteInvitation = async (invitationId, dispatch) => {
    try {
        dispatch(setIsFetching(true));
        const response = await axios.delete(
            `${API_URL}/invitations/${invitationId}`,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(removeInvitation(invitationId));
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete invitation";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    } finally {
        dispatch(setIsFetching(false));
    }
};
