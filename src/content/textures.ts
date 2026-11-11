// Floor textures for the «شوفها في المكان» room on product pages (round 3, 2026-11-12). The textures are AI
// drawings (Figma image generator) in public/textures/; the room is media `ai-room`. Shown labelled «رسمة توضيحية».
// `size` is the repeat of the texture on the floor plane, in cqw of the room (tuned so a carpet row, a plank or
// a 50 x 50 tile reads at a believable scale).

export type FloorTexture = { tex: string; size: number };

export const floorTextures: Record<string, FloorTexture> = {
  "mosque-carpets": { tex: "/textures/tex-mosque.webp", size: 9 },
  "office-carpet": { tex: "/textures/tex-office.webp", size: 14 },
  parket: { tex: "/textures/tex-parquet.webp", size: 16 },
  "vinyl-roll": { tex: "/textures/tex-vinyl.webp", size: 22 },
  "rabal-gem": { tex: "/textures/tex-rubber.webp", size: 16 },
};

/** The floors offered for comparison in each product's room, this product first. */
export const roomCompare: Record<string, string[]> = {
  "mosque-carpets": ["mosque-carpets", "office-carpet", "parket", "vinyl-roll"],
  "office-carpet": ["office-carpet", "mosque-carpets", "vinyl-roll", "rabal-gem"],
  parket: ["parket", "vinyl-roll", "office-carpet", "mosque-carpets"],
  "vinyl-roll": ["vinyl-roll", "parket", "office-carpet", "rabal-gem"],
  "rabal-gem": ["rabal-gem", "office-carpet", "vinyl-roll", "parket"],
};
