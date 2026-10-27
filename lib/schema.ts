// The site-wide JSON-LD graph (research R5): one business, one organisation, one website,
// all built from data/business.ts. Page-level blocks (BreadcrumbList, FAQPage, Service,
// CollectionPage) reference these nodes by @id instead of describing the business again.
// No aggregateRating and no Offer with a price: neither is confirmed by the owner.
import {
    BRAND_ALTERNATE_NAMES, BRAND_NAME, CITY, COUNTRY_CODE, EMAIL, GEO, HOURS, LEGAL_NAME, MAPS_URL,
    NATIONAL_ADDRESS, PHONES, POSTAL_CODE, REGION, SAME_AS, SITE_URL, STREET_ADDRESS, UNIFIED_NUMBER, VAT_NUMBER,
} from '@/data/business';

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const ORG_ID = `${SITE_URL}/#org`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// An owner installation photo (mosque carpet, Oct 2026); folder and file names hold spaces.
const SHOP_PHOTO = '/msaged/WhatsApp Image 2026-10-25 at 9.31.16 PM.webp';

export function businessGraph() {
    const logo = `${SITE_URL}/logo.png`;
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'HomeAndConstructionBusiness',
                '@id': BUSINESS_ID,
                name: BRAND_NAME,
                alternateName: BRAND_ALTERNATE_NAMES,
                legalName: LEGAL_NAME,
                description: `${BRAND_NAME}: موكيت ومفروشات وأرضيات في ${CITY} — موكيت مكاتب وبلاط موكيت، أرضيات مطاط (ربل) للجيم ودورات المياه، موكيت مساجد، فينيل، باركيه وعشب صناعي.`,
                url: SITE_URL,
                logo,
                image: [`${SITE_URL}/brand/badge.webp`, encodeURI(`${SITE_URL}${SHOP_PHOTO}`)],
                telephone: PHONES.map((p) => p.e164),
                email: EMAIL,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: STREET_ADDRESS,
                    addressLocality: CITY,
                    addressRegion: REGION,
                    postalCode: POSTAL_CODE,
                    addressCountry: COUNTRY_CODE,
                },
                identifier: {
                    '@type': 'PropertyValue',
                    propertyID: 'العنوان الوطني المختصر',
                    value: NATIONAL_ADDRESS,
                },
                geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
                hasMap: MAPS_URL,
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: HOURS.days,
                        opens: HOURS.opens,
                        closes: HOURS.closes,
                    },
                ],
                areaServed: [
                    { '@type': 'City', name: CITY },
                    { '@type': 'Country', name: 'المملكة العربية السعودية', identifier: COUNTRY_CODE },
                ],
                currenciesAccepted: 'SAR',
                sameAs: SAME_AS,
                parentOrganization: { '@id': ORG_ID },
            },
            {
                '@type': 'Organization',
                '@id': ORG_ID,
                name: LEGAL_NAME,
                legalName: LEGAL_NAME,
                identifier: {
                    '@type': 'PropertyValue',
                    propertyID: 'الرقم الوطني الموحد',
                    value: UNIFIED_NUMBER,
                },
                vatID: VAT_NUMBER,
                url: SITE_URL,
                logo,
                brand: { '@type': 'Brand', name: BRAND_NAME },
                contactPoint: PHONES.map((p) => ({
                    '@type': 'ContactPoint',
                    telephone: p.e164,
                    contactType: 'sales',
                    areaServed: COUNTRY_CODE,
                    availableLanguage: 'Arabic',
                })),
            },
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                url: SITE_URL,
                name: BRAND_NAME,
                inLanguage: 'ar-SA',
                publisher: { '@id': ORG_ID },
                about: { '@id': BUSINESS_ID },
            },
        ],
    };
}
