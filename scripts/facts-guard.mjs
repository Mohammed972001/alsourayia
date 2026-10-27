#!/usr/bin/env node
// Facts guard (T006, contracts/business-facts.md): business facts are typed once, in
// data/business.ts. This fails the build when a phone number, the legal name, the national
// address code, a registration number or the opening-hours wording is hard-coded anywhere
// else in the source. Runs as `prebuild`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const SOURCE_OF_TRUTH = 'data/business.ts';

// Folders that are generated, third-party, or documentation/design material rather than site source.
const SKIP_DIRS = new Set([
    'node_modules', '.next', '.open-next', '.wrangler', '.vercel', '.git', '.claude', '.specify',
    'docs', 'specs', 'design', 'public', 'out', 'build', 'coverage',
]);
const SKIP_PATHS = new Set(['components/ui', 'scripts/facts-guard.mjs']);
const TEXT_EXT = /\.(?:[cm]?[jt]sx?|json|md|mdx|css|html|txt|ya?ml|jsonc|env.*)$/i;

// Built from pieces so this file does not trip its own check if the skip list changes.
const join2 = (...parts) => parts.join('');
const RULES = [
    { name: 'main phone', re: new RegExp(join2('5501', '01867')) },
    { name: 'second phone', re: new RegExp(join2('5596', '86290')) },
    { name: 'legal name', re: new RegExp(join2('فنون ', 'العاديات')) },
    { name: 'national address code', re: new RegExp(join2('RCNA', '3189')) },
    { name: 'unified number', re: new RegExp(join2('70547', '51560')) },
    { name: 'VAT number', re: new RegExp(join2('3148921', '65400003')) },
    { name: 'opening hours wording', re: /(?:9|٩)(?::00)?\s*صباح|(?:10|١٠)(?::00)?\s*مساء/ },
];

const hits = [];
function walk(dir) {
    for (const name of readdirSync(dir)) {
        const abs = join(dir, name);
        const rel = relative(root, abs).split(sep).join('/');
        if (SKIP_PATHS.has(rel)) continue;
        const st = statSync(abs);
        if (st.isDirectory()) {
            if (!SKIP_DIRS.has(name)) walk(abs);
            continue;
        }
        if (rel === SOURCE_OF_TRUTH || !TEXT_EXT.test(name) || name === 'package-lock.json' || /tsbuildinfo$/.test(name)) continue;
        const lines = readFileSync(abs, 'utf8').split(/\r?\n/);
        lines.forEach((line, i) => {
            for (const rule of RULES) {
                if (rule.re.test(line)) hits.push(`${rel}:${i + 1}  ${rule.name}: ${line.trim().slice(0, 120)}`);
            }
        });
    }
}

walk(root);

if (hits.length) {
    console.error(`facts-guard: ${hits.length} hard-coded business fact(s) outside ${SOURCE_OF_TRUTH}:`);
    for (const h of hits) console.error(`  ${h}`);
    console.error(`Import the value from @/data/business (or @/lib/contact) instead.`);
    process.exit(1);
}
console.log(`facts-guard: OK (facts only in ${SOURCE_OF_TRUTH})`);
