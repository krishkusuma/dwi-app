import { motion } from "framer-motion";

export default function PraySection({ data }) {
  return (
    <motion.div
      id="pray-section"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="invitation-pray flex flex-col items-center justify-center text-center px-6 py-10 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <h2 className="invitation-pray-title font-serif text-2xl mb-4">{data.prayHeading}</h2>
      <p className="invitation-pray-content text-sm leading-relaxed max-w-xs" style={{ whiteSpace: "pre-line" }}>
        {data.prayContent}
      </p>
    </motion.div>
  );
}
