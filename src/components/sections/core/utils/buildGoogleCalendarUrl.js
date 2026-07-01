import { padNumber } from "./padNumber";

// Format Date jadi YYYYMMDDTHHmmSSZ yang dibutuhkan Google Calendar URL
function toGCalDateTime(dateStr, timeStr) {
  // dateStr: "2026-12-31", timeStr contoh: "08:00 WIB"
  const cleanTime = (timeStr || "00:00").replace(/[^\d:]/g, ""); // ambil "08:00" saja
  const [hour = "00", minute = "00"] = cleanTime.split(":");
  const d = new Date(dateStr);
  d.setHours(Number(hour), Number(minute), 0);

  return (
    d.getFullYear() +
    padNumber(d.getMonth() + 1) +
    padNumber(d.getDate()) +
    "T" +
    padNumber(d.getHours()) +
    padNumber(d.getMinutes()) +
    "00"
  );
}

/**
 * Bangun URL "Add to Google Calendar" dari data acara pertama.
 * @param {object|undefined} firstEvent - item pertama dari data.events
 * @returns {string|null} URL Google Calendar, atau null kalau tidak ada acara
 */
export function buildGoogleCalendarUrl(firstEvent) {
  if (!firstEvent) return null;

  const start = toGCalDateTime(firstEvent.eventDate, firstEvent.eventTime);
  // Default durasi 2 jam kalau tidak ada jam selesai
  const startDate = new Date(firstEvent.eventDate);
  const endGuess = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  const end = toGCalDateTime(
    endGuess.toISOString().slice(0, 10),
    firstEvent.eventTime
  );

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: firstEvent.eventName || "Acara Pernikahan",
    dates: `${start}/${end}`,
    location: `${firstEvent.eventLocation || ""}, ${firstEvent.eventAddress || ""}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}