/**
 * Hitung selisih waktu sekarang ke targetDate.
 * @param {Date} targetDate
 * @returns {{total: number, days: number, hours: number, minutes: number, seconds: number}}
 */
 export function getTimeLeft(targetDate) {
  const total = targetDate.getTime() - new Date().getTime();

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds };
}