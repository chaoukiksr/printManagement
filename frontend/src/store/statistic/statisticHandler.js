import axios from "axios";
import { toast } from "react-hot-toast";
import {
  setStatistics,
  setCostSettings,
  setTimeRange,
  setFetching,
  setError
} from "./statisticSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get statistics based on time range
export const getStatistics = (timeRange = 'month') => async (dispatch) => {
  try {
    dispatch(setFetching(true));
    dispatch(setTimeRange(timeRange));

    const response = await axios.get(`${API_URL}/statistics?timeRange=${timeRange}`, {
      withCredentials: true
    });

    console.log(response);

    dispatch(setStatistics(response.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to fetch statistics"));
    toast.error(error.response?.data?.message || "Failed to fetch statistics");
  } finally {
    dispatch(setFetching(false));
  }
};

// Update cost settings
export const updateCostSettings = (settings) => async (dispatch) => {
  try {
    dispatch(setFetching(true));

    const response = await axios.put(
      `${API_URL}/statistics/cost-settings`,
      settings,
      { withCredentials: true }
    );

    dispatch(setCostSettings(response.data.data));
    dispatch(getStatistics());
    toast.success("Cost settings updated successfully");
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to update cost settings"));
    toast.error(error.response?.data?.message || "Failed to update cost settings");
  } finally {
    dispatch(setFetching(false));
  }
};
