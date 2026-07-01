export default function StickyMusic({ isPlaying, toggleMusic, hasMusic }) {
  if (!hasMusic) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50vh",
        right: "12px",
        transform: "translateY(-50%)",
        zIndex: 9999,
      }}
    >
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Matikan musik" : "Putar musik"}
        className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
        style={{
          border: "1px solid var(--inv-accent)",
          color: "var(--inv-accent)",
        }}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
}
