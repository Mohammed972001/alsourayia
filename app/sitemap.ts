import { MetadataRoute } from 'next';
import { productsDetails } from '@/data/products';
import { hubCategorySlugs } from '@/lib/products';
import { getProductWithDynamicImages } from '@/lib/products.server';
import { isStockImage } from '@/data/stock-images';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com';
const baseUrl = siteUrl.replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
    // Date of the last real content change. A lastmod that moves on every
    // build teaches Google to ignore it, so bump this when pages change.
    // 2026-10-27: Google Ads landing-page pass (titles, H1s, hub copy, FAQs,
    // page wrappers) touched every page in this list; see docs/seo-2026-10-27.md.
    const currentDate = new Date('2026-10-27');

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
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Category pages - one crawlable URL per product category
    const categoryPages: MetadataRoute.Sitemap = hubCategorySlugs.map((slug) => ({
        url: `${baseUrl}/products/category/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // Individual product pages
    // Owner photos only: licensed stock (/stock/) is not the shop's work and stays out of image search.
    const productPages: MetadataRoute.Sitemap = productsDetails.map((product) => {
        const photos = (getProductWithDynamicImages(product.id)?.gallery ?? [])
            .filter((src) => !src.startsWith('/stock/') && !isStockImage(src) && !src.startsWith('/images/'))
            // Folder and file names hold spaces.
            .map((src) => encodeURI(`${baseUrl}${src}`));
        return {
            url: `${baseUrl}/products/${product.id}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
            ...(photos.length ? { images: photos } : {}),
        };
    });

    return [...staticPages, ...categoryPages, ...productPages];
}
