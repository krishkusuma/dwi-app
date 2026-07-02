import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { toPng } from "html-to-image";

/**
 * QR yang di-generate berisi URL /checkin?inv=...&g=... — route ini BELUM
 * dibangun (menyusul di fitur scanner nanti). Encode-nya disiapkan dari
 * sekarang biar QR yang sudah tersebar ke tamu tidak perlu di-generate ulang
 * begitu scanner-nya jadi.
 */
export function useQrSection({ invitationId, guestToken, weddingDate }) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function generateQr() {
      if (!invitationId || !guestToken) return;

      const checkinUrl = `${window.location.origin}/checkin?inv=${invitationId}&g=${guestToken}`;

      try {
        const dataUrl = await QRCode.toDataURL(checkinUrl, {
          width: 300,
          margin: 1,
        });
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error("Gagal generate QR code:", err);
      }
    }
    generateQr();
  }, [invitationId, guestToken]);

  // weddingDate tersimpan format ISO (YYYY-MM-DD), tapi tampilan yang diminta
  // format "DD . MM . YYYY" seperti di desain.
  const formattedDate = (() => {
    if (!weddingDate) return "";
    const [y, m, d] = weddingDate.split("-");
    if (!y || !m || !d) return "";
    return `${d} . ${m} . ${y}`;
  })();

  const downloadCard = async (cardNode) => {
    if (!cardNode) return;
    setDownloading(true);

    try {
      const dataUrl = await toPng(cardNode, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "e-invitation.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal download e-invitation:", err);
    }

    setDownloading(false);
  };

  return { qrDataUrl, formattedDate, downloadCard, downloading };
}