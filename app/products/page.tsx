import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { ProductGallery } from '@/components/ProductGallery';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HelpBand } from '@/components/HelpBand';
import { PageView } from '@/components/motion/PageView';
import { categoryHref, categorySlugMap } from '@/lib/products';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'موكيت وباركيه وارضيات مطاط في الرياض',
    description: 'كل منتجات موكيت ومفروشات السريع في الرياض: موكيت مساجد ومكاتب وغرف، باركيه ارضيات، ارضيات مطاط وربل جيم، فينيل، عشب صناعي. توريد وتركيب مع معاينة وقياس مجاناً.',
    keywords: 'منتجات موكيت السريع, موكيت مساجد الرياض, موكيت مكاتب, باركيه ارضيات, ارضيات مطاط, ربل جيم, عشب صناعي الرياض, فينيل, موكيت تركي',
    alternates: {
        canonical: `${baseUrl}/products`,
    },
    openGraph: {
        title: 'موكيت وباركيه وارضيات مطاط في الرياض | موكيت ومفروشات السريع',
        description: 'كل منتجات موكيت ومفروشات السريع: موكيت مساجد ومكاتب وغرف، باركيه، ارضيات مطاط، فينيل، عشب صناعي. توريد وتركيب مع معاينة وقياس مجاناً.',
        locale: 'ar_SA',
        type: 'website',
        url: `${baseUrl}/products`,
    },
};

export default function ProductsPage() {
    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المنتجات' },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <PageView>
                <div className="pt-[var(--header-full)]">
                    <div className="container mx-auto px-4 lg:px-8 py-4">
                        <Breadcrumb items={breadcrumb} />
                    </div>

                    {/* Category Navigation Links - crawlable by search engines */}
                    <div className="container mx-auto px-4 lg:px-8 py-4">
                        <nav aria-label="فئات المنتجات">
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(categorySlugMap).map(([slug, name], i) => (
                                    <Link
                                        key={slug}
                                        href={categoryHref(slug)}
                                        data-reveal="fade"
                                        style={{ '--i': i } as CSSProperties}
                                        className="px-4 py-2 rounded-lg bg-gray-100 text-[#4A4A4A] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm"
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>

                    <ProductGallery headingAs="h1" />
                </div>
                <HelpBand />
            </PageView>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
