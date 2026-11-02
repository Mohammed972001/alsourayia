#!/usr/bin/env node
// Phone check (spec 001 T003, T044). Usage:
//   node scripts/phone-check.mjs http://localhost:3107
//   node scripts/phone-check.mjs                          (live site)
// Opens every sitemap URL in headless Chrome at 360 and 393 px and fails on sideways overflow, or when a page has no
// visible WhatsApp link. Analytics hits are blocked, so the check adds nothing to the client's data.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SITE = 'https://www.mokeet-elsuarye.com';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const WIDTHS = [360, 393];
const BLOCKED = ['*google-analytics.com*', '*googleadservices.com*', '*doubleclick.net*', '*analytics.tiktok.com/api*', '*googletagmanager.com/g/collect*', '*/cdn-cgi/rum*', '*/rmkt/collect*', '*/ccm/collect*'];
const SETTLE_MS = 2500;

const base = (process.argv[2] || SITE).replace(/\/$/, '');
const sitemap = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
const paths = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, '') || '/');
if (paths.length === 0) {
    console.error('phone-check: no URLs in the sitemap');
    process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const port = 9300 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), 'phone-check-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
    await sleep(200);
    try {
        const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
        wsUrl = targets.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
    } catch {
        // Chrome is still starting.
    }
}
const socket = new WebSocket(wsUrl);
await new Promise((resolve) => socket.addEventListener('open', resolve));

let nextId = 0;
const pending = new Map();
socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
        pending.get(message.id)(message);
        pending.delete(message.id);
    }
});
const send = (method, params = {}) =>
    new Promise((resolve) => {
        const id = ++nextId;
        pending.set(id, resolve);
        socket.send(JSON.stringify({ id, method, params }));
    });

await send('Page.enable');
await send('Network.enable');
await send('Network.setBlockedURLs', { urls: BLOCKED });

let failures = 0;
for (const width of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 2, mobile: true });
    for (const path of paths) {
        await send('Page.navigate', { url: `${base}${path}` });
        await sleep(SETTLE_MS);
        const { result } = await send('Runtime.evaluate', {
            returnByValue: true,
            expression: `JSON.stringify({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth, whatsapp: [...document.querySelectorAll('a[href*="wa.me"]')].some((a) => a.offsetParent) })`,
        });
        const page = JSON.parse(result.result.value);
        const errors = [];
        if (page.scroll > page.client) errors.push(`overflow ${page.scroll} > ${page.client}`);
        if (!page.whatsapp) errors.push('no visible WhatsApp link');
        if (errors.length) {
            failures++;
            console.log(`FAIL ${width} ${path}: ${errors.join(', ')}`);
        }
    }
}

socket.close();
chrome.kill();
await sleep(800);
try {
    rmSync(profile, { recursive: true, force: true });
} catch {
    // Chrome may still hold the folder; it is only a temp profile.
}
console.log(`phone-check: ${paths.length} URLs at ${WIDTHS.join(' and ')} px, ${failures} failed`);
process.exit(failures ? 1 : 0);
