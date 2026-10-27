import type { CSSProperties } from 'react';
import { Fragment } from 'react';
import { SectionHeading } from '@/components/SectionHeading';

const steps = [
    { n: '01', title: 'تواصل على الواتساب أو اتصل', text: 'أرسل صورة المكان ومقاسه التقريبي، أو اتصل بنا يومياً من 9 صباحاً حتى 10 مساءً.' },
    { n: '02', title: 'معاينة وقياس مجاناً', text: 'نأتي إلى مكانك، نأخذ المقاسات ونعرض عليك العينات، ثم نرسل عرض السعر.' },
    { n: '03', title: 'توريد وتركيب', text: 'نورّد الخامة المختارة ونركّبها في الموعد المتفق عليه، في الرياض أو أي مدينة في المملكة.' },
] as const;

/**
 * Three numbered mint circles joined by a line that draws itself: sideways between the steps on desktop,
 * downwards between them on phones (app/motion.css `grow` / `grow-down`).
 */
export function HowWeWork() {
    return (
        <section id="how-we-work" className="py-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading eyebrow="كيف نعمل" title="ثلاث خطوات من الاستفسار إلى التركيب" />

                <ol className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start gap-0 max-w-5xl mx-auto">
                    {steps.map((step, i) => (
                        <Fragment key={step.n}>
                            {i > 0 && (
                                <li aria-hidden className="flex justify-center md:block md:pt-8">
                                    {/* Phone: a vertical line between the steps. */}
                                    <span className="block md:hidden w-px h-12 bg-mint" data-reveal="grow-down" />
                                    {/* Desktop: a horizontal line. */}
                                    <span className="hidden md:block w-16 lg:w-28 h-px bg-mint" data-reveal="grow" />
                                </li>
                            )}
                            <li className="flex flex-col items-center text-center" style={{ '--i': i } as CSSProperties}>
                                <span
                                    data-reveal="pop"
                                    className="grid place-items-center w-16 h-16 rounded-full bg-mint-soft ring-1 ring-inset ring-mint-line text-mint-deep font-display text-xl tabular-nums"
                                >
                                    {step.n}
                                </span>
                                <h3 data-reveal className="font-display text-lg md:text-xl font-semibold text-ink mt-5 mb-2" style={{ '--i': i + 1 } as CSSProperties}>
                                    {step.title}
                                </h3>
                                <p data-reveal className="text-ink-muted text-sm md:text-base leading-relaxed max-w-xs" style={{ '--i': i + 2 } as CSSProperties}>
                                    {step.text}
                                </p>
                            </li>
                        </Fragment>
                    ))}
                </ol>
            </div>
        </section>
    );
}
