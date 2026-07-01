import { motion } from "framer-motion";
import { useCoupleSection } from "../core/hooks/useCoupleSection";

export default function CoupleSection({ data, groomName, brideName }) {
  const { groomInstagramUrl, brideInstagramUrl } = useCoupleSection(data);

  return (
    <motion.div
      id="couple-section"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col justify-center px-5 py-10"
    >
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl mb-2">{data.coupleHeading}</h2>
        <p className="text-sm text-gray-600 max-w-xs mx-auto" style={{ whiteSpace: "pre-line" }}>{data.coupleContent}</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="text-center">
          {data.brideImage_1 && (
            <img
              src={data.brideImage_1}
              alt={brideName}
              className="invitation-couple-image w-24 h-24 object-cover mx-auto mb-3"
            />
          )}
          <h3 className="invitation-couple-name font-serif text-xl mb-1">{brideName}</h3>
          <p className="text-sm">{data.brideFullName}</p>
          <p className="text-sm text-gray-600 mt-1">{data.brideParents}</p>
          {brideInstagramUrl && (
            <a
              href={brideInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="invitation-couple-link text-xs underline mt-2 inline-block"
            >
              Instagram
            </a>
          )}
        </div>
        <div className="text-center">
          {data.groomImage_1 && (
            <img
              src={data.groomImage_1}
              alt={groomName}
              className="invitation-couple-image w-24 h-24 object-cover mx-auto mb-3"
            />
          )}
          <h3 className="invitation-couple-name font-serif text-xl mb-1">{groomName}</h3>
          <p className="text-sm">{data.groomFullName}</p>
          <p className="text-sm text-gray-600 mt-1">{data.groomParents}</p>
          {groomInstagramUrl && (
            <a
              href={groomInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="invitation-couple-link text-xs underline mt-2 inline-block"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
