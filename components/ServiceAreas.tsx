import type { CSSProperties } from 'react';
import { Icon } from '@/components/icons/Icon';
import { SectionHeading } from '@/components/SectionHeading';

const areas = [
    { name: 'الرياض' },
    { name: 'جدة' },
    { name: 'الدمام' },
    { name: 'الخبر' },
    { name: 'مكة المكرمة' },
    { name: 'المدينة المنورة' },
];

export function ServiceAreas({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
    return (
        <section id="service-areas" className="relative overflow-hidden grain py-16 md:py-28 bg-ink">
            <div className="relative container mx-auto px-4 lg:px-8">
                <SectionHeading
                    as={headingAs}
                    tone="dark"
                    eyebrow="مناطق الخدمة"
                    title="نخدم جميع مناطق المملكة"
                    description="معرضنا في الرياض، ونورّد لكل مدن المملكة"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto">
                    {areas.map((area, i) => (
                        <div
                            key={area.name}
                            data-reveal="zoom"
                            style={{ '--i': i } as CSSProperties}
                            // First and last span both columns on phones: wide / 2×2 / wide
                            className={`lift group relative p-5 md:p-6 rounded-2xl border ${
                                i === 0 || i === areas.length - 1 ? 'col-span-2 md:col-span-1' : ''
                            } ${
                                i === 0
                                    ? 'bg-brass/15 border-brass/40'
                                    : 'bg-white/[0.04] border-white/10'
                            }`}
                        >
                            <Icon name="location" size={20} className="text-brass mb-4" />
                            <h3 className="font-display text-lg md:text-xl font-semibold text-white">{area.name}</h3>
                            {i === 0 && (
                                <span className="absolute top-4 left-4 rounded-full bg-brass text-ink text-[10px] font-bold px-2.5 py-1">
                                    المعرض
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
