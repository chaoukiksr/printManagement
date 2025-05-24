"use client";
import React from "react";
import { useSelector } from "react-redux";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper function to format numbers with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function RequestTrendChart() {
  const { statistics } = useSelector((state) => state.statistics);

  // Format data for the chart and reverse it
  const chartData = [...statistics].reverse().map(item => ({
    period: item.period,
    requests: item.metrics.totalRequests,
    papers: item.metrics.totalPapers
  }));

  return (
    <div className="trend-chart flex-1 bg-white rounded-2xl shadow md:p-4 m-4">
      <div className="head flex items-center gap-3 mb-6">
        <ChartBarIcon className="size-6" />
        <span className="font-semibold">Request Trends</span>
      </div>

      <div className="w-full h-[350px] overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" className={'overflow-auto'} >
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: -20,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="period" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => {
                if (value.includes('W')) return `W${value.split('W')[1]}`;
                return value.slice(5);
              }}
            />
            <YAxis 
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value, name) => [formatNumber(value), name === 'requests' ? 'Requests' : 'Papers']}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="requests"
              stroke="#3f5d6d"
              strokeWidth={2}
              dot={{ fill: "#3f5d6d", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="papers"
              stroke="#7C3AED"
              strokeWidth={2}
              dot={{ fill: "#7C3AED", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3f5d6d]"></div>
          <span className="text-sm text-gray-600">Requests</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7C3AED]"></div>
          <span className="text-sm text-gray-600">Papers</span>
        </div>
      </div>
    </div>
  );
} 