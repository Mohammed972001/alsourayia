'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';

const cards = [
    { title: 'موكيت مساجد', desc: 'موكيت مساجد عالي الجودة بتصاميم إسلامية فاخرة، مقاوم للحريق ومعالج ضد البكتيريا. توصيل وتركيب مجاني لجميع مناطق الرياض.' },
    { title: 'أرضيات مكتبية', desc: 'أرضيات مكتبية احترافية تناسب بيئات العمل الحديثة. سهلة التنظيف ومقاومة للخدوش مع تشكيلة واسعة من الألوان.' },
    { title: 'باركيه فاخر', desc: 'باركيه ضد الماء بجودة ألمانية. مناسب للمنازل والفلل والشقق الفاخرة. ضمان يصل إلى 25 سنة.' },
    { title: 'عشب صناعي', desc: 'عشب صناعي عالي الكثافة للحدائق والملاعب والمساحات الخارجية. مقاوم للأشعة فوق البنفسجية.' },
];

export function SEOContent() {
    // Mobile only: long copy is clamped behind a toggle. It stays in the DOM for crawlers.
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="py-16 md:py-24 bg-cream">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading eyebrow="لماذا السريع" title="لماذا موكيت ومفروشات السريع الخيار الأول في الرياض؟" />

                    {/* Category cards — swipe rail on phones, grid on desktop */}
                    <div className="flex md:grid md:grid-cols-2 gap-3 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2 mb-10">
                        {cards.map((card, i) => (
                            <div
                                key={card.title}
                                data-reveal
                                style={{ '--d': `${(i % 2) * 90}ms` } as React.CSSProperties}
                                className="press snap-start shrink-0 w-[78%] sm:w-[55%] md:w-auto flex flex-col p-6 bg-white rounded-2xl border border-line"
                            >
                                <span className="font-display text-sm text-brass-deep mb-3 tabular-nums">0{i + 1}</span>
                                <h3 className="font-display text-lg font-semibold text-ink mb-2">{card.title}</h3>
                                <p className="text-ink-muted text-sm leading-relaxed flex-1">{card.desc}</p>
                                <Link
                                    href="#products"
                                    className="mt-4 inline-flex items-center gap-1.5 text-ink text-sm font-medium hover:gap-2.5 transition-all"
                                >
                                    عرض المنتجات
                                    <ArrowLeft size={15} className="text-brass" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="relative" data-reveal>
                        <div
                            className={`space-y-5 text-ink-soft leading-loose text-[0.95rem] md:text-base overflow-hidden transition-[max-height] duration-700 md:max-h-none ${
                                expanded ? 'max-h-[80rem]' : 'max-h-44'
                            }`}
                        >
                            <p>
                                تُعد <strong className="text-ink">موكيت ومفروشات السريع</strong> من الشركات الرائدة في مجال توفير{' '}
                                <Link href="#products" className="text-ink underline decoration-brass underline-offset-4">الموكيت والسجاد والمفروشات</Link>{' '}
                                في <strong className="text-ink">الرياض</strong> والمملكة العربية السعودية. نقدم تشكيلة واسعة ومتنوعة من{' '}
                                <strong className="text-ink">الأرضيات</strong> عالية الجودة تشمل <strong className="text-ink">موكيت المساجد</strong>،{' '}
                                <strong className="text-ink">الأرضيات المكتبية</strong>، <strong className="text-ink">الباركيه</strong>، و<strong className="text-ink">العشب الصناعي</strong>.
                            </p>

                            <p>
                                نحن في <strong className="text-ink">السريع للمفروشات</strong> نؤمن بأن الأرضيات هي أساس جمال أي مساحة.
                                لذلك نحرص على توفير أجود الخامات من أفضل المصانع العالمية والتركية.
                                سواء كنت تبحث عن <Link href="#products" className="text-ink underline decoration-brass underline-offset-4">موكيت فاخر</Link> لمنزلك،
                                أو <strong className="text-ink">أرضيات احترافية</strong> لمكتبك، أو <strong className="text-ink">موكيت مساجد</strong> بتصاميم إسلامية راقية،
                                ستجد لدينا ما يلبي احتياجاتك.
                            </p>

                            <p>
                                نتميز في <strong className="text-ink">موكيت السريع</strong> بتقديم خدمات متكاملة تشمل:{' '}
                                <strong className="text-ink">الاستشارة المجانية</strong>، <strong className="text-ink">المعاينة والقياس</strong>،{' '}
                                <strong className="text-ink">التوصيل المجاني داخل الرياض</strong>، و<strong className="text-ink">التركيب الاحترافي</strong>{' '}
                                بواسطة فريق متخصص. كما نوفر <strong className="text-ink">ضمان شامل</strong> على جميع منتجاتنا.
                            </p>

                            <p>
                                نخدم جميع أحياء <strong className="text-ink">الرياض</strong> ومناطق المملكة الرئيسية:{' '}
                                <strong className="text-ink">جدة</strong>، <strong className="text-ink">الدمام</strong>، <strong className="text-ink">مكة المكرمة</strong>،{' '}
                                <strong className="text-ink">المدينة المنورة</strong>، وغيرها. تواصل معنا الآن عبر{' '}
                                <Link href="#contact" className="text-ink underline decoration-brass underline-offset-4">الواتساب أو الهاتف</Link>{' '}
                                للحصول على عرض سعر مجاني.
                            </p>
                        </div>

                        {/* Fade + toggle (mobile) */}
                        <div
                            className={`md:hidden absolute inset-x-0 bottom-10 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none transition-opacity ${
                                expanded ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                            className="md:hidden relative mt-3 mx-auto flex items-center gap-1.5 px-5 py-2 rounded-full border border-line bg-white text-sm text-ink font-medium"
                        >
                            {expanded ? 'عرض أقل' : 'اقرأ المزيد'}
                            <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
