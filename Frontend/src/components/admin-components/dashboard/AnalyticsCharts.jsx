import { useEffect, useRef } from 'react'
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
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

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
)

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Patient Admissions',
      data: [65, 78, 90, 81, 96, 105, 110, 120, 115, 130],
      borderColor: '#003f87',
      backgroundColor: 'rgba(0, 63, 135, 0.08)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#003f87',
      pointHoverRadius: 6,
    },
    {
      label: 'Discharges',
      data: [55, 70, 80, 75, 88, 95, 100, 112, 108, 122],
      borderColor: '#006c4f',
      backgroundColor: 'rgba(0, 108, 79, 0.08)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#006c4f',
      pointHoverRadius: 6,
    },
  ],
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        font: { family: 'Inter', size: 12 },
        color: '#424752',
      },
    },
    tooltip: {
      backgroundColor: '#2e3132',
      titleFont: { family: 'Inter', size: 13 },
      bodyFont: { family: 'Inter', size: 12 },
      cornerRadius: 8,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: 'Inter', size: 11 }, color: '#727784' },
    },
    y: {
      grid: { color: 'rgba(194, 198, 212, 0.3)' },
      ticks: { font: { family: 'Inter', size: 11 }, color: '#727784' },
    },
  },
}

const doughnutData = {
  labels: ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'General'],
  datasets: [
    {
      data: [28, 22, 18, 15, 17],
      backgroundColor: ['#003f87', '#006c4f', '#3a434a', '#0056b3', '#acc7ff'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 16,
        font: { family: 'Inter', size: 11 },
        color: '#424752',
      },
    },
    tooltip: {
      backgroundColor: '#2e3132',
      titleFont: { family: 'Inter', size: 13 },
      bodyFont: { family: 'Inter', size: 12 },
      cornerRadius: 8,
      padding: 12,
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
      },
    },
  },
}

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Patient Trends - Line Chart */}
      <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-on-surface leading-7">Patient Trends</h3>
            <p className="text-sm text-on-surface-variant">Monthly admissions vs discharges</p>
          </div>
          <select className="px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>Last 10 months</option>
            <option>Last 6 months</option>
            <option>This year</option>
          </select>
        </div>
        <div className="h-64">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Department Distribution - Doughnut Chart */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
        <h3 className="text-xl font-semibold text-on-surface leading-7 mb-2">Departments</h3>
        <p className="text-sm text-on-surface-variant mb-6">Patient distribution by dept.</p>
        <div className="h-52">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  )
}
