"use client";
import { DocumentIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  papers: {
    label: "Papers",
    stroke: "#7C3AED",
    fill: "#7C3AED20",
  },
  cost: {
    label: "Cost",
    stroke: "#3f5d6d",
    fill: "#3f5d6d20",
  },
};

// Helper function to format numbers with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return formatNumber(amount.toFixed(2));
};

const CustomTooltip = ({ active, payload, label, prices }) => {
  if (active && payload && payload.length) {
    const papers = payload[0].payload.totalPapers || 0;
    const cost = payload[0].payload.totalCost || 0;
    const printCost = payload[0].payload.printCost || 0;
    const paperCost = payload[0].payload.paperCost || 0;

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">Total Papers: {formatNumber(papers)}</p>
        <p className="text-sm text-gray-600">Total Cost: {formatCurrency(cost)} DA</p>
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">Cost Breakdown:</p>
          <p className="text-xs text-gray-500">Print Cost: {formatCurrency(printCost)} DA</p>
          <p className="text-xs text-gray-500">Paper Cost: {formatCurrency(paperCost)} DA</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function PaperChart() {
  const { statistics, timeRange } = useSelector((state) => state.statistics);

  // Calculate averages based on the selected time range
  const { avgPapers, avgCost, avgPrintCost, avgPaperCost } = useMemo(() => {
    if (!statistics.length) return {
      avgPapers: 0,
      avgCost: 0,
      avgPrintCost: 0,
      avgPaperCost: 0
    };

    const totalPapers = statistics.reduce((sum, item) => sum + (item.metrics.totalPapers || 0), 0);
    const totalPrintCost = statistics.reduce((sum, item) => sum + (item.metrics.printCost || 0), 0);
    const totalPaperCost = statistics.reduce((sum, item) => sum + (item.metrics.paperCost || 0), 0);
    const totalCost = totalPrintCost + totalPaperCost;

    return {
      avgPapers: Math.round(totalPapers / statistics.length),
      avgCost: totalCost / statistics.length,
      avgPrintCost: totalPrintCost / statistics.length,
      avgPaperCost: totalPaperCost / statistics.length
    };
  }, [statistics]);

  // Format data for the chart and reverse it
  const chartData = useMemo(() => {
    return [...statistics].reverse().map(item => ({
      period: item.period,
      totalPapers: item.metrics.totalPapers,
      totalCost: item.metrics.totalCost,
      printCost: item.metrics.printCost,
      paperCost: item.metrics.paperCost
    }));
  }, [statistics]);

  return (
    <div className="paper-chart p-4 w-full bg-white rounded-lg">
      <div className="head flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <DocumentIcon className="size-6 text-primary" />
          <div>
            <span className="font-semibold text-gray-900">Paper Statistics</span>
            <p className="text-sm text-gray-500">Papers and cost overview</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-3xl font-bold text-primary">
            {formatNumber(avgPapers)} <span className="text-lg font-medium">Papers</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Average per {timeRange === 'month' ? 'month' : timeRange === 'week' ? 'week' : 'day'}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-3xl font-bold text-primary">
            {formatCurrency(avgCost)} <span className="text-lg font-medium">DA</span>
          </h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>Avg Print Cost: {formatCurrency(avgPrintCost)} DA</p>
            <p>Avg Paper Cost: {formatCurrency(avgPaperCost)} DA</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Average per {timeRange === 'month' ? 'month' : timeRange === 'week' ? 'week' : 'day'}
          </p>
        </div>
      </div>

      <div className="w-full">
        <ChartContainer config={chartConfig} className={'max-h-[350px] w-full'}>
          <AreaChart
            data={chartData}
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
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (timeRange === 'month') return value.slice(5);
                if (timeRange === 'week') return `W${value.split('W')[1]}`;
                return value.slice(8);
              }}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              yAxisId="left"
              dataKey="totalPapers"
              type="monotone"
              name="Papers"
              fill={chartConfig.papers.fill}
              fillOpacity={0.4}
              stroke={chartConfig.papers.stroke}
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              dataKey="totalCost"
              type="monotone"
              name="Cost (DA)"
              fill={chartConfig.cost.fill}
              fillOpacity={0.4}
              stroke={chartConfig.cost.stroke}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
