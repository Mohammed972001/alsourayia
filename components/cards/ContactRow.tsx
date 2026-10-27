import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from '@/components/icons/Icon';

interface ContactRowProps {
    icon: IconName;
    label: string;
    /** The value line; may hold its own links (e.g. two phone numbers) when the row itself has no `href`. */
    children: ReactNode;
    /** Makes the whole row one real link (maps, tel:) and adds the trailing arrow. */
    href?: string;
    external?: boolean;
    /** Contact sections give the label a heading level; elsewhere it is plain text. */
    labelAs?: 'h3' | 'span';
    style?: CSSProperties;
    /** Motion hooks (`data-reveal`, …) passed through to the row. */
    dataAttrs?: Record<`data-${string}`, string>;
}

/**
 * One contact line (approved card mockup, design/cards/mock.mts «rows»): a mint-soft icon tile, the label, the
 * value and, when the row is a link, a trailing arrow. Put rows inside `ContactRows` for the shared frame.
 */
export function ContactRow({ icon, label, children, href, external = false, labelAs: Label = 'span', style, dataAttrs }: ContactRowProps) {
    const inner = (
        <>
            <span className="grid h-[46px] w-[46px] flex-none place-items-center rounded-[14px] bg-mint-soft text-mint-deep ring-1 ring-inset ring-mint-line">
                <Icon name={icon} size={20} />
            </span>
            <div className="min-w-0 flex-1">
                <Label className="block font-sans text-sm font-bold text-ink">{label}</Label>
                <div className="text-sm leading-relaxed text-ink-soft">{children}</div>
            </div>
            {href ? <Icon name="arrow-start" size={20} className="text-mint-deep" /> : null}
        </>
    );
    const rowClass = 'flex items-center gap-3.5 px-[18px] py-4';

    if (href) {
        return (
            <li {...dataAttrs} style={style}>
                <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`group ${rowClass} transition-colors hover:bg-mint-soft/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mint-deep`}
                >
                    {inner}
                </a>
            </li>
        );
    }
    return (
        <li {...dataAttrs} style={style} className={rowClass}>
            {inner}
        </li>
    );
}

/** The shared frame of a list of contact rows: one bordered box with a rule between rows. */
export function ContactRows({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <ul className={`divide-y divide-line overflow-hidden rounded-[18px] border border-line bg-white ${className}`}>{children}</ul>;
}
