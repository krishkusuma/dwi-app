import { getGuestName } from "../utils/getGuestName";
import { getTemplateAsset } from "../../../../data/templateAssets";

/**
 * Logic shared untuk HeroSection, dipakai oleh semua varian template.
 * Setiap template/HeroSection.jsx tinggal pakai hook ini untuk dapat
 * data yang sudah diproses, lalu bebas menentukan tampilannya sendiri.
 */
export function useHeroSection(templateId) {
  const guestName = getGuestName();
  const ornamentTop = getTemplateAsset(templateId, "heroOrnamentTop");

  return { guestName, ornamentTop };
}