import { useMemo, useState } from "react";
import UploadReportModal from "../../components/admin-components/records/UploadReportModal";

const recordsData = [
  {
    id: 1,
    initials: "IL",
    patient: "Imasha Lankeshi",
    report: "Complete Blood Count",
    category: "Lab Report",
    date: "June 10, 2026",
    doctor: "Dr. Nimal Perera",
    result: "Normal",
  },
  {
    id: 2,
    initials: "IL",
    patient: "Imasha Lankeshi",
    report: "Lipid Profile",
    category: "Lab Report",
    date: "May 28, 2026",
    doctor: "Dr. Nimal Perera",
    result: "Abnormal",
  },
  {
    id: 3,
    initials: "KP",
    patient: "Kavindu Perera",
    report: "Skin Biopsy",
    category: "Lab Report",
    date: "July 02, 2026",
    doctor: "Dr. Sunimal Silva",
    result: "Normal",
  },
  {
    id: 4,
    initials: "SR",
    patient: "Sanduni Rathnayake",
    report: "Knee MRI",
    category: "Scan / Imaging",
    date: "June 25, 2026",
    doctor: "Dr. Kasun Fernando",
    result: "Abnormal",
  },
  {
    id: 5,
    initials: "DW",
    patient: "Dinuka Wickramasinghe",
    report: "EEG Report",
    category: "Scan / Imaging",
    date: "July 10, 2026",
    doctor: "Dr. Anoma Jayasuriya",
    result: "Normal",
  },
];

export default function RecordsUploadMain() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [result, setResult] = useState("All Results");

  // Controls Upload Report modal
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredRecords = useMemo(() => {
    return recordsData.filter((record) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        record.patient.toLowerCase().includes(searchText) ||
        record.report.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All Categories" || record.category === category;

      const matchesResult =
        result === "All Results" || record.result === result;

      return matchesSearch && matchesCategory && matchesResult;
    });
  }, [search, category, result]);

  return (
    <>
      <section className="min-h-full bg-surface">
        {/* =========================
            Page Header
        ========================== */}
        <div className="border-b border-outline-variant bg-white px-8 py-5">
          <h1 className="text-2xl font-semibold text-on-surface">
            Records Table
          </h1>
        </div>

        {/* =========================
            Result Legend
        ========================== */}
        <div className="flex items-center gap-6 border-b border-outline-variant bg-white px-8 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="h-3 w-3 rounded-full bg-emerald-700"></span>
            <span>Normal</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="h-3 w-3 rounded-full bg-red-700"></span>
            <span>Abnormal</span>
          </div>
        </div>

        {/* =========================
            Records Card
        ========================== */}
        <div className="p-6">
          <div className="overflow-hidden rounded-2xl border border-outline-variant bg-white">
            {/* Search / Filters / Upload */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
              {/* Left Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[19px] text-slate-400">
                    search
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search report or patient"
                    className="w-[230px] rounded-md border border-outline-variant bg-white py-2 pl-10 pr-3 text-sm text-on-surface outline-none transition focus:border-primary"
                  />
                </div>

                {/* Category */}
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-on-surface outline-none"
                >
                  <option>All Categories</option>
                  <option>Lab Report</option>
                  <option>Scan / Imaging</option>
                  <option>Prescriptions</option>
                </select>

                {/* Result */}
                <select
                  value={result}
                  onChange={(event) => setResult(event.target.value)}
                  className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-on-surface outline-none"
                >
                  <option>All Results</option>
                  <option>Normal</option>
                  <option>Abnormal</option>
                </select>
              </div>

              {/* Upload Report */}
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-[19px]">
                  upload
                </span>
                Upload Report
              </button>
            </div>

            {/* =========================
                Table
            ========================== */}
            <div className="overflow-x-auto">
              {/* Table Header */}
              <div className="grid min-w-[1000px] grid-cols-[1.55fr_1.15fr_1fr_1fr_1.3fr_0.8fr_100px] border-b border-slate-200 bg-surface-container-low px-6 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Patient
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Report
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Doctor
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Result
                </div>

                <div className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </div>
              </div>

              {/* Table Rows */}
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="grid min-h-[72px] min-w-[1000px] grid-cols-[1.55fr_1.15fr_1fr_1fr_1.3fr_0.8fr_100px] items-center border-b border-slate-100 px-6 last:border-b-0"
                  >
                    {/* Patient */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                        {record.initials}
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {record.patient}
                      </span>
                    </div>

                    {/* Report */}
                    <div className="text-sm text-slate-600">
                      {record.report}
                    </div>

                    {/* Category */}
                    <div className="text-sm text-slate-500">
                      {record.category}
                    </div>

                    {/* Date */}
                    <div className="text-sm text-slate-600">{record.date}</div>

                    {/* Doctor */}
                    <div className="text-sm text-slate-600">
                      {record.doctor}
                    </div>

                    {/* Result */}
                    <div>
                      <span
                        className={`inline-flex min-w-[95px] justify-center rounded-full border px-3 py-1 text-xs font-semibold ${
                          record.result === "Normal"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                            : "border-red-300 bg-red-50 text-red-600"
                        }`}
                      >
                        {record.result}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-primary"
                        aria-label={`View ${record.report}`}
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          description
                        </span>
                      </button>

                      {/* Download */}
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-primary"
                        aria-label={`Download ${record.report}`}
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          download
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-300">
                      folder_off
                    </span>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      No medical records found.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filters.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Upload Report Modal
      ========================== */}
      {showUploadModal && (
        <UploadReportModal onClose={() => setShowUploadModal(false)} />
      )}
    </>
  );
}
