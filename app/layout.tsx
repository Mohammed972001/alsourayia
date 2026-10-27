import type { Metadata } from 'next';
import { Cairo, Reem_Kufi } from 'next/font/google';
import Script from 'next/script';
import { RevealObserver } from '@/components/RevealObserver';
import ConversionTracker from '@/components/analytics/ConversionTracker';
import { ADS_ID, GA4_ID } from '@/lib/analytics';
import { businessGraph } from '@/lib/schema';
import { EMAIL, GEO, PHONE_DISPLAY, PHONE_E164, SITE_URL } from '@/data/business';
import './globals.css';

// Self-hosted via Next.js — eliminates render-blocking Google Fonts request.
// Type pairing shared with the sister storefront: Cairo for body text,
// Reem Kufi for headings. Only the weights the site uses.
const cairo = Cairo({
    subsets: ['arabic', 'latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cairo',
    // "optional", not "swap": on a slow phone the Arabic woff2 files arrive
    // after first paint and swapping them re-wraps every line (CLS 0.22 on
    // another client's site), which Google Ads scores as a poor landing page.
    display: 'optional',
});

// Display face for headings only
const reemKufi = Reem_Kufi({
    subsets: ['arabic', 'latin'],
    weight: ['500', '700'],
    variable: '--font-reem',
    display: 'optional',
});

const baseUrl = SITE_URL;

export const metadata: Metadata = {
    // Metadata Base URL - Uses environment variable for flexibility
    metadataBase: new URL(baseUrl),

    // Basic Meta Tags
    title: {
        default: 'موكيت مكاتب وأرضيات ربل في الرياض | موكيت ومفروشات السريع',
        template: '%s | موكيت ومفروشات السريع'
    },
    description: `موكيت وباركيه وأرضيات مطاط (ربل جيم) وفينيل طبي وموكيت مساجد في الرياض. معاينة وقياس مجاناً وعينة قبل الطلب. اتصل ${PHONE_DISPLAY}.`,

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
        'شلالات',
        'نوافير',
        'تركيب موكيت',
        'تركيب باركيه',

        // Location Keywords
        'موكيت السعودية',
        'مفروشات السعودية',
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
        googleBot: {
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Open Graph for Social Media
    openGraph: {
        title: 'موكيت مكاتب وأرضيات ربل في الرياض | موكيت ومفروشات السريع',
        description: 'موكيت مكاتب وأرضيات ربل وموكيت مساجد وفينيل في الرياض. معاينة وقياس وتركيب، وعرض السعر على الواتساب.',
        siteName: 'موكيت ومفروشات السريع',
        locale: 'ar_SA',
        type: 'website',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'موكيت ومفروشات السريع في الرياض',
            }
        ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'موكيت مكاتب وأرضيات ربل في الرياض | موكيت ومفروشات السريع',
        description: 'موكيت مكاتب وأرضيات ربل وموكيت مساجد وفينيل في الرياض. معاينة وقياس وتركيب، وعرض السعر على الواتساب.',
        images: ['/images/og-image.jpg'],
    },


    // Category
    category: 'business',

    // Other Meta
    other: {
        'geo.region': 'SA-01',
        'geo.placename': 'Riyadh',
        'geo.position': `${GEO.lat};${GEO.lng}`,
        'ICBM': `${GEO.lat}, ${GEO.lng}`,
        'contact': PHONE_E164,
        'reply-to': EMAIL,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // data-scroll-behavior: globals.css makes in-page anchor jumps smooth; since Next.js 16
    // this attribute is what keeps page-to-page navigation jumping straight to the top.
    return (
        <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${cairo.variable} ${reemKufi.variable}`}>
            <head>
                {/* Motion boot: `js` lets app/motion.css hide revealable elements before they enter the screen; it is
                    taken away again if RevealObserver has not started within 4 s, so content never stays hidden. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: "(function(d){d.classList.add('js');setTimeout(function(){if(!d.dataset.revealReady)d.classList.remove('js')},4000)})(document.documentElement)",
                    }}
                />
                {/* No global hero preload: the home Hero's <Image priority> already
                    preloads it, and every other page downloaded a photo it never shows. */}

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" sizes="48x48" />
                <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Structured data: the one business/organisation/website graph (lib/schema.ts, built from
                    data/business.ts). Page-level blocks point at its nodes by @id instead of repeating them. */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(businessGraph()) }}
                />

                {/* Additional SEO Meta Tags */}
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="format-detection" content="telephone=yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="موكيت السريع" />

            </head>
            <body className="font-sans antialiased">
                <ConversionTracker />
                {children}
                <RevealObserver />

                {/* Google tag: Ads and GA4 share one gtag.js. IDs come from env, so
                    nothing loads until they are set on this site's Vercel project.
                    afterInteractive, not lazyOnload: on a slow phone the load event
                    comes seconds after the WhatsApp bar is already tappable. */}
                {(ADS_ID || GA4_ID) && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID || GA4_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script
                            id="gtag-init"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: [
                                    'window.dataLayer = window.dataLayer || [];',
                                    'function gtag(){dataLayer.push(arguments);}',
                                    "gtag('js', new Date());",
                                    ADS_ID && `gtag('config', '${ADS_ID}');`,
                                    GA4_ID && `gtag('config', '${GA4_ID}');`,
                                ].filter(Boolean).join('\n'),
                            }}
                        />
                    </>
                )}

                {/* TikTok pixel, after load: its events.js was the heaviest script
                    blocking the main thread on phones. */}
                <Script
                    id="tiktok-pixel"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('D7J6VRJC77U9I9C3789G');
  ttq.page();
}(window, document, 'ttq');
                        `
                    }}
                />
            </body>
        </html>
    );
}
