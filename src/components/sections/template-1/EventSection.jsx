import { motion } from "framer-motion";
import { useEventSection } from "../core/hooks/useEventSection";

export default function EventSection({ items }) {
  const { formattedEvents } = useEventSection(items);

  return (
    <div id="event-section" className="invitation-event min-h-screen flex flex-col justify-center px-5 py-10 border-t">
      {formattedEvents.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="text-center mb-10"
        >
          <h3 className="invitation-event-name font-serif text-2xl mb-2">{event.eventName}</h3>
          <p className="invitation-event-date text-sm">
            {event.day}, {event.formatted}
          </p>
          <p className="invitation-event-date text-sm">{event.eventTime}</p>
          <p className="invitation-event-location text-sm mt-2 font-medium">{event.eventLocation}</p>
          <p className="invitation-event-date text-sm">{event.eventAddress}</p>

          {event.eventMaps && (
            <a
              href={event.eventMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="invitation-event-button inline-block mt-3 px-4 py-1.5 text-xs rounded-full"
            >
              📍 Lihat Lokasi
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}
