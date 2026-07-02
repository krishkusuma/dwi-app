import { useRsvpSection } from "../core/hooks/useRsvpSection";

const ATTENDANCE_OPTIONS = [
  { value: "hadir", label: "Hadir" },
  { value: "ragu", label: "Masih Ragu" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
];

export default function RsvpSection({ data, invitationId }) {
  const {
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
  } = useRsvpSection(invitationId);

  return (
    <div
      id="rsvp-section"
      className="invitation-rsvp min-h-screen flex flex-col justify-center items-center px-5 py-10 border-t text-center"
    >
      <h3 className="invitation-rsvp-heading font-serif text-2xl mb-3">{data.rsvpHeading}</h3>
      <p className="invitation-rsvp-content text-sm mb-6 max-w-md">{data.rsvpContent}</p>

      {submitted ? (
        <p className="invitation-rsvp-thanks text-sm font-medium">
          Terima kasih, konfirmasi kehadiran Anda sudah kami terima.
        </p>
      ) : (
        <div className="invitation-rsvp-form w-full max-w-sm space-y-3">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Nama Anda"
            className="invitation-rsvp-input w-full px-4 py-2 text-sm rounded-full"
          />

          <div className="invitation-rsvp-attendance flex gap-2 justify-center flex-wrap">
            {ATTENDANCE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setAttendance(option.value)}
                className={`invitation-rsvp-attendance-option px-3 py-1.5 text-xs rounded-full border ${
                  attendance === option.value ? "invitation-rsvp-attendance-option--active" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {attendance === "hadir" && (
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="invitation-rsvp-guest-count w-full px-4 py-2 text-sm rounded-full"
            >
              <option value={1}>1 orang</option>
              <option value={2}>2 orang</option>
              <option value={3}>3 orang</option>
            </select>
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="button"
            onClick={submitRsvp}
            disabled={!guestName.trim() || !attendance || submitting}
            className="invitation-rsvp-submit-button w-full px-5 py-2 text-xs rounded-full disabled:opacity-50"
          >
            {submitting ? "Mengirim..." : "Kirim Konfirmasi"}
          </button>
        </div>
      )}
    </div>
  );
}
