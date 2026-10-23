import Link from 'next/link';
import { Gem, Palette, Headset } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ADDRESS, legalLine } from '@/lib/contact';

const features = [
    { icon: Gem, title: 'معاينة قبل الطلب', desc: 'نقيس المكان ونعرض عليك العينات قبل عرض السعر، لتختار بعد أن ترى الخامة بنفسك' },
    { icon: Palette, title: 'تصاميم مبتكرة', desc: 'تشكيلة واسعة من تصاميم الموكيت والمفروشات العصرية والكلاسيكية' },
    { icon: Headset, title: 'تواصل مباشر', desc: 'اتصل أو راسلنا على الواتساب يومياً من 9 صباحاً حتى 10 مساءً' },
];

export function About({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
    return (
        <section id="about" className="pt-20 pb-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading as={headingAs} eyebrow="من نحن" title="موكيت ومفروشات وأرضيات في الرياض" />

                <p
                    className="max-w-3xl mx-auto text-center text-ink-soft leading-loose text-[0.95rem] md:text-lg -mt-4 mb-12 md:mb-16"
                    data-reveal
                >
                    <strong className="text-ink">موكيت ومفروشات السريع</strong> هي وجهتك المثالية للحصول على أرقى أنواع{' '}
                    <Link href="/products" className="text-ink underline decoration-brass underline-offset-4 hover:no-underline">
                        السجاد والموكيت والمفروشات
                    </Link>{' '}
                    في الرياض والمملكة العربية السعودية.
                    نجمع بين الحرفية التقليدية والتصميمات العصرية لنقدم لك تجربة فريدة.
                </p>
                <p className="max-w-3xl mx-auto text-center text-ink-muted text-sm leading-relaxed -mt-8 mb-12 md:mb-16">
                    {legalLine()}، ومعرضنا في {ADDRESS}.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={feature.title}
                            data-reveal
                            style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                            className="group flex md:flex-col items-start gap-4 p-5 md:p-8 rounded-2xl bg-cream border border-line hover:border-brass/50 transition-colors"
                        >
                            <span className="w-12 h-12 shrink-0 grid place-items-center rounded-xl bg-white text-brass-deep ring-1 ring-line group-hover:bg-ink group-hover:text-brass transition-colors duration-300">
                                <feature.icon size={22} strokeWidth={1.6} />
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
