import { formatDate } from "../utils/formatDate";

/**
 * Logic shared untuk OpeningSection, dipakai oleh semua varian template.
 */
export function useOpeningSection(data) {
  const formattedDate = formatDate(data.weddingDate);

  return { formattedDate };
}