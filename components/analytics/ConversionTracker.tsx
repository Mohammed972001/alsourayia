'use client';

import { useEffect } from 'react';
import { trackConversion, type ConversionKind } from '@/lib/analytics';

const AD_SOURCE_KEY = 'ad_source';

/** Which paid click brought this visit, remembered for the browser session. */
function adSource(): string | null {
    try {
        const params = new URLSearchParams(window.location.search);
        let source: string | null = null;
        if (params.has('gclid') || params.has('gbraid') || params.has('wbraid')) source = 'google';
        else if (params.has('ttclid')) source = 'tiktok';
        if (source) sessionStorage.setItem(AD_SOURCE_KEY, source);
        return source ?? sessionStorage.getItem(AD_SOURCE_KEY);
    } catch {
        return null;
    }
}

/** Added to the end of the WhatsApp message so the shop can count ad leads. */
const AD_MARKERS: Record<string, string> = { google: '(إعلان)', tiktok: '(تيك توك)' };

function markWhatsAppLink(link: HTMLAnchorElement, marker: string) {
    try {
        const url = new URL(link.href);
        const text = url.searchParams.get('text') ?? '';
        if (text.includes(marker)) return;
        url.searchParams.set('text', text ? `${text} ${marker}` : marker);
        link.href = url.toString();
    } catch {
        // Leave the link as it is.
    }
}

/**
 * One delegated listener for every WhatsApp / call link on the site, so a
 * link added later is tracked without touching it. Capture phase: it runs
 * before the browser leaves for WhatsApp or the dialer, so the WhatsApp text
 * can still be marked for visitors who came from an ad.
 */
export default function ConversionTracker() {
    useEffect(() => {
        const source = adSource();

        const onClick = (event: MouseEvent) => {
            const link = (event.target as HTMLElement | null)?.closest?.('a');
            const href = link?.getAttribute('href');
            if (!link || !href) return;

            let kind: ConversionKind | null = null;
            if (href.startsWith('tel:')) kind = 'call';
            else if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) kind = 'whatsapp';
            if (!kind) return;

            if (kind === 'whatsapp' && source && AD_MARKERS[source]) markWhatsAppLink(link, AD_MARKERS[source]);

            trackConversion(kind, {
                link_url: href,
                page_path: window.location.pathname,
                ...(source ? { ad_source: source } : {}),
            });
        };

        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);

    return null;
}
