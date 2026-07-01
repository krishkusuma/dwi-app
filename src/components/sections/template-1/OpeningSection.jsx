import { motion } from "framer-motion";
import { useOpeningSection } from "../core/hooks/useOpeningSection";

export default function OpeningSection({ data, groomName, brideName }) {
  const { formattedDate } = useOpeningSection(data);

  return (
    <motion.div
      id="opening-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-10 bg-white"
    >
      <p className="invitation-opening-label text-sm">{data.weddingText}</p>

      <h2 className="invitation-opening-title font-serif text-3xl my-3">
        {groomName} & {brideName}
      </h2>

      <p className="invitation-opening-tagline italic text-sm mb-4">{data.tagLine}</p>

      {formattedDate && (
        <p className="invitation-opening-date text-base font-medium">{formattedDate}</p>
      )}
    </motion.div>
  );
}
