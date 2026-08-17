import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { patientApi } from "../../../services/api";

export default function PatientTable() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchRecentPatients = async () => {
    setLoading(true);
    try {
      const res = await patientApi.getAll({ page: 1, limit: 5 });
      setPatients(res.data || []);
      setTotalPatients(res.total || 0);
    } catch (err) {
      console.error("Failed to fetch recent patients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentPatients();
  }, []);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-outline-variant">
        <div>
          <h3 className="text-xl font-semibold text-on-surface leading-7">
            Recent Patient Registrations
          </h3>
          <p className="text-sm text-on-surface-variant">
            Latest arrivals in the registration system.
          </p>
        </div>
        <button
          onClick={fetchRecentPatients}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
                Contact
              </th>
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-on-surface-variant text-sm"
                >
                  Loading recent patients...
                </td>
              </tr>
            ) : patients.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-on-surface-variant text-sm"
                >
                  No patients registered yet.
                </td>
              </tr>
            ) : (
              patients.map((patient) => {
                const name =
                  patient.fullName || patient.name || "Patient Record";
                const initials =
                  patient.initials ||
                  name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                const contact =
                  patient.phone ||
                  patient.email ||
                  patient.user?.email ||
                  "N/A";
                const dateStr = patient.createdAt
                  ? new Date(patient.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently";

                return (
                  <tr
                    key={patient.id}
                    className="hover:bg-surface-container-low transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {initials}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900 block leading-snug">
                            {name}
                          </span>
                          <span className="text-xs text-slate-400 block">
                            {patient.age ? `${patient.age} yrs` : ""}{" "}
                            {patient.gender ? `· ${patient.gender}` : ""}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                      {contact}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {dateStr}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/patients/details?id=${encodeURIComponent(patient.id)}`,
                              { state: { patient } },
                            )
                          }
                          className="px-2.5 py-1 border border-primary text-primary rounded-md text-xs font-semibold tracking-widest uppercase hover:bg-primary/5 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/patients/edit?id=${encodeURIComponent(patient.id)}`,
                              { state: { patient } },
                            )
                          }
                          className="px-2.5 py-1 bg-surface-container-highest text-on-surface rounded-md text-xs font-semibold tracking-widest uppercase hover:bg-outline-variant transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 bg-surface-container-low flex justify-between items-center px-6 border-t border-slate-100">
        <span className="text-sm text-on-surface-variant">
          Showing {patients.length} of {totalPatients.toLocaleString()} registered patients
        </span>
        <button
          onClick={() => navigate("/admin/patients")}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          View All Patients &rarr;
        </button>
      </div>
    </div>
  );
}
