import { useSearchParams, useNavigate } from "react-router-dom";

// Satu komponen untuk handle 3 status: success, pending, failed
// Route: /payment/success, /payment/pending, /payment/failed

export default function PaymentResultPage({ status }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");

  const config = {
    success: {
      icon: "✅",
      title: "Pembayaran Berhasil!",
      message: "Akun kamu sudah aktif. Cek email dan WhatsApp untuk konfirmasi, lalu login untuk mulai buat undangan.",
      color: "green",
      action: { label: "Login Sekarang", path: "/login" },
    },
    pending: {
      icon: "⏳",
      title: "Menunggu Pembayaran",
      message: "Pembayaran kamu sedang diproses. Setelah lunas, akun akan otomatis aktif dan kamu akan mendapat notifikasi via email & WhatsApp.",
      color: "amber",
      action: { label: "Kembali ke Beranda", path: "/" },
    },
    failed: {
      icon: "❌",
      title: "Pembayaran Gagal",
      message: "Pembayaran tidak berhasil diproses. Silakan coba daftar lagi.",
      color: "red",
      action: { label: "Coba Lagi", path: "/register?plan=starter" },
    },
  };

  const current = config[status] || config.failed;

  const colorMap = {
    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", btn: "bg-green-700" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", btn: "bg-amber-700" },
    red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", btn: "bg-red-700" },
  };

  const colors = colorMap[current.color];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className={`${colors.bg} border ${colors.border} rounded-xl p-8 text-center`}>
          <div className="text-5xl mb-4">{current.icon}</div>
          <h1 className={`text-xl font-medium mb-3 ${colors.text}`}>{current.title}</h1>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">{current.message}</p>

          {orderId && (
            <p className="text-xs text-gray-400 mb-6">Order ID: {orderId}</p>
          )}

          <button
            onClick={() => navigate(current.action.path)}
            className={`w-full py-3 ${colors.btn} text-white rounded-lg font-medium text-sm`}
          >
            {current.action.label}
          </button>
        </div>
      </div>
    </div>
  );
}
