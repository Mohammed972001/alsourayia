// Contact helpers. The facts themselves live in data/business.ts (the one facts record);
// they are re-exported here so existing `@/lib/contact` imports keep working.
import { ADDRESS, BRAND_NAME, LEGAL_NAME, MAPS_URL, NATIONAL_ADDRESS, PHONE2_DISPLAY, PHONE2_TEL, PHONE_DISPLAY, PHONE_TEL, UNIFIED_NUMBER, VAT_NUMBER, WHATSAPP2_NUMBER, WHATSAPP_NUMBER, legalLine } from '@/data/business';

export {
    ADDRESS, BRAND_NAME, LEGAL_NAME, MAPS_URL, NATIONAL_ADDRESS, PHONE2_DISPLAY, PHONE2_TEL, PHONE_DISPLAY, PHONE_TEL,
    UNIFIED_NUMBER, VAT_NUMBER, WHATSAPP2_NUMBER, WHATSAPP_NUMBER, legalLine,
};

/**
 * Rubber, parquet and medical-vinyl pages. Their ads carry the second number,
 * so WhatsApp there goes to it too and the shop can tell those leads apart
 * (owner's request, 2026-10-22).
 */
const SECOND_LINE_PAGES = new Set([
    '/products/category/rubber-flooring', '/products/rabal-gem', '/products/non-slip-rubber', '/products/horse-rubber',
    '/products/category/parquet', '/products/parket', '/products/water-resistant-carpet',
    '/products/hospital-flooring',
]);

export function whatsappNumberFor(pathname: string): string {
    return SECOND_LINE_PAGES.has(pathname.replace(/\/+$/, '')) ? WHATSAPP2_NUMBER : WHATSAPP_NUMBER;
}

export function whatsappLink(message = 'السلام عليكم، أريد الاستفسار عن منتجات الموكيت والمفروشات') {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
