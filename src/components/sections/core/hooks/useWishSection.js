import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../../lib/supabaseClient";

const PAGE_SIZE = 5;

export function useWishSection(invitationId) {
  const [wishName, setWishName] = useState("");
  const [wishContent, setWishContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [wishes, setWishes] = useState([]);
  const [loadingWishes, setLoadingWishes] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadWishes = useCallback(
    async (pageToLoad) => {
      const from = pageToLoad * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error: fetchError } = await supabase
        .from("wishes")
        .select("id, wish_name, wish_content, wish_date")
        .eq("invitation_id", invitationId)
        .eq("wish_status", "published")
        .order("wish_date", { ascending: false })
        .range(from, to);

      if (fetchError) {
        console.error("Gagal memuat ucapan:", fetchError);
        setLoadingWishes(false);
        return;
      }

      setWishes((prev) => (pageToLoad === 0 ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
      setLoadingWishes(false);
    },
    [invitationId]
  );

  useEffect(() => {
    setLoadingWishes(true);
    setPage(0);
    loadWishes(0);
  }, [invitationId, loadWishes]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadWishes(nextPage);
  };

  const submitWish = async () => {
    if (!wishName.trim() || !wishContent.trim()) return;

    setSubmitting(true);
    setError("");

    const { error: insertError } = await supabase.from("wishes").insert({
      invitation_id: invitationId,
      wish_name: wishName.trim(),
      wish_content: wishContent.trim(),
    });

    setSubmitting(false);

    if (insertError) {
      console.error("Gagal mengirim ucapan:", insertError);
      setError("Gagal mengirim ucapan, coba lagi.");
      return;
    }

    setSubmitted(true);
    setWishName("");
    setWishContent("");
  };

  return {
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
  };
}