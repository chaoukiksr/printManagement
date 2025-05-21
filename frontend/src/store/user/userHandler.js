import axios from "axios";
import { toast } from "react-hot-toast";
import { setPrinters, setTeachers, setAdmins } from "./userSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get printers for a faculty
export const getPrinter = async (dispatch) => {
    try {
        const response = await axios.get(
            `${API_URL}/user/printer`,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(setPrinters(response.data.printers));
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch printers";
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    }
};

// Get teachers for a department
export const getTeachers = async (dispatch) => {
    try {
        const response = await axios.get(
            `${API_URL}/user/teachers`,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(setTeachers(response.data.teachers));
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch teachers";
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    }
};

// Get sub-admins (either faculty admins or department admins)
export const getSubAdmins = async (dispatch) => {
    try {
        const response = await axios.get(
            `${API_URL}/user/subadmins`,
            { withCredentials: true }
        );

        if (response.data.success) {
            dispatch(setAdmins(response.data.subAdmins));
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch sub-admins";
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    }
};

export const deleteUser = async (userId , role , dispatch) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}`, { withCredentials: true });
        if (response.data.success) {
            toast.success(response.data.message);
            switch (role) {
                case "printer":
                    getPrinter(dispatch);
                    break;
                case "teacher":
                    getTeachers(dispatch);
                    break;
                case "admin":
                    getSubAdmins(dispatch);
                    break;  
                default:
                    break;
            }
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete user";
        toast.error(errorMessage);
        throw error.response?.data || { message: errorMessage };
    }
}