"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { adSource, onContactClick } from "@/lib/tracking";

/**
 * Site motion and lead tracking (constitution V, VI):
 * - [data-reveal] elements get .is-in when they enter the viewport (threshold 0: clip-path hidden
 *   elements measure as 0 % visible in Chrome).
 * - [data-parallax="<speed>"] layers drift with scroll.
 * - WhatsApp and call taps are tracked, and the WhatsApp text names the product and the ad source
 *   (capture phase, before navigation; src/lib/tracking.ts).
 * - video[data-inview-play] clips play only while on screen; with reduced motion they show controls.
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
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("motion-ready");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      // No autoplay: the visitor starts the clip.
      document.querySelectorAll<HTMLVideoElement>("video[data-inview-play]").forEach((v) => (v.controls = true));
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

    // Short silent clips play only while on screen (preload="none" until then).
    const clips = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-inview-play]"));
    const clipIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) v.play().catch(() => (v.controls = true));
          else v.pause();
        }
      },
      { threshold: 0.35 },
    );
    clips.forEach((v) => clipIo.observe(v));

    // Product cards tilt with a fine pointer (mouse, pen); touch screens keep them flat.
    const tilts = window.matchMedia("(hover: hover) and (pointer: fine)").matches ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")) : [];
    const onTilt = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--rx", `${(((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(((e.clientY - r.top) / r.height - 0.5) * -12).toFixed(2)}deg`);
    };
    const onTiltEnd = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    tilts.forEach((el) => {
      el.addEventListener("pointermove", onTilt);
      el.addEventListener("pointerleave", onTiltEnd);
    });

    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of layers) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const speed = Number(el.dataset.parallax) || 0.1;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (layers.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      tilts.forEach((el) => {
        el.removeEventListener("pointermove", onTilt);
        el.removeEventListener("pointerleave", onTiltEnd);
      });
      io.disconnect();
      clipIo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
