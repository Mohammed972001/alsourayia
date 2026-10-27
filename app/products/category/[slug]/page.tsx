import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HelpBand } from '@/components/HelpBand';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { PageView } from '@/components/motion/PageView';
import { HeadingWords } from '@/components/motion/HeadingWords';
import {
    categoryHref,
    categoryContent,
    categorySlugMap,
    getProductsByCategory,
    generateCategoryStaticParams,
} from '@/lib/products';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact';
import { imageAlt } from '@/data/stock-images';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');
const HOURS = 'يومياً من 9 صباحاً حتى 10 مساءً';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return generateCategoryStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = categorySlugMap[slug];
    if (!categoryName) return { title: 'الفئة غير موجودة' };

    const products = getProductsByCategory(categoryName);
    const content = categoryContent[slug];
    const title = content?.title ?? `${categoryName} في الرياض`;
    const description =
        content?.description ??
        `${categoryName} في الرياض من موكيت ومفروشات السريع: معاينة وقياس مجاناً، وعينة مجانية قبل الطلب، وتوريد وتركيب، وعرض السعر على الواتساب.`;

    return {
        title,
        description,
        keywords: content
            ? [categoryName, ...content.items.map((i) => i.label)].join(', ')
            : `${categoryName}, ${categoryName} الرياض`,
        alternates: {
            canonical: `${baseUrl}/products/category/${slug}`,
        },
        openGraph: {
            // The layout's title template does not apply to Open Graph, so the brand goes here.
            title: `${title} | موكيت ومفروشات السريع`,
            description,
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
    const content = categoryContent[slug];
    const heading = content?.heading ?? `${categoryName} في الرياض من موكيت ومفروشات السريع`;
    const whatsappMessage = content?.whatsappMessage ?? `أريد الاستفسار عن ${categoryName} من موكيت ومفروشات السريع`;

    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المنتجات', href: '/products' },
        { label: categoryName },
    ];

    const categorySchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${categoryName} - موكيت ومفروشات السريع`,
        description: content?.description ?? `تشكيلة ${categoryName} من موكيت ومفروشات السريع في الرياض`,
        url: `${baseUrl}/products/category/${slug}`,
        numberOfItems: categoryProducts.length,
        hasPart: categoryProducts.map(p => ({
            '@type': 'WebPage',
            name: p.name,
            url: `${baseUrl}/products/${p.id}`,
            ...(p.image ? { image: encodeURI(`${baseUrl}${p.image}`) } : {}),
        })),
    };

    const faqSchema = content?.faqs.length
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: content.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
          }
        : null;

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <PageView>
                <div className="pt-[calc(var(--header-full)+1rem)] pb-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <Breadcrumb items={breadcrumb} />

                        {/* First screen: H1, the promise, the two contact buttons, then where and when.
                            Nothing here waits for a reveal, so a visitor from an ad sees it at once. */}
                        <header className="mt-6 mb-10 max-w-3xl mx-auto text-center">
                            <h1 className="font-display text-[1.7rem] leading-[1.35] md:text-4xl font-semibold text-ink mb-4">
                                {heading}
                            </h1>
                            <p className="text-ink-soft text-[0.95rem] md:text-lg leading-relaxed mb-6">
                                {content?.promise ?? 'معاينة وقياس مجاناً، وعينة مجانية قبل الطلب، وتوريد وتركيب، وتوصيل لكل مدن المملكة.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
                                <a
                                    href={whatsappLink(whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shine press inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-whatsapp text-white font-bold text-sm"
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                    اطلب عرض سعر على الواتساب
                                </a>
                                <a
                                    href={PHONE_TEL}
                                    className="press inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink text-white font-bold text-sm"
                                >
                                    <Phone size={17} />
                                    <span>اتصل الآن</span>
                                    <span dir="ltr">{PHONE_DISPLAY}</span>
                                </a>
                            </div>
                            <address className="not-italic text-sm text-ink-muted flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-6 gap-y-1.5">
                                <span className="inline-flex items-center justify-center gap-1.5">
                                    <MapPin size={15} className="text-brass shrink-0" />
                                    {ADDRESS}
                                </span>
                                <span className="inline-flex items-center justify-center gap-1.5">
                                    <Clock size={15} className="text-brass shrink-0" />
                                    {HOURS}
                                </span>
                            </address>
                        </header>

                        {content ? (
                            <div className="mb-12 max-w-3xl mx-auto">
                                <p className="text-ink-soft leading-loose mb-8" data-reveal="fade">{content.intro}</p>
                                <h2 className="font-display text-2xl font-semibold text-ink mb-4" data-reveal="words">
                                    <HeadingWords lines={['أي نوع تحتاج؟']} />
                                </h2>
                                <ul className="space-y-3 mb-10">
                                    {content.items.map((item, i) => (
                                        <li
                                            key={item.productId}
                                            className="text-ink-soft leading-relaxed"
                                            data-reveal
                                            style={{ '--i': i } as CSSProperties}
                                        >
                                            <Link
                                                href={`/products/${item.productId}`}
                                                className="font-semibold text-ink underline decoration-brass underline-offset-4 hover:no-underline"
                                            >
                                                {item.label}
                                            </Link>
                                            : {item.text}
                                        </li>
                                    ))}
                                </ul>

                                <section aria-labelledby="compare" className="mb-10">
                                    <h2 id="compare" className="font-display text-2xl font-semibold text-ink mb-4" data-reveal="words">
                                        <HeadingWords lines={[content.comparison.heading]} />
                                    </h2>
                                    {content.comparison.paragraphs.map((p, i) => (
                                        <p key={i} className="text-ink-soft leading-loose mb-4" data-reveal style={{ '--i': i } as CSSProperties}>
                                            {p}
                                        </p>
                                    ))}
                                </section>
                            </div>
                        ) : (
                            <p className="text-ink-muted max-w-2xl mx-auto text-center mb-12">
                                تصفح مجموعتنا من <strong>{categoryName}</strong> في الرياض، مع المعاينة والقياس والتوريد والتركيب.
                            </p>
                        )}

                        {categoryProducts.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-3 md:gap-5">
                                {/* Centred rows: a hub often has fewer products than a full row. */}
                                {categoryProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        badge={categoryName}
                                        alt={imageAlt(product.image, `${product.name} - ${categoryName} من موكيت ومفروشات السريع الرياض`)}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        eager={index < 4}
                                        priority={index < 3}
                                        titleAs="h2"
                                        className="w-[calc((100%-12px)/2)] md:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)]"
                                        dataAttrs={{ 'data-reveal': '' }}
                                        style={{ '--i': index } as CSSProperties}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-ink-muted text-xl mb-6">
                                    لا توجد منتجات في هذه الفئة حالياً
                                </p>
                                <Link
                                    href="/products"
                                    className="inline-block px-6 py-3 bg-ink text-white rounded-lg hover:bg-[#333] transition-colors text-sm"
                                >
                                    عرض جميع المنتجات
                                </Link>
                            </div>
                        )}

                        {content && (
                            <section aria-labelledby="hub-faq" className="mt-16 max-w-3xl mx-auto">
                                <h2 id="hub-faq" className="font-display text-2xl font-semibold text-ink mb-6" data-reveal="words">
                                    <HeadingWords lines={['أسئلة تصلنا كل يوم']} />
                                </h2>
                                <div className="space-y-3">
                                    {content.faqs.map((faq, i) => (
                                        <details
                                            key={faq.question}
                                            className="rounded-xl border border-line p-4"
                                            data-reveal
                                            style={{ '--i': i } as CSSProperties}
                                        >
                                            <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
                                            <p className="mt-3 text-ink-soft leading-relaxed">{faq.answer}</p>
                                        </details>
                                    ))}
                                </div>
                                <p className="text-ink-muted leading-relaxed mt-6" data-reveal="fade">{content.outro}</p>
                            </section>
                        )}

                        {/* Other categories */}
                        <div className="mt-16 pt-8 border-t border-line">
                            <h2 className="text-lg text-ink mb-6 text-center" data-reveal="words">
                                <HeadingWords lines={['تصفح فئات أخرى']} />
                            </h2>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {Object.entries(categorySlugMap)
                                    .filter(([s]) => s !== slug)
                                    .map(([s, name]) => (
                                        <Link
                                            key={s}
                                            href={categoryHref(s)}
                                            className="px-3.5 py-1.5 rounded-full border border-line bg-white text-ink-soft font-semibold hover:bg-ink hover:border-ink hover:text-white transition-colors text-[13px]"
                                        >
                                            {name}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <HelpBand message={whatsappMessage} />
            </PageView>
            <Footer />
            <FloatingButtons message={whatsappMessage} />
        </div>
    );
}
