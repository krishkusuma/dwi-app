import { Home, Heart, Calendar, BookOpen, Image } from "lucide-react";

// Konfigurasi terpusat untuk BottomNav (sticky footer, icon-only).
// Sama pola dengan menuConfig.js — menambah section Premium nanti
// cukup isi premiumBottomNav, tidak perlu ubah komponen BottomNav.

export const standardBottomNav = [
  { value: "cover", label: "Cover", icon: Home },
  { value: "mempelai", label: "Mempelai", icon: Heart },
  { value: "acara", label: "Acara", icon: Calendar },
  { value: "story", label: "Story", icon: BookOpen },
  { value: "galeri", label: "Galeri", icon: Image },
];

// Diisi nanti saat scoping Premium dimulai, contoh:
// export const premiumBottomNav = [
//   { value: "rsvp", label: "RSVP", icon: CheckCircle },
// ];
export const premiumBottomNav = [];