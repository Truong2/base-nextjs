import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BarChartData {
  name: string;
  value: number;
  category?: string;
}

interface DashboardBarChartProps {
  data: BarChartData[];
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  categories?: string[];
  legendLabels?: string[]; // Optional labels for legend (defaults to categories)
}

export const DashboardBarChart: React.FC<DashboardBarChartProps> = ({
  data,
  colors = ["#3b82f6", "#10b981", "#f59e0b"],
  height = 300,
  showGrid = true,
  showLegend = true,
  categories,
  legendLabels,
}) => {
  // Group data by category if categories are provided
  const processedData = categories
    ? data.map(item => ({
        ...item,
        fill:
          colors[categories.indexOf(item.category || "") % colors.length] ||
          colors[0],
      }))
    : data.map((item, index) => ({
        ...item,
        fill: colors[index % colors.length],
      }));

  const legendItems =
    (legendLabels && legendLabels.length ? legendLabels : categories) || [];

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {showLegend && legendItems.length > 0 && (
        <div className="mt-4 flex justify-center gap-6">
          {legendItems.map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[idx % colors.length] }}
              />
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
