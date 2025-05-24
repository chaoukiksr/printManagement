import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statistics: [],
  departmentStats: [],
  statusDistribution: [],
  costSettings: {
    printCost: 5,
    paperCost: 2
  },
  timeRange: 'month',
  isFetching: false,
  error: null
};

const statisticSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatistics: (state, action) => {
      state.statistics = action.payload.statistics;
      state.departmentStats = action.payload.departmentStats;
      state.statusDistribution = action.payload.statusDistribution;
    },
    setCostSettings: (state, action) => {
      state.costSettings = action.payload;
    },
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setStatistics,
  setCostSettings,
  setTimeRange,
  setFetching,
  setError
} = statisticSlice.actions;

export default statisticSlice.reducer;
