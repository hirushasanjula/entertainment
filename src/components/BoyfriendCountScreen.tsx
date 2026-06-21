"use client";

import { useState } from "react";
import RainbowText from "@/components/RainbowText";

// Shows the money/partner reaction at the top, then the next question
// (how many boyfriends, 1-10) on the SAME screen — no "okay" button.
// Picking 1 or 2 first asks "Are you sure?" before continuing.
export default function BoyfriendCountScreen({
  choice,
  onSelect,
}: {
  choice: "partner" | "money";
  onSelect: (count: number) => void;
}) {
  const isMoney = choice === "money";
  const [pending, setPending] = useState<number | null>(null);

  const pick = (n: number) => {
    // Low counts (1-2) get a "are you sure?" gate first.
    if (n <= 2) {
      setPending(n);
    } else {
      onSelect(n);
    }
  };

  // ---- Confirmation box for 1 / 2 ----
  if (pending !== null) {
    return (
      <div className="animate-pop-in relative z-10 max-w-2xl">
        <div className="animate-float mb-4 text-6xl sm:text-7xl">🤔</div>
        <h1 className="animate-wobble mb-4 text-2xl font-black leading-snug drop-shadow-lg sm:text-4xl">
          <RainbowText text={`Only ${pending}? Are you sure?`} />
        </h1>
        <p className="mb-10 text-lg font-bold text-white/90 drop-shadow sm:text-xl">
          Be honest now... 👀
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onSelect(pending)}
            className="hover:animate-jiggle rounded-full bg-green-500 px-10 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
          >
            ✅ YES
          </button>
          <button
            onClick={() => setPending(null)}
            className="hover:animate-jiggle rounded-full bg-red-500 px-10 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
          >
            ❌ NO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pop-in relative z-10 max-w-2xl">
      {/* ---- money / partner reaction ---- */}
      <div className="animate-float mb-4 text-6xl sm:text-7xl">
        {isMoney ? "💰" : "❤️"}
      </div>
      <p className="mb-8 text-xl font-black text-yellow-200 drop-shadow sm:text-2xl">
        {isMoney
          ? "I know you love money more than anything! 💰😈"
          : "Looks like you are a true lover! ❤️🥹"}
      </p>

      {/* ---- next question ---- */}
      <p className="mb-4 text-sm font-black uppercase tracking-widest text-cyan-200 drop-shadow">
        👉 Next question 👈
      </p>
      <h1 className="animate-wobble mb-8 text-2xl font-black leading-snug drop-shadow-lg sm:text-3xl">
        <RainbowText text="How many boyfriends have you dated in your life?" />
      </h1>

      <div className="mx-auto grid max-w-md grid-cols-5 gap-3">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => pick(n)}
            style={{ animationDelay: `${n * 0.04}s` }}
            className="animate-pop-in hover:animate-jiggle aspect-square rounded-2xl bg-pink-500 text-xl font-black text-white shadow-lg transition-transform hover:scale-110 hover:bg-pink-400 active:scale-95 sm:text-2xl"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
