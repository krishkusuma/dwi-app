import { createClient } from "@supabase/supabase-js";

// Credentials dibaca dari environment variable (bukan hardcode di kode),
// supaya aman saat kode di-push ke GitHub (tidak ada credentials yang bocor).
//
// Di StackBlitz (development): buat file .env di root project, isi:
//   VITE_SUPABASE_URL=https://ypytpxpxektrftpeaiyi.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key-here
//
// Di Cloudflare Pages (production): isi lewat dashboard
//   Workers & Pages > dwi-app > Settings > Environment Variables

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);