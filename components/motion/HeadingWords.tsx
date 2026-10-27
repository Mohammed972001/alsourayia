import type { CSSProperties } from 'react';

type Props = {
    /** One string per line; with `from="md"` the lines break on wider screens only. */
    lines: readonly string[];
    from?: 'md' | 'lg';
    /** Class for a line that should stand out (e.g. 'text-brass'); applied to the given line indexes. */
    accent?: { lines: number[]; className: string };
};

/**
 * A heading split into words that rise one after another when the heading scrolls into view.
 * Put it inside an element with `data-reveal="words"` (rules in app/motion.css). Arabic is split by word,
 * never by letter, so the letters keep their joined shapes; the text reads as plain text to everyone.
 */
export function HeadingWords({ lines, from, accent }: Props) {
    let index = 0;
    return lines.map((line, l) => (
        <span key={l} className={accent?.lines.includes(l) ? accent.className : undefined}>
            {l > 0 ? (from ? <br className={`hidden ${from}:block`} /> : <br />) : null}
            {line.split(' ').map((word) => {
                const w = index++;
                return (
                    <span key={w}>
                        <span className="hw" style={{ '--w': w } as CSSProperties}>{word}</span>{' '}
                    </span>
                );
            })}
        </span>
    ));
}

/** A paragraph whose words light up one after another as it scrolls past (scroll-timeline browsers only). */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
    const words = text.split(' ');
    return (
        <p className={`scroll-words ${className ?? ''}`} style={{ '--n': words.length } as CSSProperties}>
            {words.map((word, w) => (
                <span key={w}>
                    <span className="word" style={{ '--w': w } as CSSProperties}>{word}</span>{' '}
                </span>
            ))}
        </p>
    );
}
