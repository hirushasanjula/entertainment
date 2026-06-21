"use client";

import { useEffect, useState } from "react";

type Drop = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  emoji: string;
};

const POOL = ["🎉", "🤪", "🥳", "✨", "💥", "🤡", "🌈", "🔥", "💀", "👽"];

// Spawns a burst of falling emojis whenever `trigger` changes.
// They clean themselves up after the animation finishes.
// When `only` is true, every drop uses `emoji` (no random pool mix).
export default function EmojiRain({
  trigger,
  emoji,
  only = false,
}: {
  trigger: number;
  emoji?: string;
  only?: boolean;
}) {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const batch: Drop[] = Array.from({ length: 28 }, (_, i) => ({
      id: trigger * 1000 + i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.6,
      size: 1.5 + Math.random() * 2.5,
      emoji:
        emoji && (only || Math.random() < 0.5)
          ? emoji
          : POOL[Math.floor(Math.random() * POOL.length)],
    }));
    setDrops(batch);
    const t = setTimeout(() => setDrops([]), 4500);
    return () => clearTimeout(t);
  }, [trigger, emoji, only]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {drops.map((d) => (
        <span
          key={d.id}
          className="animate-fall absolute top-0 select-none"
          style={{
            left: `${d.left}%`,
            fontSize: `${d.size}rem`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}
