import { useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
)

const transactions = [
  {
    id: 'INV-8902',
    initials: 'RJ',
    patient: 'Robert Johnson',
    date: 'Oct 24, 2023',
    amount: '$1,240.00',
    method: 'Visa **** 4421',
    status: 'Completed',
  },
  {
    id: 'INV-8903',
    initials: 'SM',
    patient: 'Sarah Miller',
    date: 'Oct 23, 2023',
    amount: '$450.50',
    method: 'Insurance Draft',
    status: 'Pending',
  },
  {
    id: 'INV-8904',
    initials: 'AB',
    patient: 'Arthur Brown',
    date: 'Oct 23, 2023',
    amount: '$2,100.00',
    method: 'Bank Transfer',
    status: 'Overdue',
  },
  {
    id: 'INV-8905',
    initials: 'EK',
    patient: 'Emily Knight',
    date: 'Oct 22, 2023',
    amount: '$85.00',
    method: 'Cash',
    status: 'Completed',
  },
]

function getStatusClass(status) {
  if (status === 'Completed') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }

  if (status === 'Pending') {
    return 'bg-blue-50 text-blue-700 border-blue-200'
  }

  if (status === 'Overdue') {
    return 'bg-red-50 text-red-600 border-red-200'
  }

  return 'bg-slate-50 text-slate-600 border-slate-200'
}

export default function FinancialBillingReports() {
  const [range, setRange] = useState('This Month')
  const [search, setSearch] = useState('')

  const filteredTransactions = useMemo(() => {
    const value = search.toLowerCase().trim()

    if (!value) {
      return transactions
    }

    return transactions.filter(
      (transaction) =>
        transaction.patient.toLowerCase().includes(value) ||
        transaction.id.toLowerCase().includes(value) ||
        transaction.method.toLowerCase().includes(value)
    )
  }, [search])

  const departmentChartData = {
    labels: [
      'Cardiology',
      'Neurology',
      'Surgery',
      'Pediatrics',
      'Radiology',
      'General',
    ],
    datasets: [
      {
        label: 'Revenue',
        data: [78000, 62000, 91000, 54000, 73000, 70500],
        backgroundColor: '#0b4f96',
        borderRadius: 6,
        maxBarThickness: 42,
      },
    ],
  }

  const departmentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#eef2f7',
        },
        ticks: {
          callback: (value) => `$${value / 1000}k`,
          font: {
            size: 10,
          },
        },
      },
    },
  }

  const dailyChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Transactions',
        data: [42, 50, 46, 63, 92, 44, 88],
        borderColor: '#2563a5',
        backgroundColor: 'rgba(37, 99, 165, 0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  }

  const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  }

  function exportTransactions() {
    const headers = [
      'Invoice ID',
      'Patient',
      'Date',
      'Amount',
      'Method',
      'Status',
    ]

    const rows = transactions.map((transaction) => [
      transaction.id,
      transaction.patient,
      transaction.date,
      transaction.amount,
      transaction.method,
      transaction.status,
    ])

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(',')
      )
      .join('\n')

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'financial-billing-report.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <section className="min-h-full bg-slate-50 p-7">

      {/* =========================
          Header
      ========================== */}
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#06488c]">
            Financial &amp; Billing Reports
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Comprehensive overview of clinic performance and transaction
            history.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Filter Range */}
          <select
            value={range}
            onChange={(event) => setRange(event.target.value)}
            className="rounded-md border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>

          {/* Export */}
          <button
            type="button"
            onClick={exportTransactions}
            className="flex items-center gap-2 rounded-md bg-[#06488c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <span className="material-symbols-outlined text-[19px]">
              download
            </span>

            Export as CSV/PDF
          </button>
        </div>
      </div>

      {/* =========================
          Financial Summary Cards
      ========================== */}
      <div className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* Monthly Revenue */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-7 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
              <span className="material-symbols-outlined">
                trending_up
              </span>
            </div>

            <span className="text-sm font-semibold text-emerald-600">
              +12.5%
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Monthly Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            $428,500.00
          </h2>
        </div>

        {/* Outstanding */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-7 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-red-50 text-red-600">
              <span className="material-symbols-outlined">
                pending_actions
              </span>
            </div>

            <span className="text-sm font-semibold text-red-600">
              24 Invoices
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Outstanding
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            $15,240.50
          </h2>
        </div>

        {/* Refunds */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-7 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-600">
              <span className="material-symbols-outlined">
                keyboard_return
              </span>
            </div>

            <span className="text-sm font-semibold text-slate-600">
              -2.1%
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Refunds
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            $2,105.00
          </h2>
        </div>
      </div>

      {/* =========================
          Charts
      ========================== */}
      <div className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-[1.55fr_1fr]">

        {/* Revenue by Department */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Revenue by Department
            </h2>

            <select
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-600 outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="h-[280px]">
            <Bar
              data={departmentChartData}
              options={departmentChartOptions}
            />
          </div>
        </div>

        {/* Daily Transactions */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Daily Transactions
          </h2>

          <div className="h-[280px]">
            <Line
              data={dailyChartData}
              options={dailyChartOptions}
            />
          </div>
        </div>
      </div>

      {/* =========================
          Recent Transactions
      ========================== */}
      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">

        {/* Transaction Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-7 py-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Transactions
          </h2>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-500">
              search
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search List"
              className="w-[200px] rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">

            {/* Headers */}
            <div className="grid grid-cols-[1fr_1.5fr_1fr_1.15fr_1.3fr_1fr] bg-slate-100 px-7 py-4">
              <div className="text-xs font-semibold text-slate-600">
                Invoice ID
              </div>

              <div className="text-xs font-semibold text-slate-600">
                Patient
              </div>

              <div className="text-xs font-semibold text-slate-600">
                Date
              </div>

              <div className="text-xs font-semibold text-slate-600">
                Amount
              </div>

              <div className="text-xs font-semibold text-slate-600">
                Method
              </div>

              <div className="text-xs font-semibold text-slate-600">
                Status
              </div>
            </div>

            {/* Rows */}
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid min-h-[82px] grid-cols-[1fr_1.5fr_1fr_1.15fr_1.3fr_1fr] items-center border-b border-slate-200 px-7 last:border-b-0"
              >
                {/* Invoice */}
                <div className="font-semibold text-blue-800">
                  #{transaction.id}
                </div>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {transaction.initials}
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    {transaction.patient}
                  </span>
                </div>

                {/* Date */}
                <div className="text-sm text-slate-600">
                  {transaction.date}
                </div>

                {/* Amount */}
                <div className="text-sm font-semibold text-slate-800">
                  {transaction.amount}
                </div>

                {/* Method */}
                <div className="text-sm text-slate-600">
                  {transaction.method}
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${getStatusClass(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="flex min-h-[180px] items-center justify-center text-sm text-slate-400">
                No transactions found.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-slate-50 px-7 py-4 text-sm text-slate-500">
          <span>
            Showing {filteredTransactions.length} of 248 transactions
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded p-1 text-slate-400 hover:bg-slate-200"
            >
              <span className="material-symbols-outlined text-[19px]">
                chevron_left
              </span>
            </button>

            <button
              type="button"
              className="rounded p-1 text-slate-600 hover:bg-slate-200"
            >
              <span className="material-symbols-outlined text-[19px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}