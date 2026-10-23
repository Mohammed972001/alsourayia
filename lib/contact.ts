export const BRAND_NAME = 'موكيت ومفروشات السريع';
// The registered establishment behind the brand, spelled exactly as on its
// commercial registration certificate (Ministry of Commerce), and its unified
// national number. Google Ads needs the advertiser behind the site to be
// identifiable, and the name must match the payments profile letter for letter.
export const LEGAL_NAME = 'مؤسسة فنون العاديات لديكورات والارضيات العالميه';
export const UNIFIED_NUMBER = '7054751560';

/** «موكيت ومفروشات السريع تابع لـ<establishment> (الرقم الوطني الموحد …)». */
export function legalLine(): string {
    return `${BRAND_NAME} تابع لـ${LEGAL_NAME} (الرقم الوطني الموحد ${UNIFIED_NUMBER})`;
}

export const PHONE_DISPLAY = '0550101867';
export const PHONE_TEL = 'tel:+966550101867';
export const WHATSAPP_NUMBER = '966550101867';
// Second line: calls, and WhatsApp on the pages below.
export const PHONE2_DISPLAY = '0559686290';
export const PHONE2_TEL = 'tel:+966559686290';
export const WHATSAPP2_NUMBER = '966559686290';

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
export const ADDRESS = 'مخرج ٢٢ حراج بن قاسم القديم سوق العرب الدولي، الرياض';
export const MAPS_URL = 'https://www.google.com/maps?q=24.596556,46.730583';

export function whatsappLink(message = 'السلام عليكم، أريد الاستفسار عن منتجات الموكيت والمفروشات') {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
