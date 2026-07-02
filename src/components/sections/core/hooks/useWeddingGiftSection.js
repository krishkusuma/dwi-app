import { useState } from "react";

export function useWeddingGiftSection(waNumber) {
  const [showAccounts, setShowAccounts] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [wgName, setWgName] = useState("");

  const toggleAccounts = () => setShowAccounts((prev) => !prev);

  const copyNumber = async (bankNumber, index) => {
    try {
      await navigator.clipboard.writeText(bankNumber);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Gagal menyalin nomor rekening:", err);
    }
  };

  const submitConfirmation = () => {
    if (!wgName.trim() || !waNumber) return;

    const text = `Hai, saya ${wgName} ingin konfirmasi pemberian hadiah. Terima kasih.`;
    const cleanNumber = waNumber.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return {
    showAccounts,
    toggleAccounts,
    copiedIndex,
    copyNumber,
    wgName,
    setWgName,
    submitConfirmation,
  };
}