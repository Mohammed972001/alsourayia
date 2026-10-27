import type { CSSProperties } from 'react';
import { HeadingWords } from '@/components/motion/HeadingWords';

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    description?: string;
    tone?: 'light' | 'dark';
    as?: 'h1' | 'h2';
}

/**
 * Eyebrow + display title + brass rule. Shared by every home section. The eyebrow rises first, the
 * title's words follow one by one, then the rule draws and the description settles (app/motion.css).
 */
export function SectionHeading({ eyebrow, title, description, tone = 'light', as: Tag = 'h2' }: SectionHeadingProps) {
    const dark = tone === 'dark';

    return (
        <div className="text-center mb-10 md:mb-14">
            <span
                data-reveal
                className={`inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide mb-3 ${
                    dark ? 'text-brass' : 'text-brass-deep'
                }`}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                {eyebrow}
            </span>
            <Tag
                data-reveal="words"
                style={{ '--i': 1 } as CSSProperties}
                className={`font-display text-[1.7rem] leading-[1.35] md:text-4xl lg:text-[2.75rem] font-semibold ${
                    dark ? 'text-white' : 'text-ink'
                }`}
            >
                <HeadingWords lines={[title]} />
            </Tag>
            <span className="rule-brass mx-auto mt-4" data-reveal="grow" style={{ '--i': 3 } as CSSProperties} />
            {description && (
                <p
                    data-reveal
                    style={{ '--i': 4 } as CSSProperties}
                    className={`mt-4 max-w-2xl mx-auto text-[0.95rem] md:text-lg leading-relaxed ${
                        dark ? 'text-white/70' : 'text-ink-muted'
                    }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
