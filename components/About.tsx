import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icons/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { ADDRESS, NATIONAL_ADDRESS, legalLine } from '@/lib/contact';
import { HOURS_TEXT } from '@/data/business';
import { getProductById } from '@/lib/products';
import { imageAlt } from '@/data/stock-images';

/** Only owner-confirmed promises. */
const features: { icon: IconName; title: string; desc: string }[] = [
    { icon: 'tape-measure', title: 'معاينة وقياس مجاناً', desc: 'نقيس المكان ونرى الأرضية الحالية قبل عرض السعر، لتعرف الكمية والخامة المناسبة قبل أن تلتزم بشيء' },
    { icon: 'swatch', title: 'عينة مجانية قبل الطلب', desc: 'تختار اللون والملمس من عينة حقيقية تراها في مكانك، لا من صورة على الشاشة' },
    { icon: 'support', title: 'تواصل مباشر', desc: `اتصل أو راسلنا على الواتساب ${HOURS_TEXT}` },
];

/** Two of the shop's own photos, opened as frames when they scroll in. */
const pictures = [getProductById('mosque-carpets'), getProductById('office-carpet')].filter((p) => p !== undefined);

export function About({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
    return (
        <section id="about" className="pt-20 pb-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading as={headingAs} eyebrow="من نحن" title="موكيت ومفروشات وأرضيات في الرياض" />

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-12 md:mb-16">
                    <div className="text-center lg:text-start">
                        <p
                            className="text-ink-soft leading-loose text-[0.95rem] md:text-lg"
                            data-reveal
                        >
                            <strong className="text-ink">موكيت ومفروشات السريع</strong> معرض في حراج بن قاسم بالرياض يوفّر{' '}
                            <Link href="/products" className="text-ink underline decoration-brass underline-offset-4 hover:no-underline">
                                الموكيت والسجاد والأرضيات
                            </Link>{' '}
                            للمساجد والمكاتب والمنازل والصالات الرياضية والعيادات. نعاين ونقيس مجاناً، ونعرض عينة قبل الطلب، ثم نورّد
                            ونركّب في الرياض ونورّد لكل مدن المملكة.
                        </p>
                        <p className="mt-5 text-ink-muted text-sm leading-relaxed" data-reveal style={{ '--i': 1 } as CSSProperties}>
                            {legalLine()}، ومعرضنا في {ADDRESS} (العنوان الوطني <span dir="ltr">{NATIONAL_ADDRESS}</span>).
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {pictures.map((product, i) => (
                            <div
                                key={product.id}
                                data-reveal={i === 0 ? 'frame' : 'curtain'}
                                style={{ '--i': i * 2 } as CSSProperties}
                                className={`relative overflow-hidden rounded-3xl bg-cream ring-1 ring-line ${i === 0 ? 'aspect-[3/4]' : 'aspect-[3/4] mt-8'}`}
                            >
                                <Image
                                    src={product.image}
                                    alt={imageAlt(product.image, `${product.name} من موكيت ومفروشات السريع`)}
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={feature.title}
                            data-reveal="zoom"
                            data-spotlight
                            style={{ '--i': i } as CSSProperties}
                            className="lift group relative flex md:flex-col items-start gap-4 p-5 md:p-8 rounded-2xl bg-cream border border-line"
                        >
                            <span className="w-12 h-12 shrink-0 grid place-items-center rounded-xl bg-white text-brass-deep ring-1 ring-line group-hover:bg-ink group-hover:text-brass transition-colors duration-300">
                                <Icon name={feature.icon} size={24} />
                            </span>
                            <div>
                                <h3 className="font-display text-lg md:text-xl font-semibold text-ink mb-1.5">{feature.title}</h3>
                                <p className="text-ink-muted text-sm md:text-base leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
