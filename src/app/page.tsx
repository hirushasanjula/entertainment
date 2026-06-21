"use client";

import { useMemo, useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { saveSelection } from "@/lib/saveSelection";
import RainbowText from "@/components/RainbowText";
import EmojiRain from "@/components/EmojiRain";
import DodgeButton from "@/components/DodgeButton";
import GenderScreen from "@/components/GenderScreen";
import GoodGirlScreen from "@/components/GoodGirlScreen";
import BadRatingScreen from "@/components/BadRatingScreen";
import BoyfriendCountScreen from "@/components/BoyfriendCountScreen";
import BoyfriendResultScreen from "@/components/BoyfriendResultScreen";
import OutroScreen from "@/components/OutroScreen";
import BackButton from "@/components/BackButton";

type Stage =
  | "intro"
  | "confirm"
  | "roast"
  | "gender"
  | "goodgirl"
  | "badrate"
  | "boycount"
  | "boyresult"
  | "outro"
  | "playing"
  | "done";

const BUTTON_COLORS = [
  "bg-pink-500 hover:bg-pink-400",
  "bg-purple-500 hover:bg-purple-400",
  "bg-cyan-500 hover:bg-cyan-400",
  "bg-amber-400 hover:bg-amber-300 text-black",
];

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [history, setHistory] = useState<Stage[]>([]);
  const [index, setIndex] = useState(0);
  const [reaction, setReaction] = useState<string | null>(null);
  const [rainTrigger, setRainTrigger] = useState(0);
  const [shake, setShake] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [choice, setChoice] = useState<"partner" | "money" | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const question = QUESTIONS[index];

  // Which emoji should rain down right now. On the boyfriend-count screen it
  // matches the money/partner choice (💰 / ❤️); during the quiz it matches
  // the current question.
  const rainEmoji =
    stage === "boycount" && choice
      ? choice === "money"
        ? "💰"
        : "❤️"
      : question?.emoji;

  const progress = useMemo(
    () => Math.round((index / QUESTIONS.length) * 100),
    [index]
  );

  // Navigate forward, remembering where we came from so Back can return.
  const go = (to: Stage) => {
    setHistory((h) => [...h, stage]);
    setStage(to);
    setRainTrigger((t) => t + 1);
  };

  // Step back to the previous screen.
  const back = () => {
    if (history.length === 0) return;
    setStage(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
    setRainTrigger((t) => t + 1);
  };

  const start = () => {
    setIndex(0);
    setReaction(null);
    go("playing");
  };

  const chooseGender = (choice: "male" | "female") => {
    setGender(choice);
    saveSelection(choice); // persist to MongoDB (fire-and-forget)
    if (choice === "female") {
      go("goodgirl");
    } else {
      start();
    }
  };

  const answer = () => {
    setReaction(question.reaction);
    setRainTrigger((t) => t + 1);
    setShake(true);
    setTimeout(() => setShake(false), 450);
  };

  const next = () => {
    setReaction(null);
    if (index + 1 >= QUESTIONS.length) {
      go("done");
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <main className="animated-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 text-center">
      <EmojiRain
        trigger={rainTrigger}
        emoji={rainEmoji}
        only={stage === "boycount"}
      />

      {/* Back button on every screen except the very first one. */}
      {history.length > 0 && <BackButton onBack={back} />}

      {/* floating background blobs */}
      <div className="animate-float pointer-events-none absolute left-3 top-10 text-4xl opacity-40 sm:left-8 sm:top-16 sm:text-6xl">
        🤔
      </div>
      <div
        className="animate-float pointer-events-none absolute bottom-10 right-3 text-5xl opacity-40 sm:bottom-20 sm:right-10 sm:text-7xl"
        style={{ animationDelay: "1s" }}
      >
        🤡
      </div>
      <div
        className="animate-float pointer-events-none absolute right-1/4 top-24 hidden text-5xl opacity-30 sm:block"
        style={{ animationDelay: "0.5s" }}
      >
        👽
      </div>

      {/* ---------------- INTRO ---------------- */}
      {stage === "intro" && (
        <div className="animate-pop-in relative z-10 max-w-2xl">
          <h1 className="animate-wobble mb-6 text-4xl font-black drop-shadow-lg sm:text-7xl">
            <RainbowText text="The Stupid" />
            <br />
            <RainbowText text="Questions Machine" />
          </h1>
          <p className="mb-10 text-xl font-bold text-white/90 drop-shadow">
            Everything on this website is for fun and entertainment only.
            Don&apos;t take it too{" "}
            <span className="animate-rainbow font-black">seriously.</span> 😆
          </p>
          <button
            onClick={() => go("confirm")}
            className="hover:animate-jiggle rounded-full bg-white px-8 py-4 text-xl font-black text-purple-700 shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-10 sm:py-5 sm:text-2xl"
          >
            🚀 LET&apos;S GET STUPID
          </button>
        </div>
      )}

      {/* ---------------- CONFIRM (are you really stupid?) ---------------- */}
      {stage === "confirm" && (
        <div className="animate-pop-in relative z-10 max-w-2xl">
          <div className="animate-float mb-4 text-6xl sm:text-7xl">🤨</div>
          <h1 className="animate-wobble mb-10 text-3xl font-black drop-shadow-lg sm:text-6xl">
            <RainbowText text="Are you really stupid?" />
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => go("roast")}
              className="hover:animate-jiggle rounded-full bg-green-500 px-10 py-4 text-xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
            >
              ✅ YES
            </button>
            <DodgeButton className="bg-red-500 px-10 py-4 text-xl text-white shadow-2xl sm:px-12 sm:py-5 sm:text-2xl">
              ❌ NO
            </DodgeButton>
          </div>
          <p className="mt-8 text-sm font-bold text-white/70">
            (don&apos;t even try clicking NO 😏)
          </p>
        </div>
      )}

      {/* ---------------- ROAST (after clicking YES) ---------------- */}
      {stage === "roast" && (
        <div className="animate-pop-in relative z-10 max-w-2xl">
          <div className="animate-float mb-4 text-6xl sm:text-7xl">😏</div>
          <h1 className="animate-wobble mb-8 text-2xl font-black leading-snug drop-shadow-lg sm:text-5xl">
            <RainbowText text="Yes, I know you are stupid — that's why you clicked YES!" />
          </h1>
          <button
            onClick={() => go("gender")}
            className="hover:animate-jiggle rounded-full bg-white px-8 py-4 text-xl font-black text-purple-700 shadow-2xl transition-transform hover:scale-110 active:scale-95 sm:px-10 sm:py-5 sm:text-2xl"
          >
            😂 fair enough, let&apos;s go
          </button>
        </div>
      )}

      {/* ---------------- GENDER (looks like you're interested) ---------------- */}
      {stage === "gender" && <GenderScreen onSelect={chooseGender} />}

      {/* ---------------- GOOD GIRL? (female only) ---------------- */}
      {stage === "goodgirl" && (
        <GoodGirlScreen onContinue={() => go("badrate")} />
      )}

      {/* ---------------- BAD RATING + $1M DILEMMA (female only) ---------------- */}
      {stage === "badrate" && (
        <BadRatingScreen
          onRate={() => setRainTrigger((t) => t + 1)}
          onChoose={(c) => {
            setChoice(c);
            go("boycount");
          }}
        />
      )}

      {/* ---- CHOICE RESULT + HOW MANY BOYFRIENDS? (same screen, female only) ---- */}
      {stage === "boycount" && choice && (
        <BoyfriendCountScreen
          choice={choice}
          onSelect={(n) => {
            setCount(n);
            go("boyresult");
          }}
        />
      )}

      {/* ---------------- BOYFRIEND COUNT RESULT (female only) ---------------- */}
      {stage === "boyresult" && count !== null && (
        <BoyfriendResultScreen count={count} onContinue={() => go("outro")} />
      )}

      {/* ---------------- OUTRO (final sign-off) ---------------- */}
      {stage === "outro" && <OutroScreen />}

      {/* ---------------- PLAYING ---------------- */}
      {stage === "playing" && question && (
        <div
          className={`relative z-10 w-full max-w-2xl ${
            shake ? "animate-shake" : ""
          }`}
        >
          {/* progress */}
          <div className="mx-auto mb-8 h-4 w-full max-w-md overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 transition-all duration-500"
              style={{ width: `${Math.max(progress, 6)}%` }}
            />
          </div>

          <div className="animate-pop-in rounded-3xl bg-black/40 p-5 shadow-2xl backdrop-blur-md sm:p-8">
            <div className="animate-float mb-4 text-5xl sm:text-6xl">
              {question.emoji}
            </div>
            <h2 className="mb-8 text-xl font-black leading-snug text-white drop-shadow sm:text-3xl">
              {question.q}
            </h2>

            {!reaction ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {question.options.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={answer}
                    style={{ animationDelay: `${i * 0.08}s` }}
                    className={`animate-pop-in hover:animate-jiggle rounded-2xl px-5 py-4 text-lg font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                      BUTTON_COLORS[i % BUTTON_COLORS.length]
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="animate-pop-in">
                <p className="mb-6 text-xl font-bold text-yellow-200 drop-shadow">
                  {reaction}
                </p>
                <button
                  onClick={next}
                  className="hover:animate-jiggle rounded-full bg-white px-8 py-4 text-xl font-black text-pink-600 shadow-xl transition-transform hover:scale-110 active:scale-95"
                >
                  {index + 1 >= QUESTIONS.length
                    ? "🏁 SEE MY DESTINY"
                    : "➡️ NEXT STUPID THING"}
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm font-bold text-white/70">
            Question {index + 1} of {QUESTIONS.length} • difficulty: pointless
          </p>
        </div>
      )}

      {/* ---------------- DONE ---------------- */}
      {stage === "done" && (
        <div className="animate-pop-in relative z-10 max-w-2xl">
          <h1 className="animate-wobble mb-6 text-4xl font-black sm:text-6xl">
            <RainbowText text="CONGRATS!" />
          </h1>
          <p className="mb-4 text-xl font-black text-white drop-shadow sm:text-2xl">
            Official certificate: the stupidest{" "}
            {gender === "male"
              ? "guy 👨"
              : gender === "female"
                ? "girl 👩"
                : "human"}{" "}
            on the internet. 🏆
          </p>
          <p className="mb-4 text-lg font-bold text-white/90 drop-shadow sm:text-xl">
            You answered {QUESTIONS.length} completely pointless questions.
          </p>
          <p className="mb-10 text-xl font-bold text-white/90 drop-shadow">
            Your prize is the knowledge that you&apos;ll never get this time
            back. <span className="animate-rainbow font-black">Worth it.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={start}
              className="hover:animate-jiggle rounded-full bg-white px-8 py-4 text-xl font-black text-purple-700 shadow-2xl transition-transform hover:scale-110 active:scale-95"
            >
              🔁 DO IT AGAIN
            </button>
            <DodgeButton className="bg-red-500 px-6 py-3 text-white shadow-xl">
              😤 I&apos;m done, let me leave
            </DodgeButton>
          </div>
        </div>
      )}

      <footer className="absolute bottom-3 z-10 text-xs font-bold text-white/50">
        made by human in the world
      </footer>
    </main>
  );
}
