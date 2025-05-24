"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaperChart from "@/components/dashboard/charts/PaperChart";
import DepartmentChart from "@/components/dashboard/charts/DepartmentChart";
import StatusChart from "@/components/dashboard/charts/StatusChart";
import RequestTrendChart from "@/components/dashboard/charts/RequestTrendChart";
import PriceConfig from "@/components/dashboard/charts/PriceConfig";
import { getStatistics } from "@/store/statistic/statisticHandler";

const timeRanges = [
  { label: "Monthly", value: "month" },
  { label: "Weekly", value: "week" },
  { label: "Daily", value: "day" },
];

export default function StatisticsPage() {
  const dispatch = useDispatch();
  const { timeRange, costSettings, isFetching } = useSelector((state) => state.statistics);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getStatistics(timeRange));
  }, [dispatch, timeRange]);

  const handleTimeRangeChange = (newTimeRange) => {
    dispatch(getStatistics(newTimeRange));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-primary">
            Statistics Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your print management system's performance
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <PriceConfig />
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
            {timeRanges.map((tr) => (
              <button
                key={tr.value}
                onClick={() => handleTimeRangeChange(tr.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  timeRange === tr.value
                    ? "bg-primary text-white shadow-md"
                    : "bg-transparent text-primary hover:bg-primary/10"
                }`}
              >
                {tr.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Charts */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Paper Chart - Full Width */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <PaperChart timeRange={timeRange} prices={costSettings} />
          </div>
        </div>

        {/* Right Column - Side Charts */}
        <div className="col-span-12 lg:col-span-4 space-y-6 h-full">
          {/* Status Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full">
            <StatusChart timeRange={timeRange} />
          </div>
        </div>
      </div>

      {/* Request Trend Chart - Full Width */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <RequestTrendChart timeRange={timeRange} prices={costSettings} />
      </div>

      {/* Department Chart */}
      {role === "admin" && <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <DepartmentChart timeRange={timeRange} prices={costSettings} />
      </div>}
    </div>
  );
}
