import type { CSSProperties } from 'react';
import type { IconName } from '@/components/icons/Icon';
import { SectorCard } from '@/components/cards/SectorCard';
import { SectionHeading } from '@/components/SectionHeading';

interface Space {
    label: string;
    text: string;
    href: string;
    icon: IconName;
    /** Owner photo; hospital and home stay icon-led until the owner sends theirs. */
    image?: { src: string; alt: string };
}

/** The places the shop's products are made for, each pointing at its product or hub page. */
const spaces: Space[] = [
    {
        label: 'مساجد',
        text: 'موكيت مساجد بخطوط صفوف أو سادة، يُفرش على اتجاه القبلة.',
        href: '/products/mosque-carpets',
        icon: 'mosque',
        image: { src: '/msaged/WhatsApp Image 2026-10-25 at 9.31.16 PM.webp', alt: 'موكيت مساجد بخطوط الصفوف مركّب في مسجد' },
    },
    {
        label: 'صالات رياضية',
        text: 'ربل جيم يمتص صدمة الأوزان ويقلل الضوضاء، ومطاط للمناطق المبللة.',
        href: '/products/category/rubber-flooring',
        icon: 'gym',
        image: { src: '/Rabal-GEM/WhatsApp Image 2026-10-25 at 9.30.07 PM (1).webp', alt: 'أرضية ربل جيم مركّبة في صالة رياضية' },
    },
    {
        label: 'مكاتب وشركات',
        text: 'موكيت مكاتب رول وبلاط موكيت، ويُركّب على مراحل والمكتب يعمل.',
        href: '/products/office-carpet',
        icon: 'office',
        image: { src: '/mokeet makteb/WhatsApp Image 2026-10-25 at 9.29.42 PM (3).webp', alt: 'موكيت مكاتب مركّب في مكتب' },
    },
    { label: 'مستشفيات وعيادات', text: 'أرضيات طبية ملساء تُمسح وتتحمل المطهرات في الممرات وغرف الكشف.', href: '/products/hospital-flooring', icon: 'hospital' },
    { label: 'منازل ومجالس', text: 'موكيت للمجالس وغرف النوم، وباركيه وفينيل للصالات والمطابخ.', href: '/products/mokite', icon: 'home' },
];

/**
 * Sector cards (approved mockup): the mosque photo leads, gym and office follow with their photos, hospital and
 * home are icon-led. Phones: two columns with the mosque across the row. Desktop: 2fr/1fr/1fr with the mosque
 * spanning both rows.
 */
export function Spaces() {
    return (
        <section id="spaces" aria-labelledby="spaces-title" className="bg-white py-14 md:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading eyebrow="الأماكن التي نخدمها" title="أرضية مناسبة لكل مكان" />

                <ul className="grid grid-cols-2 gap-3 lg:grid-cols-[2fr_1fr_1fr] lg:auto-rows-[minmax(220px,auto)] lg:gap-[18px]">
                    {spaces.map((space, i) => {
                        const lead = i === 0;
                        const shape = space.image
                            ? lead
                                ? 'col-span-2 aspect-[16/10] lg:col-span-1 lg:row-span-2 lg:aspect-auto'
                                : 'aspect-[3/4] lg:aspect-auto'
                            : '';
                        return (
                            <li key={space.label} data-reveal style={{ '--i': i } as CSSProperties} className={shape}>
                                <SectorCard
                                    href={space.href}
                                    title={space.label}
                                    text={space.text}
                                    icon={space.icon}
                                    image={
                                        space.image && {
                                            ...space.image,
                                            sizes: lead
                                                ? '(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw'
                                                : '(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw',
                                        }
                                    }
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
