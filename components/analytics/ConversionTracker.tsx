'use client';

import { useEffect } from 'react';
import { trackConversion, type ConversionKind } from '@/lib/analytics';

/**
 * One delegated listener for every WhatsApp / call link on the site, so a
 * link added later is tracked without touching it. Capture phase: it runs
 * before the browser leaves for WhatsApp or the dialer.
 */
export default function ConversionTracker() {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const href = (event.target as HTMLElement | null)?.closest?.('a')?.getAttribute('href');
            if (!href) return;

            let kind: ConversionKind | null = null;
            if (href.startsWith('tel:')) kind = 'call';
            else if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) kind = 'whatsapp';
            if (!kind) return;

            trackConversion(kind, { link_url: href, page_path: window.location.pathname });
        };

        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);

    return null;
}
