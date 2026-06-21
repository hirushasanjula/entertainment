"use client";

import RainbowText from "@/components/RainbowText";

// Final screen shown after all the questions — a cheeky sign-off.
export default function OutroScreen() {
  return (
    <div className="animate-pop-in relative z-10 max-w-2xl">
      <div className="animate-float mb-6 text-6xl sm:text-7xl">😏</div>
      <h1 className="animate-wobble mb-8 text-2xl font-black leading-snug drop-shadow-lg sm:text-4xl">
        <RainbowText text="Huh, looks like you're more interesting than I expected. 😏" />
      </h1>
      <p className="mb-6 text-lg font-bold text-white/90 drop-shadow sm:text-xl">
        That&apos;s all for now. More updates are coming soon, so don&apos;t
        waste too much time on this shit. Go do some your own stuff. 😂
      </p>
      <p className="text-lg font-black text-yellow-200 drop-shadow sm:text-xl">
        See you soon — the next update will be even worse. 😈
      </p>
    </div>
  );
}
