import axiosClient from "./axiosClient";
import { mockAppointments, PATIENTS } from "../data/mockAppointments";

// Set to false once the Express + Prisma + MongoDB backend is running
// and these endpoints exist. Until then, the UI runs entirely on mock data.
const USE_MOCK_DATA = true;

/**
 * GET /api/appointments
 * Expected backend route (Express + Prisma):
 *   router.get("/appointments", authenticate, appointmentsController.list)
 */
export async function fetchAppointments(filters = {}) {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockAppointments);
  }
  const { data } = await axiosClient.get("/appointments", { params: filters });
  return data;
}

/**
 * GET /api/appointments/:id
 * Returns the appointment joined with its patient profile — used by the
 * Appointment Details page.
 */
export async function fetchAppointmentById(id) {
  if (USE_MOCK_DATA) {
    const appointment = mockAppointments.find((a) => a.id === id);
    if (!appointment) return Promise.resolve(null);
    const patient = PATIENTS.find((p) => p.id === appointment.patientId);
    return Promise.resolve({ ...appointment, patientProfile: patient });
  }
  const { data } = await axiosClient.get(`/appointments/${id}`);
  return data;
}

/**
 * PATCH /api/appointments/:id/status
 * Body: { status: "Completed" | "Scheduled" | "Pending" | "Canceled" }
 */
export async function updateAppointmentStatus(id, status) {
  if (USE_MOCK_DATA) {
    const appointment = mockAppointments.find((a) => a.id === id);
    if (appointment) appointment.status = status; // mutate the shared array so every page sees the change
    return Promise.resolve({ id, status });
  }
  const { data } = await axiosClient.patch(`/appointments/${id}/status`, { status });
  return data;
}

/**
 * POST /api/appointments
 * Body: { patientId, doctor, department, day, weekday, hour, time, status }
 */
export async function createAppointment(payload) {
  if (USE_MOCK_DATA) {
    const created = { id: `ap${Date.now()}`, ...payload };
    mockAppointments.unshift(created); // add to the shared array so it shows up everywhere
    return Promise.resolve(created);
  }
  const { data } = await axiosClient.post("/appointments", payload);
  return data;
}
