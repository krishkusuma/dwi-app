import { Home, Heart, Calendar, BookOpen, Image, Gift, Radio } from "lucide-react";

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

// Item di sini HANYA muncul kalau isPremiumUser true DAN section terkait
// enabled (dicek di komponen BottomNav lewat prop enabledSections).
export const premiumBottomNav = [
  { value: "gift", label: "Gift", icon: Gift },
  { value: "livestream", label: "Live", icon: Radio },
];