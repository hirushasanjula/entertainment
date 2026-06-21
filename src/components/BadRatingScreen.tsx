"use client";

import { useState } from "react";
import RainbowText from "@/components/RainbowText";

// Shown after "NO, bad girl". Pick 1-10:
//   • 1-4  → "don't lie" + rate again (loops back to the grid)
//   • 5-10 → "Damn, you are SO bad!" followed by the $1,000,000 dilemma
// `onRate` fires when a number is picked; `onChoose` fires when the dilemma
// is answered (the parent then shows a dedicated result screen).
export default function BadRatingScreen({
  onRate,
  onChoose,
}: {
  onRate?: (rating: number) => void;
  onChoose?: (choice: "partner" | "money") => void;
}) {
  const [rating, setRating] = useState<number | null>(null);

  const pickRating = (n: number) => {
    setRating(n);
    onRate?.(n);
  };

  const isBad = rating !== null && rating > 4;

  return (
    <div className="animate-pop-in relative z-10 max-w-2xl">
      <div className="animate-float mb-4 text-6xl sm:text-7xl">😈</div>

      {/* The "Rate 1-10" heading only shows while still choosing a number. */}
      {rating === null && (
        <h1 className="animate-wobble mb-8 text-2xl font-black leading-snug drop-shadow-lg sm:text-4xl">
          <RainbowText text="Rate 1-10: how bad are you?" />
        </h1>
      )}

      {/* ---- Number grid ---- */}
      {rating === null && (
        <div className="mx-auto grid max-w-md grid-cols-5 gap-3">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => pickRating(n)}
              style={{ animationDelay: `${n * 0.04}s` }}
              className="animate-pop-in hover:animate-jiggle aspect-square rounded-2xl bg-purple-500 text-xl font-black text-white shadow-lg transition-transform hover:scale-110 hover:bg-purple-400 active:scale-95 sm:text-2xl"
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {/* ---- Low rating (1-4): reject + rate again ---- */}
      {rating !== null && !isBad && (
        <div className="animate-pop-in">
          <p className="mb-2 text-lg font-bold text-white/80">
            You picked{" "}
            <span className="animate-rainbow font-black">{rating}/10</span>
          </p>
          <p className="mb-8 text-2xl font-black text-yellow-200 drop-shadow sm:text-3xl">
            🙄 Don&apos;t lie — I know you are way more bad than that!
          </p>
          <button
            onClick={() => setRating(null)}
            className="hover:animate-jiggle rounded-full bg-red-500 px-8 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-10 sm:py-5 sm:text-2xl"
          >
            🔁 rate again (be honest 😏)
          </button>
        </div>
      )}

      {/* ---- High rating (5-10): "so bad" + the $1,000,000 dilemma ---- */}
      {isBad && (
        <div className="animate-pop-in">
          <p className="mb-2 text-lg font-bold text-white/80">
            You rated yourself{" "}
            <span className="animate-rainbow font-black">{rating}/10</span>
          </p>
          <p className="mb-6 text-2xl font-black text-yellow-200 drop-shadow sm:text-3xl">
            😈 Damn, you are SO bad!
          </p>

          <p className="mb-4 text-sm font-black uppercase tracking-widest text-cyan-200 drop-shadow">
            👉 Next question 👈
          </p>

          <h2 className="mb-8 text-xl font-black leading-snug text-white drop-shadow sm:text-2xl">
            If You can get $1,000,000 right now, but you have to break up with your
            boyfriend. What do you choose?
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => onChoose?.("partner")}
              className="hover:animate-jiggle rounded-full bg-pink-500 px-10 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
            >
              ❤️ My partner
            </button>
            <button
              onClick={() => onChoose?.("money")}
              className="hover:animate-jiggle rounded-full bg-amber-400 px-10 py-4 text-xl font-black text-black shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
            >
              💰 The money
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
