import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { reportData } from "../../data/reportData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const lineData = {
  labels: reportData.charts.appointmentRevenue.labels,
  datasets: [
    {
      label: "Appointments",
      data: reportData.charts.appointmentRevenue.appointmentSeries,
      borderColor: "#1E3A8A",
      backgroundColor: "rgba(30, 58, 138, 0.1)",
      borderWidth: 2,
      fill: true,
      tension: 0.35,
      pointRadius: 3,
      pointBackgroundColor: "#1E3A8A",
    },
    {
      label: "Revenue",
      data: reportData.charts.appointmentRevenue.revenueSeries,
      borderColor: "#0F766E",
      backgroundColor: "rgba(15, 118, 110, 0.08)",
      borderWidth: 2,
      fill: true,
      tension: 0.35,
      pointRadius: 3,
      pointBackgroundColor: "#0F766E",
    },
  ],
};

const barData = {
  labels: reportData.charts.weeklyAppointments.labels,
  datasets: [
    {
      label: "Appointments",
      data: reportData.charts.weeklyAppointments.values,
      backgroundColor: "#2563EB",
      borderRadius: 8,
    },
  ],
};

const doughnutData = {
  labels: reportData.charts.paymentStatus.labels,
  datasets: [
    {
      data: reportData.charts.paymentStatus.values,
      backgroundColor: ["#16A34A", "#F59E0B", "#DC2626"],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 18,
        color: "#475569",
      },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: "rgba(148, 163, 184, 0.18)" } },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "68%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 14,
        color: "#475569",
      },
    },
  },
};

const ReportAnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Appointment & Revenue Trends
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Monthly appointment volume and revenue movement.
            </p>
          </div>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
            <option>This year</option>
            <option>Last 6 months</option>
            <option>Last 12 months</option>
          </select>
        </div>
        <div className="h-72">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Payment Status</h3>
        <p className="text-xs text-slate-500 mt-1">
          Paid, pending, and failed payment distribution.
        </p>
        <div className="mt-5 h-72">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      <div className="xl:col-span-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Appointment Trends</h3>
            <p className="text-xs text-slate-500 mt-1">
              Appointments by day of week.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Weekly View
          </span>
        </div>
        <div className="h-64">
          <Bar
            data={barData}
            options={{
              ...chartOptions,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportAnalyticsCharts;
