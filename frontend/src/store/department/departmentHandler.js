import axios from "axios";
import { toast } from "react-hot-toast";
import {
    setIsFetching,
    setDepartments,
    addDepartment,
    updateDepartment,
    removeDepartment,
    setError
} from "./departmentSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create department
export const createDepartment = async (departmentData, dispatch) => {
    try {
        dispatch(setIsFetching(true));
        const response = await axios.post(
            `${API_URL}/department/`,
            departmentData,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(addDepartment(response.data.data));
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to create department";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    } finally {
        dispatch(setIsFetching(false));
    }
};

// Get departments
export const getDepartments = async (dispatch) => {
    try {
        dispatch(setIsFetching(true));
        const response = await axios.get(
            `${API_URL}/department`,
            { withCredentials: true }
        );


        if (response.data.success) {
            dispatch(setDepartments(response.data.data));
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch departments";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    } finally {
        dispatch(setIsFetching(false));
    }
};

// Update department
export const updateDepartmentDetails = async (departmentId, updateData, dispatch) => {
    try {
        dispatch(setIsFetching(true));
        const response = await axios.put(
            `${API_URL}/department/${departmentId}`,
            updateData,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(updateDepartment(response.data.data));
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to update department";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    } finally {
        dispatch(setIsFetching(false));
    }
};

// Delete department
export const deleteDepartment = async (departmentId, dispatch) => {
    try {
        dispatch(setIsFetching(true));
        const response = await axios.delete(
            `${API_URL}/department/${departmentId}`,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(removeDepartment(departmentId));
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete department";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    } finally {
        dispatch(setIsFetching(false));
    }
}; 