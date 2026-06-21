# 🤪 The Stupid Questions Machine

A chaotic, animated "fun" quiz built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma** and **MongoDB**. Everything is for entertainment only — don't take it too seriously. 😆

## ✨ Features

- Animated rainbow gradient background, wobbling/popping text, and emoji-rain confetti
- A dodging "NO" button that runs from your cursor/finger (mobile-safe)
- A branching flow that reacts to your answers:
  - "Are you really stupid?" → roast
  - Gender select (saved to MongoDB)
  - Female path: good girl? → rate how bad → $1,000,000 dilemma → how many boyfriends → outro
- Global ⬅️ back navigation on every screen
- Fully responsive (phone → desktop)
- Selections persisted to MongoDB via a Prisma model and a `POST /api/selection` route

## 🛠️ Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Prisma](https://www.prisma.io) ORM with MongoDB
- [MongoDB](https://www.mongodb.com) (Atlas or local)

## 🚀 Getting started

```bash
npm install
```

Create a `.env.local` (see `.env.example`):

```bash
MONGODB_URI=mongodb://localhost:27017/entertainment
DATABASE_URL=mongodb://localhost:27017/entertainment
```

> Prisma for MongoDB needs a database name in the URL, so `DATABASE_URL` is set separately from `MONGODB_URI`.

Generate the Prisma client and run the dev server:

```bash
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project structure

- `src/app/page.tsx` — the quiz orchestrator (stage machine)
- `src/components/` — each screen + reusable bits (EmojiRain, DodgeButton, RainbowText, BackButton, …)
- `src/data/questions.ts` — the stupid questions
- `src/app/api/selection/route.ts` — saves gender selections to MongoDB
- `prisma/schema.prisma` — the `Selection` model

---

Made with way too much chaos • Next.js + Tailwind
