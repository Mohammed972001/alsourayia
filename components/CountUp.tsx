'use client';

import { useEffect, useRef, useState } from 'react';

/** Counts "10000+" up from zero the first time it scrolls into view. */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
    const match = value.match(/^(\d+)(.*)$/);
    const target = match ? Number(match[1]) : 0;
    const suffix = match ? match[2] : '';
    const ref = useRef<HTMLSpanElement>(null);
    const [current, setCurrent] = useState(target);

    useEffect(() => {
        const el = ref.current;
        if (!el || !match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let frame = 0;
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
                const t = Math.min(1, (now - start) / duration);
                setCurrent(Math.round(target * (1 - Math.pow(1 - t, 4))));
                if (t < 1) frame = requestAnimationFrame(tick);
            };
            setCurrent(0);
            frame = requestAnimationFrame(tick);
        }, { threshold: 0.6 });

        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(frame);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, duration]);

    if (!match) return <span>{value}</span>;

    return (
        <span ref={ref} className="tabular-nums">
            {current.toLocaleString('en-US')}
            {suffix}
        </span>
    );
}
