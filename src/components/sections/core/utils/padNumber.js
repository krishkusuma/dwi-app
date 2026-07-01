/**
 * Tambah leading zero, mis. 5 -> "05".
 * @param {number} n
 * @returns {string}
 */
 export function padNumber(n) {
  return String(n).padStart(2, "0");
}