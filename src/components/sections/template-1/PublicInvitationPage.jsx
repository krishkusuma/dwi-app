import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import HeroSection from "../components/sections/template-1/HeroSection";
import OpeningSection from "../components/sections/template-1/OpeningSection";
import QuoteSection from "../components/sections/template-1/QuoteSection";
import CoupleSection from "../components/sections/template-1/CoupleSection";
import CountdownSection from "../components/sections/template-1/CountdownSection";
import EventSection from "../components/sections/template-1/EventSection";
import StorySection from "../components/sections/template-1/StorySection";
import GallerySection from "../components/sections/template-1/GallerySection";
import PraySection from "../components/sections/template-1/PraySection";
import InviteSection from "../components/sections/template-1/InviteSection";
import FooterSection from "../components/sections/template-1/FooterSection";
import WeddingGiftSection from "../components/sections/template-1/WeddingGiftSection";
import RsvpSection from "../components/sections/template-1/RsvpSection";
import WishSection from "../components/sections/template-1/WishSection";
import StickyMusic from "../components/StickyMusic";
import BottomNav from "../components/BottomNav";
import { templateConfig } from "../data/templateConfig";
import { DEFAULT_TEMPLATE_ID } from "../data/templateAssets";

import {
  heroDefaultData,
  openingDefaultData,
  quoteDefaultData,
  coupleDefaultData,
  countdownDefaultData,
  eventDefaultData,
  storyDefaultData,
  galleryDefaultData,
  prayDefaultData,
  inviteDefaultData,
  footerDefaultData,
  wgDefaultData,
  generalDefaultData,
  rsvpDefaultData,
  wishDefaultData,
} from "../data/schemas";

export default function PublicInvitationPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const guestToken = searchParams.get("g");

  const [data, setData] = useState({
    hero: heroDefaultData,
    opening: openingDefaultData,
    quote: quoteDefaultData,
    couple: coupleDefaultData,
    countdown: countdownDefaultData,
    events: eventDefaultData,
    story: storyDefaultData,
    gallery: galleryDefaultData,
    pray: prayDefaultData,
    invite: inviteDefaultData,
    footer: footerDefaultData,
    general: generalDefaultData,
    weddingGift: wgDefaultData,
    rsvp: rsvpDefaultData,
    wish: wishDefaultData,
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE_ID);
  const [invitationId, setInvitationId] = useState(null);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCardOpened, setIsCardOpened] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const openCard = () => {
    setIsCardOpened(true);

    if (templateConfig.backgroundMusic && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    setTimeout(() => {
      document
        .getElementById("opening-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    async function loadData() {
      // RLS mengizinkan akses publik HANYA kalau status = 'published',
      // jadi query ini otomatis gagal/kosong untuk invitation draft.
      const { data: result, error } = await supabase
        .from("invitations")
        .select("id, data, template_id, status")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error || !result) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setInvitationId(result.id);
      setTemplateId(result.template_id || DEFAULT_TEMPLATE_ID);

      setData((prev) => ({
        hero: { ...prev.hero, ...result.data.hero },
        opening: { ...prev.opening, ...result.data.opening },
        quote: { ...prev.quote, ...result.data.quote },
        couple: { ...prev.couple, ...result.data.couple },
        countdown: { ...prev.countdown, ...result.data.countdown },
        events: result.data.events ?? prev.events,
        story: { ...prev.story, ...result.data.story },
        gallery: { ...prev.gallery, ...result.data.gallery },
        pray: { ...prev.pray, ...result.data.pray },
        invite: { ...prev.invite, ...result.data.invite },
        footer: { ...prev.footer, ...result.data.footer },
        general: { ...prev.general, ...result.data.general },
        weddingGift: { ...prev.weddingGift, ...result.data.weddingGift },
        rsvp: { ...prev.rsvp, ...result.data.rsvp },
        wish: { ...prev.wish, ...result.data.wish },
      }));

      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return <div className="p-6 text-center text-gray-400">Memuat undangan...</div>;
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-xl font-medium mb-2">Undangan tidak ditemukan</h1>
        <p className="text-sm text-gray-500">
          Link ini mungkin salah ketik, atau undangan belum dipublikasikan.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex bg-gray-100 min-h-screen">
      {/* Section A — desktop only, background desktopImage. TIDAK pakai breakpoint
          manual (hidden lg:block) — flex-1 otomatis mengecil seiring sisa ruang
          menipis, dan benar-benar 0 lebar saat layar persis 448px (lebar card),
          jadi transisinya halus, bukan lompatan tiba-tiba di satu breakpoint. */}
      <div
        className="flex-1 h-screen sticky top-0"
        style={{
          backgroundImage: data.hero.desktopImage
            ? `url(${data.hero.desktopImage})`
            : undefined,
          backgroundColor: "#1f2937",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Card undangan, lebar diatur di style maxWidth (bukan class Tailwind
          arbitrary value), tiap section min-h-screen */}
      <div
        className={`relative w-full bg-white ${templateId}`}
        style={{ maxWidth: "570px" }}
      >
        {templateConfig.backgroundMusic && (
          <audio ref={audioRef} src={templateConfig.backgroundMusic} loop />
        )}

        {isCardOpened && (
          <StickyMusic
            isPlaying={isPlaying}
            toggleMusic={toggleMusic}
            hasMusic={!!templateConfig.backgroundMusic}
          />
        )}

        <HeroSection data={data.hero} onOpenCard={openCard} templateId={templateId} />

        {isCardOpened && (
          <>
            <OpeningSection
              data={data.opening}
              groomName={data.hero.groomName}
              brideName={data.hero.brideName}
            />
            <QuoteSection data={data.quote} />
            <CoupleSection
              data={data.couple}
              groomName={data.hero.groomName}
              brideName={data.hero.brideName}
            />
            <CountdownSection
              data={data.countdown}
              firstEvent={data.events[0]}
              weddingDate={data.opening.weddingDate}
            />
            <EventSection items={data.events} />
            <AnimatePresence>
              {data.story.storyEnabled && <StorySection key="story" data={data.story} />}
            </AnimatePresence>
            <GallerySection images={data.gallery.images} />
            <AnimatePresence>
              {data.pray.prayEnabled && <PraySection key="pray" data={data.pray} />}
            </AnimatePresence>
            <InviteSection data={data.invite} />
            <FooterSection
              data={data.footer}
              groomName={data.hero.groomName}
              brideName={data.hero.brideName}
            />
            <AnimatePresence>
              {data.weddingGift.wgEnabled && (
                <WeddingGiftSection
                  key="weddingGift"
                  data={data.weddingGift}
                  waNumber={data.general.waNumber}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {data.rsvp.rsvpEnabled && (
                <RsvpSection
                  key="rsvp"
                  data={data.rsvp}
                  invitationId={invitationId}
                  guestToken={guestToken}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {data.wish.wishEnabled && (
                <WishSection key="wish" data={data.wish} invitationId={invitationId} />
              )}
            </AnimatePresence>
            <BottomNav />
          </>
        )}
      </div>
    </div>
  );
}
