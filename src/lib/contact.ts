import { site } from "@/content/site";

/**
 * Pages whose ads carry the second line: WhatsApp there opens 0559686290 so the shop can tell those
 * leads apart (owner, 2026-10-22). Calls keep the main line everywhere. The swap happens at tap time in
 * src/lib/tracking.ts, so the static HTML always holds the main number.
 */
const SECOND_LINE_PAGES = new Set([
  "/products/category/rubber-flooring",
  "/products/rabal-gem",
  "/products/non-slip-rubber",
  "/products/category/parquet",
  "/products/parket",
  "/products/water-resistant-carpet",
  "/products/hospital-flooring",
]);

export function whatsappNumberFor(pathname: string): string {
  return SECOND_LINE_PAGES.has(pathname.replace(/\/+$/, "")) ? site.whatsapp2 : site.whatsapp;
}

/** The prepared message. The tracker rewrites it at tap time to say what the visitor looked at and where they came from. */
export function waMessage(product?: string, sample = false): string {
  if (sample) return product ? `السلام عليكم، أبغى عينة مجانية من ${product}.` : "السلام عليكم، أبغى عينة مجانية.";
  return product ? `السلام عليكم، أبغى أستفسر عن ${product}.` : "السلام عليكم، أبغى أستفسر عن منتجاتكم.";
}

export function whatsappHref(product?: string, sample = false): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessage(product, sample))}`;
}

export function telHref(second = false): string {
  return `tel:${second ? site.phone2 : site.phone}`;
}

/** «055 010 1867» from E.164. */
export function displayPhone(phone: string): string {
  const local = phone.replace(/^\+966/, "0");
  return local.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");
}
