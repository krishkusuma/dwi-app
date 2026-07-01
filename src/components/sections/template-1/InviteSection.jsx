import { motion } from "framer-motion";

export default function InviteSection({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="invitation-invite min-h-screen flex flex-col items-center justify-center text-center px-6 py-10"
    >
      <h2 className="invitation-invite-title font-serif text-2xl mb-4">{data.inviteHeading}</h2>
      <p className="invitation-invite-content text-sm leading-relaxed max-w-xs" style={{ whiteSpace: "pre-line" }}>
        {data.inviteContent}
      </p>
    </motion.div>
  );
}
