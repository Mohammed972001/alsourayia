import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
    categorySlugMap,
    getProductsByCategory,
    generateCategoryStaticParams,
} from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return generateCategoryStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = categorySlugMap[slug];
    if (!categoryName) return { title: 'الفئة غير موجودة' };

    const products = getProductsByCategory(categoryName);
    const productCount = products.length;

    return {
        title: `${categoryName} في الرياض | موكيت ومفروشات السريع`,
        description: `تصفح ${productCount} منتج من ${categoryName} من موكيت ومفروشات السريع في الرياض. جودة عالية، أسعار تنافسية، توصيل وتركيب احترافي.`,
        keywords: `${categoryName}, ${categoryName} الرياض, ${categoryName} السريع`,
        alternates: {
            canonical: `${baseUrl}/products/category/${slug}`,
        },
        openGraph: {
            title: `${categoryName} في الرياض | موكيت ومفروشات السريع`,
            description: `تصفح ${productCount} منتج من ${categoryName} من موكيت ومفروشات السريع.`,
            locale: 'ar_SA',
            type: 'website',
            url: `${baseUrl}/products/category/${slug}`,
            images: products[0]?.image
                ? [{ url: products[0].image, width: 800, height: 600, alt: `${categoryName} - موكيت ومفروشات السريع` }]
                : [],
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const categoryName = categorySlugMap[slug];
    if (!categoryName) notFound();

    const categoryProducts = getProductsByCategory(categoryName);

    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المنتجات', href: '/products' },
        { label: categoryName },
    ];

    const categorySchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${categoryName} - موكيت ومفروشات السريع`,
        description: `تشكيلة ${categoryName} من موكيت ومفروشات السريع في الرياض`,
        url: `${baseUrl}/products/category/${slug}`,
        numberOfItems: categoryProducts.length,
        hasPart: categoryProducts.map(p => ({
            '@type': 'Product',
            name: p.name,
            url: `${baseUrl}/products/${p.id}`,
            image: p.image,
        })),
    };

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
            />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <Breadcrumb items={breadcrumb} />

                    <div className="mt-8 mb-12 text-center">
                        <h1 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                            {categoryName} من مفروشات السريع
                        </h1>
                        <p className="text-[#6B7280] max-w-2xl mx-auto">
                            تصفح مجموعتنا من <strong>{categoryName}</strong> في الرياض.
                            جودة عالية وتصميمات متنوعة مع خدمة التوصيل والتركيب.
                        </p>
                    </div>

                    {categoryProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryProducts.map((product, index) => (
                                <article key={product.id} className="group">
                                    <Link href={`/products/${product.id}`} className="block">
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-4">
                                            <Image
                                                src={product.image}
                                                alt={`${product.name} - ${categoryName} من موكيت ومفروشات السريع الرياض`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                priority={index < 3}
                                                loading={index < 3 ? 'eager' : 'lazy'}
                                            />
                                        </div>
                                        <span className="text-xs text-[#6B7280] mb-1 block">{categoryName}</span>
                                        <h2 className="text-[#1A1A1A] group-hover:text-[#4A4A4A] transition-colors">
                                            {product.name}
                                        </h2>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-[#6B7280] text-xl mb-6">
                                لا توجد منتجات في هذه الفئة حالياً
                            </p>
                            <Link
                                href="/products"
                                className="inline-block px-6 py-3 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors text-sm"
                            >
                                عرض جميع المنتجات
                            </Link>
                        </div>
                    )}

                    {/* Other categories */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <h2 className="text-lg text-[#1A1A1A] mb-6 text-center">
                            تصفح فئات أخرى
                        </h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {Object.entries(categorySlugMap)
                                .filter(([s]) => s !== slug)
                                .map(([s, name]) => (
                                    <Link
                                        key={s}
                                        href={`/products/category/${s}`}
                                        className="px-4 py-2 rounded-lg bg-gray-100 text-[#4A4A4A] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm"
                                    >
                                        {name}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
