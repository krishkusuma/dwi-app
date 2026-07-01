import { useState, useEffect, useRef } from "react";
import { supabase } from "./lib/supabaseClient";
import FieldRenderer from "./components/FieldRenderer";
import SectionSelector from "./components/SectionSelector";
import HeroSection from "./components/sections/HeroSection";
import OpeningSection from "./components/sections/OpeningSection";
import QuoteSection from "./components/sections/QuoteSection";
import CoupleSection from "./components/sections/CoupleSection";
import CountdownSection from "./components/sections/CountdownSection";
import EventSection from "./components/sections/EventSection";
import StorySection from "./components/sections/StorySection";
import RepeaterEditor from "./components/RepeaterEditor";
import GalleryEditor from "./components/GalleryEditor";
import GallerySection from "./components/sections/GallerySection";
import PraySection from "./components/sections/PraySection";
import InviteSection from "./components/sections/InviteSection";
import FooterSection from "./components/sections/FooterSection";
import StickyMusic from "./components/StickyMusic";
import BottomNav from "./components/BottomNav";
import { templateConfig } from "./data/templateConfig";

const INVITATION_ID = "demo-andi-sinta";

import { 
  heroFields, heroDefaultData, 
  openingFields, openingDefaultData,
  quoteFields, quoteDefaultData,
  coupleFields, coupleDefaultData,
  countdownFields, countdownDefaultData,
  eventItemFields, eventDefaultData,
  storySettingsFields, storyItemFields, storyDefaultData,
  galleryDefaultData,
  prayFields, prayDefaultData,
  inviteFields, inviteDefaultData,
  footerFields, footerDefaultData,
} from "./data/schemas";

// Pemetaan dari "value" dropdown ke id elemen section di preview,
// dipakai untuk auto-scroll saat klien ganti pilihan dropdown.
const SECTION_SCROLL_TARGETS = {
  cover: "hero-section",
  pembuka: "opening-section",
  mempelai: "couple-section",
  countdown: "countdown-section",
  acara: "event-section",
  story: "story-section",
  galeri: "gallery-section",
  penutup: "pray-section",
};

