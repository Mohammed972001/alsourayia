import media from "@/content/media.json";

type Entry = { width: number; height: number; widths: number[]; temp: boolean; source: "owner" | "catalog" | "art" | "ai" | "tmp" };
const manifest = media as Record<string, Entry>;

type Props = {
  name: string;
  alt: string;
  /** The `sizes` attribute; defaults to full width. */
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/** A responsive WebP photo from public/media with reserved dimensions (constitution III). */
export function Photo({ name, alt, sizes = "100vw", className, priority = false }: Props) {
  const entry = manifest[name];
  if (!entry) throw new Error(`Photo not in media.json: ${name}`);
  const srcSet = entry.widths.map((w) => `/media/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = entry.widths.find((w) => w >= 828) ?? entry.widths.at(-1)!;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; widths are pre-built by scripts/media.mjs
    <img
      src={`/media/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      data-temp={entry.temp ? "" : undefined}
    />
  );
}

/** URL of the smallest pre-built width of a photo that is at least `min` px wide (for CSS backgrounds). */
export function mediaUrl(name: string, min = 480): string {
  const entry = manifest[name];
  if (!entry) throw new Error(`Photo not in media.json: ${name}`);
  const w = entry.widths.find((x) => x >= min) ?? entry.widths.at(-1)!;
  return `/media/${name}-${w}.webp`;
}

/** Width and height of a photo in the manifest (to reserve space for a video with that poster). */
export function photoSize(name: string): { width: number; height: number } {
  const entry = manifest[name];
  if (!entry) throw new Error(`Photo not in media.json: ${name}`);
  return { width: entry.width, height: entry.height };
}

/** Where a picture comes from: the owner's camera, a supplier catalogue, a drawn illustration, or AI art. */
export function photoSource(name: string): Entry["source"] {
  return manifest[name]?.source ?? "owner";
}

export function isTempPhoto(name: string): boolean {
  return manifest[name]?.temp ?? false;
}
