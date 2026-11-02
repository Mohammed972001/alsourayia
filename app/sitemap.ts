import { MetadataRoute } from 'next';
import { productsDetails } from '@/data/products';
import { hubCategorySlugs } from '@/lib/products';
import { getProductWithDynamicImages } from '@/lib/products.server';
import { isStockImage } from '@/data/stock-images';
import { guides } from '@/data/guides';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com';
const baseUrl = siteUrl.replace(/\/$/, '');

// lastmod is the date a page's own copy really changed: a date that moves on every build,
// or one date on every URL, teaches Google to ignore it. Bump the matching entry (or the
// product's updatedAt) only when that page's content changes.
const PAGE_UPDATED: Record<string, string> = {
    home: '2026-10-27',
    about: '2026-10-27',
    products: '2026-10-27',
    'service-areas': '2026-10-27',
    contact: '2026-10-27',
    privacy: '2026-10-23',
};

const HUB_UPDATED: Record<string, string> = {
    parquet: '2026-11-02',
    'rubber-flooring': '2026-10-27',
};

export default function sitemap(): MetadataRoute.Sitemap {
    // Core pages - each a real, crawlable URL
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(PAGE_UPDATED['home']),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(PAGE_UPDATED['about']),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(PAGE_UPDATED['products']),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/service-areas`,
            lastModified: new Date(PAGE_UPDATED['service-areas']),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(PAGE_UPDATED['contact']),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(PAGE_UPDATED['privacy']),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Category pages - one crawlable URL per product category
    const categoryPages: MetadataRoute.Sitemap = hubCategorySlugs.map((slug) => ({
        url: `${baseUrl}/products/category/${slug}`,
        lastModified: new Date(HUB_UPDATED[slug]),
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
            lastModified: new Date(product.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
            ...(photos.length ? { images: photos } : {}),
        };
    });

    const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...categoryPages, ...productPages, ...guidePages];
}
