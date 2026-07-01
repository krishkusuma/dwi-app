import { motion } from "framer-motion";

export default function QuoteSection({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="invitation-quote min-h-screen flex flex-col items-center justify-center text-center px-6 py-10"
    >
      <h2 className="invitation-quote-title font-serif text-2xl mb-6">{data.quoteHeading}</h2>

      {data.quoteImage && (
        <img
          src={data.quoteImage}
          alt={data.quoteHeading}
          className="invitation-quote-image w-32 h-32 object-cover mb-6"
        />
      )}

      <p className="invitation-quote-content text-sm leading-relaxed max-w-xs" style={{ whiteSpace: "pre-line" }}>
        {data.quoteContent}
      </p>
    </motion.div>
  );
}
