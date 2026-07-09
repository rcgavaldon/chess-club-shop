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
// PLACEHOLDER SHELLS — swap names/minutes/images as real prints get approved.
const ITEMS = [
  { code: "2-A", name: "Hand Clicker",        tier: 2, minutes: 30,  colorSlots: 1, image: "", featured: true,  link: "" },
  { code: "2-B", name: "Flexi Keychain",      tier: 2, minutes: 35,  colorSlots: 1, image: "", featured: false, link: "" },
  { code: "3-A", name: "Small Flexi Dragon",  tier: 3, minutes: 55,  colorSlots: 2, image: "", featured: true,  link: "" },
  { code: "3-B", name: "Phone Stand",         tier: 3, minutes: 50,  colorSlots: 1, image: "", featured: false, link: "" },
  { code: "4-A", name: "Large Flexi Dragon",  tier: 4, minutes: 80,  colorSlots: 2, image: "", featured: false, link: "" },
  { code: "4-B", name: "Desk Organizer",      tier: 4, minutes: 75,  colorSlots: 1, image: "", featured: false, link: "" },
  { code: "5-A", name: "Articulated Slug",    tier: 5, minutes: 110, colorSlots: 2, image: "", featured: false, link: "" },
  { code: "5-B", name: "Chess Set Mini",      tier: 5, minutes: 120, colorSlots: 2, image: "", featured: true,  link: "" },
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
