import { standardBottomNav, premiumBottomNav } from "../data/bottomNavConfig";

// Pemetaan value section ke id elemen di preview untuk discroll.
// Sama dengan SECTION_SCROLL_TARGETS di App.jsx, tapi cuma untuk 5 section
// yang ada di bottom nav.
const NAV_SCROLL_TARGETS = {
  cover: "hero-section",
  mempelai: "couple-section",
  acara: "event-section",
  story: "story-section",
  galeri: "gallery-section",
};

export default function BottomNav({ isPremiumUser = false }) {
  const navItems = isPremiumUser
    ? [...standardBottomNav, ...premiumBottomNav]
    : standardBottomNav;

  const handleNavClick = (value) => {
    const targetId = NAV_SCROLL_TARGETS[value];
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "white",
        borderTop: "1px solid #e5e4e7",
        padding: "8px 4px",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            onClick={() => handleNavClick(item.value)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              background: "none",
              border: "none",
              padding: "4px 8px",
              cursor: "pointer",
              color: "var(--inv-accent)",
            }}
          >
            <Icon size={20} strokeWidth={1.75} />
            <span style={{ fontSize: "10px" }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
