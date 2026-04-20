import React from "react";
import { BarChartData, DashboardBarChart } from "./BarChart";
import { DashboardRadar, RadarData } from "./RadarChart";
import { DashboardStackedBar, StackedBarData } from "./StackedBar";
import DashboardPieChart from "./PieChart";
import { RangeBarChart, RangeBarData } from "./RangeBarChart";
import { DashboardLineChart, LineChartData } from "./LineChart";

// Demo Component
const DashboardDemo: React.FC = () => {
  // Sample data
  const barData: BarChartData[] = [
    { name: "Jan", value: 400, category: "load-time" },
    { name: "Feb", value: 300, category: "best" },
    { name: "Mar", value: 300, category: "best" },
    { name: "Apr", value: 500, category: "best" },
    { name: "May", value: 200, category: "load-time" },
    { name: "Jun", value: 278, category: "load-time" },
    { name: "Jul", value: 189, category: "poor-load" },
  ];

  const stackedData: StackedBarData[] = [
    { name: "Mon", "Saving Calories": 120, "Active Calories": 80 },
    { name: "Tue", "Saving Calories": 98, "Active Calories": 60 },
    { name: "Wed", "Saving Calories": 86, "Active Calories": 95 },
    { name: "Thu", "Saving Calories": 99, "Active Calories": 45 },
    { name: "Fri", "Saving Calories": 85, "Active Calories": 78 },
    { name: "Sat", "Saving Calories": 65, "Active Calories": 52 },
    { name: "Sun", "Saving Calories": 25, "Active Calories": 30 },
  ];

  const radarData: RadarData[] = [
    { subject: "Steps", value: 4, fullMark: 5 },
    { subject: "Floors", value: 3, fullMark: 5 },
    { subject: "Intensity Minutes", value: 4.5, fullMark: 5 },
    { subject: "Calories", value: 3.5, fullMark: 5 },
    { subject: "Sleep Time", value: 4, fullMark: 5 },
    { subject: "Sleep Quality", value: 2.5, fullMark: 5 },
    { subject: "Stress", value: 3, fullMark: 5 },
    { subject: "Body Battery", value: 1, fullMark: 5 },
  ];
  const stepsData = [
    { name: "Completed", value: 12880, color: "#3b82f6" },
    { name: "Remaining", value: 6300, color: "#e5e7eb" },
  ];

  // Sample data for Range Bar Chart (Daily High-Low)
  const rangeBarData: RangeBarData[] = [
    { name: "Wed", dailyHigh: 85, dailyLow: 20, calendarDate: "" },
    { name: "Thu", dailyHigh: 90, dailyLow: 20, calendarDate: "" },
    { name: "Fri", dailyHigh: 90, dailyLow: 30, calendarDate: "" },
    { name: "Sat", dailyHigh: 95, dailyLow: 25, calendarDate: "" },
    { name: "Sun", dailyHigh: 90, dailyLow: 5, calendarDate: "" },
    { name: "Mon", dailyHigh: 58, dailyLow: 5, calendarDate: "" },
    { name: "Tue", dailyHigh: 90, dailyLow: 40, calendarDate: "" },
  ];

  // Sample data for Stress Level Chart
  const stressLevelData = [
    { name: "Low", value: 30, color: "#3b82f6" },
    { name: "Medium", value: 70, color: "#f97316" },
    { name: "High", value: 100, color: "#fbbf24" },
    { name: "Very High", value: 150, color: "#e5e7eb" },
  ];

  // Sample data for Line Chart (Intensity Minutes vs Goal)
  const lineChartData: LineChartData[] = [
    { name: "Week 1", intensityMinutes: 100, goal: 300 },
    { name: "Week 2", intensityMinutes: 100, goal: 300 },
    { name: "Week 3", intensityMinutes: 100, goal: 300 },
    { name: "Week 4", intensityMinutes: 180, goal: 300 },
    { name: "Week 5", intensityMinutes: 180, goal: 300 },
    { name: "Week 6", intensityMinutes: 180, goal: 300 },
    { name: "Week 7", intensityMinutes: 180, goal: 300 },
  ];

  // Line chart series configuration
  const lineChartSeries = [
    {
      key: "intensityMinutes",
      name: "Intensity Minutes",
      color: "#3b82f6",
      strokeWidth: 3,
      showDots: true,
      dotRadius: 4,
      activeDotRadius: 6,
    },
    {
      key: "goal",
      name: "Goal",
      color: "#9ca3af",
      strokeWidth: 2,
      strokeDasharray: "5 5",
      showDots: false,
    },
  ];

  // Example: Sales vs Revenue data (showing flexibility)
  const salesData: LineChartData[] = [
    { name: "Jan", sales: 1200 },
    { name: "Feb", sales: 1400 },
    { name: "Mar", sales: 1100 },
    { name: "Apr", sales: 1800 },
    { name: "May", sales: 1600 },
  ];

  const salesSeries = [
    {
      key: "sales",
      name: "Sales",
      color: "#10b981",
      strokeWidth: 3,
      showDots: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Dashboard Components
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <DashboardPieChart
            data={stepsData}
            title="Large Steps Chart"
            size={300}
          />
          <DashboardPieChart
            data={stressLevelData}
            title="Stress Level"
            size={300}
          />

          {/* Bar Chart */}
          <div className="xl:col-span-3">
            <DashboardBarChart
              data={barData}
              categories={["load-time", "best", "poor-load"]}
              colors={["#3b82f6", "#10b981", "#f59e0b"]}
            />
          </div>

          {/* Stacked Bar Chart */}
          <div className="lg:col-span-3">
            <DashboardStackedBar
              data={stackedData}
              keys={["Saving Calories", "Active Calories"]}
              colors={["#3b82f6", "#ef4444"]}
            />
          </div>

          {/* Range Bar Chart */}
          <div className="lg:col-span-3">
            <RangeBarChart
              data={rangeBarData}
              height={400}
              colors={{
                high: "#3b82f6",
                low: "#1f2937",
                range: "#e5e7eb",
              }}
            />
          </div>

          {/* Line Chart */}
          <div className="lg:col-span-3">
            <DashboardLineChart
              data={lineChartData}
              lines={lineChartSeries}
              title="Intensity Minutes vs Goal"
              height={400}
              xAxisKey="name"
            />
          </div>

          {/* Sales vs Revenue Line Chart */}
          <div className="lg:col-span-3">
            <DashboardLineChart
              data={salesData}
              lines={salesSeries}
              title="Sales"
              height={400}
              xAxisKey="name"
            />
          </div>
        </div>
        {/* Radar Chart */}
        <DashboardRadar
          data={radarData}
          color="#f97316"
          lastUpdated="Aug 5, 2025, 16:25"
        />
      </div>
    </div>
  );
};

export default DashboardDemo;
