import { motion } from "framer-motion";

export default function RundownSection({ data }) {
  return (
    <div
      id="rundown-section"
      className="invitation-rundown min-h-screen flex flex-col justify-center px-5 py-10 border-t"
    >
      <h3 className="invitation-rundown-heading font-serif text-2xl text-center mb-8">
        {data.rundownHeading}
      </h3>

      <div className="invitation-rundown-list max-w-sm mx-auto w-full">
        {data.rundownItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="invitation-rundown-item flex gap-4 pb-5"
          >
            <p className="invitation-rundown-time text-sm font-semibold w-20 shrink-0">
              {item.rundownTime}
            </p>
            <p className="invitation-rundown-info text-sm">{item.rundownInfo}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
