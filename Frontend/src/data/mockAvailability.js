export const AVAILABILITY_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const AVAILABILITY_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

export const AVAILABILITY_STATUSES = ["Available", "Booked", "Blocked"];

export const AVAILABILITY_TINT = {
  Available: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  Booked: "bg-blue-50 text-blue-600 ring-blue-200",
  Blocked: "bg-slate-100 text-slate-400 ring-slate-200",
};

// key: "Monday-8" -> status. Anything not listed defaults to "Available".
export const mockAvailabilityOverrides = {
  "Monday-8": "Booked",
  "Monday-9": "Booked",
  "Monday-12": "Blocked",
  "Wednesday-8": "Booked",
  "Wednesday-10": "Booked",
  "Wednesday-13": "Booked",
  "Wednesday-12": "Blocked",
  "Thursday-9": "Booked",
  "Friday-11": "Booked",
  "Friday-12": "Blocked",
  "Saturday-8": "Blocked",
  "Saturday-9": "Blocked",
  "Saturday-10": "Blocked",
  "Saturday-11": "Blocked",
  "Saturday-12": "Blocked",
  "Saturday-13": "Blocked",
  "Saturday-14": "Blocked",
  "Saturday-15": "Blocked",
  "Saturday-16": "Blocked",
};
