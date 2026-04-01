import { MetadataRoute } from 'next';
import { productsDetails } from '@/data/products';
import { categorySlugMap } from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com';
const baseUrl = siteUrl.replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    // Core pages - each a real, crawlable URL
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/service-areas`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Category pages - one crawlable URL per product category
    const categoryPages: MetadataRoute.Sitemap = Object.keys(categorySlugMap).map((slug) => ({
        url: `${baseUrl}/products/category/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // Individual product pages
    const productPages: MetadataRoute.Sitemap = productsDetails.map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...categoryPages, ...productPages];
}
