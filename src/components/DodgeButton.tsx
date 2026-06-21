"use client";

import { useRef, useState } from "react";

// A button that refuses to be clicked — it teleports away from the
// pointer/finger and always stays inside the viewport (mobile-safe).
export default function DodgeButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  const runAway = () => {
    const el = ref.current;
    const margin = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = (Math.random() - 0.5) * 320;
    let y = (Math.random() - 0.5) * 220;

    if (el) {
      const rect = el.getBoundingClientRect();
      // Where the button would land if we apply the new offset on top of
      // its current (already-translated) position.
      const baseLeft = rect.left - pos.x;
      const baseTop = rect.top - pos.y;
      const minX = margin - baseLeft;
      const maxX = vw - rect.width - margin - baseLeft;
      const minY = margin - baseTop;
      const maxY = vh - rect.height - margin - baseTop;
      x = Math.min(Math.max(x, minX), maxX);
      y = Math.min(Math.max(y, minY), maxY);
    }

    setPos({ x, y });
    setDodges((d) => d + 1);
  };

  return (
    <button
      ref={ref}
      onMouseEnter={runAway}
      onFocus={runAway}
      onClick={runAway}
      onTouchStart={(e) => {
        // Prevent the tap from also firing a click / scrolling.
        e.preventDefault();
        runAway();
      }}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className={`relative touch-none rounded-full font-bold transition-transform duration-200 ease-out ${className}`}
    >
      {dodges > 4 ? "you can't catch me 😈" : children}
    </button>
  );
}
