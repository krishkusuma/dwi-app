import { motion } from "framer-motion";

export default function FooterSection({ data, groomName, brideName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="invitation-footer min-h-screen flex flex-col items-center justify-center text-center px-6 py-10"
    >
      {data.footerImage && (
        <img
          src={data.footerImage}
          alt={`${groomName} & ${brideName}`}
          className="invitation-footer-image w-full h-56 object-cover mb-6"
        />
      )}

      <p className="invitation-footer-content text-sm leading-relaxed max-w-xs mb-6" style={{ whiteSpace: "pre-line" }}>
        {data.footerContent}
      </p>

      <h2 className="invitation-footer-title font-serif text-2xl">
        {groomName} & {brideName}
      </h2>
    </motion.div>
  );
}
