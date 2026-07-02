import { motion } from "framer-motion";
import { useWeddingGiftSection } from "../core/hooks/useWeddingGiftSection";

export default function WeddingGiftSection({ data, waNumber }) {
  const {
    showAccounts,
    toggleAccounts,
    copiedIndex,
    copyNumber,
    wgName,
    setWgName,
    submitConfirmation,
  } = useWeddingGiftSection(waNumber);

  return (
    <div
      id="wedding-gift-section"
      className="invitation-wedding-gift min-h-screen flex flex-col justify-center items-center px-5 py-10 border-t text-center"
    >
      <h3 className="invitation-wg-heading font-serif text-2xl mb-3">{data.wgHeading}</h3>
      <p className="invitation-wg-content text-sm mb-6 max-w-md">{data.wgContent}</p>

      {!showAccounts ? (
        <button
          onClick={toggleAccounts}
          className="invitation-wg-button px-5 py-2 text-xs rounded-full"
        >
          Klik Di sini
        </button>
      ) : (
        <>
          <div className="invitation-wg-accounts w-full max-w-sm space-y-3 mb-4">
            {data.wgAccounts.map((account, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="invitation-wg-account-card p-4 rounded-xl text-left"
              >
                <p className="invitation-wg-bank-name text-sm font-semibold">{account.bankName}</p>
                <p className="invitation-wg-bank-account text-xs">{account.bankAccount}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="invitation-wg-bank-number text-sm">{account.bankNumber}</p>
                  <button
                    onClick={() => copyNumber(account.bankNumber, index)}
                    className="invitation-wg-copy-button text-xs px-3 py-1 rounded-full"
                  >
                    {copiedIndex === index ? "Copied" : "Copy"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={toggleAccounts}
            className="invitation-wg-hide-button text-xs underline mb-6"
          >
            Sembunyikan
          </button>

          <div className="invitation-wg-form w-full max-w-sm">
            <input
              type="text"
              value={wgName}
              onChange={(e) => setWgName(e.target.value)}
              placeholder="Nama Anda"
              className="invitation-wg-input w-full px-4 py-2 text-sm rounded-full mb-3"
            />
            <button
              onClick={submitConfirmation}
              disabled={!wgName.trim()}
              className="invitation-wg-confirm-button w-full px-5 py-2 text-xs rounded-full disabled:opacity-50"
            >
              Konfirmasi via WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}
