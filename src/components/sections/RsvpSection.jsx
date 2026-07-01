import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

export default function RsvpSection({ data, invitationId }) {
  const [formData, setFormData] = useState({
    guestName: "",
    attendance: "Hadir",
    guestCount: 1,
    wishes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!data.rsvpEnabled) return null;

  const handleSubmit = async () => {
    if (!formData.guestName.trim()) {
      setErrorMsg("Nama wajib diisi");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.from("rsvp_responses").insert({
      invitation_id: invitationId,
      guest_name: formData.guestName,
      attendance: formData.attendance,
      guest_count: formData.guestCount,
      wishes: formData.wishes,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Gagal mengirim, coba lagi.");
      console.error(error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="px-5 py-10 border-t text-center">
        <p className="text-amber-700">Terima kasih sudah konfirmasi! 🎉</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="px-5 py-10 border-t text-center"
    >
      <h3 className="font-serif text-xl mb-2">RSVP & Wishes</h3>
      <p className="text-sm text-gray-500 mb-4">Konfirmasi sebelum {data.rsvpDeadline}</p>

      <div className="border rounded-lg p-4 text-left max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Nama Anda"
          value={formData.guestName}
          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
          className="w-full px-2 py-1.5 border rounded mb-2 text-sm"
        />
        <select
          value={formData.attendance}
          onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
          className="w-full px-2 py-1.5 border rounded mb-2 text-sm"
        >
          <option value="Hadir">Hadir</option>
          <option value="Tidak Hadir">Tidak Hadir</option>
        </select>
        <textarea
          placeholder="Tulis ucapan..."
          value={formData.wishes}
          onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
          className="w-full px-2 py-1.5 border rounded mb-2 text-sm"
        />
        {errorMsg && <p className="text-red-500 text-xs mb-2">{errorMsg}</p>}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-amber-600 text-white py-1.5 rounded text-sm disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </div>
    </motion.div>
  );
}