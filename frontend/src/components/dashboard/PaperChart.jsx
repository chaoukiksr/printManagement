"use client";
import { DocumentIcon } from "@heroicons/react/24/outline";
import React from "react";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    stroke: "#7C3AED88", 
    fill: "#E1F7F580",  
  },
};


export default function PaperChart() {
  return (
    <div className="paper-chart flex-1 bg-white rounded-2xl shadow p-4 m-4">
      <div className="head flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DocumentIcon className="size-6" />
          <span>Total Papers</span>
        </div>
        <select name="" id="" className="border rounded-lg">
          <option value="month">monthly</option>
          <option value="week">weekly</option>
          <option value="day">dayly</option>
        </select>
      </div>

      <h3 className="text-3xl m-5 font-bold">
        5000 <span className="text-lg font-medium ">Papers</span>
      </h3>

      <ChartContainer config={chartConfig} className={'max-h-[350px] md:h-[350px] w-full'}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill={chartConfig.desktop.fill}
            fillOpacity={0.4}
            stroke={chartConfig.desktop.stroke}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
