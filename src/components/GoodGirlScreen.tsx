"use client";

import RainbowText from "@/components/RainbowText";
import DodgeButton from "@/components/DodgeButton";

// Shown only when the user picked "female". The "YES, good girl" button
// runs all over the screen and can never be clicked — the only real choice
// is "NO, bad girl", which continues to the quiz.
export default function GoodGirlScreen({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="animate-pop-in relative z-10 max-w-2xl">
      <div className="animate-float mb-4 text-6xl sm:text-7xl">😇</div>
      <h1 className="animate-wobble mb-10 text-3xl font-black leading-snug drop-shadow-lg sm:text-5xl">
        <RainbowText text="Are you a good girl?" />
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <DodgeButton className="bg-green-500 px-10 py-4 text-xl text-white shadow-2xl sm:px-12 sm:py-5 sm:text-2xl">
          😇 YES, good girl
        </DodgeButton>
        <button
          onClick={onContinue}
          className="hover:animate-jiggle rounded-full bg-red-500 px-10 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
        >
          😈 NO, bad girl
        </button>
      </div>
      <p className="mt-8 text-sm font-bold text-white/70">
        (good luck clicking YES 😏)
      </p>
    </div>
  );
}
