'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import type { IconName } from '@/components/icons/Icon';
import { OfferCard } from '@/components/cards/OfferCard';
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

                {/* Phones: one column, spaced for the frame that rises over each card. Desktop: four in a row. */}
                <ul className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">
                    {items.map((offer, i) => (
                        <li key={offer.id} data-reveal style={{ '--i': i } as CSSProperties}>
                            <OfferCard
                                index={i}
                                icon={ICONS[offer.icon]}
                                badge={offer.badge}
                                title={offer.title}
                                body={offer.body}
                                href={offer.href}
                                cta={offer.cta}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
