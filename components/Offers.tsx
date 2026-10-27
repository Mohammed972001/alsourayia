'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { Ruler, SwatchBook, Wrench, Truck, Tag, ArrowLeft } from 'lucide-react';
import { offers, type OfferIcon } from '@/data/offers';
import { activeOffers } from '@/lib/campaign';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const ICONS: Record<OfferIcon, typeof Ruler> = { ruler: Ruler, sample: SwatchBook, wrench: Wrench, truck: Truck, tag: Tag };

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
        <section id="offers" className="py-16 md:py-28 bg-cream">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    eyebrow="العروض والخدمات"
                    title="ما نقدمه مع كل طلب"
                    description="خدمات ثابتة مع كل توريد، من المعاينة إلى التركيب"
                />

                <ul className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((offer, i) => {
                        const Icon = ICONS[offer.icon];
                        const external = !offer.href.startsWith('/');
                        return (
                            <li
                                key={offer.id}
                                data-reveal="clip"
                                data-spotlight
                                style={{ '--i': i } as CSSProperties}
                                className="lift relative flex flex-col rounded-3xl bg-white border border-line p-6 md:p-7"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="w-12 h-12 grid place-items-center rounded-2xl bg-cream text-brass-deep ring-1 ring-line">
                                        <Icon size={22} strokeWidth={1.6} />
                                    </span>
                                    <span className="rounded-full bg-brass text-ink text-[11px] font-bold px-3 py-1">{offer.badge}</span>
                                </div>
                                <h3 className="font-display text-lg md:text-xl font-semibold text-ink mt-5 mb-2">{offer.title}</h3>
                                <p className="text-ink-muted text-sm md:text-[15px] leading-relaxed flex-1">{offer.body}</p>
                                {external ? (
                                    <a
                                        href={offer.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="press mt-6 inline-flex items-center justify-center gap-2 h-11 rounded-full bg-ink text-white text-sm font-bold hover:bg-ink-soft transition-colors"
                                    >
                                        <WhatsAppIcon className="w-4 h-4" />
                                        {offer.cta}
                                    </a>
                                ) : (
                                    <Link
                                        href={offer.href}
                                        className="press mt-6 inline-flex items-center justify-center gap-2 h-11 rounded-full bg-ink text-white text-sm font-bold hover:bg-ink-soft transition-colors"
                                    >
                                        {offer.cta}
                                        <ArrowLeft size={15} />
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
