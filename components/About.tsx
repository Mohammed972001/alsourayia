import Link from 'next/link';
import { Gem, Palette, Headset } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { CountUp } from '@/components/CountUp';

const stats = [
    { number: '15+', label: 'سنة من الخبرة' },
    { number: '5000+', label: 'عميل راضٍ' },
    { number: '10000+', label: 'مشروع مكتمل' },
    { number: '100%', label: 'ضمان الجودة' },
];

const features = [
    { icon: Gem, title: 'جودة استثنائية', desc: 'نستخدم أفضل المواد والخامات لضمان موكيت وسجاد يدوم طويلاً' },
    { icon: Palette, title: 'تصاميم مبتكرة', desc: 'تشكيلة واسعة من تصاميم الموكيت والمفروشات العصرية والكلاسيكية' },
    { icon: Headset, title: 'خدمة عملاء متميزة', desc: 'فريقنا متاح دائماً لمساعدتك في اختيار الموكيت والأرضيات المناسبة' },
];

export function About() {
    return (
        <section id="about" className="pt-20 pb-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading eyebrow="من نحن" title="رواد التميز في عالم السجاد والمفروشات" />

                <p
                    className="max-w-3xl mx-auto text-center text-ink-soft leading-loose text-[0.95rem] md:text-lg -mt-4 mb-12 md:mb-16"
                    data-reveal
                >
                    <strong className="text-ink">موكيت ومفروشات السريع</strong> هي وجهتك المثالية للحصول على أرقى أنواع{' '}
                    <Link href="#products" className="text-ink underline decoration-brass underline-offset-4 hover:no-underline">
                        السجاد والموكيت والمفروشات
                    </Link>{' '}
                    في الرياض والمملكة العربية السعودية.
                    نجمع بين الحرفية التقليدية والتصميمات العصرية لنقدم لك تجربة فريدة.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-20">
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

                {/* Stats */}
                <div className="relative overflow-hidden grain rounded-3xl bg-ink text-white" data-reveal="scale">
                    <div className="relative grid grid-cols-2 md:grid-cols-4">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`text-center px-4 py-8 md:py-12 border-white/10 ${i % 2 === 0 ? 'border-l' : ''} ${
                                    i < 2 ? 'border-b md:border-b-0' : ''
                                } md:border-l md:last:border-l-0`}
                            >
                                <div className="font-display text-3xl md:text-5xl font-bold text-brass mb-2" dir="ltr">
                                    <CountUp value={stat.number} />
                                </div>
                                <div className="text-white/65 text-xs md:text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
