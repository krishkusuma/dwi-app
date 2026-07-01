// Konfigurasi terpusat untuk dropdown selector di frame editor.
// Menambah section baru (termasuk nanti untuk Premium) cukup menambah
// entri di sini — tidak perlu ubah struktur dropdown atau render logic.

export const standardMenuSections = [
  { value: "cover", label: "Cover" },
  { value: "pembuka", label: "Pembuka" },
  { value: "mempelai", label: "Mempelai" },
  { value: "countdown", label: "Countdown" },
  { value: "acara", label: "Acara" },
  { value: "story", label: "Our Story" },
  { value: "galeri", label: "Galeri" },
  { value: "penutup", label: "Penutup" },
];

// Diisi nanti saat scoping Premium dimulai, contoh:
// export const premiumMenuSections = [
//   { value: "rsvp", label: "RSVP" },
// ];
export const premiumMenuSections = [];