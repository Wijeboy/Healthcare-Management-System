import axiosClient from "./axiosClient";
import { mockPrescriptions } from "../data/mockPrescriptions";

const USE_MOCK_DATA = true;

/**
 * GET /api/prescriptions
 * router.get("/prescriptions", authenticate, prescriptionsController.list)
 */
export async function fetchPrescriptions() {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockPrescriptions);
  }
  const { data } = await axiosClient.get("/prescriptions");
  return data;
}

/**
 * GET /api/prescriptions/:id
 */
export async function fetchPrescriptionById(id) {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockPrescriptions.find((p) => p.id === id) || null);
  }
  const { data } = await axiosClient.get(`/prescriptions/${id}`);
  return data;
}

/**
 * POST /api/prescriptions
 * Body: { patientId, doctor, medications: [{name, dosage, frequency}], notes, status }
 */
export async function createPrescription(payload) {
  if (USE_MOCK_DATA) {
    const created = {
      id: `rx${Date.now()}`,
      code: `RX-${Math.floor(80000 + Math.random() * 9999)}`,
      dateIssued: "Today",
      ...payload,
    };
    mockPrescriptions.unshift(created);
    return Promise.resolve(created);
  }
  const { data } = await axiosClient.post("/prescriptions", payload);
  return data;
}

/**
 * PATCH /api/prescriptions/:id/status
 */
export async function updatePrescriptionStatus(id, status) {
  if (USE_MOCK_DATA) {
    const rx = mockPrescriptions.find((p) => p.id === id);
    if (rx) rx.status = status;
    return Promise.resolve({ id, status });
  }
  const { data } = await axiosClient.patch(`/prescriptions/${id}/status`, { status });
  return data;
}

/**
 * PUT /api/prescriptions/:id
 * Body: { patientId, patient, doctor, medications, notes }
 * Used by the Edit flow — updates an existing prescription in place.
 */
export async function updatePrescription(id, payload) {
  if (USE_MOCK_DATA) {
    const rx = mockPrescriptions.find((p) => p.id === id);
    if (rx) Object.assign(rx, payload);
    return Promise.resolve(rx);
  }
  const { data } = await axiosClient.put(`/prescriptions/${id}`, payload);
  return data;
}
