import { buildInstagramUrl } from "../utils/buildInstagramUrl";

/**
 * Logic shared untuk CoupleSection, dipakai oleh semua varian template.
 */
export function useCoupleSection(data) {
  const groomInstagramUrl = data.groomIG ? buildInstagramUrl(data.groomIG) : null;
  const brideInstagramUrl = data.brideIG ? buildInstagramUrl(data.brideIG) : null;

  return { groomInstagramUrl, brideInstagramUrl };
}