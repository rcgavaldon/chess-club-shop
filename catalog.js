// ============================================================
// CHESS CLUB SHOP — catalog data
// Edit this file (or ask Claude to) to update the live site.
// ============================================================

const SHOP = {
  name: "Chess Club Shop",
  tagline: "3D prints, made at school",
  url: "https://rcgavaldon.github.io/chess-club-shop/",
  contactEmail: "roberto.gavaldon3@gmail.com",
  // Shown on the flyer + "how to order" section:
  findMe: "Find Mr. Gavaldon (Chess Club) to place your order",
};

// ---- Backend (Google Sheet) ----
// Paste the Apps Script Web App URL here after you deploy it (see apps-script/DEPLOY.md).
// Leave "" and everything still works, but orders only live on this one device.
// When set: orders sync to your Sheet and you can manage the queue from any device.
const BACKEND_URL = "";

// ---- Colors you actually stock (kids pick from these) ----
// inStock: false hides the chip from the picker but keeps it here.
const COLORS = [
  { name: "Black",  hex: "#26262b", inStock: true },
  { name: "White",  hex: "#f4f2ec", inStock: true },
  { name: "Gray",   hex: "#9aa0a6", inStock: true },
  { name: "Red",    hex: "#d33a3a", inStock: true },
  { name: "Blue",   hex: "#3763c9", inStock: true },
  { name: "Green",  hex: "#3d9950", inStock: true },
  { name: "Gold",   hex: "#d9a441", inStock: true },
];

// ---- Catalog items ----
// code: what kids tell you ("2-A"). tier: price in dollars.
// minutes: SLICED print time on the A1 (drives the admin ETA math).
// colorSlots: 1 or 2 (AMS multi-color).
// image: "img/2-a.jpg" etc. Empty = placeholder box until you feed one in.
// featured: true floats it to the top of the page.
// From Robert's MakerWorld tier collections. NOTE: `minutes` and `colorSlots`
// are estimates — update `minutes` from your sliced time in Bambu Studio so the
// ETA math is accurate. `desc` shows under each item name on the catalog.
const ITEMS = [
  // ---- $2 ----
  { code: "2-A", name: "Joy Fidget",           desc: "Push-button fidget that pops in your hand.",        tier: 2, minutes: 30, colorSlots: 1, image: "", featured: true,  link: "" },
  { code: "2-B", name: "Spiral Twist Fidget",  desc: "Compact twisting fidget with a satisfying texture.", tier: 2, minutes: 60, colorSlots: 1, image: "", featured: false, link: "" },
  { code: "2-C", name: "Pocket Puzzle 3×3",    desc: "Mini sliding puzzle that fits in your pocket.",      tier: 2, minutes: 40, colorSlots: 1, image: "", featured: false, link: "" },
  // ---- $3 ----
  { code: "3-A", name: "Casino Chip Fidget",   desc: "Spinning casino-chip fidget — extremely satisfying.", tier: 3, minutes: 45, colorSlots: 2, image: "", featured: false, link: "" },
  { code: "3-B", name: "Bubble Popper",        desc: "Print-in-place popper — press every bubble, reusable forever.", tier: 3, minutes: 50, colorSlots: 1, image: "", featured: true,  link: "" },
  { code: "3-C", name: "World Cup Keychain",   desc: "2026 Trionda World Cup ball keychain.",              tier: 3, minutes: 35, colorSlots: 2, image: "", featured: false, link: "" },
  { code: "3-D", name: "Pocket Puzzle 4×4",    desc: "A tougher 4×4 sliding puzzle challenge.",            tier: 3, minutes: 55, colorSlots: 1, image: "", featured: false, link: "" },
  { code: "3-E", name: "Keyboard Fidgets",     desc: "Clicky mini keyboard keys to press and fidget with.", tier: 3, minutes: 45, colorSlots: 2, image: "", featured: false, link: "" },
  { code: "3-F", name: "Mini Christmas Tree",  desc: "Little desktop Christmas tree.",                     tier: 3, minutes: 50, colorSlots: 2, image: "", featured: false, link: "" },
  { code: "3-G", name: "Smiley Daisy Clicker", desc: "Smiley daisy clicker keychain that pops as you press.", tier: 3, minutes: 40, colorSlots: 2, image: "", featured: false, link: "" },
  // ---- $4 ----
  { code: "4-A", name: "Gear Gyro Spinner",    desc: "Planetary-gear gyro fidget spinner.",               tier: 4, minutes: 60, colorSlots: 1, image: "", featured: false, link: "" },
  { code: "4-B", name: "Thor's Hammer Spinner", desc: "Mjölnir fidget spinner and clicker in one.",        tier: 4, minutes: 80, colorSlots: 2, image: "", featured: true,  link: "" },
  // ---- $5 ----
  { code: "5-A", name: "Pokéball",             desc: "Classic openable Pokéball.",                        tier: 5, minutes: 110, colorSlots: 2, image: "", featured: true,  link: "https://makerworld.com/en/models/839922-pokeball" },
  { code: "5-B", name: "Pokéball Clicker",     desc: "Pokéball with a satisfying click mechanism.",       tier: 5, minutes: 120, colorSlots: 2, image: "", featured: false, link: "https://makerworld.com/en/models/2665966-pokeball-clicker" },
];

// ---- Custom quote pricing (shown on the site) ----
const CUSTOM_PRICING = {
  perHour: 4,          // $ per sliced hour, rounded up
  setup: 1,            // flat setup fee
  minimum: 3,          // floor
  longJobPerHour: 5,   // rate when sliced time > longJobHours
  longJobHours: 4,
};

// ---- Not-allowed list (custom requests) ----
const RULES = [
  "No weapons — nothing that is, or looks like, a weapon (including replicas and props).",
  "No drug, alcohol, vape, or tobacco references.",
  "No gang-related symbols or imagery.",
  "No hate symbols or anything targeting a person or group.",
  "No sexual content or profanity.",
  "Nothing that violates the student code of conduct.",
  "Final say is always Mr. Gavaldon's — any request can be declined, no explanation needed.",
];
