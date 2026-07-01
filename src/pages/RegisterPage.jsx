import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Definisi paket yang tersedia
const PLANS = {
  starter: {
    name: "Starter",
    price: 90000,
    priceFormatted: "Rp 90.000",
    features: [
      "Semua section Standard (Hero s/d Footer)",
      "1 Template eksklusif",
      "Kompresi foto otomatis",
      "Link undangan publik",
      "Musik latar",
      "Galeri foto (max 12)",
    ],
  },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan") || "starter";

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsapp: "",
  });

  const [plan] = useState(planFromUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [snapLoaded, setSnapLoaded] = useState(false);

  const selectedPlan = PLANS[plan] || PLANS.starter;

  // Load Midtrans Snap.js
  useEffect(() => {
    const midtransEnv = import.meta.env.VITE_MIDTRANS_ENV || "sandbox";
    const snapUrl = midtransEnv === "production"
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.onload = () => setSnapLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Load Cloudflare Turnstile
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Callback global untuk Turnstile
    window.turnstileCallback = (token) => {
      setTurnstileToken(token);
    };

    return () => {
      document.head.removeChild(script);
      delete window.turnstileCallback;
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (!form.nama || !form.email || !form.password || !form.whatsapp) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }
    if (!form.whatsapp.match(/^(\+62|62|0)[0-9]{8,13}$/)) {
      setError("Format nomor WhatsApp tidak valid. Contoh: 08123456789");
      return;
    }
    if (!turnstileToken) {
      setError("Silakan selesaikan verifikasi Captcha terlebih dahulu.");
      return;
    }
    if (!snapLoaded) {
      setError("Sistem pembayaran belum siap, coba lagi dalam beberapa detik.");
      return;
    }

    setLoading(true);

    try {
      // Panggil Edge Function create-payment
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            nama: form.nama,
            email: form.email,
            password: form.password,
            whatsapp: form.whatsapp,
            plan: plan,
            price: selectedPlan.price,
            turnstile_token: turnstileToken,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.token) {
        setError(data.error || "Gagal memproses pendaftaran, coba lagi.");
        setLoading(false);
        return;
      }

      // Buka Midtrans Snap popup
      window.snap.pay(data.token, {
        onSuccess: (result) => {
          navigate(`/payment/success?order_id=${data.order_id}`);
        },
        onPending: (result) => {
          navigate(`/payment/pending?order_id=${data.order_id}`);
        },
        onError: (result) => {
          navigate(`/payment/failed?order_id=${data.order_id}`);
        },
        onClose: () => {
          // User menutup popup tanpa bayar
          setLoading(false);
          setError("Pembayaran dibatalkan. Silakan coba lagi.");
        },
      });

    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan, coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-1">Daftar Akun DWI</h1>
          <p className="text-sm text-gray-500">Buat undangan digital pernikahanmu sekarang</p>
        </div>

        {/* Info Paket */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-amber-800">Paket {selectedPlan.name}</span>
            <span className="font-bold text-amber-800">{selectedPlan.priceFormatted}</span>
          </div>
          <ul className="text-sm text-amber-700 space-y-1">
            {selectedPlan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span>✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border p-6">
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama lengkap kamu"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@domain.com"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="08123456789"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Notifikasi pembayaran akan dikirim ke nomor ini
              </p>
            </div>

            {/* Cloudflare Turnstile Captcha */}
            <div className="mb-6">
              <div
                className="cf-turnstile"
                data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                data-callback="turnstileCallback"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-700 text-white rounded-lg font-medium text-sm"
            >
              {loading ? "Memproses..." : `Daftar & Bayar ${selectedPlan.priceFormatted}`}
            </button>

          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Sudah punya akun?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-amber-700 underline"
            >
              Login di sini
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Pembayaran aman diproses oleh Midtrans 🔒
        </p>
      </div>
    </div>
  );
}
