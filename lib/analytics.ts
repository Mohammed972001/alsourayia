/**
 * Google Ads / GA4 IDs come from the environment, so nothing loads until the
 * account for this site exists and the IDs are set on its Vercel project.
 * Every helper is a no-op while an ID is missing.
 */
export const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID ?? '';
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? '';

/** Conversion labels from Google Ads, one per conversion action. */
export const ADS_LABELS = {
    whatsapp: process.env.NEXT_PUBLIC_ADS_LABEL_WHATSAPP ?? '',
    call: process.env.NEXT_PUBLIC_ADS_LABEL_CALL ?? '',
} as const;

export type ConversionKind = keyof typeof ADS_LABELS;

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
    }
}

/**
 * Records a lead: a GA4 event, an Ads conversion once that action's label is
 * set (Ads drops conversions with an empty label), and a TikTok "Contact" so
 * the TikTok pixel measures leads and not only page views.
 */
export function trackConversion(kind: ConversionKind, meta: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return;

    window.ttq?.track('Contact', { content_type: 'product', content_id: meta.page_path, contact_method: kind });

    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'contact_click', { method: kind, ...meta });
    const label = ADS_LABELS[kind];
    if (ADS_ID && label) {
        window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}` });
    }
}
