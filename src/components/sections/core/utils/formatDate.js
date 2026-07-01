/**
 * Format tanggal ISO (YYYY-MM-DD) jadi format DD.MM.YYYY.
 * Dipakai di OpeningSection (weddingDate) dan section lain yang butuh
 * format tanggal konsisten.
 * @param {string} dateStr - tanggal format ISO, mis. "2026-12-31"
 * @returns {string} tanggal terformat, mis. "31.12.2026", atau string kosong kalau dateStr kosong
 */
 export function formatDate(dateStr) {
  if (!dateStr) return "";

  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
}