export default function App() {
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
  });
  const [loading, setLoading] = useState(true);

  // Section mana yang sedang dipilih di dropdown editor.
  const [activeSection, setActiveSection] = useState("cover");

  // Frame editor kiri bisa di-collapse untuk full preview.
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);

  // State musik diangkat ke level App supaya OpeningSection & StickyMusic
  // bisa kontrol elemen <audio> yang sama, terlepas dari posisi scroll.
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // isCardOpened: false = hanya Hero yang tampil, scroll terkunci.
  // true = setelah klik "Buka Undangan", section lain muncul di bawah Hero,
  // halaman auto-scroll ke Opening, musik play. Scroll ke atas tetap bisa
  // balik melihat Hero lagi (Hero TIDAK pernah dihapus dari DOM).
  // Juga otomatis true kalau klien sedang mengedit section selain "cover",
  // supaya section yang diedit selalu terlihat di preview tanpa perlu klik dulu.
  const [isCardOpened, setIsCardOpened] = useState(false);

  useEffect(() => {
    if (activeSection !== "cover") {
      setIsCardOpened(true);
    }
  }, [activeSection]);

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

    // Klik tombol = interaksi user, jadi browser pasti izinkan play audio di sini
    // (beda dengan autoplay murni saat page load yang sering diblokir).
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

  // Setiap kali activeSection berubah, scroll preview ke section yang sesuai.
  const handleSectionChange = (newSection) => {
    setActiveSection(newSection);

    setTimeout(() => {
      const targetId = SECTION_SCROLL_TARGETS[newSection];
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // Catatan: scroll terkunci secara natural selagi section lain belum dirender
  // (isCardOpened masih false) — Hero sendiri cuma setinggi 1 viewport (min-h-screen),
  // jadi tidak ada apapun untuk di-scroll. Kita TIDAK memanipulasi document.body.style.overflow
  // di sini karena itu merusak position:sticky pada kolom editor (body jadi scrolling
  // container-nya sendiri, bukan lagi viewport/html).

  useEffect(() => {
    async function loadData() {
      const { data: result, error } = await supabase
        .from("invitations")
        .select("data")
        .eq("id", INVITATION_ID)
        .maybeSingle();

      if (result) {
        // Merge supaya field baru di schema (mis. errGuestName) tetap punya
        // nilai default walau data lama di Supabase belum punya key tersebut.
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
        }));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (loading) return; // jangan save selagi masih loading data awal
  
    async function saveData() {
      await supabase
        .from("invitations")
        .upsert({ id: INVITATION_ID, data: data, updated_at: new Date() });
    }
  
    const timer = setTimeout(saveData, 1000); // debounce 1 detik
    return () => clearTimeout(timer);
  }, [data]);

  const handleChange = (section, key, value) => {
    setData({
      ...data,
      [section]: {
        ...data[section],
        [key]: value,
      },
    });
  };
  
  if (loading) {
    return <div className="p-6 text-center text-gray-400">Memuat data...</div>;
  }

  return (
    <div className="flex gap-8 p-6 font-sans">
      {!isEditorCollapsed && (
        <div
          className="flex-1 max-w-xs"
          style={{
            position: "sticky",
            top: "24px",
            alignSelf: "flex-start",
            maxHeight: "calc(100vh - 48px)",
            overflowY: "auto",
          }}
        >
          <SectionSelector value={activeSection} onChange={handleSectionChange} />

          {activeSection === "cover" && (
            <>
              <h4 className="mb-4 font-medium">Edit Cover</h4>
              {heroFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.hero[field.key]}
                  onChange={(key, value) => handleChange("hero", key, value)}
                />
              ))}
            </>
          )}

          {activeSection === "pembuka" && (
            <>
              <h4 className="mb-4 font-medium">Opening</h4>
              {openingFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.opening[field.key]}
                  onChange={(key, value) => handleChange("opening", key, value)}
                />
              ))}

              <h4 className="mb-4 mt-8 font-medium">Quote</h4>
              {quoteFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.quote[field.key]}
                  onChange={(key, value) => handleChange("quote", key, value)}
                />
              ))}
            </>
          )}

          {activeSection === "mempelai" && (
            <>
              <h4 className="mb-4 font-medium">Edit Mempelai</h4>
              {coupleFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.couple[field.key]}
                  onChange={(key, value) => handleChange("couple", key, value)}
                />
              ))}
            </>
          )}

          {activeSection === "countdown" && (
            <>
              <h4 className="mb-4 font-medium">Edit Countdown</h4>
              {countdownFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.countdown[field.key]}
                  onChange={(key, value) => handleChange("countdown", key, value)}
                />
              ))}
            </>
          )}

          {activeSection === "acara" && (
            <>
              <h4 className="mb-4 font-medium">Edit Acara</h4>
              <RepeaterEditor
                items={data.events}
                itemFields={eventItemFields}
                itemLabel="Acara"
                onChange={(newItems) => setData({ ...data, events: newItems })}
              />
            </>
          )}

          {activeSection === "story" && (
            <>
              <h4 className="mb-4 font-medium">Edit Our Story</h4>
              {storySettingsFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.story[field.key]}
                  onChange={(key, value) => handleChange("story", key, value)}
                />
              ))}
              <RepeaterEditor
                items={data.story.stories}
                itemFields={storyItemFields}
                itemLabel="Cerita"
                maxItems={5}
                onChange={(newItems) =>
                  setData({ ...data, story: { ...data.story, stories: newItems } })
                }
              />
            </>
          )}

          {activeSection === "galeri" && (
            <>
              <h4 className="mb-4 font-medium">Edit Galeri</h4>
              <GalleryEditor
                images={data.gallery.images}
                onChange={(newImages) => setData({ ...data, gallery: { ...data.gallery, images: newImages } })}
              />
            </>
          )}

          {activeSection === "penutup" && (
            <>
              <h4 className="mb-4 font-medium">Doa untuk Pengantin</h4>
              {prayFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.pray[field.key]}
                  onChange={(key, value) => handleChange("pray", key, value)}
                />
              ))}

              <h4 className="mb-4 mt-8 font-medium">Turut Mengundang</h4>
              {inviteFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.invite[field.key]}
                  onChange={(key, value) => handleChange("invite", key, value)}
                />
              ))}

              <h4 className="mb-4 mt-8 font-medium">Footer</h4>
              {footerFields.map((field) => (
                <FieldRenderer
                  key={field.key}
                  field={field}
                  value={data.footer[field.key]}
                  onChange={(key, value) => handleChange("footer", key, value)}
                />
              ))}
            </>
          )}
        </div>
      )}

      <div className="flex-1 border rounded-lg p-5 relative">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-gray-500">Preview</h4>
          <button
            onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
            className="text-xs px-3 py-1.5 border rounded"
            title={isEditorCollapsed ? "Tampilkan editor" : "Sembunyikan editor (full preview)"}
          >
            {isEditorCollapsed ? "⟨⟨ Tampilkan Editor" : "⟩⟩ Full Preview"}
          </button>
        </div>

        <div className="relative flex justify-center bg-gray-100 min-h-screen">
          {/* Section A — desktop only, background desktopImage, hidden di mobile */}
          <div
            className="hidden lg:block fixed left-0 top-0 h-screen"
            style={{
              width: "calc(50% - 224px)", // sisa ruang di kiri max-w-md (448px / 2 = 224px)
              backgroundImage: data.hero.desktopImage
                ? `url(${data.hero.desktopImage})`
                : undefined,
              backgroundColor: "#1f2937",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Section B — isi undangan, max-w-md, tiap section min-h-screen */}
          <div className="relative w-full max-w-md bg-white">
            {/* Elemen audio tunggal untuk seluruh halaman, dikontrol via audioRef.
                Sumber musik hardcode di templateConfig, bukan diisi klien. */}
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

            <HeroSection data={data.hero} onOpenCard={openCard} />

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
                <StorySection data={data.story} />
                <GallerySection images={data.gallery.images} />
                <PraySection data={data.pray} />
                <InviteSection data={data.invite} />
                <FooterSection
                  data={data.footer}
                  groomName={data.hero.groomName}
                  brideName={data.hero.brideName}
                />
                <BottomNav />
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
