import { useRef, useState } from "react";
import { useQrSection } from "../core/hooks/useQrSection";
import { getGuestName } from "../core/utils/getGuestName";

export default function QRCheckinModal({
  data,
  invitationId,
  guestToken,
  groomName,
  brideName,
  weddingDate,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const guestName = getGuestName();

  const { qrDataUrl, formattedDate, downloadCard, downloading } = useQrSection({
    invitationId,
    guestToken,
    weddingDate,
  });

  // QR Check-in cuma masuk akal untuk tamu yang dikenali (lewat link personal
  // dengan token) — tanpa itu, tidak ada identitas yang bisa di-encode ke QR.
  if (!data.qrEnabled || !guestToken) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="invitation-qr-trigger fixed bottom-20 right-4 z-40 px-4 py-2 text-xs rounded-full shadow-lg"
      >
        QR Check-in
      </button>

      {isOpen && (
        <div className="invitation-qr-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="invitation-qr-modal bg-white rounded-xl max-w-sm w-full overflow-hidden relative">
            <button
              onClick={() => setIsOpen(false)}
              className="invitation-qr-close absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-sm"
              aria-label="Tutup"
            >
              ✕
            </button>

            <div ref={cardRef} className="invitation-qr-card bg-white">
              <p className="invitation-qr-heading text-center py-3 text-sm font-medium">
                {data.qrHeading}
              </p>

              {data.qrImage && (
                <div className="relative">
                  <img src={data.qrImage} alt="" className="w-full h-56 object-cover" />
                  <div className="invitation-qr-image-overlay absolute bottom-0 left-0 right-0 text-center py-4">
                    <p className="invitation-qr-names font-serif text-lg tracking-wide">
                      {groomName?.toUpperCase()} & {brideName?.toUpperCase()}
                    </p>
                    <p className="invitation-qr-date text-xs mt-1">{formattedDate}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between px-5 py-4 gap-3">
                <div className="min-w-0">
                  <p className="invitation-qr-recipient text-xs">
                    Kepada Yth. Bapak/Ibu/Saudara/i
                  </p>
                  <p className="invitation-qr-guest-name font-medium text-base truncate">
                    {guestName || "Nama Tamu"}
                  </p>
                </div>
                {qrDataUrl && (
                  <img
                    src={qrDataUrl}
                    alt="QR Code"
                    className="invitation-qr-code w-20 h-20 shrink-0"
                  />
                )}
              </div>

              <p className="invitation-qr-note text-center text-xs pb-4 px-4">
                Mohon tunjukkan QR Code ini di lokasi acara.
              </p>
            </div>

            <button
              onClick={() => downloadCard(cardRef.current)}
              disabled={downloading}
              className="invitation-qr-download w-full py-3 text-sm font-medium disabled:opacity-50"
            >
              {downloading ? "Memproses..." : "Download e-Invitation"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
