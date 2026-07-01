import { useCountdown } from "./useCountdown";
import { buildGoogleCalendarUrl } from "../utils/buildGoogleCalendarUrl";

/**
 * Logic shared untuk CountdownSection, dipakai oleh semua varian template.
 */
export function useCountdownSection(firstEvent, weddingDate) {
  const { timeLeft, isFinished } = useCountdown(weddingDate);
  const calendarUrl = buildGoogleCalendarUrl(firstEvent);

  return { timeLeft, isFinished, calendarUrl };
}