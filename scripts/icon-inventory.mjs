#!/usr/bin/env node
/**
 * Icon inventory (specs/001-seo-geo-relaunch, T015; contract: contracts/icon-set.md).
 *
 * Scans app/ and components/ (components/ui/ is unused shadcn code and is skipped) and:
 *  - fails (exit 1) on any import from an icon library: lucide-react, react-icons, heroicons,
 *    phosphor, tabler, font awesome, …; @hugeicons/* is allowed only inside components/icons/;
 *  - prints how many times each icon name is used through <Icon name="…">.
 *
 * Usage: node scripts/icon-inventory.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const scanDirs = ['app', 'components'];
const skipDirs = new Set([join('components', 'ui'), 'node_modules', '.next']);
const exts = /\.(tsx?|jsx?|mjs)$/;

/** Module specifiers that are icon libraries. */
const ICON_LIBS = [
    /^lucide-react$/,
    /^lucide(\/|$)/,
    /^react-icons(\/|$)/,
    /^@heroicons\//,
    /^@phosphor-icons\//,
    /^phosphor-react$/,
    /^@tabler\/icons/,
    /^@fortawesome\//,
    /^@radix-ui\/react-icons$/,
    /^@mui\/icons-material/,
    /^@iconify\//,
    /^react-feather$/,
    /^@hugeicons\//,
];

function walk(dir, out = []) {
    for (const entry of readdirSync(join(root, dir))) {
        const rel = join(dir, entry);
        if (skipDirs.has(rel)) continue;
        if (statSync(join(root, rel)).isDirectory()) walk(rel, out);
        else if (exts.test(entry)) out.push(rel);
    }
    return out;
}

const importRe = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)/g;
const iconUseRe = /<Icon\b[^>]*?\bname=(?:"([^"]+)"|'([^']+)'|\{\s*['"]([^'"]+)['"]\s*\})/g;
const dynamicUseRe = /<Icon\b[^>]*?\bname=\{(?!\s*['"])/g;

const violations = [];
const counts = new Map();
let dynamicUses = 0;

for (const file of scanDirs.flatMap((d) => walk(d))) {
    const src = readFileSync(join(root, file), 'utf8');
    const inIconsDir = file.startsWith(join('components', 'icons') + sep);

    for (const m of src.matchAll(importRe)) {
        const spec = m[1] ?? m[2] ?? m[3];
        if (!ICON_LIBS.some((re) => re.test(spec))) continue;
        if (inIconsDir && spec.startsWith('@hugeicons/')) continue;
        const line = src.slice(0, m.index).split('\n').length;
        violations.push(`${relative(root, join(root, file))}:${line}  imports '${spec}'`);
    }

    for (const m of src.matchAll(iconUseRe)) {
        const name = m[1] ?? m[2] ?? m[3];
        counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    dynamicUses += [...src.matchAll(dynamicUseRe)].length;
}

const sorted = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
const total = sorted.reduce((n, [, c]) => n + c, 0);
console.log('<Icon name="…"> uses per name:');
for (const [name, c] of sorted) console.log(`  ${name.padEnd(16)} ${c}`);
console.log(`  ${'(from data)'.padEnd(16)} ${dynamicUses}   name={variable}, resolved from typed arrays`);
console.log(`Total: ${total} literal + ${dynamicUses} data-driven, ${sorted.length} distinct names.`);

if (violations.length) {
    console.error(`\nFAIL: ${violations.length} icon-library import(s) outside components/icons/:`);
    for (const v of violations) console.error(`  ${v}`);
    process.exit(1);
}
console.log('\nOK: no icon-library imports outside components/icons/.');
