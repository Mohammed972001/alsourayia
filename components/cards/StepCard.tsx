import type { CSSProperties } from 'react';
import { Icon, type IconName } from '@/components/icons/Icon';

interface StepCardProps {
    /** 1-based step number, shown on the brass badge. */
    n: number;
    icon: IconName;
    title: string;
    text: string;
    /** The last step draws no connector. */
    last?: boolean;
}

/**
 * One step of «كيف نعمل» (approved card mockup, design/cards/mock.mts «steps»): a white circle with a mint-line
 * border and the step icon, a small brass number badge, and a dashed mint connector to the next step that draws
 * itself — downwards on phones, sideways towards the next item on desktop. Renders an <li> for the parent <ol>.
 */
export function StepCard({ n, icon, title, text, last = false }: StepCardProps) {
    const i = n - 1;
    return (
        <li className="relative grid grid-cols-[64px_1fr] gap-4 pb-[26px] md:grid-cols-1 md:justify-items-center md:pb-0 md:text-center">
            {!last && (
                <>
                    {/* Phone: vertical dashes under the circle. */}
                    <span
                        aria-hidden
                        data-reveal="grow-down"
                        style={{ '--i': i + 1 } as CSSProperties}
                        className="absolute top-16 bottom-0 right-[31px] w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--color-mint)_0_6px,transparent_6px_12px)] md:hidden"
                    />
                    {/* Desktop: horizontal dashes from this circle towards the next one (on the left in RTL). */}
                    <span
                        aria-hidden
                        data-reveal="grow"
                        style={{ '--i': i + 1 } as CSSProperties}
                        className="absolute top-[31px] left-[calc(-50%+40px)] hidden h-0.5 w-[calc(100%-80px)] bg-[repeating-linear-gradient(to_left,var(--color-mint)_0_6px,transparent_6px_12px)] md:block"
                    />
                </>
            )}
            <span
                data-reveal="pop"
                style={{ '--i': i } as CSSProperties}
                className="relative grid h-16 w-16 place-items-center rounded-full border-2 border-mint-line bg-white text-mint-deep"
            >
                <Icon name={icon} size={24} />
                <span
                    aria-hidden
                    className="absolute -top-1.5 -left-1.5 grid h-[26px] w-[26px] place-items-center rounded-full bg-brass font-display text-[13px] leading-none text-white tabular-nums"
                >
                    {n}
                </span>
            </span>
            <div data-reveal style={{ '--i': i + 1 } as CSSProperties}>
                <h3 className="mt-2 font-sans text-[17px] font-bold text-ink md:mt-3">{title}</h3>
                <p className="max-w-xs md:mx-auto text-[13.5px] leading-relaxed text-ink-muted md:text-sm">{text}</p>
            </div>
        </li>
    );
}
