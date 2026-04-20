/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface DashboardPieChartProps {
  data: PieChartData[];
  title?: string;
  subtitle?: string;
  size?: number;
  showTooltip?: boolean;
  showLabels?: boolean;
  showTotal?: boolean;
  totalLabel?: string;
}

export const DashboardPieChart: React.FC<DashboardPieChartProps> = ({
  data,
  title,
  subtitle,
  size = 200,
  showTooltip = true,
  showLabels = false,
  showTotal = true,
  totalLabel = "Total",
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-6 shadow-sm">
      <div className="relative" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size * 0.35}
              outerRadius={size * 0.4}
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name) => [
                  `${value}`,
                  name === "value" ? "Value" : name,
                ]}
              />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Center content - Total */}
        {showTotal && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">
              {total.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {totalLabel}
            </span>
          </div>
        )}
      </div>

      {title && (
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      )}
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}

      {/* Legend with values */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-gray-700">
                {item.name}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPieChart;
