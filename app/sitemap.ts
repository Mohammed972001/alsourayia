import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generator for Next.js App Router
 * 
 * This file generates a sitemap.xml automatically at build time and runtime.
 * It uses the NEXT_PUBLIC_SITE_URL environment variable to ensure correct URLs
 * across all environments (local, preview, production).
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

// Get the site URL from environment variable with fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com';

// Remove trailing slash if present for consistency
const baseUrl = siteUrl.replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
    // Current date for lastModified
    const currentDate = new Date();

    return [
        // الصفحة الرئيسية - Home Page
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },

        // قسم من نحن - About Section
        {
            url: `${baseUrl}/#about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // قسم المنتجات - Products Section
        {
            url: `${baseUrl}/#products`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },

        // موكيت مساجد - Mosque Carpets
        {
            url: `${baseUrl}/products/mosque-carpets`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // أرضيات مكتبية - Office Flooring
        {
            url: `${baseUrl}/products/office-flooring`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // باركيه - Parquet
        {
            url: `${baseUrl}/products/parket`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // عشب صناعي - Artificial Grass
        {
            url: `${baseUrl}/products/artificial-grass`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // فينيل - Vinyl
        {
            url: `${baseUrl}/products/vinyl-roll`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // موكيت - Carpet
        {
            url: `${baseUrl}/products/mokite`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // تنسيق حدائق - Garden Landscaping
        {
            url: `${baseUrl}/products/garden-flooring`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        // قسم التواصل - Contact Section
        {
            url: `${baseUrl}/#contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];
}
