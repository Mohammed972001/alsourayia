// Content types for «موكيت ومفروشات السريع» (spec 002). Copy lives in src/content/*.ts; components only render it.

export type CollectionId = "carpet" | "parquet" | "rubber" | "special";

export type IconName =
  | "sparkle" | "layers" | "ruler" | "drop" | "sun" | "feather" | "shield" | "grid" | "palette"
  | "wind" | "sound" | "swap" | "leaf" | "home" | "brush" | "thermo" | "loop" | "pattern"
  | "truck" | "measure" | "sample" | "tools" | "mosque" | "office" | "gym" | "clinic" | "anchor";

export type Product = {
  /** Fixed: the live URL is /products/<slug>. Never change one without a 301 in src/worker.ts. */
  slug: string;
  /** Display name in menus, cards and headings, e.g. «موكيت مساجد». */
  name: string;
  /** One or two words for chips and the hero fan. */
  short: string;
  collection: CollectionId;
  /** The search phrase the page is built around (from the live site and the ads). */
  keyword: string;
  /** <title>; kept from the live site where it was tuned for search. */
  seoTitle: string;
  seoDescription: string;
  /** The page's H1: the searched phrase, plainly. */
  h1: string;
  /** A short line under the H1. */
  tagline: string;
  /** Two or three sentences an AI assistant can quote as the answer (GEO). */
  summary: string;
  /** The opening paragraph. */
  lead: string;
  /** Owner's starting price in SAR per square metre; null when the owner has not given one. */
  priceFrom: number | null;
  /** media.json names: [hero, ...gallery]. */
  images: string[];
  facts: { label: string; value: string }[];
  features: { icon: IconName; title: string; text: string }[];
  kinds: { name: string; text: string }[];
  /** Keys of `rooms` in products.ts. */
  rooms: string[];
  /** How the quantity calculator counts: by area, or by 50 x 50 cm tiles. */
  calc: "area" | "tiles";
  /** Things to settle before asking for a price (measurements, photos, floor state). */
  prepare: string[];
  care: string[];
  faq: { q: string; a: string }[];
  related: string[];
  /** The owner's photos of the product in place. */
  works?: { intro: string; images: string[] };
  /** Photos of the shop's own samples. */
  samples?: { intro: string; images: string[] };
};
