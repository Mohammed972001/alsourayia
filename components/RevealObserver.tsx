'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const SETTLE_MS = 1800;
/** Elements whose animation loops forever; they run only while on screen (motion.css, `[data-onscreen]`). */
const LOOPS = '.marquee, .cards-marquee, .float-loop, .shine, .pulse-ring, .logo-shine';

/**
 * Marks `[data-reveal]` elements with `data-revealed` the first time they enter the screen; the rules in
 * app/motion.css do the rest. Elements only start hidden once the inline boot script in app/layout.tsx has
 * put `js` on <html>, and that script takes the class away again if this observer has not started within
 * 4 s, so no-JS visitors, crawlers and a stalled hydration always see the content.
 *
 * It also: shows anything reached with the keyboard at once, pauses endless loops that are off screen,
 * moves the spotlight on `[data-spotlight]` cards after the pointer, and watches nodes added later (route
 * changes, product filter swaps).
 */
export function RevealObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.revealReady = '1';
        root.classList.add('js');
        if (!('IntersectionObserver' in window)) return;

        const reveal = (el: HTMLElement) => {
            el.dataset.revealed = '';
            window.setTimeout(() => { el.dataset.settled = ''; }, SETTLE_MS);
        };

        // Threshold 0: a clipped or very tall element never reaches an area ratio, so any visible strip counts.
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    io.unobserve(entry.target);
                    reveal(entry.target as HTMLElement);
                }
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0 },
        );
        const loops = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                const el = entry.target as HTMLElement;
                if (entry.isIntersecting) el.dataset.onscreen = '';
                else delete el.dataset.onscreen;
            }
        });

        const observe = (scope: ParentNode) => {
            scope.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el));
            scope.querySelectorAll<HTMLElement>(LOOPS).forEach((el) => loops.observe(el));
        };
        observe(document);

        const mo = new MutationObserver((mutations) => {
            for (const m of mutations) {
                m.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches('[data-reveal]') && node.dataset.revealed === undefined) io.observe(node);
                    if (node.matches(LOOPS)) loops.observe(node);
                    observe(node);
                });
            }
        });
        mo.observe(document.body, { childList: true, subtree: true });

        // A control reached with the keyboard is shown at once, whatever entrance it was waiting for.
        const onFocus = (event: FocusEvent) => {
            let el = (event.target as Element | null)?.closest<HTMLElement>('[data-reveal]:not([data-revealed])');
            while (el) {
                io.unobserve(el);
                reveal(el);
                el = el.parentElement?.closest<HTMLElement>('[data-reveal]:not([data-revealed])') ?? null;
            }
        };
        document.addEventListener('focusin', onFocus);

        // A soft light follows the pointer over `[data-spotlight]` cards, at most once a frame.
        let frame = 0;
        let pointer: PointerEvent | null = null;
        const onMove = (event: PointerEvent) => {
            pointer = event;
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const card = (pointer?.target as Element | null)?.closest<HTMLElement>('[data-spotlight]');
                if (!card || !pointer) return;
                const box = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${pointer.clientX - box.left}px`);
                card.style.setProperty('--my', `${pointer.clientY - box.top}px`);
            });
        };
        const hover = window.matchMedia('(hover: hover)').matches;
        if (hover) document.addEventListener('pointermove', onMove, { passive: true });

        return () => {
            io.disconnect();
            loops.disconnect();
            mo.disconnect();
            cancelAnimationFrame(frame);
            document.removeEventListener('focusin', onFocus);
            if (hover) document.removeEventListener('pointermove', onMove);
        };
    }, [pathname]);

    return null;
}
