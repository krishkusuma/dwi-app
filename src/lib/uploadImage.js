import { supabase } from "./supabaseClient";
import { compressImage } from "./imageCompression";

/**
 * Upload gambar ke Supabase Storage, setelah dikompres & dikonversi ke WebP.
 * @param {File} file - file gambar asli dari input
 * @param {"large"|"small"} size - preset kompresi, default "large"
 * @returns {Promise<string|null>} public URL hasil upload, atau null kalau gagal
 */
export async function uploadImage(file, size = "large") {
  const compressedFile = await compressImage(file, size);

  // Nama file selalu .webp karena compressImage mengonversi ke format itu
  // (kecuali fallback gagal kompresi, di kasus itu ekstensi asli dipakai).
  const isWebp = compressedFile.type === "image/webp";
  const fileExt = isWebp ? "webp" : file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("invitation-images")
    .upload(fileName, compressedFile);

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data } = supabase.storage
    .from("invitation-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}