"use client";

import {
  DashboardBarChart,
  DashboardPieChart,
  DashboardRadar,
  type BarChartData,
  type RadarData,
} from "~/components/ui/Dashboard";

const Dashboard = () => {
  const activityData: BarChartData[] = [
    { name: "Mon", value: 35, category: "Good" },
    { name: "Tue", value: 48, category: "Good" },
    { name: "Wed", value: 28, category: "Average" },
    { name: "Thu", value: 55, category: "Good" },
    { name: "Fri", value: 22, category: "Low" },
    { name: "Sat", value: 62, category: "Good" },
    { name: "Sun", value: 40, category: "Average" },
  ];

  const sleepData = [
    { name: "Deep Sleep", value: 38, color: "#3b82f6" },
    { name: "Light Sleep", value: 42, color: "#60a5fa" },
    { name: "Awake", value: 20, color: "#e2e8f0" },
  ];

  const wellnessData: RadarData[] = [
    { subject: "Steps", value: 4.2, fullMark: 5 },
    { subject: "Calories", value: 3.8, fullMark: 5 },
    { subject: "Heart Rate", value: 3.4, fullMark: 5 },
    { subject: "Sleep", value: 4.1, fullMark: 5 },
    { subject: "Hydration", value: 2.9, fullMark: 5 },
    { subject: "Stress", value: 3.2, fullMark: 5 },
  ];

  return (
    <div className="p-6">
      <div>
        <p className="title-16 text-title-neutral-900">Hello, Bruno Mars</p>
        <p className="content-13 mt-1 text-content-neutral-700">
          Welcome back! Here is your latest health data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <DashboardPieChart
          data={sleepData}
          title="Sleep Distribution"
          subtitle="Last 7 days"
          size={220}
          totalLabel="Hours"
        />

        <div className="xl:col-span-2">
          <DashboardBarChart
            data={activityData}
            categories={["Good", "Average", "Low"]}
            legendLabels={["Good day", "Average day", "Low day"]}
            colors={["#10b981", "#f59e0b", "#ef4444"]}
            height={280}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-gray-700">
          Wellness score
        </p>
        <DashboardRadar
          data={wellnessData}
          color="#3b82f6"
          height={360}
          lastUpdated="Today, 10:30"
        />
      </div>
    </div>
  );
};

export default Dashboard;
