import { motion } from "framer-motion";
import { useWishSection } from "../core/hooks/useWishSection";

export default function WishSection({ data, invitationId }) {
  const {
    wishName,
    setWishName,
    wishContent,
    setWishContent,
    submitting,
    submitted,
    error,
    submitWish,
    wishes,
    loadingWishes,
    hasMore,
    loadMore,
  } = useWishSection(invitationId);

  return (
    <div
      id="wish-section"
      className="invitation-wish min-h-screen flex flex-col justify-center items-center px-5 py-10 border-t text-center"
    >
      <h3 className="invitation-wish-heading font-serif text-2xl mb-3">{data.wishHeading}</h3>
      <p className="invitation-wish-content text-sm mb-6 max-w-md">{data.wishContent}</p>

      {data.wishFormEnabled &&
        (submitted ? (
          <p className="invitation-wish-thanks text-sm font-medium mb-8">
            Terima kasih atas ucapan dan doanya.
          </p>
        ) : (
          <div className="invitation-wish-form w-full max-w-sm space-y-3 mb-8">
            <input
              type="text"
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              placeholder="Nama Anda"
              className="invitation-wish-input w-full px-4 py-2 text-sm rounded-full"
            />
            <textarea
              value={wishContent}
              onChange={(e) => setWishContent(e.target.value.slice(0, 512))}
              placeholder="Tulis ucapan dan doa Anda"
              rows={3}
              className="invitation-wish-textarea w-full px-4 py-2 text-sm rounded-2xl"
            />
            <p className="invitation-wish-char-count text-xs text-right">{wishContent.length}/512</p>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="button"
              onClick={submitWish}
              disabled={!wishName.trim() || !wishContent.trim() || submitting}
              className="invitation-wish-submit-button w-full px-5 py-2 text-xs rounded-full disabled:opacity-50"
            >
              {submitting ? "Mengirim..." : "Kirim Ucapan"}
            </button>
          </div>
        ))}

      <div className="invitation-wish-list w-full max-w-sm space-y-3 text-left">
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="invitation-wish-item p-4 rounded-xl"
          >
            <p className="invitation-wish-item-name text-sm font-semibold">{wish.wish_name}</p>
            <p className="invitation-wish-item-content text-sm mt-1">{wish.wish_content}</p>
          </motion.div>
        ))}
      </div>

      {!loadingWishes && hasMore && (
        <button
          type="button"
          onClick={loadMore}
          className="invitation-wish-load-more text-xs underline mt-4"
        >
          Muat lebih banyak
        </button>
      )}
    </div>
  );
}
