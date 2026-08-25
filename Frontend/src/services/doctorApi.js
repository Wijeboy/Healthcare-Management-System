/**
 * Doctor-side API service. Follows the same request() pattern as
 * services/api.js, but every function runs on local mock data until the
 * backend has real /doctor/* endpoints — flip USE_MOCK_DATA to false once
 * they exist, no other code needs to change.
 */
import { mockAppointments, PATIENTS, DOCTORS, formatHour, TIME_ROWS } from "../data/doctor/mockAppointments";
import { mockRecords } from "../data/doctor/mockRecords";
import { mockPrescriptions } from "../data/doctor/mockPrescriptions";
import { mockDoctorProfile, CURRENT_DOCTOR_NAME } from "../data/doctor/mockDoctorProfile";
import { mockAvailabilityOverrides } from "../data/doctor/mockAvailability";
import { mockNotifications } from "../data/doctor/mockNotifications";

const USE_MOCK_DATA = true;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(method, path, body = null) {
  const token = localStorage.getItem("hmsToken");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || `Request failed: ${res.status}`);
  return data;
}

// ─── APPOINTMENTS ───────────────────────────────────────────────────────────
export async function fetchAppointments() {
  if (USE_MOCK_DATA) return Promise.resolve(mockAppointments);
  const data = await request("GET", "/doctor/appointments");
  return data.appointments;
}

export async function fetchAppointmentById(id) {
  if (USE_MOCK_DATA) {
    const appt = mockAppointments.find((a) => a.id === id);
    if (!appt) return null;
    return { ...appt, patientProfile: PATIENTS.find((p) => p.id === appt.patientId) };
  }
  const data = await request("GET", `/doctor/appointments/${id}`);
  return data.appointment;
}

export async function updateAppointmentStatus(id, status) {
  if (USE_MOCK_DATA) {
    const appt = mockAppointments.find((a) => a.id === id);
    if (appt) appt.status = status;
    return Promise.resolve({ id, status });
  }
  const data = await request("PATCH", `/doctor/appointments/${id}/status`, { status });
  return data.appointment;
}

export async function createAppointment(payload) {
  if (USE_MOCK_DATA) {
    const created = { id: `ap${Date.now()}`, ...payload };
    mockAppointments.push(created);
    return Promise.resolve(created);
  }
  const data = await request("POST", "/doctor/appointments", payload);
  return data.appointment;
}

// ─── RECORDS ────────────────────────────────────────────────────────────────
export async function fetchRecords() {
  if (USE_MOCK_DATA) return Promise.resolve(mockRecords);
  const data = await request("GET", "/doctor/records");
  return data.records;
}

export async function updateRecordResult(id, result) {
  if (USE_MOCK_DATA) {
    const rec = mockRecords.find((r) => r.id === id);
    if (rec) rec.result = result;
    return Promise.resolve({ id, result });
  }
  return request("PATCH", `/doctor/records/${id}`, { result });
}

export async function uploadRecord(payload) {
  if (USE_MOCK_DATA) {
    const created = { id: `r${Date.now()}`, ...payload };
    mockRecords.unshift(created);
    return Promise.resolve(created);
  }
  return request("POST", "/doctor/records", payload);
}

// ─── PRESCRIPTIONS ──────────────────────────────────────────────────────────
export async function fetchPrescriptions() {
  if (USE_MOCK_DATA) return Promise.resolve(mockPrescriptions);
  const data = await request("GET", "/doctor/prescriptions");
  return data.prescriptions;
}

export async function fetchPrescriptionById(id) {
  if (USE_MOCK_DATA) return Promise.resolve(mockPrescriptions.find((p) => p.id === id) || null);
  const data = await request("GET", `/doctor/prescriptions/${id}`);
  return data.prescription;
}

