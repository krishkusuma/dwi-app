import imageCompression from "browser-image-compression";

// Dua standar kompresi untuk semua field gambar di aplikasi.
// LARGE: foto cover, background, gallery, story, footer — yang ditampilkan besar.
// SMALL: foto profil bundar (mempelai), quote image — yang ditampilkan kecil.
const COMPRESSION_PRESETS = {
  large: {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
  },
  small: {
    maxSizeMB: 0.08,
    maxWidthOrHeight: 500,
    useWebWorker: true,
    fileType: "image/webp",
  },
};

/**
 * Kompres & convert file gambar ke WebP sebelum diupload.
 * @param {File} file - file gambar asli dari input
 * @param {"large"|"small"} size - preset yang dipakai, default "large"
 * @returns {Promise<File>} file hasil kompresi, siap diupload
 */
export async function compressImage(file, size = "large") {
  const preset = COMPRESSION_PRESETS[size] || COMPRESSION_PRESETS.large;

  try {
    const compressedFile = await imageCompression(file, preset);
    return compressedFile;
  } catch (error) {
    console.error("Kompresi gambar gagal, upload file asli sebagai fallback:", error);
    // Fallback: kalau kompresi gagal (misal format tidak didukung),
    // tetap lanjutkan upload file asli daripada gagal total.
    return file;
  }
}