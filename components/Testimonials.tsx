'use client';

import { useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';

const testimonials = [
    {
        name: 'أحمد بن سعيد',
        role: 'رجل أعمال',
        text: 'خدمة رائعة ومنتجات عالية الجودة. السجاد الذي اشتريته من السُريع حول منزلي إلى قصر فاخر. أنصح الجميع بالتعامل معهم.',
        initials: 'أس',
    },
    {
        name: 'فاطمة العتيبي',
        role: 'مصممة داخلية',
        text: 'تعاملت مع السُريع في عدة مشاريع وكانت النتائج دائماً مبهرة. الجودة والاحترافية والالتزام بالمواعيد يجعلهم الخيار الأول.',
        initials: 'فع',
    },
    {
        name: 'خالد المطيري',
        role: 'مالك فندق',
        text: 'جهزنا فندقنا بالكامل من خلال السُريع. الأسعار معقولة والجودة ممتازة. فريق العمل محترف ومتعاون جداً.',
        initials: 'خم',
    },
];

export function Testimonials() {
    const railRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    // Track which card is centred on the phone carousel to drive the dots
    const onScroll = () => {
        const rail = railRef.current;
        if (!rail) return;
        const card = rail.firstElementChild as HTMLElement | null;
        if (!card) return;
        const step = card.offsetWidth + 12;
        setActive(Math.min(testimonials.length - 1, Math.round(Math.abs(rail.scrollLeft) / step)));
    };

    const goTo = (i: number) => {
        const rail = railRef.current;
        const card = rail?.children[i] as HTMLElement | undefined;
        card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    return (
        <section id="testimonials" className="py-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    eyebrow="آراء العملاء"
                    title="ماذا يقول عملاؤنا"
                    description="نفخر بثقة عملائنا ورضاهم عن خدماتنا ومنتجاتنا"
                />

                <div
                    ref={railRef}
                    onScroll={onScroll}
                    className="flex md:grid md:grid-cols-3 gap-3 md:gap-6 max-w-6xl overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-auto md:px-0 pb-2"
                >
                    {testimonials.map((t, i) => (
                        <figure
                            key={t.name}
                            data-reveal
                            style={{ '--d': `${i * 100}ms` } as React.CSSProperties}
                            className="relative snap-center shrink-0 w-[86%] sm:w-[60%] md:w-auto flex flex-col p-6 md:p-8 rounded-2xl bg-cream border border-line"
                        >
                            <Quote size={36} className="absolute top-5 left-5 text-brass/25" strokeWidth={1.5} />
                            <div className="flex gap-0.5 mb-4" aria-label="تقييم 5 من 5">
                                {Array.from({ length: 5 }).map((_, s) => (
                                    <Star key={s} size={15} className="fill-brass text-brass" />
                                ))}
                            </div>
                            <blockquote className="text-ink-soft leading-loose text-[0.95rem] flex-1 mb-6">
                                &ldquo;{t.text}&rdquo;
                            </blockquote>
                            <figcaption className="flex items-center gap-3 pt-5 border-t border-line">
                                <span className="w-11 h-11 rounded-full bg-ink text-brass grid place-items-center font-display font-semibold text-sm">
                                    {t.initials}
                                </span>
                                <span>
                                    <span className="block text-sm font-bold text-ink">{t.name}</span>
                                    <span className="block text-xs text-ink-muted">{t.role}</span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                {/* Dots (phones) */}
                <div className="md:hidden flex justify-center gap-2 mt-5">
                    {testimonials.map((t, i) => (
                        <button
                            key={t.name}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`الرأي ${i + 1}`}
                            aria-current={active === i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                active === i ? 'w-6 bg-ink' : 'w-1.5 bg-line'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
