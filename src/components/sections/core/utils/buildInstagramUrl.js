/**
 * Bangun URL Instagram lengkap dari username yang diketik user.
 * Membersihkan karakter "@" di depan kalau user tetap mengetiknya.
 * @param {string} username - username Instagram, dengan atau tanpa "@"
 * @returns {string} URL lengkap, mis. "https://instagram.com/budi_santoso"
 */
 export function buildInstagramUrl(username) {
  return `https://instagram.com/${username.replace(/^@/, "")}`;
}