import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://app.remonial.com/reset-password",
    });

    setLoading(false);

    if (error) {
      setError("Gagal mengirim email. Pastikan email sudah terdaftar.");
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white border rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">📧</div>
          <h1 className="text-xl font-serif mb-3">Cek Email Kamu</h1>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Link reset password sudah dikirim ke <strong>{email}</strong>.
            Cek inbox (dan folder spam) kamu.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 bg-amber-700 text-white rounded text-sm"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border rounded-lg p-6">
        <h1 className="text-xl font-serif text-center mb-2">Lupa Password</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Masukkan email kamu dan kami akan kirim link untuk reset password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-amber-700 text-white rounded text-sm"
          >
            {loading ? "Mengirim..." : "Kirim Link Reset Password"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Ingat password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-amber-700 underline"
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
}
