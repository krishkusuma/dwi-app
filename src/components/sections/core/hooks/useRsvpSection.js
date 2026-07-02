import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export function useRsvpSection(invitationId) {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitRsvp = async () => {
    if (!guestName.trim() || !attendance) return;

    setSubmitting(true);
    setError("");

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
    error,
    submitRsvp,
  };
}