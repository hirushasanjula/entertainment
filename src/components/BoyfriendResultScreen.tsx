"use client";

import RainbowText from "@/components/RainbowText";

// Reaction screen for the boyfriend count. Different roast per tier.
export default function BoyfriendResultScreen({
  count,
  onContinue,
}: {
  count: number;
  onContinue: () => void;
}) {
  const { emoji, line } =
    count <= 2
      ? {
          emoji: "😇",
          line: "Seems you are loyal, or honest, or good... maybe boring, or I don't know 🤷",
        }
      : count <= 5
        ? { emoji: "😈", line: "Damn, you are a baddie girl!" }
        : {
            emoji: "🔥",
            line: "Damn, you're too much of a baddie girl! Please don't date anyone anymore.",
          };

  return (
    <div className="animate-pop-in relative z-10 max-w-2xl">
      <div className="animate-float mb-6 text-7xl sm:text-9xl">{emoji}</div>
      <p className="mb-2 text-lg font-bold text-white/80">
        You dated{" "}
        <span className="animate-rainbow font-black">{count}</span>{" "}
        {count === 1 ? "boyfriend" : "boyfriends"}
      </p>
      <h1 className="animate-wobble mb-10 text-2xl font-black leading-snug drop-shadow-lg sm:text-4xl">
        <RainbowText text={line} />
      </h1>
      <button
        onClick={onContinue}
        className="hover:animate-jiggle rounded-full bg-white px-8 py-4 text-xl font-black text-pink-600 shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-10 sm:py-5 sm:text-2xl"
      >
        ➡️ Next question
      </button>
    </div>
  );
}
