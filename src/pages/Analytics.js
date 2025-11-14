import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import StatsCard from "../components/StatsCard";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export default function Analytics() {
  const { items, total } = useSelector((state) => state.borrowers);
  const [data, setData] = useState({
    active: 0,
    overdue: 0,
    paid: 0,
    total: 0,
  });

  useEffect(() => {
    if (items.length > 0) {
      // ✅ Count statuses directly from the Redux data
      const active = items.filter((i) => i.status === "Active").length;
      const overdue = items.filter((i) => i.status === "Overdue").length;
      const paid = items.filter((i) => i.status === "Paid").length;

      setData({
        active,
        overdue,
        paid,
        total: total || items.length,
      });
    }
  }, [items, total]);

  // ✅ Pie chart data
  const chartData = {
    labels: ["Active", "Overdue", "Paid"],
    datasets: [
      {
        label: "Borrowers",
        data: [data.active, data.overdue, data.paid],
        backgroundColor: ["#3b82f6", "#f97316", "#10b981"], // blue, orange, green
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  // ✅ Pie chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#374151",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: `Total Borrowers: ${data.total}`,
        font: { size: 18 },
        color: "#111827",
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0].data;
          const total = dataset.reduce((a, b) => a + b, 0);
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-3">
      {/* Stats Summary */}
      <StatsCard title="Active Borrowers" value={data.active} subtitle="Currently active" />
      <StatsCard title="Overdue Borrowers" value={data.overdue} subtitle="Missed due date" />
      <StatsCard title="Paid Borrowers" value={data.paid} subtitle="Completed payments" />

      {/* Pie Chart Section */}
      <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Borrower Status Overview
        </h2>
        <div className="w-full h-80 flex justify-center items-center">
          <div className="w-72 h-72">
            <Pie data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
