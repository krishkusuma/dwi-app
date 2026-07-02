import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
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

  const [slug, setSlug] = useState("");
  const [rsvpList, setRsvpList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [guestList, setGuestList] = useState([]);

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("");
  const [addingGuest, setAddingGuest] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const [copiedGuestId, setCopiedGuestId] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [
        { data: invData },
        { data: rsvpData, error: rsvpError },
        { data: wishData, error: wishError },
        { data: guestData, error: guestError },
      ] = await Promise.all([
        supabase.from("invitations").select("slug").eq("id", invitationId).maybeSingle(),
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
        supabase
          .from("guests")
          .select("id, guest_name, phone_number, guest_token, rsvp_response_id, created_at")
          .eq("invitation_id", invitationId)
          .order("created_at", { ascending: false }),
      ]);

      if (invData) setSlug(invData.slug || "");
      if (!rsvpError) setRsvpList(rsvpData);
      if (!wishError) setWishList(wishData);
      if (!guestError) setGuestList(guestData);
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

  const getGuestLink = (guest) =>
    `${window.location.origin}/u/${slug}?to=${encodeURIComponent(guest.guest_name)}&g=${guest.guest_token}`;

  const copyGuestLink = async (guest) => {
    try {
      await navigator.clipboard.writeText(getGuestLink(guest));
      setCopiedGuestId(guest.id);
      setTimeout(() => setCopiedGuestId(null), 2000);
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  const addGuest = async () => {
    if (!newGuestName.trim()) return;
    setAddingGuest(true);

    const { data, error } = await supabase
      .from("guests")
      .insert({
        invitation_id: invitationId,
        guest_name: newGuestName.trim(),
        phone_number: newGuestPhone.trim() || null,
      })
      .select()
      .single();

    setAddingGuest(false);

    if (!error && data) {
      setGuestList((prev) => [data, ...prev]);
      setNewGuestName("");
      setNewGuestPhone("");
    }
  };

  const deleteGuest = async (guestId) => {
    const { error } = await supabase.from("guests").delete().eq("id", guestId);
    if (!error) {
      setGuestList((prev) => prev.filter((g) => g.id !== guestId));
    }
  };

  const handleCsvImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError("");
    setImporting(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data
          .map((row) => {
            // Terima beberapa variasi nama kolom umum, biar nggak strict soal
            // header CSV harus persis "Nama"/"No HP".
            const name = row.Nama || row.nama || row.name || row.Name || "";
            const phone =
              row["No HP"] || row.no_hp || row.phone || row.Phone || row.telepon || "";
            return {
              invitation_id: invitationId,
              guest_name: String(name).trim(),
              phone_number: String(phone).trim() || null,
            };
          })
          .filter((row) => row.guest_name);

        if (rows.length === 0) {
          setImportError("Tidak ada baris valid. Pastikan CSV punya kolom \"Nama\".");
          setImporting(false);
          e.target.value = "";
          return;
        }

        const { data, error } = await supabase.from("guests").insert(rows).select();

        setImporting(false);
        e.target.value = "";

        if (error) {
          console.error("Gagal import CSV:", error);
          setImportError("Gagal import, coba lagi.");
          return;
        }

        setGuestList((prev) => [...data, ...prev]);
      },
      error: (err) => {
        console.error("Gagal membaca CSV:", err);
        setImportError("Gagal membaca file CSV.");
        setImporting(false);
        e.target.value = "";
      },
    });
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

      <div className="flex gap-2 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("rsvp")}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === "rsvp"
              ? "border-b-2 border-amber-700 text-amber-700"
              : "text-gray-500"
          }`}
        >
          RSVP ({rsvpList.length})
        </button>
        <button
          onClick={() => setActiveTab("wish")}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === "wish"
              ? "border-b-2 border-amber-700 text-amber-700"
              : "text-gray-500"
          }`}
        >
          Wedding Wishes ({wishList.length})
        </button>
        <button
          onClick={() => setActiveTab("guests")}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === "guests"
              ? "border-b-2 border-amber-700 text-amber-700"
              : "text-gray-500"
          }`}
        >
          Daftar Tamu ({guestList.length})
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

      {activeTab === "guests" && (
        <>
          {!slug && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              Undangan ini belum di-publish, jadi link personal belum bisa dibuka tamu.
              Publish dulu lewat halaman Editor.
            </p>
          )}

          {/* Tambah tamu manual */}
          <div className="p-3 border rounded-lg mb-3">
            <p className="text-sm font-medium mb-2">Tambah Tamu</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                placeholder="Nama tamu"
                className="flex-1 px-3 py-2 text-sm border rounded"
              />
              <input
                type="text"
                value={newGuestPhone}
                onChange={(e) => setNewGuestPhone(e.target.value)}
                placeholder="No. HP (opsional)"
                className="flex-1 px-3 py-2 text-sm border rounded"
              />
            </div>
            <button
              onClick={addGuest}
              disabled={!newGuestName.trim() || addingGuest}
              className="text-xs px-3 py-1.5 bg-amber-700 text-white rounded disabled:opacity-50"
            >
              {addingGuest ? "Menambah..." : "+ Tambah Tamu"}
            </button>
          </div>

          {/* Import CSV */}
          <div className="p-3 border rounded-lg mb-4">
            <p className="text-sm font-medium mb-1">Import dari CSV</p>
            <p className="text-xs text-gray-500 mb-2">
              File CSV dengan kolom <code>Nama</code> dan <code>No HP</code> (opsional).
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvImport}
              disabled={importing}
              className="text-xs"
            />
            {importing && <p className="text-xs text-gray-400 mt-1">Mengimpor...</p>}
            {importError && <p className="text-xs text-red-500 mt-1">{importError}</p>}
          </div>

          {/* Daftar tamu */}
          {guestList.length === 0 ? (
            <p className="text-gray-400 text-center">Belum ada tamu ditambahkan.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {guestList.map((g) => (
                <div
                  key={g.id}
                  className="p-3 border rounded-lg flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{g.guest_name}</p>
                    {g.phone_number && (
                      <p className="text-xs text-gray-400">{g.phone_number}</p>
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-1 ${
                        g.rsvp_response_id
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {g.rsvp_response_id ? "Sudah RSVP" : "Belum RSVP"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => copyGuestLink(g)}
                      disabled={!slug}
                      className="text-xs px-3 py-1.5 border rounded disabled:opacity-50"
                    >
                      {copiedGuestId === g.id ? "Copied" : "Copy Link"}
                    </button>
                    <button
                      onClick={() => deleteGuest(g.id)}
                      className="text-xs text-red-500"
                    >
                      Hapus
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
