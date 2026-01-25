import { MetadataRoute } from 'next';
import { productsDetails } from '@/data/products';

/**
 * Dynamic Sitemap Generator for Next.js App Router
 * 
 * This file generates a sitemap.xml automatically at build time and runtime.
 * It uses the NEXT_PUBLIC_SITE_URL environment variable to ensure correct URLs
 * across all environments (local, preview, production).
 * 
 * IMPORTANT: All product pages are now dynamically included from the products data.
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

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        // الصفحة الرئيسية - Home Page (Highest Priority)
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

        // قسم مناطق الخدمة - Service Areas Section
        {
            url: `${baseUrl}/#service-areas`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },

        // قسم آراء العملاء - Testimonials Section
        {
            url: `${baseUrl}/#testimonials`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },

        // قسم الأسئلة الشائعة - FAQ Section
        {
            url: `${baseUrl}/#faq`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },

        // قسم التواصل - Contact Section
        {
            url: `${baseUrl}/#contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // Dynamic product pages - Generated from products data
    const productPages: MetadataRoute.Sitemap = productsDetails.map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Combine static and dynamic pages
    return [...staticPages, ...productPages];
}
