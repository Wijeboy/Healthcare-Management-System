import { useEffect, useMemo, useState } from "react";
import { fetchAppointments, updateAppointmentStatus, createAppointment } from "../services/doctorApi";
import { APPOINTMENT_STATUSES } from "../constants/statusStyles";

export function useAppointments() {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState([...APPOINTMENT_STATUSES]);

  useEffect(() => {
    let mounted = true;
    fetchAppointments().then((data) => {
      if (mounted) { setAllAppointments(data); setLoading(false); }
    });
    return () => { mounted = false; };
  }, []);

  const appointments = useMemo(
    () => allAppointments.filter(
      (a) => (department === "All Departments" || a.department === department) && statusFilter.includes(a.status)
    ),
    [allAppointments, department, statusFilter]
  );

  function toggleStatusFilter(status) {
    setStatusFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]));
  }

  async function setStatus(id, status) {
    setAllAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    await updateAppointmentStatus(id, status);
  }

  async function addAppointment(payload) {
    const created = await createAppointment(payload);
    setAllAppointments((prev) => [...prev, created]);
    return created;
  }

  return { appointments, allAppointments, loading, department, setDepartment, statusFilter, toggleStatusFilter, setStatus, addAppointment };
}
