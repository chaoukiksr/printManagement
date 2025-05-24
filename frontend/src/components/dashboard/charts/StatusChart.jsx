"use client";
import React from "react";
import { useSelector } from "react-redux";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const statusColors = {
  Pending: "#FFB74D",
  "In Progress": "#64B5F6",
  Completed: "#81C784",
  Refused: "#E57373",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-900">{data.status}</p>
        <p className="text-sm text-gray-600">{data.value} requests</p>
      </div>
    );
  }
  return null;
};

export default function StatusChart() {
  const { statusDistribution } = useSelector((state) => state.statistics);

  // Add colors to the data
  const chartData = statusDistribution.map((item) => ({
    ...item,
    color: statusColors[item.status] || "#9E9E9E",
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="status-chart p-4 h-full">
      <div className="head flex items-center gap-3 mb-6">
        <ClipboardDocumentCheckIcon className="size-6 text-primary" />
        <div>
          <span className="font-semibold text-gray-900">Request Status</span>
          <p className="text-sm text-gray-500">
            Distribution of request statuses
          </p>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartData.length > 0 ? (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{item.status}</p>
              <p className="text-xs text-gray-500">{item.value} requests</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
