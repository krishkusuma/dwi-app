import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const ATTENDANCE_LABELS = {
  hadir: "Hadir",
  ragu: "Masih Ragu",
  tidak_hadir: "Tidak Hadir",
};

export default function GuestManagementPage() {
  const { invitationId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("rsvp");
  const [loading, setLoading] = useState(true);

  const [rsvpList, setRsvpList] = useState([]);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [{ data: rsvpData, error: rsvpError }, { data: wishData, error: wishError }] =
        await Promise.all([
          supabase
            .from("rsvp_responses")
            .select("id, guest_name, attendance, guest_count, created_at")
            .eq("invitation_id", invitationId)
            .order("created_at", { ascending: false }),
          supabase
            .from("wishes")
            .select("id, wish_name, wish_content, wish_date, wish_status")
            .eq("invitation_id", invitationId)
            .order("wish_date", { ascending: false }),
        ]);

      if (!rsvpError) setRsvpList(rsvpData);
      if (!wishError) setWishList(wishData);
      setLoading(false);
    }
    loadData();
  }, [invitationId]);

  const toggleWishStatus = async (wishId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    const { error } = await supabase
      .from("wishes")
      .update({ wish_status: newStatus })
      .eq("id", wishId);

    if (!error) {
      setWishList((prev) =>
        prev.map((w) => (w.id === wishId ? { ...w, wish_status: newStatus } : w))
      );
    }
  };

  const attendanceCounts = rsvpList.reduce(
    (acc, r) => {
      acc[r.attendance] = (acc[r.attendance] || 0) + 1;
      if (r.attendance === "hadir") acc.totalGuests += r.guest_count || 1;
      return acc;
    },
    { hadir: 0, ragu: 0, tidak_hadir: 0, totalGuests: 0 }
  );

  if (loading) {
    return <div className="p-6 text-center text-gray-400">Memuat data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="text-sm text-gray-500 underline mb-4"
      >
        ← Dashboard
      </button>

      <h1 className="text-xl font-medium mb-6">Tamu &amp; Ucapan</h1>

      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("rsvp")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "rsvp"
              ? "border-b-2 border-amber-700 text-amber-700"
              : "text-gray-500"
          }`}
        >
          RSVP ({rsvpList.length})
        </button>
        <button
          onClick={() => setActiveTab("wish")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "wish"
              ? "border-b-2 border-amber-700 text-amber-700"
              : "text-gray-500"
          }`}
        >
          Wedding Wishes ({wishList.length})
        </button>
      </div>

      {activeTab === "rsvp" && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 border rounded-lg text-center">
              <p className="text-2xl font-medium text-green-700">{attendanceCounts.hadir}</p>
              <p className="text-xs text-gray-500">Hadir ({attendanceCounts.totalGuests} orang)</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-2xl font-medium text-amber-700">{attendanceCounts.ragu}</p>
              <p className="text-xs text-gray-500">Masih Ragu</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-2xl font-medium text-gray-500">{attendanceCounts.tidak_hadir}</p>
              <p className="text-xs text-gray-500">Tidak Hadir</p>
            </div>
          </div>

          {rsvpList.length === 0 ? (
            <p className="text-gray-400 text-center">Belum ada yang RSVP.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {rsvpList.map((r) => (
                <div
                  key={r.id}
                  className="p-3 border rounded-lg flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{r.guest_name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.created_at).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.attendance === "hadir"
                          ? "bg-green-100 text-green-700"
                          : r.attendance === "ragu"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {ATTENDANCE_LABELS[r.attendance]}
                    </span>
                    {r.attendance === "hadir" && (
                      <p className="text-xs text-gray-400 mt-1">{r.guest_count} orang</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "wish" && (
        <>
          {wishList.length === 0 ? (
            <p className="text-gray-400 text-center">Belum ada ucapan.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {wishList.map((w) => (
                <div key={w.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{w.wish_name}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        w.wish_status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {w.wish_status === "published" ? "● Published" : "○ Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{w.wish_content}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {new Date(w.wish_date).toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => toggleWishStatus(w.id, w.wish_status)}
                      className={`text-xs px-3 py-1.5 rounded font-medium ${
                        w.wish_status === "published"
                          ? "border border-gray-400 text-gray-600"
                          : "bg-amber-700 text-white"
                      }`}
                    >
                      {w.wish_status === "published" ? "Sembunyikan" : "Approve"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
