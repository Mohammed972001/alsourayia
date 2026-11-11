/**
 * Lead tracking, carried over from the live site (constitution VI). One capture-phase click listener
 * (src/components/Motion.tsx) handles every WhatsApp and call link:
 * - GA4 event `contact_click` (method, link_url, page_path, ad_source),
 * - the Google Ads conversion for that action,
 * - the TikTok pixel event `Contact`,
 * - and the WhatsApp text rewritten to say what the visitor looked at and where they came from
 *   («… في إعلانكم على جوجل / تيك توك / موقعكم»), with the second line on the parquet, rubber and medical pages.
 * The tags themselves load only on the live build (src/components/Tags.tsx).
 */
import { whatsappNumberFor } from "./contact";

export const ADS_ID = "AW-18482544361";
export const GA4_ID = "G-VBQKQP75E9";
export const TIKTOK_PIXEL = "D7J6VRJC77U9I9C3789G";
const ADS_LABELS = { whatsapp: "ZyWkCIjwlp4dEOn9lO1E", call: "GTDECIvwlp4dEOn9lO1E" } as const;

export type ContactKind = keyof typeof ADS_LABELS;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
  }
}

const AD_SOURCE_KEY = "ad_source";

/** Which paid click brought this visit, remembered for the browser session. */
export function adSource(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    let source: string | null = null;
    if (params.has("gclid") || params.has("gbraid") || params.has("wbraid")) source = "google";
    else if (params.get("utm_source") === "google" && params.get("utm_medium") === "cpc") source = "google";
    else if (params.has("ttclid")) source = "tiktok";
    else if (params.get("utm_source") === "tiktok" && params.get("utm_medium") === "cpc") source = "tiktok";
    if (source) sessionStorage.setItem(AD_SOURCE_KEY, source);
    return source ?? sessionStorage.getItem(AD_SOURCE_KEY);
  } catch {
    return null;
  }
}

/** Where the visitor saw us, in the words the shop reads in WhatsApp (owner, 2026-10-20). */
const WHERE: Record<string, string> = { google: "إعلانكم على جوجل", tiktok: "إعلانكم على تيك توك" };

function whatsappMessage(original: string, source: string | null, keepText: boolean): string {
  const where = (source && WHERE[source]) || "موقعكم";
  // A link marked data-keep-text (the quantity calculator) already says what is asked; only the source is added.
  if (keepText && original) return `${original} — عبر ${where}`;
  const onProduct = window.location.pathname.startsWith("/products/");
  const product = onProduct ? document.querySelector("h1")?.textContent?.trim() : "";
  const wantsSample = original.includes("عينة");
  const want = wantsSample ? "طلب عينة مجانية" : product ? "الاستفسار" : "الاستفسار عن منتجاتكم";
  return product ? `السلام عليكم، شاهدت «${product}» في ${where} وأريد ${want}.` : `السلام عليكم، شاهدت ${where} وأريد ${want}.`;
}

/** Rewrites the message (and the number on second-line pages); returns the chat URL without the text. */
function rewriteWhatsApp(link: HTMLAnchorElement, source: string | null): string {
  try {
    const url = new URL(link.href);
    if (url.hostname === "wa.me") url.pathname = `/${whatsappNumberFor(window.location.pathname)}`;
    const original = url.searchParams.get("text") ?? "";
    url.searchParams.delete("text");
    // encodeURIComponent, not searchParams.set: WhatsApp shows a "+" from form encoding as a plus sign.
    const rest = url.searchParams.toString();
    link.href = `${url.origin}${url.pathname}?${rest ? `${rest}&` : ""}text=${encodeURIComponent(whatsappMessage(original, source, link.hasAttribute("data-keep-text")))}`;
    return `${url.origin}${url.pathname}`;
  } catch {
    return link.href;
  }
}

function track(kind: ContactKind, meta: Record<string, unknown>): void {
  window.ttq?.track("Contact", { content_type: "product", content_id: meta.page_path, contact_method: kind });
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "contact_click", { method: kind, ...meta });
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${ADS_LABELS[kind]}` });
}

/** The click handler (capture phase: runs before the browser leaves for WhatsApp or the dialer). */
export function onContactClick(event: MouseEvent, source: string | null): void {
  const link = (event.target as Element | null)?.closest?.("a:not([data-credit])") as HTMLAnchorElement | null;
  const href = link?.getAttribute("href");
  if (!link || !href) return;
  let kind: ContactKind | null = null;
  if (href.startsWith("tel:")) kind = "call";
  else if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) kind = "whatsapp";
  if (!kind) return;
  // GA4 keeps only 100 characters of link_url, so WhatsApp reports the chat number without the text.
  const linkUrl = kind === "whatsapp" ? rewriteWhatsApp(link, source) : href;
  track(kind, { link_url: linkUrl, page_path: window.location.pathname, ...(source ? { ad_source: source } : {}) });
}
