import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ListFilter, Download, Plus, Eye, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import Avatar from "../../components/common/Avatar";
import { usePrescriptions } from "../../hooks/usePrescriptions";
import { PRESCRIPTION_STATUSES, PRESCRIPTION_STATUS_TINT } from "../../data/doctor/mockPrescriptions";

const PAGE_SIZE = 4;

export default function PrescriptionsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const { prescriptions, loading, search, setSearch, statusFilter, setStatusFilter, stats } = usePrescriptions();

  const totalPages = Math.max(1, Math.ceil(prescriptions.length / PAGE_SIZE));
  const pageItems = prescriptions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearchChange(v) { setSearch(v); setPage(1); }
  function handleStatusChange(v) { setStatusFilter(v); setPage(1); setShowFilter(false); }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-on-surface">Prescription Management</h2>
      <p className="mt-1 text-sm text-on-surface-variant">Track and monitor all digital prescriptions across the facility network.</p>

      <div className="mt-5 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-outline-variant bg-white p-4"><p className="text-xs uppercase tracking-wide text-on-surface-variant">Total Issued</p><p className="mt-1 text-2xl font-bold text-primary">{stats.totalIssued}</p></div>
        <div className="rounded-2xl border border-outline-variant bg-white p-4"><p className="text-xs uppercase tracking-wide text-on-surface-variant">Pending Approval</p><p className="mt-1 text-2xl font-bold text-amber-500">{stats.pendingApproval}</p></div>
        <div className="rounded-2xl border border-outline-variant bg-white p-4"><p className="text-xs uppercase tracking-wide text-on-surface-variant">Refills Requested</p><p className="mt-1 text-2xl font-bold text-blue-500">{stats.refillsRequested}</p></div>
        <div className="rounded-2xl border border-outline-variant bg-white p-4"><p className="text-xs uppercase tracking-wide text-on-surface-variant">Voided / Expired</p><p className="mt-1 text-2xl font-bold text-rose-500">{stats.voided}</p></div>
      </div>

      <div className="mt-6 rounded-2xl border border-outline-variant bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant px-5 py-4">
          <div><p className="text-sm font-semibold text-on-surface">Recent Prescriptions</p><p className="text-xs text-on-surface-variant">Review and manage the latest patient prescriptions.</p></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface-variant">
              <Search size={14} />
              <input value={search} onChange={(e) => handleSearchChange(e.target.value)} placeholder="Search prescription or patient" className="w-44 bg-transparent focus:outline-none" />
            </div>
            <div className="relative">
              <button onClick={() => setShowFilter((v) => !v)} className="flex items-center gap-1.5 rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-slate-50"><ListFilter size={14} /> Filter</button>
              {showFilter && (
                <div className="absolute right-0 top-11 z-20 w-44 rounded-lg border border-outline-variant bg-white p-2 shadow-lg">
                  <button onClick={() => handleStatusChange("All")} className={`block w-full rounded-md px-2 py-1.5 text-left text-xs ${statusFilter === "All" ? "bg-blue-50 text-primary" : "text-on-surface-variant hover:bg-slate-50"}`}>All Statuses</button>
                  {PRESCRIPTION_STATUSES.map((s) => (
                    <button key={s} onClick={() => handleStatusChange(s)} className={`block w-full rounded-md px-2 py-1.5 text-left text-xs ${statusFilter === s ? "bg-blue-50 text-primary" : "text-on-surface-variant hover:bg-slate-50"}`}>{s}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-slate-50"><Download size={14} /> Export</button>
            <button onClick={() => navigate("/doctor/prescriptions/new")} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container"><Plus size={15} /> New Prescription</button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-outline-variant">
              <th className="px-5 py-3 text-xs font-medium tracking-wide text-on-surface-variant">PRESCRIPTION ID</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wide text-on-surface-variant">PATIENT NAME &amp; ID</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wide text-on-surface-variant">DATE ISSUED</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wide text-on-surface-variant">STATUS</th>
              <th className="px-5 py-3 text-right text-xs font-medium tracking-wide text-on-surface-variant">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {!loading && pageItems.map((rx, i) => (
              <tr key={rx.id} className={i !== pageItems.length - 1 ? "border-b border-slate-50" : ""}>
                <td className="px-5 py-3"><button onClick={() => navigate(`/doctor/prescriptions/${rx.id}`)} className="text-sm font-semibold text-primary hover:underline">#{rx.code}</button></td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={rx.patient} size="h-7 w-7" tint="bg-indigo-100 text-indigo-600" />
                    <div><p className="text-sm font-medium text-on-surface">{rx.patient}</p><p className="text-[11px] text-on-surface-variant">{rx.patientId.toUpperCase()}</p></div>
                  </div>
                </td>
                <td className="px-3 py-3 text-sm text-on-surface-variant">{rx.dateIssued}</td>
                <td className="px-3 py-3"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${PRESCRIPTION_STATUS_TINT[rx.status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" /> {rx.status}</span></td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button onClick={() => navigate(`/doctor/prescriptions/${rx.id}`)} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-slate-50" title="View"><Eye size={15} /></button>
                    <button onClick={() => navigate(`/doctor/prescriptions/${rx.id}/edit`)} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-slate-50" title="Edit"><Pencil size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && prescriptions.length === 0 && <p className="px-5 py-8 text-center text-sm text-on-surface-variant">No prescriptions match your search.</p>}

        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-xs text-on-surface-variant">Showing {prescriptions.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}\u2013{Math.min(page * PAGE_SIZE, prescriptions.length)} of {prescriptions.length} results</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-slate-50 disabled:opacity-30"><ChevronLeft size={16} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`h-7 w-7 rounded-lg text-xs font-medium ${page === n ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-slate-50"}`}>{n}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-slate-50 disabled:opacity-30"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
