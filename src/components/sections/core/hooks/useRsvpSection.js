import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export function useRsvpSection(invitationId, guestToken) {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyResponded, setAlreadyResponded] = useState(false);
  const [error, setError] = useState("");

  // isGuestMode: true kalau token di URL valid dan cocok sama tamu terdaftar.
  // Kalau token tidak ada / tidak valid, form otomatis fallback ke mode anonim
  // biasa (perilaku sama seperti sebelum fitur Guest List ada).
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [checkingGuest, setCheckingGuest] = useState(!!guestToken);

  useEffect(() => {
    async function checkGuest() {
      if (!guestToken || !invitationId) {
        setCheckingGuest(false);
        return;
      }

      const { data, error: rpcError } = await supabase
        .rpc("get_guest_by_token", {
          p_invitation_id: invitationId,
          p_token: guestToken,
        })
        .maybeSingle();

      if (rpcError || !data) {
        // Token tidak ketemu/tidak valid — bukan error fatal, cukup anggap
        // tamu ini anonim (link mungkin salah ketik atau kadaluarsa).
        setIsGuestMode(false);
        setCheckingGuest(false);
        return;
      }

      setIsGuestMode(true);
      setGuestName(data.guest_name);
      if (data.already_responded) {
        setAlreadyResponded(true);
      }
      setCheckingGuest(false);
    }
    checkGuest();
  }, [invitationId, guestToken]);

  const submitRsvp = async () => {
    if (!guestName.trim() || !attendance) return;

    setSubmitting(true);
    setError("");

    if (isGuestMode) {
      // Mode tamu dikenali: submit lewat function khusus yang atomic,
      // anti-race-condition, dan otomatis nolak kalau sudah pernah RSVP.
      const { data, error: rpcError } = await supabase
        .rpc("submit_guest_rsvp", {
          p_invitation_id: invitationId,
          p_token: guestToken,
          p_attendance: attendance,
          p_guest_count: guestCount,
        })
        .maybeSingle();

      setSubmitting(false);

      if (rpcError || !data?.success) {
        if (data?.message?.includes("sudah pernah")) {
          setAlreadyResponded(true);
        } else {
          console.error("Gagal mengirim RSVP (guest mode):", rpcError || data?.message);
          setError(data?.message || "Gagal mengirim RSVP, coba lagi.");
        }
        return;
      }

      setSubmitted(true);
      return;
    }

    // Mode anonim — perilaku sama seperti sebelum fitur Guest List ada.
    const { error: insertError } = await supabase.from("rsvp_responses").insert({
      invitation_id: invitationId,
      guest_name: guestName.trim(),
      attendance,
      guest_count: attendance === "hadir" ? guestCount : null,
    });

    setSubmitting(false);

    if (insertError) {
      console.error("Gagal mengirim RSVP:", insertError);
      setError("Gagal mengirim RSVP, coba lagi.");
      return;
    }

    setSubmitted(true);
  };

  return {
    guestName,
    setGuestName,
    attendance,
    setAttendance,
    guestCount,
    setGuestCount,
    submitting,
    submitted,
    alreadyResponded,
    error,
    isGuestMode,
    checkingGuest,
    submitRsvp,
  };
}