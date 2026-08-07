import axiosClient from "./axiosClient";
import { mockDoctorProfile } from "../data/mockDoctorProfile";
import { mockAvailabilityOverrides } from "../data/mockAvailability";
import { mockNotifications } from "../data/mockNotifications";

const USE_MOCK_DATA = true;

/** GET /api/doctor/me */
export async function fetchDoctorProfile() {
  if (USE_MOCK_DATA) return Promise.resolve({ ...mockDoctorProfile });
  const { data } = await axiosClient.get("/doctor/me");
  return data;
}

/** PUT /api/doctor/me */
export async function updateDoctorProfile(payload) {
  if (USE_MOCK_DATA) {
    Object.assign(mockDoctorProfile, payload);
    return Promise.resolve({ ...mockDoctorProfile });
  }
  const { data } = await axiosClient.put("/doctor/me", payload);
  return data;
}

/** GET /api/doctor/availability */
export async function fetchAvailability() {
  if (USE_MOCK_DATA) return Promise.resolve({ ...mockAvailabilityOverrides });
  const { data } = await axiosClient.get("/doctor/availability");
  return data;
}

/** PATCH /api/doctor/availability  Body: { day, hour, status } */
export async function updateAvailabilitySlot(day, hour, status) {
  if (USE_MOCK_DATA) {
    mockAvailabilityOverrides[`${day}-${hour}`] = status;
    return Promise.resolve({ day, hour, status });
  }
  const { data } = await axiosClient.patch("/doctor/availability", { day, hour, status });
  return data;
}

/** GET /api/doctor/notifications */
export async function fetchNotifications() {
  if (USE_MOCK_DATA) return Promise.resolve(mockNotifications);
  const { data } = await axiosClient.get("/doctor/notifications");
  return data;
}

/** PATCH /api/doctor/notifications/:id/read */
export async function markNotificationRead(id, read = true) {
  if (USE_MOCK_DATA) {
    const n = mockNotifications.find((x) => x.id === id);
    if (n) n.read = read;
    return Promise.resolve({ id, read });
  }
  const { data } = await axiosClient.patch(`/doctor/notifications/${id}/read`, { read });
  return data;
}

/** PATCH /api/doctor/notifications/read-all */
export async function markAllNotificationsRead() {
  if (USE_MOCK_DATA) {
    mockNotifications.forEach((n) => { n.read = true; });
    return Promise.resolve({ ok: true });
  }
  const { data } = await axiosClient.patch("/doctor/notifications/read-all");
  return data;
}
