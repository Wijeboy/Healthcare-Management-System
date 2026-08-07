export const APPOINTMENT_STATUSES = ["Completed", "Scheduled", "Pending", "Canceled"];

// Soft badge style (pill background + text) — used in Day view status dropdown
export const STATUS_TINT = {
  Completed: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Scheduled: "bg-blue-50 text-blue-600 ring-blue-200",
  Pending: "bg-amber-50 text-amber-600 ring-amber-200",
  Canceled: "bg-rose-50 text-rose-600 ring-rose-200",
};

// Solid block style — used for Week grid blocks and legend dots
export const STATUS_BLOCK = {
  Completed: "bg-emerald-700",
  Scheduled: "bg-blue-900",
  Pending: "bg-amber-500",
  Canceled: "bg-red-700",
};

export const DEPARTMENTS = ["Cardiology", "Dermatology", "Orthopedics", "Neurology"];
