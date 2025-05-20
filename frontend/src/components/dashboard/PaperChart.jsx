"use client";
import { DocumentIcon } from "@heroicons/react/24/outline";
import React, { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for different time periods
const monthlyData = [
  { month: "January", papers: 186 },
  { month: "February", papers: 305 },
  { month: "March", papers: 237 },
  { month: "April", papers: 73 },
  { month: "May", papers: 209 },
  { month: "June", papers: 214 },
];

const weeklyData = [
  { week: "W 1", papers: 45 },
  { week: "W 2", papers: 78 },
  { week: "W 3", papers: 92 },
  { week: "W 4", papers: 65 },
];

const dailyData = [
  { day: "Mon", papers: 25 },
  { day: "Tue", papers: 18 },
  { day: "Wed", papers: 32 },
  { day: "Thu", papers: 28 },
  { day: "Fri", papers: 15 },
  { day: "Sat", papers: 8 },
  { day: "Sun", papers: 12 },
];

const chartConfig = {
  papers: {
    label: "Papers",
    stroke: "#7C3AED88",
    fill: "#E1F7F580",
  },
};

// Function to get data based on time range
const getDataForTimeRange = (timeRange) => {
  switch (timeRange) {
    case "week":
      return weeklyData;
    case "day":
      return dailyData;
    case "month":
    default:
      return monthlyData;
  }
};

export default function PaperChart() {
  const [timeRange, setTimeRange] = useState("month");

  // Calculate total papers based on selected time range
  const totalPapers = useMemo(() => {
    const data = getDataForTimeRange(timeRange);
    return data.reduce((sum, item) => sum + item.papers, 0);
  }, [timeRange]);

  // Get appropriate data and labels based on time range
  const { data, xAxisKey, xAxisLabel } = useMemo(() => {
    switch (timeRange) {
      case "week":
        return {
          data: weeklyData,
          xAxisKey: "week",
          xAxisLabel: "Week"
        };
      case "day":
        return {
          data: dailyData,
          xAxisKey: "day",
          xAxisLabel: "Day"
        };
      default:
        return {
          data: monthlyData,
          xAxisKey: "month",
          xAxisLabel: "Month"
        };
    }
  }, [timeRange]);

  return (
    <div className="paper-chart flex-1 bg-white rounded-2xl shadow p-4 m-4">
      <div className="head flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DocumentIcon className="size-6" />
          <span>Total Papers</span>
        </div>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded-lg px-2 py-1"
        >
          <option value="month">Monthly</option>
          <option value="week">Weekly</option>
          <option value="day">Daily</option>
        </select>
      </div>

      <h3 className="text-3xl m-5 font-bold">
        {totalPapers} <span className="text-lg font-medium">Papers</span>
      </h3>

      <div className="w-full">
        <ChartContainer config={chartConfig} className={'max-h-[350px] w-full'}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="papers"
              type="monotone"
              fill={chartConfig.papers.fill}
              fillOpacity={0.4}
              stroke={chartConfig.papers.stroke}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
