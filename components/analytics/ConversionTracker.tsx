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
        else if (params.get('utm_source') === 'google' && params.get('utm_medium') === 'cpc') source = 'google';
        else if (params.has('ttclid')) source = 'tiktok';
        if (source) sessionStorage.setItem(AD_SOURCE_KEY, source);
        return source ?? sessionStorage.getItem(AD_SOURCE_KEY);
    } catch {
        return null;
    }
}

/** Where the visitor saw us, in the words the shop reads in WhatsApp. */
const WHERE: Record<string, string> = { google: 'إعلانكم على جوجل', tiktok: 'إعلانكم على تيك توك' };

/**
 * The WhatsApp message says what the visitor looked at and whether they came
 * from an ad or the site, so the shop can tell its leads apart (owner's
 * request, 2026-10-20). Product and category pages name their H1.
 */
function whatsappMessage(original: string, source: string | null): string {
    const where = (source && WHERE[source]) || 'موقعكم';
    const onProduct = window.location.pathname.startsWith('/products/');
    const product = onProduct ? document.querySelector('h1')?.textContent?.trim() : '';
    const wantsSample = original.includes('عينة');
    if (product) {
        return `السلام عليكم، شاهدت «${product}» في ${where} وأريد ${wantsSample ? 'طلب عينة مجانية' : 'الاستفسار'}.`;
    }
    return `السلام عليكم، شاهدت ${where} وأريد ${wantsSample ? 'طلب عينة مجانية' : 'الاستفسار عن منتجاتكم'}.`;
}

function rewriteWhatsAppLink(link: HTMLAnchorElement, source: string | null) {
    try {
        const url = new URL(link.href);
        const original = url.searchParams.get('text') ?? '';
        url.searchParams.delete('text');
        // encodeURIComponent, not searchParams.set: WhatsApp shows a "+" from
        // form encoding as a literal plus instead of a space.
        const rest = url.searchParams.toString();
        const message = encodeURIComponent(whatsappMessage(original, source));
        link.href = `${url.origin}${url.pathname}?${rest ? `${rest}&` : ''}text=${message}`;
    } catch {
        // Leave the link as it is.
    }
}

/**
 * One delegated listener for every WhatsApp / call link on the site, so a
 * link added later is tracked without touching it. Capture phase: it runs
 * before the browser leaves for WhatsApp or the dialer, so the WhatsApp text
 * can still be rewritten.
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

            if (kind === 'whatsapp') rewriteWhatsAppLink(link, source);

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
