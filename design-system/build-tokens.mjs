// Design tokens for «موكيت ومفروشات السريع» (ADR-0002). The single source of truth for colour, type,
// space, radius, shadow and motion. Writes src/styles/tokens.css and tokens/tokens.json, prints every
// contrast pair it checks, and exits 1 when a pair drops below its WCAG target.
//
//   node design-system/build-tokens.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// ---- Primitives -------------------------------------------------------------------------------
// Sampled from the owner's «السريع» badge (public/brand/badge.svg, 2026-11-11): the deep teal of the word
// «السريع» (#214953, darkest #0B282C), its burnt copper (#925B3C to #B8672E), the bronze of the S emblem,
// and the cream marble behind it. ADR-0002.
const primitive = {
  teal: {
    50: "#EEF5F5",
    100: "#D8E8E9",
    200: "#B4D1D4",
    300: "#87B2B8",
    400: "#4F8790",
    500: "#2E6670",
    600: "#24525B",
    700: "#1D4750",
    800: "#163A42",
    900: "#0F2C33",
    950: "#091F24",
  },
  copper: {
    50: "#FBF3EC",
    100: "#F6E3D3",
    200: "#ECC6A7",
    300: "#E0A577",
    400: "#D0844C",
    500: "#B8672E",
    600: "#9A5124",
    700: "#7E421E",
    800: "#633418",
    900: "#462511",
  },
  bronze: {
    200: "#EADBBE",
    300: "#DCC291",
    400: "#C9A46A",
    500: "#A98448",
    600: "#86672F",
  },
  paper: {
    white: "#FFFFFF",
    ivory: "#FCFAF5",
    sand: "#F5EFE4",
    linen: "#EBE2D2",
  },
};

// ---- Semantic colour (by intent) --------------------------------------------------------------
const color = {
  "surface-page": primitive.paper.ivory,
  "surface-card": primitive.paper.white,
  "surface-sunken": primitive.paper.sand,
  "surface-linen": primitive.paper.linen,
  "surface-inverse": primitive.teal[900],
  "surface-inverse-raised": primitive.teal[800],
  "surface-accent": primitive.copper[500],
  "surface-accent-soft": primitive.copper[50],
  "surface-teal-soft": primitive.teal[50],

  "text-primary": primitive.teal[950],
  "text-secondary": primitive.teal[700],
  "text-teal": primitive.teal[600],
  "text-muted": "#4D6166",
  "text-accent": primitive.copper[700],
  "text-accent-display": primitive.copper[500],
  "text-on-accent": primitive.paper.white,
  "text-inverse": primitive.paper.ivory,
  "text-inverse-muted": primitive.teal[200],
  "text-inverse-accent": primitive.copper[300],

  "border-subtle": "#E9E1D3",
  "border-default": "#DCD2C1",
  "border-strong": "#7D8C8F",
  "border-accent": primitive.copper[400],
  "border-inverse": "#2C5660",

  "action-primary": primitive.copper[600],
  "action-primary-hover": primitive.copper[700],
  "action-primary-active": primitive.copper[800],
  "action-secondary": primitive.teal[800],
  "action-secondary-hover": primitive.teal[700],
  "action-secondary-active": primitive.teal[950],
  "action-inverse": primitive.copper[300],
  "action-inverse-hover": primitive.copper[200],
  "text-on-inverse-action": primitive.teal[950],
  "action-disabled": "#E4DED3",
  "text-disabled": "#6B7275",

  "status-error": "#B3261E",
  "text-error": "#A1221B",
  "focus-ring": primitive.copper[600],
  "focus-ring-inverse": primitive.copper[300],
  "gold-line": primitive.bronze[400],
  "gold-glow": "rgba(201, 164, 106, 0.35)",
  "scrim": "rgba(9, 31, 36, 0.55)",
  "scrim-strong": "rgba(9, 31, 36, 0.8)",
};

// ---- Type, space, radius, shadow, motion ------------------------------------------------------
const type = {
  // Fluid sizes: min at 360 px, max at 1440 px. Display is ≥ 2.5x body (doctrine rule 4).
  "size-xs": "clamp(0.75rem, 0.73rem + 0.1vw, 0.8125rem)",
  "size-sm": "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)",
  "size-base": "clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)",
  "size-lg": "clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)",
  "size-xl": "clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)",
  "size-2xl": "clamp(1.5rem, 1.3rem + 0.9vw, 2rem)",
  "size-3xl": "clamp(1.875rem, 1.5rem + 1.6vw, 2.75rem)",
  "size-4xl": "clamp(2.25rem, 1.7rem + 2.6vw, 3.75rem)",
  "size-display": "clamp(2.75rem, 1.9rem + 4.2vw, 5.5rem)",
  "leading-tight": "1.15",
  "leading-snug": "1.35",
  "leading-body": "1.85",
  "tracking-wide": "0.08em",
};

const space = {
  "space-1": "0.25rem",
  "space-2": "0.5rem",
  "space-3": "0.75rem",
  "space-4": "1rem",
  "space-5": "1.25rem",
  "space-6": "1.5rem",
  "space-8": "2rem",
  "space-10": "2.5rem",
  "space-12": "3rem",
  "space-16": "4rem",
  "space-20": "5rem",
  "space-24": "6rem",
  "section-y": "clamp(4.5rem, 3rem + 6vw, 8.5rem)",
  "gutter": "clamp(1.25rem, 0.6rem + 3vw, 3rem)",
  "container": "78rem",
  "container-wide": "90rem",
  "measure": "38rem",
};

const radius = {
  "radius-none": "0",
  "radius-sm": "0.375rem",
  "radius-md": "0.75rem",
  "radius-lg": "1.25rem",
  "radius-xl": "2rem",
  "radius-arch": "999px 999px 0.75rem 0.75rem",
  "radius-pill": "999px",
};

