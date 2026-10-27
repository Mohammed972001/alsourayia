import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';

/** The places the shop's products are made for, each pointing at its product or hub page. */
const spaces = [
    { label: 'مساجد', text: 'موكيت مساجد بخطوط صفوف أو سادة، يُفرش على اتجاه القبلة.', href: '/products/mosque-carpets' },
    { label: 'مكاتب وشركات', text: 'موكيت مكاتب رول وبلاط موكيت، ويُركّب على مراحل والمكتب يعمل.', href: '/products/office-carpet' },
    { label: 'صالات رياضية', text: 'ربل جيم يمتص صدمة الأوزان ويقلل الضوضاء، ومطاط للمناطق المبللة.', href: '/products/category/rubber-flooring' },
    { label: 'مستشفيات وعيادات', text: 'أرضيات طبية ملساء تُمسح وتتحمل المطهرات في الممرات وغرف الكشف.', href: '/products/hospital-flooring' },
    { label: 'منازل ومجالس', text: 'موكيت للمجالس وغرف النوم، وباركيه وفينيل للصالات والمطابخ.', href: '/products/mokite' },
] as const;

/**
 * A dark band of five sector chips with hairline rules between them: a column on phones, a row on
 * desktop. Each chip links to the product (or hub) that serves that place.
 */
export function Spaces() {
    return (
        <section id="spaces" aria-labelledby="spaces-title" className="relative overflow-hidden grain bg-ink text-white py-16 md:py-24">
            <div className="relative container mx-auto px-4 lg:px-8">
                <SectionHeading tone="dark" eyebrow="الأماكن التي نخدمها" title="أرضية مناسبة لكل مكان" />

                <ul className="grid lg:grid-cols-5 divide-y divide-white/10 lg:divide-y-0 lg:divide-x lg:divide-white/10 border-y border-white/10">
                    {spaces.map((space, i) => (
                        <li key={space.label} className="py-7 lg:py-2 lg:px-6 first:lg:ps-0 last:lg:pe-0">
                            <div
                                data-reveal
                                style={{ '--i': i } as CSSProperties}
                                className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6 lg:py-6"
                            >
                                <span className="inline-flex shrink-0 items-center rounded-full border border-brass/50 px-4 py-1.5 text-sm font-semibold text-brass">
                                    {space.label}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm md:text-[15px] leading-relaxed text-white/70">{space.text}</p>
                                    <Link
                                        href={space.href}
                                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white hover:gap-2 hover:text-brass transition-all"
                                    >
                                        اعرف المزيد
                                        <ArrowLeft size={14} className="text-brass" />
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