export async function createPrescription(payload) {
  if (USE_MOCK_DATA) {
    const created = { id: `rx${Date.now()}`, code: `RX-${Math.floor(80000 + Math.random() * 9999)}`, dateIssued: "Today", ...payload };
    mockPrescriptions.unshift(created);
    return Promise.resolve(created);
  }
  const data = await request("POST", "/doctor/prescriptions", payload);
  return data.prescription;
}

export async function updatePrescription(id, payload) {
  if (USE_MOCK_DATA) {
    const rx = mockPrescriptions.find((p) => p.id === id);
    if (rx) Object.assign(rx, payload);
    return Promise.resolve(rx);
  }
  const data = await request("PUT", `/doctor/prescriptions/${id}`, payload);
  return data.prescription;
}

export async function updatePrescriptionStatus(id, status) {
  if (USE_MOCK_DATA) {
    const rx = mockPrescriptions.find((p) => p.id === id);
    if (rx) rx.status = status;
    return Promise.resolve({ id, status });
  }
  return request("PATCH", `/doctor/prescriptions/${id}/status`, { status });
}

// ─── DOCTOR PROFILE ─────────────────────────────────────────────────────────
export async function fetchDoctorProfile() {
  if (USE_MOCK_DATA) return Promise.resolve({ ...mockDoctorProfile });
  const data = await request("GET", "/doctor/profile");
  return data.profile;
}

export async function updateDoctorProfile(payload) {
  if (USE_MOCK_DATA) {
    Object.assign(mockDoctorProfile, payload);
    return Promise.resolve({ ...mockDoctorProfile });
  }
  const data = await request("PUT", "/doctor/profile", payload);
  return data.profile;
}

// ─── AVAILABILITY ───────────────────────────────────────────────────────────
export async function fetchAvailability() {
  if (USE_MOCK_DATA) return Promise.resolve({ ...mockAvailabilityOverrides });
  const data = await request("GET", "/doctor/availability");
  return data.overrides;
}

export async function updateAvailabilitySlot(day, hour, status) {
  if (USE_MOCK_DATA) {
    mockAvailabilityOverrides[`${day}-${hour}`] = status;
    return Promise.resolve({ day, hour, status });
  }
  return request("POST", "/doctor/availability", { day, hour, status });
}

// ─── NOTIFICATIONS ──────────────────────────────────────────────────────────
export async function fetchNotifications() {
  if (USE_MOCK_DATA) return Promise.resolve(mockNotifications);
  const data = await request("GET", "/doctor/notifications");
  return data.notifications;
}

export async function markNotificationRead(id, read = true) {
  if (USE_MOCK_DATA) {
    const n = mockNotifications.find((x) => x.id === id);
    if (n) n.read = read;
    return Promise.resolve({ id, read });
  }
  return request("PATCH", `/doctor/notifications/${id}/read`, { read });
}

export async function markAllNotificationsRead() {
  if (USE_MOCK_DATA) {
    mockNotifications.forEach((n) => { n.read = true; });
    return Promise.resolve({ ok: true });
  }
  return request("PATCH", "/doctor/notifications/read-all");
}

// ─── PATIENT HISTORY ────────────────────────────────────────────────────────
export async function fetchPatientHistory(patientId) {
  if (USE_MOCK_DATA) {
    const patient = PATIENTS.find((p) => p.id === patientId);
    const appointments = mockAppointments
      .filter((a) => a.patientId === patientId)
      .sort((a, b) => (a.year - b.year) || (a.month - b.month) || (a.day - b.day));
    const medicalRecords = mockRecords.filter((r) => r.patientId === patientId);
    const prescriptions = mockPrescriptions.filter((p) => p.patientId === patientId);
    return Promise.resolve({ patient, appointments, medicalRecords, prescriptions });
  }
  const data = await request("GET", `/doctor/patients/${patientId}/history`);
  return data;
}

export { CURRENT_DOCTOR_NAME, PATIENTS, DOCTORS, formatHour, TIME_ROWS };
