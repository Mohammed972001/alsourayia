import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = new Set(['.jpeg', '.jpg', '.png', '.webp', '.avif']);

/**
 * Reads all image files from a directory inside /public.
 * Runs server-side only (build time / SSR).
 */
export function getImagesFromDir(dirPath: string): string[] {
  const publicDir = path.join(process.cwd(), 'public');
  const fullPath = path.join(publicDir, dirPath);

  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => `/${dirPath}/${file}`);
}
