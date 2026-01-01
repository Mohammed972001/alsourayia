import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    // Metadata Base URL
    metadataBase: new URL('https://alsari-carpets.com'),

    // Basic Meta Tags
    title: {
        default: 'موكيت ومفروشات السريع | أفضل موكيت ومفروشات الرياض',
        template: '%s | موكيت ومفروشات السريع'
    },
    description: 'موكيت ومفروشات السريع - الرائدون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية. موكيت مساجد، أرضيات مكتبية، باركيه، عشب صناعي، تنسيق حدائق. خدمة تركيب احترافية وضمان شامل. اتصل الآن 966540079507+',

    // Keywords for SEO
    keywords: [
        // Arabic Keywords - Main
        'موكيت',
        'مفروشات',
        'سجاد',
        'موكيت الرياض',
        'مفروشات الرياض',
        'سجاد الرياض',

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

        // Brand
        'السريع',
        'موكيت السريع',
        'مفروشات السريع',

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
        canonical: 'https://alsari-carpets.com',
        languages: {
            'ar-SA': 'https://alsari-carpets.com',
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
        'geo.position': '24.7136;46.6753',
        'ICBM': '24.7136, 46.6753',
        'contact': '+966540079507',
        'reply-to': 'info@alsari-carpets.com',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Structured Data for Local Business (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "موكيت ومفروشات السريع",
        "alternateName": "Al-Sari Carpets & Furnishings",
        "description": "متخصصون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية",
        "image": "/images/og-image.jpg",
        "telephone": "+966540079507",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "الرياض",
            "addressRegion": "منطقة الرياض",
            "addressCountry": "SA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "24.5959",
            "longitude": "46.7306"
        },
        "url": "https://alsari-carpets.com",
        "priceRange": "$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "09:00",
            "closes": "22:00"
        },
        "sameAs": [],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "منتجاتنا",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "موكيت مساجد"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "أرضيات مكتبية"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "باركيه"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "عشب صناعي"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "تنسيق حدائق"
                    }
                }
            ]
        }
    };

    return (
        <html lang="ar" dir="rtl">
            <head>
                {/* Preconnect to external resources */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Google Fonts */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
                    rel="stylesheet"
                />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                {/* Additional SEO Meta Tags */}
                <meta name="theme-color" content="#0088FF" />
                <meta name="msapplication-TileColor" content="#0088FF" />
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
