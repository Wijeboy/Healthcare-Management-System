const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Returns everything needed to render a month calendar grid for the given
 * year/month (month is 0-indexed, matching JS Date).
 */
export function getMonthMeta(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay(); // 0 = Sunday
  const label = `${MONTH_NAMES[month]} ${year}`;
  return { year, month, daysInMonth, startWeekday, label };
}

/** Shifts a {year, month} pair by `delta` months (can be negative). */
export function shiftMonth(year, month, delta) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

/** Formats a Date as "YYYY-MM-DD" (matches the `date` field on mock records). */
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Builds an ISO date string from separate year/month(0-idx)/day parts. */
export function buildISODate(year, month, day) {
  return toISODate(new Date(year, month, day));
}

export function formatLongDate(year, month, day) {
  const date = new Date(year, month, day);
  return `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[month]} ${day}, ${year}`;
}

const SHORT_MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const SHORT_DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/** Adds `n` days to a Date, returning a new Date (doesn't mutate the input). */
export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** Monday of the week containing `date` (Mon-first week). */
export function getWeekStart(date) {
  const d = new Date(date);
  const jsDay = d.getDay(); // 0 = Sun
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
  return addDays(d, diffToMonday);
}

/** Returns 6 Date objects, Monday through Saturday, for the week containing `date`. */
export function getWeekDays(date) {
  const monday = getWeekStart(date);
  return Array.from({ length: 6 }, (_, i) => addDays(monday, i));
}

/** "Oct 23 - Oct 28, 2026" style label for a Mon-Sat week. */
export function formatWeekLabel(mondayDate, saturdayDate) {
  const startStr = `${SHORT_MONTH_NAMES[mondayDate.getMonth()]} ${mondayDate.getDate()}`;
  const endStr = `${SHORT_MONTH_NAMES[saturdayDate.getMonth()]} ${saturdayDate.getDate()}`;
  return `${startStr} - ${endStr}, ${saturdayDate.getFullYear()}`;
}

/** "MON 23" style short label for a single day column header. */
export function formatShortDayLabel(date) {
  return `${SHORT_DAY_NAMES[date.getDay()]} ${date.getDate()}`;
}

export function isSameDate(date, year, month, day) {
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

export { MONTH_NAMES, DAY_NAMES };
