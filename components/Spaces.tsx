import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { SectionHeading } from '@/components/SectionHeading';

/** The places the shop's products are made for, each pointing at its product or hub page. */
const spaces = [
    { label: 'مساجد', text: 'موكيت مساجد بخطوط صفوف أو سادة، يُفرش على اتجاه القبلة.', href: '/products/mosque-carpets', icon: 'mosque' },
    { label: 'مكاتب وشركات', text: 'موكيت مكاتب رول وبلاط موكيت، ويُركّب على مراحل والمكتب يعمل.', href: '/products/office-carpet', icon: 'office' },
    { label: 'صالات رياضية', text: 'ربل جيم يمتص صدمة الأوزان ويقلل الضوضاء، ومطاط للمناطق المبللة.', href: '/products/category/rubber-flooring', icon: 'gym' },
    { label: 'مستشفيات وعيادات', text: 'أرضيات طبية ملساء تُمسح وتتحمل المطهرات في الممرات وغرف الكشف.', href: '/products/hospital-flooring', icon: 'hospital' },
    { label: 'منازل ومجالس', text: 'موكيت للمجالس وغرف النوم، وباركيه وفينيل للصالات والمطابخ.', href: '/products/mokite', icon: 'home' },
] as const;

/**
 * Five white bordered cards, each with a mint icon tile, linking to the product (or hub) that serves that
 * place: two columns on phones with the last card across the row, five in a row on desktop.
 */
export function Spaces() {
    return (
        <section id="spaces" aria-labelledby="spaces-title" className="bg-white py-14 md:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading eyebrow="الأماكن التي نخدمها" title="أرضية مناسبة لكل مكان" />

                <ul className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 lg:gap-4">
                    {spaces.map((space, i) => (
                        <li
                            key={space.label}
                            data-reveal
                            style={{ '--i': i } as CSSProperties}
                            className="last:col-span-2 lg:last:col-span-1"
                        >
                            <Link
                                href={space.href}
                                className="lift press group flex h-full flex-col rounded-[14px] border border-line bg-white p-3.5 lg:p-5"
                            >
                                <span className="mb-2.5 grid h-10 w-10 place-items-center rounded-xl bg-mint-soft text-mint-deep">
                                    <Icon name={space.icon} size={20} />
                                </span>
                                <span className="block text-[15px] font-bold text-ink">{space.label}</span>
                                <span className="mt-0.5 block flex-1 text-[12.5px] md:text-[13px] leading-relaxed text-ink-muted">
                                    {space.text}
                                </span>
                                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-mint-deep transition-all group-hover:gap-2">
                                    اعرف المزيد
                                    <Icon name="arrow-start" size={16} />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
