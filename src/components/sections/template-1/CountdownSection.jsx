import { motion } from "framer-motion";
import { useCountdownSection } from "../core/hooks/useCountdownSection";
import { padNumber } from "../core/utils/padNumber";

export default function CountdownSection({ data, firstEvent, weddingDate }) {
  const { timeLeft, isFinished, calendarUrl } = useCountdownSection(firstEvent, weddingDate);

  return (
    <motion.div
      id="countdown-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="invitation-countdown min-h-screen flex flex-col items-center justify-center text-center px-6 py-10"
    >
      {data.countdownImage && (
        <img
          src={data.countdownImage}
          alt={data.countdownHeading}
          className="invitation-countdown-image w-full h-48 object-cover mb-6"
        />
      )}

      <h2 className="invitation-countdown-title font-serif text-2xl mb-4">{data.countdownHeading}</h2>

      {isFinished ? (
        <p className="invitation-countdown-finished text-sm mb-6">
          Hari yang telah dinanti-nantikan telah tiba 🎉
        </p>
      ) : (
        <div className="flex gap-4 mb-6">
          {[
            { label: "Hari", value: timeLeft.days },
            { label: "Jam", value: timeLeft.hours },
            { label: "Menit", value: timeLeft.minutes },
            { label: "Detik", value: timeLeft.seconds },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div className="invitation-countdown-unit w-14 h-14 flex items-center justify-center font-serif text-xl">
                {padNumber(unit.value)}
              </div>
              <span className="invitation-countdown-unit-label text-xs mt-1">{unit.label}</span>
            </div>
          ))}
        </div>
      )}

      <p className="invitation-countdown-content text-sm leading-relaxed max-w-xs mb-6" style={{ whiteSpace: "pre-line" }}>
        {data.countdownContent}
      </p>

      {calendarUrl && (
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="invitation-countdown-button px-6 py-2 rounded-full text-sm"
        >
          + Add to Google Calendar
        </a>
      )}
    </motion.div>
  );
}
