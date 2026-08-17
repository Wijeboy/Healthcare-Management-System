import { useEffect, useMemo, useState } from "react";
import { fetchPrescriptions, updatePrescriptionStatus, createPrescription } from "../services/doctorApi";

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    let mounted = true;
    fetchPrescriptions().then((data) => { if (mounted) { setPrescriptions(data); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prescriptions.filter((p) => {
      const matchesSearch = q === "" || p.patient.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [prescriptions, search, statusFilter]);

  const stats = useMemo(() => ({
    totalIssued: prescriptions.length,
    pendingApproval: prescriptions.filter((p) => p.status === "Pending Approval").length,
    refillsRequested: prescriptions.filter((p) => p.status === "Refill Requested").length,
    voided: prescriptions.filter((p) => p.status === "Voided").length,
  }), [prescriptions]);

  async function setStatus(id, status) {
    setPrescriptions((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    await updatePrescriptionStatus(id, status);
  }

  async function addPrescription(payload) {
    const created = await createPrescription(payload);
    setPrescriptions((prev) => [created, ...prev]);
    return created;
  }

  return { prescriptions: filtered, allPrescriptions: prescriptions, loading, search, setSearch, statusFilter, setStatusFilter, stats, setStatus, addPrescription };
}
