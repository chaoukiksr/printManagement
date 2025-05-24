"use client";
import React from "react";
import { useSelector } from "react-redux";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import {
  BarChart,
  Bar,
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

export default function DepartmentChart() {
  const { departmentStats } = useSelector((state) => state.statistics);

  // Reverse the department stats array
  const chartData = [...departmentStats].reverse();

  return (
    <div className="department-chart flex-1 bg-white rounded-2xl shadow p-4 m-4">
      <div className="head flex items-center gap-3 mb-6">
        <BuildingOfficeIcon className="size-6" />
        <span className="font-semibold">Department Statistics</span>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="department" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis 
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
              formatter={(value) => [formatNumber(value), 'Papers']}
            />
            <Bar 
              dataKey="papers" 
              fill="#3f5d6d" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 