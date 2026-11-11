// Line icons, 24 x 24, stroke = currentColor (design doctrine: no emoji, no icon font).
const paths = {
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16z",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  ruler: "M3 15.5L15.5 3 21 8.5 8.5 21 3 15.5zM7 11.5l2 2M9.5 9l1.5 1.5M12 6.5l2 2M14.5 4l1.5 1.5",
  drop: "M12 3s6 6.4 6 11a6 6 0 01-12 0c0-4.6 6-11 6-11zM9.5 15a2.5 2.5 0 002.5 2.5",
  sun: "M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  feather: "M20 4c-7 0-12 5-12 12v4M8 16h7M20 4c0 8-4 12-12 12M11 12h6",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  palette: "M12 3a9 9 0 100 18c1.2 0 1.8-.9 1.8-1.8 0-1.3-1-1.7-1-2.7 0-1 .8-1.5 1.8-1.5H17a4 4 0 004-4c0-4.4-4-8-9-8zM7.5 11.5h.01M9.5 7.5h.01M14.5 7.5h.01M17 11h.01",
  wind: "M3 8h11a3 3 0 10-3-3M3 12h16a3 3 0 11-3 3M3 16h8",
  sound: "M4 9v6h4l5 4V5L8 9H4zM16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12",
  swap: "M7 4L3 8l4 4M3 8h14M17 12l4 4-4 4M21 16H7",
  leaf: "M5 19c0-8 5-14 15-15-1 10-7 15-15 15zM5 19l8-8",
  home: "M3 11l9-7 9 7M5 9.5V20h5v-6h4v6h5V9.5",
  brush: "M14 4l6 6-7.5 7.5-6-6L14 4zM6.5 11.5L4 14c-1 1-1 3 0 4l2 2c1 1 3 1 4 0l2.5-2.5",
  thermo: "M10 14.5V5a2 2 0 114 0v9.5a4 4 0 11-4 0zM12 9v7",
  loop: "M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M18 3v4h-4M6 21v-4h4",
  pattern: "M12 2l3 3-3 3-3-3 3-3zM12 16l3 3-3 3-3-3 3-3zM5 9l3 3-3 3-3-3 3-3zM19 9l3 3-3 3-3-3 3-3zM12 9l3 3-3 3-3-3 3-3z",
  whatsapp:
    "M3.5 20.5l1.3-4.6A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1l-4.4 1.1zM9 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5a6 6 0 002.8 2.5c.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.3-.9 1.7-.6.4-1.5.5-2.6.1a9.1 9.1 0 01-4.6-4.1c-.7-1.2-.8-2.3-.3-3.1l.2-.2z",
  phone: "M5 3h3.5l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2L20 14.5V18a2 2 0 01-2 2A15 15 0 013 5a2 2 0 012-2z",
  arrow: "M19 12H5M11 6l-6 6 6 6",
  arrowUp: "M7 17L17 7M9 7h8v8",
  chevron: "M15 6l-6 6 6 6",
  chevronDown: "M6 9l6 6 6-6",
  menu: "M4 7h16M4 12h16M4 17h10",
  close: "M6 6l12 12M18 6L6 18",
  search: "M11 4a7 7 0 110 14 7 7 0 010-14zM20 20l-4-4",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 110 5 2.5 2.5 0 010-5z",
  clock: "M12 3a9 9 0 110 18 9 9 0 010-18zM12 7v5l3 2",
  seal: "M12 2l2.2 2.1 3-.4.6 3 2.6 1.5-1.3 2.8 1.3 2.8-2.6 1.5-.6 3-3-.4L12 22l-2.2-2.1-3 .4-.6-3-2.6-1.5L4.9 13 3.6 10.2l2.6-1.5.6-3 3 .4L12 2zM9 12l2 2 4-4",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  check: "M5 12.5l4.5 4.5L19 7.5",
  store: "M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3M10 20v-5h4v5",
  roll: "M7 4a3 3 0 013 3v13a3 3 0 01-6 0V7a3 3 0 013-3zM7 4h11a2 2 0 012 2v12a2 2 0 01-2 2H10M7 7.5h.01",
  play: "M8 5.5v13l10.5-6.5L8 5.5z",
  truck: "M3 6h11v10H3zM14 9h4l3 3.5V16h-7M7 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  measure: "M3 8h18v8H3zM7 8v3M11 8v4M15 8v3M19 8v4",
  sample: "M4 6l8-3 8 3-8 3-8-3zM4 6v10l8 3V9M20 6v10l-8 3",
  tools: "M14.5 5.5a4 4 0 00-5 5L4 16l4 4 5.5-5.5a4 4 0 005-5l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z",
  mosque: "M12 3c2.5 2 4 3.6 4 5.5H8C8 6.6 9.5 5 12 3zM6 21V10.5h12V21M10 21v-4a2 2 0 014 0v4M3 21V8M3 8l1-2 1 2v13M2 21h20",
  office: "M4 21V5l8-2v18M12 8h8v13M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2M2 21h20",
  gym: "M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12",
  clinic: "M4 21V7l8-4 8 4v14M10 21v-5h4v5M12 8v5M9.5 10.5h5M2 21h20",
  anchor: "M12 3v18M5 12H3a9 9 0 0018 0h-2M12 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
} as const;

export type IconKey = keyof typeof paths;

export function Icon({ name, size = 24, className, label }: { name: IconKey; size?: number; className?: string; label?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}

/** The swoosh arc that crowns the «السريع» badge, used as a divider and frame motif. */
export function Swoosh({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 28" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M2 26C46 8 112 2 238 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M40 26C84 13 140 9 214 14" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/** A small herringbone mark (the parquet inside the badge's S), used between words in the marquee. */
export function Diamond({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M2 10l4-4 4 4-4 4zM10 10l4-4 4 4-4 4z" fill="currentColor" />
    </svg>
  );
}
