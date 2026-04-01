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
        description: `تصفح ${productCount} منتج من ${categoryName} من موكيت ومفروشات السريع في الرياض. جودة عالية، أسعار تنافسية، توصيل وتركيب احترافي في جميع أحياء الرياض.`,
        keywords: `${categoryName}, ${categoryName} الرياض, ${categoryName} السريع, شراء ${categoryName}, تركيب ${categoryName} الرياض`,
        alternates: {
            canonical: `${baseUrl}/products/category/${slug}`,
        },
        openGraph: {
            title: `${categoryName} في الرياض | موكيت ومفروشات السريع`,
            description: `تصفح ${productCount} منتج من ${categoryName} من موكيت ومفروشات السريع. جودة عالية وتركيب احترافي في الرياض.`,
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

    // JSON-LD for the category page
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
                        <span className="inline-block px-4 py-2 bg-[#1B2B4A]/10 text-[#C49A3C] rounded-full mb-4">
                            {categoryName}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4">
                            {categoryName} من{' '}
                            <span className="text-[#C49A3C]">مفروشات السريع</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            تصفح مجموعتنا من <strong>{categoryName}</strong> في الرياض.
                            جودة عالية وتصميمات متنوعة مع خدمة التوصيل والتركيب الاحترافية.
                        </p>
                    </div>

                    {categoryProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryProducts.map((product, index) => (
                                <article
                                    key={product.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                                >
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="relative block h-64 overflow-hidden"
                                    >
                                        <Image
                                            src={product.image}
                                            alt={`${product.name} - ${categoryName} من موكيت ومفروشات السريع الرياض`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover hover:scale-110 transition-transform duration-500"
                                            priority={index < 3}
                                            loading={index < 3 ? 'eager' : 'lazy'}
                                        />
                                    </Link>
                                    <div className="p-6">
                                        <span className="inline-block px-3 py-1 bg-[#1B2B4A]/10 text-[#C49A3C] rounded-full text-sm mb-2">
                                            {categoryName}
                                        </span>
                                        <h2 className="text-xl text-[#1A1A1A] mb-2">
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="hover:text-[#C49A3C] transition-colors"
                                            >
                                                {product.name}
                                            </Link>
                                        </h2>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            {product.colors.length > 0 && (
                                                <div className="flex gap-1">
                                                    {product.colors.slice(0, 4).map((color) => (
                                                        <span
                                                            key={color.name}
                                                            className="w-5 h-5 rounded-full border border-gray-300"
                                                            style={{ backgroundColor: color.value }}
                                                            title={color.name}
                                                        />
                                                    ))}
                                                    {product.colors.length > 4 && (
                                                        <span className="text-gray-500 text-sm self-center">
                                                            +{product.colors.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="px-6 py-2 bg-[#1B2B4A] text-white rounded-lg hover:bg-[#0F1A2E] transition-colors mr-auto"
                                            >
                                                عرض التفاصيل
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-600 text-xl mb-6">
                                لا توجد منتجات في هذه الفئة حالياً
                            </p>
                            <Link
                                href="/products"
                                className="inline-block px-6 py-3 bg-[#1B2B4A] text-white rounded-lg hover:bg-[#0F1A2E] transition-colors"
                            >
                                عرض جميع المنتجات
                            </Link>
                        </div>
                    )}

                    {/* Internal links to other categories */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <h2 className="text-xl text-[#1A1A1A] mb-6 text-center">
                            تصفح فئات أخرى
                        </h2>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {Object.entries(categorySlugMap)
                                .filter(([s]) => s !== slug)
                                .map(([s, name]) => (
                                    <Link
                                        key={s}
                                        href={`/products/category/${s}`}
                                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#1B2B4A] hover:text-white transition-all"
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
