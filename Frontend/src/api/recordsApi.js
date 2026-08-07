import axiosClient from "./axiosClient";
import { mockRecords } from "../data/mockRecords";

// Set to false once the Express + Prisma + MongoDB backend is running.
const USE_MOCK_DATA = true;

/**
 * GET /api/records
 * router.get("/records", authenticate, recordsController.list)
 */
export async function fetchRecords(filters = {}) {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockRecords);
  }
  const { data } = await axiosClient.get("/records", { params: filters });
  return data;
}

/**
 * PATCH /api/records/:id/result
 * Body: { result: "Normal" | "Abnormal" }
 */
export async function updateRecordResult(id, result) {
  if (USE_MOCK_DATA) {
    const record = mockRecords.find((r) => r.id === id);
    if (record) record.result = result; // mutate the shared array so every page sees the change
    return Promise.resolve({ id, result });
  }
  const { data } = await axiosClient.patch(`/records/${id}/result`, { result });
  return data;
}

/**
 * POST /api/records  (multipart/form-data — includes the uploaded file)
 * Fields: patientId, reportName, category, result, doctor, file
 */
export async function uploadRecord(payload) {
  if (USE_MOCK_DATA) {
    const created = { id: `r${Date.now()}`, date: "Today", ...payload };
    mockRecords.unshift(created); // add to the shared array so it shows up everywhere
    return Promise.resolve(created);
  }
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
  const { data } = await axiosClient.post("/records", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
