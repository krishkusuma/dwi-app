import { motion } from "framer-motion";
import { useOpeningSection } from "../core/hooks/useOpeningSection";
import { templateConfig } from "../../../data/templateConfig";

// Delay bertahap per baris teks — video "tampil dulu", baru konten
// muncul satu-satu menyusul, bukan bareng sekaligus.
const fadeInUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function OpeningSection({ data, groomName, brideName }) {
  const { formattedDate } = useOpeningSection(data);
  const hasVideo = Boolean(templateConfig.openingBackgroundVideo);

  return (
    <div
      id="opening-section"
      className={`invitation-opening relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-10 overflow-hidden ${
        hasVideo ? "invitation-opening--video bg-black" : "bg-white"
      }`}
    >
      {hasVideo && (
        <>
          <video
            src={templateConfig.openingBackgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            className="invitation-opening-video absolute inset-0 w-full h-full object-cover"
          />
          <div className="invitation-opening-scrim absolute inset-0" />
        </>
      )}

      <motion.p className="invitation-opening-label relative z-10 text-sm" {...fadeInUp(0.3)}>
        {data.weddingText}
      </motion.p>

      <motion.h2
        className="invitation-opening-title relative z-10 font-serif text-3xl my-3"
        {...fadeInUp(0.6)}
      >
        {groomName} & {brideName}
      </motion.h2>

      <motion.p
        className="invitation-opening-tagline relative z-10 italic text-sm mb-4"
        {...fadeInUp(0.9)}
      >
        {data.tagLine}
      </motion.p>

      {formattedDate && (
        <motion.p
          className="invitation-opening-date relative z-10 text-base font-medium"
          {...fadeInUp(1.2)}
        >
          {formattedDate}
        </motion.p>
      )}
    </div>
  );
}
