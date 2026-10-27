'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icons/Icon';
import { offers, type OfferIcon } from '@/data/offers';
import { activeOffers } from '@/lib/campaign';
import { SectionHeading } from '@/components/SectionHeading';

const ICONS: Record<OfferIcon, IconName> = { ruler: 'tape-measure', sample: 'swatch', wrench: 'install', truck: 'delivery', tag: 'check' };

/**
 * «العروض والخدمات»: cards from data/offers.ts. Undated cards are rendered on the server; a dated
 * card is decided on the visitor's clock after mount (lib/campaign.ts), so a window that closed since
 * the page was built never shows, and a new one opens without a rebuild.
 */
export function Offers() {
    const [now, setNow] = useState<Date | null>(null);
    useEffect(() => setNow(new Date()), []);
    const items = activeOffers(offers, now);

    return (
        <section id="offers" className="py-14 md:py-24 bg-mint-soft">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    eyebrow="العروض والخدمات"
                    title="ما نقدمه مع كل طلب"
                    description="خدمات ثابتة مع كل توريد، من المعاينة إلى التركيب"
                />

                {/* Phones: icon on the start side, text beside it. Desktop: four stacked cards in a row. */}
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">
                    {items.map((offer, i) => {
                        const icon = ICONS[offer.icon];
                        const external = !offer.href.startsWith('/');
                        const linkClass =
                            'col-start-2 lg:col-start-1 mt-2 justify-self-start inline-flex items-center gap-1.5 text-[13px] md:text-sm font-bold text-mint-deep transition-all hover:gap-2.5';
                        return (
                            <li
                                key={offer.id}
                                data-reveal="clip"
                                data-spotlight
                                style={{ '--i': i } as CSSProperties}
                                className="lift relative grid grid-cols-[44px_1fr] lg:grid-cols-1 content-start gap-x-3.5 gap-y-1 rounded-[14px] bg-white border border-mint-line p-[18px] lg:p-6"
                            >
                                <span className="row-span-4 lg:row-span-1 lg:mb-2 w-11 h-11 grid place-items-center rounded-xl bg-mint-soft text-mint-deep">
                                    <Icon name={icon} size={20} />
                                </span>
                                <span className="justify-self-start rounded-full bg-mint-soft text-mint-deep text-[11px] font-bold px-2.5 py-0.5">
                                    {offer.badge}
                                </span>
                                <h3 className="font-sans text-base md:text-[17px] font-bold text-ink">{offer.title}</h3>
                                <p className="text-ink-muted text-[13px] md:text-sm leading-relaxed">{offer.body}</p>
                                {external ? (
                                    <a href={offer.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                        {offer.cta}
                                        <Icon name="arrow-start" size={16} />
                                    </a>
                                ) : (
                                    <Link href={offer.href} className={linkClass}>
                                        {offer.cta}
                                        <Icon name="arrow-start" size={16} />
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