const shadow = {
  "shadow-sm": "0 1px 2px rgba(9, 31, 36, 0.06), 0 2px 8px rgba(9, 31, 36, 0.05)",
  "shadow-md": "0 6px 24px -8px rgba(9, 31, 36, 0.18)",
  "shadow-lg": "0 24px 60px -24px rgba(9, 31, 36, 0.38)",
  "shadow-gold": "0 14px 40px -14px rgba(184, 103, 46, 0.5)",
};

const motion = {
  "ease-out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
  "duration-fast": "160ms",
  "duration-base": "280ms",
  "duration-slow": "700ms",
  "duration-reveal": "1100ms",
};

const z = { "z-header": "50", "z-menu": "60", "z-float": "40" };

// ---- Contrast gate ----------------------------------------------------------------------------
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground, background, target, why]
const pairs = [
  ["text-primary", "surface-page", 4.5, "body text"],
  ["text-primary", "surface-sunken", 4.5, "body text on sand"],
  ["text-primary", "surface-linen", 4.5, "body text on linen"],
  ["text-secondary", "surface-page", 4.5, "secondary text"],
  ["text-secondary", "surface-sunken", 4.5, "secondary text on sand"],
  ["text-muted", "surface-page", 4.5, "muted text"],
  ["text-muted", "surface-card", 4.5, "muted text on cards"],
  ["text-accent", "surface-page", 4.5, "copper text"],
  ["text-accent", "surface-card", 4.5, "copper text on cards"],
  ["text-accent", "surface-sunken", 4.5, "copper text on sand"],
  ["text-accent", "surface-accent-soft", 4.5, "copper text on soft copper chips"],
  ["text-accent-display", "surface-page", 3, "copper display type (large text only)"],
  ["text-accent-display", "surface-card", 3, "copper step numbers on cards (large text only)"],
  ["text-on-accent", "action-primary", 4.5, "label on copper button"],
  ["text-on-accent", "action-primary-hover", 4.5, "label on copper button, hover"],
  ["text-on-accent", "action-primary-active", 4.5, "label on copper button, active"],
  ["text-inverse", "action-secondary", 4.5, "label on dark button"],
  ["text-inverse", "action-secondary-hover", 4.5, "label on dark button, hover"],
  ["text-inverse", "surface-inverse", 4.5, "text on dark sections"],
  ["text-inverse-muted", "surface-inverse", 4.5, "muted text on dark"],
  ["text-inverse-accent", "surface-inverse", 4.5, "copper text on dark"],
  ["text-inverse-muted", "surface-inverse-raised", 4.5, "muted text on raised dark"],
  ["text-teal", "surface-page", 4.5, "teal accent text"],
  ["text-teal", "surface-teal-soft", 4.5, "teal text on soft teal chips"],
  ["text-secondary", "surface-linen", 4.5, "secondary text on linen"],
  ["text-inverse", "surface-accent", 3, "large white type on the copper band"],
  ["text-inverse", "surface-inverse-raised", 4.5, "text on raised dark"],
  ["text-disabled", "action-disabled", 3, "disabled label (exempt in WCAG, kept legible)"],
  ["focus-ring", "surface-page", 3, "focus ring"],
  ["focus-ring", "surface-card", 3, "focus ring on cards"],
  ["focus-ring-inverse", "surface-inverse", 3, "focus ring on dark"],
  ["border-strong", "surface-card", 3, "input borders"],
  ["status-error", "surface-card", 3, "error border on inputs"],
  ["text-error", "surface-sunken", 4.5, "error message on the sand panel"],
  ["action-primary", "surface-page", 3, "copper button against the page"],
  ["action-inverse", "surface-inverse", 3, "light copper button against dark"],
  ["text-on-inverse-action", "action-inverse", 4.5, "label on the light copper button"],
  ["text-on-inverse-action", "action-inverse-hover", 4.5, "label on the light copper button, hover"],
  ["gold-line", "surface-inverse", 3, "bronze rules on dark"],
];

let failed = 0;
console.log("Contrast pairs (measured):");
for (const [fg, bg, target, why] of pairs) {
  const value = ratio(color[fg], color[bg]);
  const ok = value >= target;
  if (!ok) failed++;
  console.log(`  ${ok ? "pass" : "FAIL"}  ${value.toFixed(2)}:1  (>= ${target})  ${fg} on ${bg} — ${why}`);
}

// ---- Write --------------------------------------------------------------------------------------
const groups = { color, type, space, radius, shadow, motion, z };
const lines = [
  "/* Generated by design-system/build-tokens.mjs — do not edit by hand. */",
  ":root {",
];
for (const [group, tokens] of Object.entries(groups)) {
  lines.push(`  /* ${group} */`);
  for (const [name, value] of Object.entries(tokens)) lines.push(`  --${name}: ${value};`);
}
for (const [family, steps] of Object.entries(primitive)) {
  lines.push(`  /* primitive ${family} (decoration only; components use the semantic names) */`);
  for (const [step, value] of Object.entries(steps)) lines.push(`  --${family}-${step}: ${value};`);
}
lines.push("}", "");

mkdirSync(resolve(root, "src/styles"), { recursive: true });
mkdirSync(resolve(root, "tokens"), { recursive: true });
writeFileSync(resolve(root, "src/styles/tokens.css"), lines.join("\n"));
writeFileSync(resolve(root, "tokens/tokens.json"), JSON.stringify({ primitive, ...groups }, null, 2) + "\n");
console.log(`\n${pairs.length - failed}/${pairs.length} contrast pairs pass. Wrote src/styles/tokens.css and tokens/tokens.json.`);
if (failed) process.exit(1);
