"use client";

import RainbowText from "@/components/RainbowText";

// "Looks like you're interested..." screen with the male / female choice.
// Selecting male/female is handled by the parent (which saves to the DB
// and decides where to go next).
export default function GenderScreen({
  onSelect,
}: {
  onSelect: (gender: "male" | "female") => void;
}) {
  return (
    <div className="animate-pop-in relative z-10 max-w-2xl">
      <div className="animate-float mb-4 text-6xl sm:text-7xl">👀</div>
      <h1 className="animate-wobble mb-4 text-2xl font-black leading-snug drop-shadow-lg sm:text-4xl">
        <RainbowText text="Looks like you're interested — that's why you keep coming!" />
      </h1>
      <p className="mb-10 text-lg font-bold text-white/90 drop-shadow sm:text-xl">
        Quick question before we get stupid... who are you? 🤔
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <button
          onClick={() => onSelect("male")}
          className="hover:animate-jiggle rounded-full bg-blue-500 px-10 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
        >
          👨 MALE
        </button>
        <button
          onClick={() => onSelect("female")}
          className="hover:animate-jiggle rounded-full bg-pink-500 px-10 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
        >
          👩 FEMALE
        </button>
      </div>
    </div>
  );
}
