"use client";

import RainbowText from "@/components/RainbowText";

// Shown when the user picks "male" — a cheeky dead-end for now.
export default function MaleScreen() {
  return (
    <div className="animate-pop-in relative z-10 max-w-2xl">
      <div className="animate-float mb-6 text-7xl sm:text-8xl">🙅‍♂️</div>
      <h1 className="animate-wobble text-3xl font-black leading-snug drop-shadow-lg sm:text-5xl">
        <RainbowText text="Coming soon... for now, f*ck off" />
      </h1>
    </div>
  );
}
