import { formatEventDate } from "../utils/formatEventDate";

/**
 * Logic shared untuk EventSection, dipakai oleh semua varian template.
 * Mengembalikan list acara dengan tanggal yang sudah diformat.
 */
export function useEventSection(items) {
  const formattedEvents = items.map((event) => ({
    ...event,
    ...formatEventDate(event.eventDate),
  }));

  return { formattedEvents };
}