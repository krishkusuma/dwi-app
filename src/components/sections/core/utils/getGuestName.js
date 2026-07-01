/**
 * Baca nama tamu dari URL query parameter, misal:
 * https://nama-domain.com/?to=Budi+%26+Keluarga
 * Bukan field yang diisi mempelai — ini logic dinamis per-link undangan.
 * @returns {string} nama tamu, atau string kosong kalau tidak ada parameter
 */
 export function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || "";
}