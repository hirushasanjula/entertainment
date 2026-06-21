"use client";

type Props = {
  text: string;
  className?: string;
};

// Renders each letter with a staggered rainbow + bounce so the whole
// line shimmers like a chaotic carnival sign. Words stay grouped so the
// text can still wrap to multiple lines on narrow / mobile screens.
export default function RainbowText({ text, className = "" }: Props) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, w) => {
        const node = (
          <span key={w} className="inline-block whitespace-nowrap" aria-hidden>
            {word.split("").map((char) => {
              const delay = charIndex * 0.06;
              charIndex += 1;
              return (
                <span
                  key={charIndex}
                  className="animate-rainbow inline-block"
                  style={{ animationDelay: `${delay}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
        charIndex += 1; // account for the space between words
        return (
          <span key={`w-${w}`}>
            {node}
            {w < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}
