#!/usr/bin/env node
// Conversion check (spec 001 T024, constitution VI). Usage:
//   node scripts/tag-check.mjs                                 (live site, three landing pages)
//   node scripts/tag-check.mjs /products/parket /contact       (these pages)
// Opens each page as an ad visitor in headless Chrome, taps a WhatsApp link and a call link, and fails unless each tap
// sends both contact_click and the Ads conversion. Analytics and ad hits are blocked and links do not navigate, so the
// check adds nothing to the client's data.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SITE = 'https://www.mokeet-elsuarye.com';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BLOCKED = ['*google-analytics.com*', '*googleadservices.com*', '*doubleclick.net*', '*analytics.tiktok.com/api*', '*googletagmanager.com/g/collect*', '*/cdn-cgi/rum*', '*/rmkt/collect*', '*/ccm/collect*'];
const SETTLE_MS = 8000;
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/products/parket', '/products/category/rubber-flooring'];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const port = 9300 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), 'tag-check-'));
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
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
        window.__events = [];
        document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a'); if (a) e.preventDefault(); });
        setInterval(() => {
            if (window.gtag && !window.gtag.__wrapped) {
                const original = window.gtag;
                const wrapped = function () { window.__events.push(String(arguments[1])); return original.apply(this, arguments); };
                wrapped.__wrapped = true;
                window.gtag = wrapped;
            }
        }, 200);
    `,
});

let failures = 0;
for (const path of pages) {
    await send('Page.navigate', { url: `${SITE}${path}?gclid=TEST123` });
    await sleep(SETTLE_MS);
    const { result } = await send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
            const tap = (link) => { window.__events.length = 0; if (link) link.click(); return [...window.__events]; };
            const whatsapp = [...document.querySelectorAll('a[href*="wa.me"]')].find((a) => a.offsetParent);
            const whatsappEvents = tap(whatsapp);
            const number = whatsapp ? whatsapp.href.split('wa.me/')[1].split('?')[0] : null;
            const text = whatsapp ? decodeURIComponent(whatsapp.href.split('text=')[1] || '') : '';
            const callEvents = tap(document.querySelector('a[href^="tel:"]'));
            return JSON.stringify({ number, text, whatsappEvents, callEvents });
        })()`,
    });
    const page = JSON.parse(result.result.value);
    const ok = (events) => events.includes('contact_click') && events.includes('conversion');
    const passed = ok(page.whatsappEvents) && ok(page.callEvents);
    if (!passed) failures++;
    console.log(`${passed ? 'ok  ' : 'FAIL'} ${path} WhatsApp ${page.number}: ${page.text.slice(0, 70)}`);
}

socket.close();
chrome.kill();
await sleep(800);
try {
    rmSync(profile, { recursive: true, force: true });
} catch {
    // Chrome may still hold the folder; it is only a temp profile.
}
console.log(`tag-check: ${pages.length} pages, ${failures} failed`);
process.exit(failures ? 1 : 0);
