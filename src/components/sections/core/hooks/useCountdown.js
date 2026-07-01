import { useState, useEffect } from "react";
import { getTimeLeft } from "../utils/getTimeLeft";

/**
 * Hook timer countdown live, update tiap detik.
 * @param {string} targetDateStr - tanggal ISO target, mis. data.weddingDate
 * @returns {{timeLeft: object, isFinished: boolean}}
 */
export function useCountdown(targetDateStr) {
  const targetDate = targetDateStr ? new Date(targetDateStr) : null;

  const [timeLeft, setTimeLeft] = useState(
    targetDate
      ? getTimeLeft(targetDate)
      : { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  );

  useEffect(() => {
    if (!targetDate) return;

    // Update sekali langsung saat mount, supaya tidak nunggu 1 detik untuk tampilan pertama
    setTimeLeft(getTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  const isFinished = targetDate && timeLeft.total <= 0;

  return { timeLeft, isFinished };
}