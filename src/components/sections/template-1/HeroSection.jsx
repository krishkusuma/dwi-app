import { motion } from 'framer-motion';
import { useHeroSection } from '../core/hooks/useHeroSection';

export default function HeroSection({ data, onOpenCard, templateId }) {
  const { guestName, ornamentTop } = useHeroSection(templateId);

  return (
    <motion.div
      id="hero-section"
      key={data.groomName + data.brideName}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="invitation-hero min-h-screen flex items-stretch justify-center"
    >
      {/* Frame luar — area kiri-kanan untuk ornamen/background dekoratif.
          Lebar konten dibatasi oleh invitation-hero-content (lihat bawah),
          sisa ruang di kiri-kanan-nya inilah yang terisi warna/ornamen ini. */}
      <div
        className="invitation-hero-content w-full flex flex-col items-center justify-center text-center px-6 py-10"
        style={{ 
          maxWidth: "500px", 
          borderLeft: "solid 0px #000", 
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          marginTop: "14px", marginBottom: "14px" }}
      >
        {ornamentTop && (
          <motion.img
            src={ornamentTop}
            alt=""
            aria-hidden="true"
            className="w-24 mb-2"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
        )}

        {data.heroImage && (
          <img
            src={data.heroImage}
            alt="Cover"
            className="invitation-hero-image w-full h-48 object-cover mb-4"
          />
        )}

        <motion.p
          className="invitation-hero-label text-3xl"
          initial={{ opacity: 1, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {data.weddingHeading}
        </motion.p>

        <motion.h1 
          className="invitation-hero-title font-serif text-2xl my-2"
          initial={{ 
            scale: 0.7,
            rotate: 180 }}
          animate={{ 
            scale:1,
            rotate: 360 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {data.groomName} & {data.brideName}
        </motion.h1>

        <p className="invitation-hero-recipient text-sm mt-6">
          {data.recipientText}
        </p>
        {guestName && (
          <p className="invitation-hero-guest-name font-medium text-lg mt-1">
            {guestName}
          </p>
        )}
        {data.errGuestName && (
          <p className="invitation-hero-disclaimer text-xs mt-1 italic">
            {data.errGuestName}
          </p>
        )}

        <button
          onClick={onOpenCard}
          className="invitation-hero-button mt-8 px-6 py-2 rounded-full text-sm"
        >
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}
