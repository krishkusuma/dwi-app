// Ornamen/dekorasi visual KHUSUS desain tiap template (bunga, garis, pattern
// background) — BUKAN foto konten (foto pasangan/galeri/dst, itu di templateConfig.js
// dan SAMA untuk semua template).
//
// Jumlah ornamen boleh BERBEDA per template — Template-2 misalnya bisa saja
// cuma punya 5 ornamen, tidak harus sama seperti Template-1. Komponen yang
// memakai ornamen ini WAJIB cek apakah field-nya ada sebelum render <img>,
// supaya tidak muncul broken image kalau template tertentu tidak punya
// ornamen itu.

export const templateAssets = {
  "template-1": {
    // Isi nanti begitu desain Template-1 sudah ditentukan, contoh:
    // heroOrnamentTop: "https://xxxxx.supabase.co/storage/v1/object/public/template-assets/template-1/ornament-top.webp",
    // heroOrnamentBottom: "https://xxxxx.supabase.co/storage/v1/object/public/template-assets/template-1/ornament-bottom.webp",
  },
  "template-2": {
    // Isi nanti, boleh beda jumlah field dari template-1
  },
};

// Default template untuk invitation yang belum/tidak punya templateId
// (misal data lama sebelum sistem template ada).
export const DEFAULT_TEMPLATE_ID = "template-1";

// Helper: ambil satu ornamen tertentu dari template aktif.
// Mengembalikan undefined kalau template tidak punya ornamen itu —
// komponen WAJIB cek sebelum render <img>.
export function getTemplateAsset(templateId, assetKey) {
  const template = templateAssets[templateId] || templateAssets[DEFAULT_TEMPLATE_ID];
  return template?.[assetKey];
}