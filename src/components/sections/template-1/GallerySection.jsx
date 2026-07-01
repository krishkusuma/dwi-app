import { motion, AnimatePresence } from "framer-motion";
import { useGallerySection } from "../core/hooks/useGallerySection";

export default function GallerySection({ images }) {
  const { activeIndex, openAt, close, showPrev, showNext, columns } =
    useGallerySection(images);

  if (images.length === 0) return null;

  return (
    <motion.div
      id="gallery-section"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="invitation-gallery min-h-screen flex flex-col justify-center px-5 py-10 border-t"
    >
      <h3 className="invitation-gallery-title font-serif text-xl text-center mb-4">Our Gallery</h3>

      <div className="flex gap-2">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-2">
            {column.map((item) => (
              <img
                key={item.index}
                src={item.url}
                alt={`Foto ${item.index + 1}`}
                onClick={() => openAt(item.index)}
                className="invitation-gallery-image w-full object-cover cursor-pointer"
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/90 flex items-center justify-center px-4"
            style={{ zIndex: 10000 }}
          >
            {/* Tombol close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center"
              aria-label="Tutup"
            >
              ×
            </button>

            {/* Tombol prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 text-white text-3xl w-10 h-10 flex items-center justify-center"
              aria-label="Foto sebelumnya"
            >
              ‹
            </button>

            {/* Foto aktif */}
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`Foto ${activeIndex + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[80vh] object-contain rounded"
            />

            {/* Tombol next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 text-white text-3xl w-10 h-10 flex items-center justify-center"
              aria-label="Foto berikutnya"
            >
              ›
            </button>

            {/* Counter posisi */}
            <p className="absolute bottom-4 text-white text-xs">
              {activeIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
