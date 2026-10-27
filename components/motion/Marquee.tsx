type Props = {
    items: readonly string[];
    label: string;
    className?: string;
};

function Group({ items, hidden }: { items: readonly string[]; hidden?: boolean }) {
    return (
        <ul aria-hidden={hidden || undefined} className="flex flex-none items-center">
            {items.map((item) => (
                <li key={item} className="flex items-center gap-6 pe-6 md:gap-10 md:pe-10 text-sm md:text-lg font-semibold whitespace-nowrap">
                    {item}
                    <span aria-hidden className="size-1.5 md:size-2 rotate-45 bg-brass" />
                </li>
            ))}
        </ul>
    );
}

/**
 * A moving strip of short phrases. The list is repeated so the loop has no seam; the copies are hidden
 * from screen readers. With reduced motion the strip stands still, wrapped. Pauses on hover/focus and
 * while off screen (RevealObserver).
 */
export function Marquee({ items, label, className = 'bg-ink py-3 md:py-4 text-white' }: Props) {
    return (
        <div aria-label={label} role="group" className={`marquee ${className}`}>
            <div className="marquee-track">
                <Group items={items} />
                <Group items={items} hidden />
                <Group items={items} hidden />
                <Group items={items} hidden />
            </div>
        </div>
    );
}
