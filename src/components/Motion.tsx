"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { adSource, onContactClick } from "@/lib/tracking";

/**
 * Site motion and lead tracking (constitution V, VI):
 * - [data-reveal] and [data-draw] elements get .is-in when they enter the viewport (styles/motion.css:
 *   planks slide in, tiles are set down, the tape and the swoosh draw). Threshold 0: clip-path hidden
 *   elements measure as 0 % visible in Chrome.
 * - WhatsApp and call taps are tracked, and the WhatsApp text names the product and the ad source
 *   (capture phase, before navigation; src/lib/tracking.ts).
 * Everything is off under prefers-reduced-motion; the content is in the HTML either way.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const source = adSource();
    const onClick = (e: MouseEvent) => onContactClick(e, source);
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-draw]:not(.is-in)"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
