import type { CSSProperties } from 'react';
import Image from 'next/image';

/** Only owner-confirmed promises (the same three the hero and data/business.ts carry). */
const items = [
    { title: 'معاينة وقياس مجانًا', text: 'نقيس المكان قبل عرض السعر', image: '/mokeet makteb/WhatsApp Image 2026-10-25 at 9.29.42 PM (3).webp', path: 'M3 8h18v8H3zM7 8v3M11 8v4M15 8v3M19 8v4' },
    { title: 'عينة مجانية قبل الطلب', text: 'شاهد الخامة قبل أن تقرر', image: '/msaged/WhatsApp Image 2026-10-25 at 9.31.16 PM.webp', path: 'M4 7h16v12H4zM4 7l3-4h10l3 4M10 11h4' },
    { title: 'توريد لكل مدن المملكة', text: 'نوصل طلبك أينما كنت', image: '/Rabal-GEM/WhatsApp Image 2026-10-25 at 9.30.07 PM (1).webp', path: 'M2 6h12v10H2zM14 10h4l4 3v3h-8zM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
];

export function Promises() {
    return (
        <section aria-label="خدماتنا" className="py-14 md:py-20">
            <ul className="container mx-auto grid gap-3 px-5 md:grid-cols-3 md:gap-6 lg:px-8">
                {items.map((item, i) => (
                    <li key={item.title} data-reveal style={{ '--i': i } as CSSProperties} className="relative h-36 overflow-hidden rounded-2xl border border-line bg-white md:h-52">
                        <Image src={item.image} alt="" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white from-45% to-transparent" />
                        <div className="relative flex items-start justify-between gap-3 p-4 md:p-5">
                            <div className="border-r-4 border-brass pr-3">
                                <h2 className="font-display text-base font-bold text-ink md:text-xl">{item.title}</h2>
                                <p className="text-xs text-ink-muted md:text-sm">{item.text}</p>
                            </div>
                            <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 shrink-0 text-mint-deep md:h-10 md:w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d={item.path} />
                            </svg>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
