import { createElement, type SVGProps } from 'react';
import { glyphs, type IconName } from './glyphs';

type Props = Omit<SVGProps<SVGSVGElement>, 'name'> & {
    name: IconName;
    /** 16 inline text, 20 buttons and rows, 24 cards, 32 feature tiles (contracts/icon-set.md). */
    size?: 16 | 20 | 24 | 32;
    /** Give a label only to an icon that carries meaning on its own; otherwise it is hidden from screen readers. */
    label?: string;
};

/**
 * The only way to draw an icon on the site. Inline SVG, server-rendered, no extra request, colour from
 * `currentColor`. Unknown names fail the type check.
 */
export function Icon({ name, size = 24, label, className, ...rest }: Props) {
    const glyph = glyphs[name];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            focusable="false"
            className={`flex-none ${className ?? ''}`}
            {...rest}
        >
            {glyph.map(([tag, attrs], i) => {
                const { key, ...props } = attrs as Record<string, string | number>;
                return createElement(tag, { key: (key as string) ?? i, ...props });
            })}
        </svg>
    );
}

export type { IconName };
