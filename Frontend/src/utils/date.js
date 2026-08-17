const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SHORT_DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function getMonthMeta(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay();
  return { year, month, daysInMonth, startWeekday, label: `${MONTH_NAMES[month]} ${year}` };
}

export function shiftMonth(year, month, delta) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function buildISODate(year, month, day) {
  return toISODate(new Date(year, month, day));
}

export function formatLongDate(year, month, day) {
  const date = new Date(year, month, day);
  return `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[month]} ${day}, ${year}`;
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function getWeekStart(date) {
  const d = new Date(date);
  const jsDay = d.getDay();
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
  return addDays(d, diffToMonday);
}

export function getWeekDays(date) {
  const monday = getWeekStart(date);
  return Array.from({ length: 6 }, (_, i) => addDays(monday, i));
}

export function formatWeekLabel(mondayDate, saturdayDate) {
  const startStr = `${SHORT_MONTH_NAMES[mondayDate.getMonth()]} ${mondayDate.getDate()}`;
  const endStr = `${SHORT_MONTH_NAMES[saturdayDate.getMonth()]} ${saturdayDate.getDate()}`;
  return `${startStr} - ${endStr}, ${saturdayDate.getFullYear()}`;
}

export function formatShortDayLabel(date) {
  return `${SHORT_DAY_NAMES[date.getDay()]} ${date.getDate()}`;
}

export function isSameDate(date, year, month, day) {
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

export { MONTH_NAMES, DAY_NAMES };
