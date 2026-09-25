import { MapPin } from 'lucide-react';
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
                    description="نفخر بتقديم خدماتنا في جميع أنحاء المملكة العربية السعودية"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto">
                    {areas.map((area, i) => (
                        <div
                            key={area.name}
                            data-reveal="scale"
                            style={{ '--d': `${(i % 2) * 80}ms` } as React.CSSProperties}
                            // First and last span both columns on phones: wide / 2×2 / wide
                            className={`group relative p-5 md:p-6 rounded-2xl border transition-colors duration-300 ${
                                i === 0 || i === areas.length - 1 ? 'col-span-2 md:col-span-1' : ''
                            } ${
                                i === 0
                                    ? 'bg-brass/15 border-brass/40'
                                    : 'bg-white/[0.04] border-white/10 hover:border-brass/40'
                            }`}
                        >
                            <MapPin size={18} className="text-brass mb-4" strokeWidth={1.7} />
                            <h3 className="font-display text-lg md:text-xl font-semibold text-white">{area.name}</h3>
                            {i === 0 && (
                                <span className="absolute top-4 left-4 rounded-full bg-brass text-ink text-[10px] font-bold px-2.5 py-1">
                                    المقر الرئيسي
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
