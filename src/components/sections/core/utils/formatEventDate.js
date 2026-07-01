import { formatDate } from "./formatDate";

const DAY_NAMES = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",
];

/**
 * Format tanggal acara, mengembalikan nama hari + tanggal terformat.
 * @param {string} dateStr - tanggal ISO, mis. "2026-12-31"
 * @returns {{day: string, formatted: string}}
 */
export function formatEventDate(dateStr) {
  if (!dateStr) return { day: "", formatted: "" };

  const d = new Date(dateStr);
  const day = DAY_NAMES[d.getDay()];
  const formatted = formatDate(dateStr);

  return { day, formatted };
}