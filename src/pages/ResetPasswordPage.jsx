import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState(false);

  useEffect(() => {
    // Supabase otomatis handle token dari URL hash saat halaman load.
    // Kita cek apakah session valid (user sudah klik link dari email).
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setValidSession(true);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError("Gagal update password. Link mungkin sudah expired, coba minta ulang.");
      return;
    }

    setSuccess(true);

    // Otomatis redirect ke login setelah 3 detik
    setTimeout(() => navigate("/login"), 3000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white border rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-xl font-serif mb-3">Password Berhasil Diubah</h1>
          <p className="text-sm text-gray-600 mb-6">
            Kamu akan otomatis diarahkan ke halaman login dalam 3 detik...
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 bg-amber-700 text-white rounded text-sm"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  if (!validSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white border rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-sm text-gray-500">Memverifikasi link reset password...</p>
          <p className="text-xs text-gray-400 mt-2">
            Kalau halaman ini tidak berubah,{" "}
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-amber-700 underline"
            >
              minta link baru
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border rounded-lg p-6">
        <h1 className="text-xl font-serif text-center mb-2">Reset Password</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Masukkan password baru kamu.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Password Baru</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Konfirmasi Password Baru</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru"
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-amber-700 text-white rounded text-sm"
          >
            {loading ? "Memproses..." : "Simpan Password Baru"}
          </button>
        </form>
      </div>
    </div>
  );
}
