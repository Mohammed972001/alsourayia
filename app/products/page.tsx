import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { ProductGallery } from '@/components/ProductGallery';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { categorySlugMap } from '@/lib/products';
import Link from 'next/link';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'جميع منتجات الموكيت والمفروشات | موكيت ومفروشات السريع',
    description: 'تصفح جميع منتجات موكيت ومفروشات السريع في الرياض: موكيت مساجد، أرضيات مكتبية، باركيه ضد الماء، عشب صناعي، فينيل، موكيت تركي، تنسيق حدائق. جودة عالية وأسعار تنافسية.',
    keywords: 'منتجات موكيت السريع, موكيت مساجد الرياض, أرضيات مكتبية, باركيه ضد الماء, عشب صناعي الرياض, فينيل, موكيت تركي',
    alternates: {
        canonical: `${baseUrl}/products`,
    },
    openGraph: {
        title: 'جميع منتجات الموكيت والمفروشات | موكيت ومفروشات السريع',
        description: 'تصفح جميع منتجات موكيت ومفروشات السريع: موكيت مساجد، أرضيات، باركيه، عشب صناعي، فينيل، موكيت تركي وأكثر.',
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
            <div className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <Breadcrumb items={breadcrumb} />
                </div>

                {/* Category Navigation Links - crawlable by search engines */}
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <nav aria-label="فئات المنتجات">
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(categorySlugMap).map(([slug, name]) => (
                                <Link
                                    key={slug}
                                    href={`/products/category/${slug}`}
                                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#0088FF] hover:text-white transition-all text-sm"
                                >
                                    {name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>

                <ProductGallery />
            </div>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
