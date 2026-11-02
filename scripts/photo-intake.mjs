#!/usr/bin/env node
/**
 * Photo intake (specs/001-seo-geo-relaunch, T004).
 *
 * Takes a zip or a folder from the owner and adds its photos to a folder under `public/`:
 *  - unpacks a zip into a new empty folder;
 *  - skips any photo byte-identical to one in a site's public folder under D:/work (another client's photo,
 *    or one already here);
 *  - writes WebP, long side 1600 px at most, quality 78, with a safe file name;
 *  - writes a contact sheet to review before committing (no women, nobody unclear, no other shop's
 *    signs, no supplier or TikTok watermarks);
 *  - updates the photo register.
 *
 * To lead a product's gallery, add the chosen files to its `images` list in `data/products.ts`.
 *
 * Usage: node scripts/photo-intake.mjs <zip|folder> <folder-under-public>
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const WORK_ROOT = 'D:/work';
const SKIP = new Set(['node_modules', '.next', '.git', '.open-next', '.wrangler', 'out']);
const IMAGE = /\.(jpe?g|png|webp|heic)$/i;
const SHEET_COLUMNS = 6;
const TILE = 240;

const [input, folder] = process.argv.slice(2);
if (!input || !folder) {
    console.error('Usage: node scripts/photo-intake.mjs <zip|folder> <folder-under-public>');
    process.exit(1);
}

function walk(dir, depth = 0, found = []) {
    if (depth > 7) return found;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (SKIP.has(entry.name)) continue;
        const path = join(dir, entry.name);
        if (entry.isDirectory()) walk(path, depth + 1, found);
        else if (IMAGE.test(entry.name)) found.push(path);
    }
    return found;
}

const md5 = (file) => createHash('md5').update(readFileSync(file)).digest('hex');
const safeName = (file) => basename(file, extname(file)).replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();

let sourceDir = input;
if (statSync(input).isFile()) {
    sourceDir = mkdtempSync(join(tmpdir(), 'photo-intake-'));
    execFileSync('tar', ['-xf', input, '-C', sourceDir]);
}

const incoming = walk(sourceDir);
console.log(`Incoming photos: ${incoming.length}`);

const existing = new Map();
for (const repo of readdirSync(WORK_ROOT)) {
    const path = join(WORK_ROOT, repo, 'public');
    if (existsSync(path)) for (const file of walk(path)) existing.set(md5(file), file);
}

const target = join('public', folder);
mkdirSync(target, { recursive: true });

const added = [];
const seen = new Set();
for (const file of incoming) {
    const hash = md5(file);
    if (seen.has(hash)) continue;
    seen.add(hash);
    if (existing.has(hash)) {
        console.log(`Skipped, same file as ${existing.get(hash)}: ${basename(file)}`);
        continue;
    }
    let out = join(target, `${safeName(file) || hash.slice(0, 12)}.webp`);
    if (existsSync(out)) out = join(target, `${safeName(file)}-${hash.slice(0, 6)}.webp`);
    try {
        await sharp(file).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
        added.push(out);
    } catch (error) {
        console.log(`Could not read ${basename(file)}: ${error.message}`);
    }
}

console.log(`Added ${added.length} to ${target}`);

if (added.length) {
    const rows = Math.ceil(added.length / SHEET_COLUMNS);
    const tiles = await Promise.all(
        added.map(async (file, index) => ({
            input: await sharp(file).rotate().resize(TILE, TILE, { fit: 'cover' }).toBuffer(),
            left: (index % SHEET_COLUMNS) * TILE,
            top: Math.floor(index / SHEET_COLUMNS) * TILE,
        })),
    );
    const sheet = join(mkdtempSync(join(tmpdir(), 'photo-sheet-')), 'contact-sheet.jpg');
    await sharp({ create: { width: SHEET_COLUMNS * TILE, height: rows * TILE, channels: 3, background: '#ffffff' } })
        .composite(tiles)
        .jpeg({ quality: 80 })
        .toFile(sheet);
    console.log(`Review before committing: ${sheet}`);
}

execFileSync('node', ['scripts/photo-register.mjs'], { stdio: 'inherit' });
