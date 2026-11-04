import type { Metadata } from 'next';
import Link from '@/components/AppLink';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { Icon } from '@/components/icons/Icon';
import { ProductCard } from '@/components/product/ProductCard';
import { BRAND_NAME, HOURS_TEXT, SITE_URL } from '@/data/business';
import { getGuide, guides } from '@/data/guides';
import { ComparisonTable } from '@/components/ComparisonTable';
import { imageAlt } from '@/data/stock-images';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact';
import { DEFAULT_OG_IMAGE } from '@/lib/og';
import { getProductById, type Product } from '@/lib/products';

type Props = { params: Promise<{ slug: string }> };

// Unknown slugs are real 404s.
export const dynamicParams = false;

export function generateStaticParams() {
    return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) return {};
    const url = `${SITE_URL}/guides/${guide.slug}`;
    return {
        title: guide.title,
        description: guide.metaDescription,
        alternates: { canonical: url },
        openGraph: {
            title: `${guide.title} | ${BRAND_NAME}`,
            description: guide.metaDescription,
            url,
            type: 'article',
            locale: 'ar_SA',
            siteName: BRAND_NAME,
            images: [DEFAULT_OG_IMAGE],
        },
    };
}

export default async function GuidePage({ params }: Props) {
    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) notFound();

    const url = `${SITE_URL}/guides/${guide.slug}`;
    const related = guide.productIds
        .map((id) => getProductById(id))
        .filter((p): p is Product => Boolean(p));

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.heading,
        description: guide.answerSummary,
        inLanguage: 'ar',
        url,
        mainEntityOfPage: url,
        dateModified: guide.updatedAt,
        author: { '@id': `${SITE_URL}/#business` },
        publisher: { '@id': `${SITE_URL}/#business` },
    };
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    };

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Navigation />
            <div className="pt-[var(--header-full)]">
                <Breadcrumb
                    items={[
                        { label: 'الرئيسية', href: '/' },
                        { label: guide.hubLabel, href: guide.hubHref },
                        { label: guide.heading },
                    ]}
                />
                <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
                    <article className="max-w-3xl mx-auto">
                        <header className="mb-10">
                            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4 leading-snug">{guide.heading}</h1>
                            <p className="text-ink-soft leading-loose mb-3">{guide.answerSummary}</p>
                            <p className="text-sm text-ink-muted mb-6">
                                آخر تحديث: <time dateTime={guide.updatedAt}>{guide.updatedAt}</time>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <a
                                    href={whatsappLink(guide.whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="press inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-mint-deep text-white font-bold text-sm"
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                    اسألنا على الواتساب
                                </a>
                                <a
                                    href={PHONE_TEL}
                                    className="press inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink text-white font-bold text-sm"
                                >
                                    <Icon name="phone" size={16} />
                                    <span>اتصل الآن</span>
                                    <span dir="ltr">{PHONE_DISPLAY}</span>
                                </a>
                            </div>
                            <address className="not-italic text-sm text-ink-muted flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-1.5">
                                <span className="inline-flex items-center gap-1.5">
                                    <Icon name="location" size={16} className="text-brass shrink-0" />
                                    {ADDRESS}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Icon name="clock" size={16} className="text-brass shrink-0" />
                                    {HOURS_TEXT}
                                </span>
                            </address>
                        </header>

                        <section className="mb-10">
                            <h2 className="font-display text-2xl font-semibold text-ink mb-4">{guide.comparison.heading}</h2>
                            <ComparisonTable columns={guide.comparison.columns} rows={guide.comparison.rows} />
                        </section>

                        {guide.sections.map((section) => (
                            <section key={section.heading} className="mb-10">
                                <h2 className="font-display text-2xl font-semibold text-ink mb-4">{section.heading}</h2>
                                {section.intro && <p className="text-ink-soft leading-loose mb-3">{section.intro}</p>}
                                {section.paragraphs?.map((paragraph) => (
                                    <p key={paragraph} className="text-ink-soft leading-loose mb-3">{paragraph}</p>
                                ))}
                                {section.bullets && (
                                    <ul className="list-disc pr-5 space-y-2 text-ink-soft leading-relaxed">
                                        {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                                    </ul>
                                )}
                            </section>
                        ))}

                        <section className="mb-12">
                            <h2 className="font-display text-2xl font-semibold text-ink mb-4">أسئلة شائعة</h2>
                            <div className="space-y-3">
                                {guide.faqs.map((faq) => (
                                    <details key={faq.question} className="faq-item rounded-lg border border-gray-200 p-4">
                                        <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
                                        <p className="mt-3 text-ink-soft leading-relaxed">{faq.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    </article>

                    <section className="max-w-5xl mx-auto">
                        <h2 className="font-display text-2xl font-semibold text-ink mb-2">صفحات الأنواع</h2>
                        <p className="mb-6 text-sm text-ink-soft">
                            قارن كل الأنواع في صفحة{' '}
                            <Link href={guide.hubHref} className="font-semibold text-ink underline decoration-brass underline-offset-4 hover:no-underline">
                                {guide.hubLabel}
                            </Link>
                        </p>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                            {related.map((p) => (
                                <li key={p.id}>
                                    <ProductCard
                                        product={p}
                                        badge={p.category}
                                        alt={imageAlt(p.image, `${p.name} - ${p.category} من ${BRAND_NAME} الرياض`)}
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
            <FloatingButtons message={guide.whatsappMessage} />
        </div>
    );
}
