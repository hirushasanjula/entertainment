"use client";

// Small fixed back button shown on every screen except the first one.
export default function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      aria-label="Go back"
      className="hover:animate-jiggle fixed left-3 top-3 z-50 flex items-center gap-1 rounded-full bg-black/40 px-4 py-2 text-sm font-black text-white shadow-lg backdrop-blur-md transition-transform hover:scale-110 active:scale-95 sm:left-5 sm:top-5 sm:text-base"
    >
      ⬅️ Back
    </button>
  );
}
