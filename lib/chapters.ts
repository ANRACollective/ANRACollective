export type Chapter = {
  id: string;
  kicker: string; // "Chapter One"
  numeral: string; // "I"
  title: string;
  tale: string; // storybook narrative
  what: string; // the factual descriptor
  tags: string[];
  url?: string;
  urlLabel?: string;
  accent: string; // main accent hex
  accentSoft: string; // pale wash for the right page
  scene: string; // scene id for the pop-up artwork
};

export const CHAPTERS: Chapter[] = [
  {
    id: "prologue",
    kicker: "Prologue",
    numeral: "✳",
    title: "Once upon a maker…",
    tale: "There was a builder who couldn't stop building. Websites, platforms, campaigns — each one a little world of its own. This book collects them all in one place.",
    what: "ANRA Collective is the studio shelf where every project lives. Turn the pages gently — some of them pop.",
    tags: ["Est. Singapore & Malaysia", "Designed with Figma + Claude"],
    accent: "#c9a227",
    accentSoft: "#f8f0da",
    scene: "prologue",
  },
  {
    id: "briam",
    kicker: "Chapter One",
    numeral: "I",
    title: "The Steel Garden",
    tale: "In which silos and steel structures rise across Asia — and the company that raises them needed a home as solid as its work.",
    what: "Corporate website for BRIAM Asia, The Bulk Storage Group — silo-based projects and structural steel engineering.",
    tags: ["Corporate site", "Next.js + Motion", "Live"],
    url: "https://briam.vercel.app",
    urlLabel: "briam.vercel.app",
    accent: "#773dbd",
    accentSoft: "#efe6fa",
    scene: "briam",
  },
  {
    id: "silbloxx",
    kicker: "Chapter Two",
    numeral: "II",
    title: "The Factory That Hired",
    tale: "A new plant awakens in Ho Chi Minh City, and it needs people. So we built it a voice — loud, orange, and impossible to ignore.",
    what: "Recruitment microsite for Silbloxx Asia (BRIAM Group) — six open roles, bold industrial design, EN/VN.",
    tags: ["Recruitment", "Next.js", "Live"],
    url: "https://silbloxx.vercel.app",
    urlLabel: "silbloxx.vercel.app",
    accent: "#ff2e00",
    accentSoft: "#ffece6",
    scene: "silbloxx",
  },
  {
    id: "myscholar",
    kicker: "Chapter Three",
    numeral: "III",
    title: "The Door Nobody Knew About",
    tale: "No student should miss a scholarship because they didn't know it existed. So every hidden door got a map, and every map is free.",
    what: "Free platform for Malaysian students — 200+ career pathways, 200+ scholarships, and curated internships.",
    tags: ["EdTech", "Supabase", "Free forever", "Live"],
    url: "https://myscholar.my",
    urlLabel: "myscholar.my",
    accent: "#2456e6",
    accentSoft: "#e6ecfc",
    scene: "myscholar",
  },
  {
    id: "learnfpa",
    kicker: "Chapter Four",
    numeral: "IV",
    title: "Twelve Weeks to the Corner Office",
    tale: "An auditor once crossed the bridge from debits to decisions — then wrote down the map for everyone walking behind them.",
    what: "LearnFP&A — a free 12-week, self-paced FP&A curriculum for accounting and audit professionals, aligned to AFP FPAC.",
    tags: ["Education", "12 weeks", "Free", "Live"],
    url: "https://learn-fpa.vercel.app",
    urlLabel: "learn-fpa.vercel.app",
    accent: "#0e7a5f",
    accentSoft: "#e2f2ec",
    scene: "learnfpa",
  },
  {
    id: "trashtalks",
    kicker: "Chapter Five",
    numeral: "V",
    title: "Meet the Family You Throw Away",
    tale: "Five everyday products. Five very different journeys. One shared destination. Your trash has been thinking about us — and it finally speaks.",
    what: "trashtalks.earth — an interactive waste-awareness campaign for Singapore & Malaysia, with characters, data and a ten-year policy timeline.",
    tags: ["Campaign", "Environment", "SG / MY", "Live"],
    url: "https://trashtalks.earth",
    urlLabel: "trashtalks.earth",
    accent: "#1f8a70",
    accentSoft: "#e3f2ed",
    scene: "trashtalks",
  },
  {
    id: "myhutan",
    kicker: "Chapter Six",
    numeral: "VI",
    title: "The Disappearing Green",
    tale: "Somewhere in the Malaysian jungle, trees are vanishing quietly. This tracker exists to make the quiet very, very loud.",
    what: "MyHutan — a Malaysian jungle deforestation tracker. Still growing; this chapter is being written.",
    tags: ["Data", "Environment", "In the works"],
    accent: "#1c6b3c",
    accentSoft: "#e4f0e8",
    scene: "myhutan",
  },
  {
    id: "atlascerita",
    kicker: "Chapter Seven",
    numeral: "VII",
    title: "Where the Old Stories Live",
    tale: "Hantu and heroes, moonlit legends and mountain spirits — Malaysian folklore, mapped and kept safe from forgetting.",
    what: "AtlasCerita — an atlas of Malaysian folklore. An early chapter, still being illustrated.",
    tags: ["Culture", "Storytelling", "In the works"],
    accent: "#9d174d",
    accentSoft: "#fbe7ef",
    scene: "atlascerita",
  },
  {
    id: "manamana",
    kicker: "Chapter Eight",
    numeral: "VIII",
    title: "The Mystery Chapter",
    tale: "Every good book keeps one secret. This page is still being written — ask the author nicely and he might tell you what ManaMana becomes.",
    what: "ManaMana — under wraps for now. Watch this spread.",
    tags: ["Secret", "Coming soon"],
    accent: "#d63384",
    accentSoft: "#fce8f1",
    scene: "manamana",
  },
  {
    id: "epilogue",
    kicker: "Epilogue",
    numeral: "✳",
    title: "Every story needs a next chapter",
    tale: "Want a website people actually remember? A platform, a campaign, a small world of your own? Let's write yours together.",
    what: "ANRA Collective works with Figma, Claude and a lot of paper. Say hello — the ink is still wet.",
    tags: ["hello@anra.collective", "github.com/ANRACollective"],
    url: "mailto:anton.ranil@gmail.com",
    urlLabel: "Write to the author",
    accent: "#c9a227",
    accentSoft: "#f8f0da",
    scene: "epilogue",
  },
];

/* ——— timeline constants (shared by Book + Nav) ——— */
export const SPREADS = CHAPTERS.length; // 10
export const LEAVES = SPREADS + 1; // cover + 10 leaves
export const COVER_DWELL = 0.6; // units before the cover starts to open
export const FLIP_LEN = 1; // units per page flip
export const DWELL_LEN = 0.9; // units of reading time per spread
export const END_LEN = 1.6; // closing sequence

export const flipStart = (leaf: number) => COVER_DWELL + leaf * (FLIP_LEN + DWELL_LEN);
export const TOTAL_UNITS = flipStart(LEAVES - 1) + FLIP_LEN + DWELL_LEN * 0.7 + END_LEN;
