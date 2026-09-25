'use client';

import { useEffect } from 'react';

/**
 * One observer for every `[data-reveal]` element on the page.
 *
 * Marks <html> with `reveal-ready` only once it is running, so the hidden
 * start state never applies without JS. A MutationObserver picks up nodes
 * added later (route changes, product filter swaps).
 */
export function RevealObserver() {
    useEffect(() => {
        const root = document.documentElement;
        if (!('IntersectionObserver' in window)) return;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
        );

        const observe = (scope: ParentNode) => {
            scope.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
        };

        observe(document);
        root.classList.add('reveal-ready');

        const mo = new MutationObserver((mutations) => {
            for (const m of mutations) {
                m.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches('[data-reveal]')) io.observe(node);
                    observe(node);
                });
            }
        });
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            io.disconnect();
            mo.disconnect();
        };
    }, []);

    return null;
}
