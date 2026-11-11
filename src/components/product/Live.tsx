"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps a looping animation and marks it `data-live` only while it is on screen, so the CSS can pause it
 * (animation-play-state) the rest of the time.
 */
export function Live({ className, children, label }: { className?: string; children: React.ReactNode; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) el.setAttribute("data-live", "");
      else el.removeAttribute("data-live");
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} aria-label={label} role={label ? "img" : undefined}>
      {children}
    </div>
  );
}
