import { useLightbox } from "./useLightbox";
import { splitIntoColumns } from "../utils/splitIntoColumns";

/**
 * Logic shared untuk GallerySection, dipakai oleh semua varian template.
 */
export function useGallerySection(images) {
  const lightbox = useLightbox(images.length);
  const columns = splitIntoColumns(images, 2);

  return { ...lightbox, columns };
}