/**
 * Generate slug URL-safe dari nama mempelai.
 * Contoh: "Andi" + "Sinta" -> "andi-sinta"
 * @param {string} groomName
 * @param {string} brideName
 * @returns {string}
 */
 export function generateSlug(groomName, brideName) {
  const combined = `${groomName}-${brideName}`;

  return combined
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // hapus diakritik (é -> e, dst)
    .replace(/[^a-z0-9\s-]/g, "")    // hapus karakter selain huruf/angka/spasi/dash
    .trim()
    .replace(/\s+/g, "-")            // spasi jadi dash
    .replace(/-+/g, "-");            // dash berulang jadi satu
}