import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

// Self-hosted via Next.js — eliminates render-blocking Google Fonts request
const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['300', '400', '500', '700', '800'],
    variable: '--font-tajawal',
    display: 'swap',
    preload: true,
});

// Get the site URL from environment variable with fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com';
const baseUrl = siteUrl.replace(/\/$/, ''); // Remove trailing slash

export const metadata: Metadata = {
    // Metadata Base URL - Uses environment variable for flexibility
    metadataBase: new URL(baseUrl),

    // Basic Meta Tags
    title: {
        default: 'موكيت ومفروشات السريع | أفضل موكيت ومفروشات الرياض',
        template: '%s | موكيت ومفروشات السريع'
    },
    description: 'موكيت ومفروشات السريع - الرائدون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية. موكيت مساجد، أرضيات مكتبية، باركيه، عشب صناعي، تنسيق حدائق. خدمة تركيب احترافية وضمان شامل. اتصل الآن 966541540047+',

    // Keywords for SEO
    keywords: [
        // Arabic Keywords - Main
        'موكيت',
        'مفروشات',
        'سجاد',
        'موكيت الرياض',
        'مفروشات الرياض',
        'سجاد الرياض',
        'ارضيات',
        'ارضيات الرياض',
        'السريع',

        // Products
        'موكيت مساجد',
        'سجاد مساجد',
        'موكيت فنادق',
        'موكيت مكاتب',
        'أرضيات مكتبية',
        'باركيه',
        'باركيه ضد الماء',
        'عشب صناعي',
        'نجيل صناعي',
        'فينيل',
        'أرضيات فينيل',
        'موكيت تركي',
        'موكيت مشجر',
        'سجاد فاخر',
        'سجاد عصري',

        // Services
        'تنسيق حدائق',
        'تنسيق حدائق الرياض',
        'شلالات',
        'نوافير',
        'تركيب موكيت',
        'تركيب باركيه',

        // Location Keywords
        'موكيت السعودية',
        'مفروشات السعودية',
        'موكيت جدة',
        'موكيت الدمام',
        'موكيت مكة',
        'مفروشات جدة',
        'أرضيات الرياض',

        // Brand Combinations
        'موكيت السريع',
        'مفروشات السريع',
        'سجاد السريع',
        'موكيت السريع الرياض',
        'مفروشات السريع الرياض',
        'ارضيات السريع',

        // English Keywords
        'carpet riyadh',
        'carpet saudi arabia',
        'flooring riyadh',
        'artificial grass saudi'
    ].join(', '),

    // Authors and Creator
    authors: [{ name: 'موكيت ومفروشات السريع' }],
    creator: 'موكيت ومفروشات السريع',
    publisher: 'موكيت ومفروشات السريع',

    // Robots Configuration
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Open Graph for Social Media
    openGraph: {
        title: 'موكيت ومفروشات السريع | أفضل موكيت ومفروشات الرياض',
        description: 'الرائدون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة. موكيت مساجد، أرضيات، باركيه، عشب صناعي. اتصل الآن!',
        siteName: 'موكيت ومفروشات السريع',
        locale: 'ar_SA',
        type: 'website',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'موكيت ومفروشات السريع - أفضل موكيت ومفروشات الرياض',
            }
        ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'موكيت ومفروشات السريع | أفضل موكيت ومفروشات الرياض',
        description: 'أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية',
        images: ['/images/og-image.jpg'],
    },

    // Alternate Languages
    alternates: {
        canonical: baseUrl,
        languages: {
            'ar-SA': baseUrl,
        },
    },

    // Verification (add your verification codes)
    verification: {
        google: 'your-google-verification-code',
    },

    // Category
    category: 'business',

    // Other Meta
    other: {
        'geo.region': 'SA-01',
        'geo.placename': 'Riyadh',
        'geo.position': '24.5959;46.7306',
        'ICBM': '24.5959, 46.7306',
        'contact': '+966541540047',
        'reply-to': 'info@mokeet-elsuarye.com',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Enhanced Structured Data for Local Business (JSON-LD)
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#localbusiness`,
        "name": "موكيت ومفروشات السريع",
        "alternateName": ["Al-Sari Carpets & Furnishings", "موكيت السريع", "مفروشات السريع"],
        "description": "متخصصون في توفير أجود أنواع الموكيت والسجاد والمفروشات والأرضيات في الرياض والمملكة العربية السعودية. موكيت مساجد، باركيه، عشب صناعي، تنسيق حدائق.",
        "image": [
            `${baseUrl}/images/og-image.jpg`,
            `${baseUrl}/home/hero-moket-alsurye-riyadh.jpg`
        ],
        "logo": `${baseUrl}/images/logo.png`,
        "telephone": "+966541540047",
        "email": "info@mokeet-elsuarye.com",
        "url": baseUrl,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "مخرج ٢٢ حراج بن قاسم القديم سوق العرب الدولي",
            "addressLocality": "الرياض",
            "addressRegion": "منطقة الرياض",
            "postalCode": "12345",
            "addressCountry": "SA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 24.5959,
            "longitude": 46.7306
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "الرياض",
                "@id": "https://www.wikidata.org/wiki/Q3692"
            },
            {
                "@type": "City",
                "name": "جدة"
            },
            {
                "@type": "City",
                "name": "الدمام"
            },
            {
                "@type": "City",
                "name": "مكة المكرمة"
            },
            {
                "@type": "City",
                "name": "المدينة المنورة"
            },
            {
                "@type": "Country",
                "name": "المملكة العربية السعودية"
            }
        ],
        "priceRange": "$$",
        "currenciesAccepted": "SAR",
        "paymentAccepted": "Cash, Credit Card, Mada, Bank Transfer",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                "opens": "09:00",
                "closes": "22:00"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
        },
        "sameAs": [
            "https://wa.me/966541540047"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "منتجات موكيت ومفروشات السريع",
            "itemListElement": [
                {
                    "@type": "OfferCatalog",
                    "name": "موكيت",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Product",
                                "name": "موكيت مساجد",
                                "description": "موكيت مساجد عالي الجودة بتصميمات إسلامية"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Product",
                                "name": "موكيت تركي مشجر",
                                "description": "موكيت تركي فاخر بتصميمات أصيلة"
                            }
                        }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "أرضيات",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Product",
                                "name": "باركيه ضد الماء",
                                "description": "باركيه مقاوم للماء بجودة عالية"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Product",
                                "name": "أرضيات مكتبية",
                                "description": "أرضيات مكتبية احترافية"
                            }
                        }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "خدمات",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "تنسيق حدائق",
                                "description": "خدمات تنسيق حدائق احترافية"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "تركيب موكيت",
                                "description": "خدمة تركيب موكيت احترافية"
                            }
                        }
                    ]
                }
            ]
        }
    };

    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "موكيت ومفروشات السريع",
        "alternateName": "Al-Sari Carpets & Furnishings",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "description": "شركة رائدة في مجال الموكيت والسجاد والمفروشات والأرضيات في الرياض",
        "foundingDate": "2010",
        "founder": {
            "@type": "Person",
            "name": "السريع"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966541540047",
            "contactType": "customer service",
            "areaServed": "SA",
            "availableLanguage": ["Arabic", "English"]
        }
    };

    // WebSite Schema for Sitelinks
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "موكيت ومفروشات السريع",
        "description": "أفضل موكيت ومفروشات في الرياض",
        "publisher": {
            "@id": `${baseUrl}/#organization`
        },
        "inLanguage": "ar-SA"
    };

    return (
        <html lang="ar" dir="rtl" className={tajawal.variable}>
            <head>

                {/* Preload Hero Image for LCP */}
                <link
                    rel="preload"
                    as="image"
                    href="/heroBG.jpeg"
                    type="image/jpeg"
                />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Structured Data - Local Business */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />

                {/* Structured Data - Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />

                {/* Structured Data - Website */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />

                {/* Additional SEO Meta Tags */}
                <meta name="theme-color" content="#1B2B4A" />
                <meta name="msapplication-TileColor" content="#1B2B4A" />
                <meta name="format-detection" content="telephone=yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="موكيت السريع" />
            </head>
            <body className="font-tajawal antialiased">
                {children}
            </body>
        </html>
    );
}
