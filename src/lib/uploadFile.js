import { supabase } from "./supabaseClient";

export async function uploadFile(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("invitation-images")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data } = supabase.storage
    .from("invitation-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}