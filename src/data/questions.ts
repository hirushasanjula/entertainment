export type Question = {
  q: string;
  options: string[];
  // A ridiculous reaction shown no matter what they pick.
  reaction: string;
  emoji: string;
};

export const QUESTIONS: Question[] = [
  {
    q: "If you clean a vacuum cleaner, do you become a vacuum cleaner?",
    options: ["Obviously yes", "I am scared", "Mind = blown", "Call science"],
    reaction: "Scientists are still arguing about this. You broke them.",
    emoji: "🧹",
  },
  {
    q: "Why isn't 11 pronounced 'onety-one'?",
    options: ["GREAT question", "Onety-one supremacy", "I'm mad now", "Numbers lied to us"],
    reaction: "You have officially out-thought the entire English language.",
    emoji: "🔢",
  },
  {
    q: "Is cereal a soup? Be honest.",
    options: ["100% soup", "Never soup", "Cold soup", "I need a lawyer"],
    reaction: "This answer will be used against you at Thanksgiving.",
    emoji: "🥣",
  },
  {
    q: "If you punch yourself and it hurts, are you weak or strong?",
    options: ["Both somehow", "Strong AND sad", "Don't test me", "Yes"],
    reaction: "A true paradox warrior. Your fists respect you.",
    emoji: "🥊",
  },
  {
    q: "Do fish ever get thirsty?",
    options: ["Constantly", "They're swimming in water??", "Ask the fish", "I'm parched now"],
    reaction: "The fish heard you and rolled their eyes.",
    emoji: "🐟",
  },
  {
    q: "Why do we press harder on the remote when the batteries are dying?",
    options: ["It WORKS okay", "Pure hope", "Finger power", "It's science (it's not)"],
    reaction: "Your thumb has more optimism than your whole personality.",
    emoji: "📺",
  },
  {
    q: "If a turtle loses its shell, is it homeless or naked?",
    options: ["Homeless", "Naked", "Devastatingly both", "Leave the turtle alone"],
    reaction: "The turtle is filing a complaint about this question.",
    emoji: "🐢",
  },
  {
    q: "Can you cry underwater?",
    options: ["Yes and it's sad", "No witnesses", "I'm trying now", "Stop making me think"],
    reaction: "You just made a dolphin emotional. Good job.",
    emoji: "💧",
  },
  {
    q: "Is a hotdog a sandwich? Choose wisely.",
    options: ["Sandwich", "Taco actually", "It's a hotdog???", "I'm leaving"],
    reaction: "Wars have started over less. The internet hates you now.",
    emoji: "🌭",
  },
  {
    q: "Why do round pizzas come in square boxes?",
    options: ["BIG corporate scam", "Geometry crime", "I never noticed", "I'm furious"],
    reaction: "You've unlocked rage you didn't know you had. Welcome.",
    emoji: "🍕",
  },
];
