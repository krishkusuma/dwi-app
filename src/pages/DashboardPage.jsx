import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function loadInvitations() {
      const { data, error } = await supabase
        .from("invitations")
        .select("id, title, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!error) setInvitations(data);
      setLoading(false);
    }
    loadInvitations();
  }, [user.id]);

  const handleCreateNew = async () => {
    setCreating(true);

    const newId = crypto.randomUUID();
    const { error } = await supabase.from("invitations").insert({
      id: newId,
      user_id: user.id,
      title: "Undangan Baru",
      template_id: "template-1", // TODO: ambil dari pilihan klien saat checkout, begitu sistem order ada
      data: {}, // EditorPage akan mengisi dengan default data masing-masing section saat dibuka
    });

    setCreating(false);

    if (!error) {
      navigate(`/editor/${newId}`);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">Undangan Saya</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 underline"
        >
          Logout
        </button>
      </div>

      <button
        onClick={handleCreateNew}
        disabled={creating}
        className="w-full mb-6 py-3 bg-amber-700 text-white rounded-lg text-sm"
      >
        {creating ? "Membuat..." : "+ Buat Undangan Baru"}
      </button>

      {loading ? (
        <p className="text-gray-400 text-center">Memuat...</p>
      ) : invitations.length === 0 ? (
        <p className="text-gray-400 text-center">
          Belum ada undangan. Klik tombol di atas untuk membuat yang pertama.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {invitations.map((inv) => (
            <button
              key={inv.id}
              onClick={() => navigate(`/editor/${inv.id}`)}
              className="text-left p-4 border rounded-lg hover:bg-gray-50"
            >
              <p className="font-medium">{inv.title || "Undangan Tanpa Judul"}</p>
              <p className="text-xs text-gray-400 mt-1">
                Diubah: {new Date(inv.updated_at).toLocaleString("id-ID")}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
