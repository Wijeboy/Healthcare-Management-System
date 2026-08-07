import { useEffect, useMemo, useState } from "react";
import { fetchAppointments, updateAppointmentStatus, createAppointment } from "../api/appointmentsApi";
import { APPOINTMENT_STATUSES } from "../constants/statusStyles";

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState([...APPOINTMENT_STATUSES]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchAppointments()
      .then((data) => { if (mounted) setAppointments(data); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () =>
      appointments.filter(
        (a) =>
          (department === "All Departments" || a.department === department) &&
          statusFilter.includes(a.status)
      ),
    [appointments, department, statusFilter]
  );

  function toggleStatusFilter(status) {
    setStatusFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }

  async function setStatus(id, status) {
    // Optimistic UI update, then confirm with the backend.
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    await updateAppointmentStatus(id, status);
  }

  async function addAppointment(payload) {
    const created = await createAppointment(payload);
    setAppointments((prev) => [created, ...prev]);
    return created;
  }

  return {
    appointments: filtered,
    allAppointments: appointments,
    loading,
    department,
    setDepartment,
    statusFilter,
    toggleStatusFilter,
    setStatus,
    addAppointment,
  };
}
