import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ListFilter, Download, Plus, Eye, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import DoctorSidebar from "../components/layout/DoctorSidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";
import Avatar from "../components/common/Avatar";
import { usePrescriptions } from "../hooks/usePrescriptions";
import { PRESCRIPTION_STATUSES, PRESCRIPTION_STATUS_TINT } from "../data/mockPrescriptions";

const PAGE_SIZE = 4;

export default function PrescriptionsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const {
    prescriptions,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    stats,
  } = usePrescriptions();

  const totalPages = Math.max(1, Math.ceil(prescriptions.length / PAGE_SIZE));
  const pageItems = prescriptions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearchChange(v) {
    setSearch(v);
    setPage(1);
  }
  function handleStatusChange(v) {
    setStatusFilter(v);
    setPage(1);
    setShowFilter(false);
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Prescriptions" />

        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Prescription Management</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track and monitor all digital prescriptions across the facility network.
          </p>

          {/* Stat cards */}
          <div className="mt-5 grid grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Total Issued</p>
              <p className="mt-1 text-2xl font-bold text-blue-600">{stats.totalIssued}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Pending Approval</p>
              <p className="mt-1 text-2xl font-bold text-amber-500">{stats.pendingApproval}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Refills Requested</p>
              <p className="mt-1 text-2xl font-bold text-blue-500">{stats.refillsRequested}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Voided / Expired</p>
              <p className="mt-1 text-2xl font-bold text-rose-500">{stats.voided}</p>
            </div>
          </div>

          {/* Table card */}
          <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recent Prescriptions</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Review and manage the latest patient prescriptions.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                  <Search size={14} />
                  <input
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search prescription or patient"
                    className="w-44 bg-transparent placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowFilter((v) => !v)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <ListFilter size={14} /> Filter
                  </button>
                  {showFilter && (
                    <div className="absolute right-0 top-11 z-20 w-44 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 shadow-lg">
                      <button
                        onClick={() => handleStatusChange("All")}
                        className={`block w-full rounded-md px-2 py-1.5 text-left text-xs ${statusFilter === "All" ? "bg-blue-50 dark:bg-blue-950 text-blue-600" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                      >
                        All Statuses
                      </button>
                      {PRESCRIPTION_STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(s)}
                          className={`block w-full rounded-md px-2 py-1.5 text-left text-xs ${statusFilter === s ? "bg-blue-50 dark:bg-blue-950 text-blue-600" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <Download size={14} /> Export
                </button>
                <button
                  onClick={() => navigate("/prescriptions/new")}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Plus size={15} /> New Prescription
                </button>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="px-5 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">PRESCRIPTION ID</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">PATIENT NAME &amp; ID</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">DATE ISSUED</th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">STATUS</th>
                  <th className="px-5 py-3 text-right text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {!loading && pageItems.map((rx, i) => (
                  <tr key={rx.id} className={i !== pageItems.length - 1 ? "border-b border-slate-50 dark:border-slate-700" : ""}>
                    <td className="px-5 py-3">
                      <button onClick={() => navigate(`/prescriptions/${rx.id}`)} className="text-sm font-semibold text-blue-600 hover:underline">
                        #{rx.code}
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={rx.patient} size="h-7 w-7" tint="bg-indigo-100 text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{rx.patient}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">{rx.patientId.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-slate-600 dark:text-slate-300">{rx.dateIssued}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${PRESCRIPTION_STATUS_TINT[rx.status]}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" /> {rx.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button onClick={() => navigate(`/prescriptions/${rx.id}`)} className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700" title="View">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => navigate(`/prescriptions/${rx.id}/edit`)} className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700" title="Edit">
                          <Pencil size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && prescriptions.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-slate-400 dark:text-slate-500">No prescriptions match your search.</p>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Showing {prescriptions.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, prescriptions.length)} of {prescriptions.length} results
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`h-7 w-7 rounded-lg text-xs font-medium ${
                      page === n ? "bg-blue-600 text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
