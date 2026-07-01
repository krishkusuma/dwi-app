import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" atau "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registeredMessage, setRegisteredMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRegisteredMessage("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        setError("Email atau password salah.");
        return;
      }
      navigate("/dashboard");
    } else {
      const { data: signUpData, error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }

      if (signUpData.session) {
        // Confirm email sudah dimatikan di Supabase — signUp langsung
        // memberi session aktif, jadi tidak perlu cek email sama sekali.
        navigate("/dashboard");
      } else {
        // Confirm email masih aktif — user benar-benar perlu klik link di email.
        setRegisteredMessage(
          "Akun berhasil dibuat! Cek email untuk konfirmasi sebelum login."
        );
        setMode("login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border rounded-lg p-6">
        <h1 className="text-xl font-serif text-center mb-6">
          {mode === "login" ? "Masuk" : "Daftar Akun"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          {registeredMessage && (
            <p className="text-sm text-green-600 mb-3">{registeredMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-amber-700 text-white rounded text-sm"
          >
            {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {mode === "login" ? (
            <>
              Belum punya akun?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-amber-700 underline"
              >
                Daftar di sini
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-amber-700 underline"
              >
                Masuk di sini
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
