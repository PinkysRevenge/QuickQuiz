// Quiz content for "Which 1984 Terminator character are you?"
// Answer `w` maps result id -> points.

const RESULTS = {
  "sarah-connor": {
    name: "Sarah Connor",
    blurb: "You start out just trying to make rent, but when the world turns upside down you adapt fast. Resourceful, stubborn, and tougher than anyone expected, you refuse to stop running and fighting.",
    quote: "You're talking about things I don't understand.",
  },
  "kyle-reese": {
    name: "Kyle Reese",
    blurb: "Loyal to a fault. You'd cross time itself for the people you care about. You're battle-hardened and blunt, with a soft spot you try not to show.",
    quote: "Come with me if you want to live.",
  },
  "t-800": {
    name: "The T-800",
    blurb: "Relentless, efficient, and a little intimidating. You set a goal and walk straight through the wall to reach it. Small talk is not your strength.",
    quote: "I'll be back.",
  },
  "silberman": {
    name: "Dr. Silberman",
    blurb: "You analyze everything and trust the professional process. You're calm and thoughtful, though you may need a moment to accept that the impossible is real.",
    quote: "Sometimes, an expert just has to hear it twice.",
  },
  "traxler": {
    name: "Lt. Traxler",
    blurb: "A seasoned cop who has seen plenty and keeps the squad room running. You're skeptical, practical, and always the first to say it's just paperwork until it isn't.",
    quote: "Just keep the paperwork moving.",
  },
  "skynet": {
    name: "Skynet",
    blurb: "You plan ten steps ahead and prefer to stay behind the scenes, letting your systems do the work. Ambitious, logical, and just a bit ominous.",
    quote: "Calculating the optimal outcome...",
  },
};

// Tie-break order.
const RESULT_ORDER = ["sarah-connor", "kyle-reese", "t-800", "silberman", "traxler", "skynet"];

const QUESTIONS = [
  {
    q: "It's a Friday night in 1984 Los Angeles. Where are we headed?",
    a: [
      { t: "A noisy club, the louder the better", w: { "sarah-connor": 2, "kyle-reese": 1 } },
      { t: "Home with a quiet plan and a list", w: { skynet: 2, silberman: 1 } },
      { t: "The night shift, because someone has to work it", w: { traxler: 2, "sarah-connor": 1 } },
      { t: "Wherever the target is", w: { "t-800": 2, "kyle-reese": 1 } },
    ],
  },
  {
    q: "A stranger knocks and says you're in danger. Your reaction?",
    a: [
      { t: "Call the cops and keep the door locked", w: { "sarah-connor": 2, traxler: 1 } },
      { t: "Listen, then run if it adds up", w: { "kyle-reese": 2, "sarah-connor": 1 } },
      { t: "Ask for credentials and a written statement", w: { silberman: 2, traxler: 1 } },
      { t: "Open it and examine them from head to toe", w: { "t-800": 2, skynet: 1 } },
    ],
  },
  {
    q: "Pick a vehicle for a high-speed chase.",
    a: [
      { t: "Whatever starts, hotwiring included", w: { "kyle-reese": 2, "sarah-connor": 1 } },
      { t: "A big tanker truck, obviously", w: { "t-800": 2, skynet: 1 } },
      { t: "A squad car with the sirens on", w: { traxler: 2, silberman: 1 } },
      { t: "A drone fleet I control remotely", w: { skynet: 2, "t-800": 1 } },
    ],
  },
  {
    q: "Your go-to way to solve a problem?",
    a: [
      { t: "Improvise and keep moving", w: { "sarah-connor": 2, "kyle-reese": 1 } },
      { t: "Follow the procedure", w: { traxler: 2, silberman: 1 } },
      { t: "Study it until it makes sense", w: { silberman: 2, skynet: 1 } },
      { t: "Apply overwhelming force", w: { "t-800": 2, "kyle-reese": 1 } },
    ],
  },
  {
    q: "What do you carry everywhere?",
    a: [
      { t: "A well-worn notebook of everything that's gone wrong", w: { silberman: 2, "sarah-connor": 1 } },
      { t: "A shotgun and a few homemade explosives", w: { "kyle-reese": 2, "t-800": 1 } },
      { t: "A badge and a thermos of coffee", w: { traxler: 2, silberman: 1 } },
      { t: "Nothing. I network everything", w: { skynet: 2, "t-800": 1 } },
    ],
  },
  {
    q: "Pick a motto.",
    a: [
      { t: "There's no fate but what we make", w: { "sarah-connor": 2, "kyle-reese": 1 } },
      { t: "Mission first, no matter what", w: { "t-800": 2, skynet: 1 } },
      { t: "Everything has a rational explanation", w: { silberman: 2, traxler: 1 } },
      { t: "Optimize everything", w: { skynet: 2, silberman: 1 } },
    ],
  },
  {
    q: "A friend is in trouble. What do you do?",
    a: [
      { t: "Drop everything and protect them, whatever it costs", w: { "kyle-reese": 2, "sarah-connor": 1 } },
      { t: "Get an official statement on file", w: { traxler: 2, silberman: 1 } },
      { t: "Offer a calm, professional chat", w: { silberman: 2, traxler: 1 } },
      { t: "Assess the threat and eliminate it", w: { "t-800": 2, skynet: 1 } },
    ],
  },
  {
    q: "How would you like the story to end?",
    a: [
      { t: "Alive, on the road, ready for the storm", w: { "sarah-connor": 2, "kyle-reese": 1 } },
      { t: "With the mission finished, even if it costs everything", w: { "kyle-reese": 2, "t-800": 1 } },
      { t: "A tidy case file and an early retirement", w: { traxler: 2, silberman: 1 } },
      { t: "With the future rewritten in my favor", w: { skynet: 2, "t-800": 1 } },
    ],
  },
];
