import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icons/Icon';

interface OfferCardProps {
    /** Position in the list, shown as the faded «01», «02», … */
    index: number;
    icon: IconName;
    badge: string;
    title: string;
    body: string;
    /** WhatsApp chat (external) or a page of the site. Always rendered as a real link for the tracker. */
    href: string;
    cta: string;
    className?: string;
    style?: CSSProperties;
    /** Motion hooks (`data-reveal`, …) passed through to the card. */
    dataAttrs?: Record<`data-${string}`, string>;
}

/**
 * An offer or service (approved card mockup, design/cards/mock.mts «offers»): a dark-mint icon frame rising
 * over the top edge inside a mint-soft ring, a big faded number, the mint pill, title, body and an ink pill
 * button. No hooks, so it renders inside the client Offers list as well as on the server.
 */
export function OfferCard({ index, icon, badge, title, body, href, cta, className = '', style, dataAttrs }: OfferCardProps) {
    const external = !href.startsWith('/');
    const whatsapp = href.includes('wa.me/');
    const ctaClass =
        'press mt-3 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-ink px-4 py-2 text-[13.5px] font-bold text-white transition-colors hover:bg-mint-deep';
    const ctaInner = (
        <>
            {whatsapp ? <Icon name="whatsapp" size={20} className="text-whatsapp" /> : null}
            {cta}
            {whatsapp ? null : <Icon name="arrow-start" size={16} />}
        </>
    );

    return (
        <article
            {...dataAttrs}
            data-spotlight
            style={style}
            className={`lift relative mt-5 flex h-[calc(100%-1.25rem)] flex-col rounded-[18px] border border-mint-line bg-white px-5 pt-10 pb-5 ${className}`}
        >
            <span
                aria-hidden
                className="absolute -top-[26px] right-5 grid h-14 w-14 place-items-center rounded-2xl bg-mint-deep text-white shadow-[0_10px_22px_-10px_rgb(59_123_86/0.7),0_0_0_6px_var(--color-mint-soft)]"
            >
                <Icon name={icon} size={32} />
            </span>
            <span aria-hidden className="absolute top-2.5 left-4 font-display text-[40px] leading-none text-mint-line tabular-nums">
                {String(index + 1).padStart(2, '0')}
            </span>
            <span className="self-start rounded-full bg-mint-soft px-2.5 py-0.5 text-[11px] font-bold text-mint-deep">{badge}</span>
            <h3 className="mt-1.5 font-sans text-[17px] font-bold text-ink">{title}</h3>
            <p className="mt-0.5 flex-1 text-[13.5px] leading-relaxed text-ink-muted">{body}</p>
            {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                    {ctaInner}
                </a>
            ) : (
                <Link href={href} className={ctaClass}>
                    {ctaInner}
                </Link>
            )}
        </article>
    );
}
