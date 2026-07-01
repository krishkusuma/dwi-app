import { useState, useEffect } from "react";

/**
 * Logic lightbox generic: buka/tutup, navigasi prev/next, keyboard shortcut.
 * Tampilan lightbox SENGAJA tidak diatur di sini — itu urusan komponen
 * template, supaya tiap template bebas desain lightbox-nya sendiri.
 * @param {number} itemCount - total jumlah item (untuk wrap-around navigasi)
 */
export function useLightbox(itemCount) {
  const [activeIndex, setActiveIndex] = useState(null); // null = lightbox tertutup

  const openAt = (index) => setActiveIndex(index);
  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i - 1 + itemCount) % itemCount);
  const showNext = () => setActiveIndex((i) => (i + 1) % itemCount);

  // Navigasi via keyboard saat lightbox terbuka
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, itemCount]);

  return { activeIndex, openAt, close, showPrev, showNext };
}