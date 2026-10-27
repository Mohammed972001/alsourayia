import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';

const cards = [
    { title: 'موكيت مساجد', href: '/products/mosque-carpets', desc: 'موكيت مساجد بخطوط صفوف أو سادة وألوان هادئة، يُفرش على اتجاه القبلة مع التوريد والتركيب في الرياض.' },
    { title: 'أرضيات مكتبية', href: '/products/office-flooring', desc: 'أرضيات للاستقبال والممرات وصالات الموظفين بألوان رمادية وبيج، تُمسح بسهولة وتُركّب على مراحل والمكتب يعمل.' },
    { title: 'باركيه', href: '/products/category/parquet', desc: 'باركيه ضد الماء للمطابخ والملاحق، وباركيه بمظهر الخشب للصالات وغرف النوم في المنازل والفلل والشقق.' },
    { title: 'عشب صناعي', href: '/products/artificial-grass', desc: 'عشب صناعي للحدائق المنزلية والملاعب والمساحات الخارجية، بالمقاس الذي يناسب مكانك.' },
];

const link = 'text-ink underline decoration-brass underline-offset-4';

/**
 * Server component. On phones the long copy is clamped behind a CSS-only expander (a hidden checkbox
 * and its label), so it stays in the HTML for crawlers and opens without scripts.
 */
export function SEOContent() {
    const moreId = 'seo-more';

    return (
        <section className="py-16 md:py-24 bg-cream">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading eyebrow="لماذا السريع" title="لماذا تختار موكيت ومفروشات السريع في الرياض؟" />

                    {/* Category cards: swipe rail on phones, grid on desktop */}
                    <div className="flex md:grid md:grid-cols-2 gap-3 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2 mb-10">
                        {cards.map((card, i) => (
                            <div
                                key={card.title}
                                data-reveal="clip"
                                data-spotlight
                                style={{ '--i': i } as CSSProperties}
                                className="lift press relative snap-start shrink-0 w-[78%] sm:w-[55%] md:w-auto flex flex-col p-6 bg-white rounded-2xl border border-line"
                            >
                                <span className="font-display text-sm text-brass-deep mb-3 tabular-nums">0{i + 1}</span>
                                <h3 className="font-display text-lg font-semibold text-ink mb-2">{card.title}</h3>
                                <p className="text-ink-muted text-sm leading-relaxed flex-1">{card.desc}</p>
                                <Link
                                    href={card.href}
                                    className="mt-4 inline-flex items-center gap-1.5 text-ink text-sm font-medium hover:gap-2.5 transition-all"
                                >
                                    عرض {card.title}
                                    <ArrowLeft size={15} className="text-brass" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="relative" data-reveal="blur">
                        {/* The checkbox must come before what it controls (peer-checked). */}
                        <input type="checkbox" id={moreId} className="seo-more sr-only" />
                        <div className="seo-text space-y-5 text-ink-soft leading-loose text-[0.95rem] md:text-base overflow-hidden max-h-44 md:max-h-none">
                            <p>
                                تُعد <strong className="text-ink">موكيت ومفروشات السريع</strong> متخصصة في توفير{' '}
                                <Link href="/products" className={link}>الموكيت والسجاد والمفروشات</Link>{' '}
                                في <strong className="text-ink">الرياض</strong> والمملكة العربية السعودية. نقدم تشكيلة متنوعة من{' '}
                                <strong className="text-ink">الأرضيات</strong> تشمل <strong className="text-ink">موكيت المساجد</strong>،{' '}
                                <strong className="text-ink">الأرضيات المكتبية</strong>، <strong className="text-ink">الباركيه</strong>، و<strong className="text-ink">العشب الصناعي</strong>.
                            </p>

                            <p>
                                نحن في <strong className="text-ink">موكيت ومفروشات السريع</strong> نؤمن بأن الأرضيات هي أساس جمال أي مساحة.
                                لذلك نساعدك تختار الخامة المناسبة للمكان قبل الطلب.
                                سواء كنت تبحث عن <Link href="/products/mokite" className={link}>موكيت</Link> لمنزلك،
                                أو <strong className="text-ink">أرضيات</strong> لمكتبك، أو <strong className="text-ink">موكيت مساجد</strong> بنقشات هادئة،
                                ستجد لدينا ما يلبي احتياجاتك.
                            </p>

                            <p>
                                نقدم في <strong className="text-ink">موكيت السريع</strong> خدمات متكاملة تشمل:{' '}
                                <strong className="text-ink">المعاينة والقياس مجاناً</strong>، <strong className="text-ink">عينة مجانية قبل الطلب</strong>،{' '}
                                و<strong className="text-ink">التوريد والتركيب</strong>.
                            </p>

                            <p>
                                نخدم جميع أحياء <strong className="text-ink">الرياض</strong> ونورّد لكل مدن المملكة:{' '}
                                <strong className="text-ink">جدة</strong>، <strong className="text-ink">الدمام</strong>، <strong className="text-ink">مكة المكرمة</strong>،{' '}
                                <strong className="text-ink">المدينة المنورة</strong>، وغيرها. تواصل معنا الآن عبر{' '}
                                <Link href="/contact" className={link}>الواتساب أو الهاتف</Link>{' '}
                                وأرسل مقاسات المكان وصوره لنرد عليك بعرض السعر.
                            </p>
                        </div>

                        {/* Fade + toggle (phones only). Space on the focused checkbox toggles it too. */}
                        <div className="seo-fade md:hidden absolute inset-x-0 bottom-10 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none transition-opacity" />
                        <label
                            htmlFor={moreId}
                            className="seo-toggle md:hidden relative mt-3 mx-auto flex w-fit cursor-pointer items-center gap-1.5 px-5 py-2 rounded-full border border-line bg-white text-sm text-ink font-medium"
                        >
                            <span className="seo-read">اقرأ المزيد</span>
                            <span className="seo-less hidden">عرض أقل</span>
                            <ChevronDown size={16} className="transition-transform duration-300" />
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}
