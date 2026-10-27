/**
 * The one record of business facts (specs/001-seo-geo-relaunch/contracts/business-facts.md).
 *
 * Every phone, address, hour, legal name and registration number the site shows or puts in
 * structured data, llms.txt or the chat assistant is typed here and nowhere else;
 * scripts/facts-guard.mjs fails the build when one of them appears hard-coded elsewhere.
 * Constitution I: only owner-confirmed facts. No rating, price, founding year or city list.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

// --- Identity -------------------------------------------------------------------------------

export const BRAND_NAME = 'موكيت ومفروشات السريع';
/** The brand's own short and Latin spellings. «مفروشات السريع» is another shop's name: never add it. */
export const BRAND_SHORT = 'موكيت السريع';
export const BRAND_LATIN = 'Al-Sari Carpets & Furnishings';
export const BRAND_ALTERNATE_NAMES = [BRAND_LATIN, BRAND_SHORT];

// The registered establishment behind the brand, spelled exactly as on its
// commercial registration certificate (Ministry of Commerce), and its unified
// national number. Google Ads needs the advertiser behind the site to be
// identifiable, and the name must match the payments profile letter for letter.
export const LEGAL_NAME = 'مؤسسة فنون العاديات لديكورات والارضيات العالميه';
export const UNIFIED_NUMBER = '7054751560';
// ZATCA VAT registration certificate.
export const VAT_NUMBER = '314892165400003';
// Saudi National Address short code of the showroom (building 3189, Mazroah St, Manfuhah, 12685).
export const NATIONAL_ADDRESS = 'RCNA3189';

// --- Contact --------------------------------------------------------------------------------

export const PHONE_DISPLAY = '0550101867';
export const PHONE_E164 = '+966550101867';
export const PHONE_TEL = `tel:${PHONE_E164}`;
export const WHATSAPP_NUMBER = PHONE_E164.slice(1);
// Second line: calls, and WhatsApp on the rubber, parquet and medical-vinyl pages (lib/contact.ts).
export const PHONE2_DISPLAY = '0559686290';
export const PHONE2_E164 = '+966559686290';
export const PHONE2_TEL = `tel:${PHONE2_E164}`;
export const WHATSAPP2_NUMBER = PHONE2_E164.slice(1);

export const PHONES = [
    { display: PHONE_DISPLAY, e164: PHONE_E164, tel: PHONE_TEL, whatsapp: WHATSAPP_NUMBER, role: 'main' },
    { display: PHONE2_DISPLAY, e164: PHONE2_E164, tel: PHONE2_TEL, whatsapp: WHATSAPP2_NUMBER, role: 'second line: parquet, rubber, medical vinyl' },
] as const;

export const EMAIL = 'info@mokeet-elsuarye.com';
export const SAME_AS = ['https://www.tiktok.com/@httpswww.mokeetelsuarye1'];

// --- Place ----------------------------------------------------------------------------------

export const STREET_ADDRESS = 'مخرج ٢٢ حراج بن قاسم القديم سوق العرب الدولي';
export const CITY = 'الرياض';
export const REGION = 'منطقة الرياض';
export const POSTAL_CODE = '12685';
export const COUNTRY_CODE = 'SA';
export const ADDRESS = `${STREET_ADDRESS}، ${CITY}`;
/** Short form for strips and taglines. */
export const ADDRESS_SHORT = `حراج بن قاسم، ${CITY}`;
export const GEO = { lat: 24.596556, lng: 46.730583 } as const;
export const MAPS_URL = `https://www.google.com/maps?q=${GEO.lat},${GEO.lng}`;

// --- Hours ----------------------------------------------------------------------------------

export const HOURS = {
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '22:00',
} as const;
/** For sentences: «… يومياً من 9 صباحاً حتى 10 مساءً». */
export const HOURS_TEXT = 'يومياً من 9 صباحاً حتى 10 مساءً';
/** For strips and badges. */
export const HOURS_SHORT = 'يومياً 9 صباحاً – 10 مساءً';

// --- Promises (owner-confirmed, constitution I) ---------------------------------------------

export const SERVICES = [
    'معاينة وقياس مجاناً',
    'عينة مجانية قبل الطلب',
    'توريد وتركيب',
    'توريد لكل مدن المملكة',
] as const;
/** Inspection and installation in Riyadh; delivery to every city of the Kingdom. */
export const AREA_SERVED_TEXT = 'المعاينة والتركيب في الرياض، والتوريد لكل مدن المملكة';

/** «موكيت ومفروشات السريع تابع لـ<establishment> (الرقم الوطني الموحد … - الرقم الضريبي …)». */
export function legalLine(): string {
    return `${BRAND_NAME} تابع لـ${LEGAL_NAME} (الرقم الوطني الموحد ${UNIFIED_NUMBER} - الرقم الضريبي ${VAT_NUMBER})`;
}
