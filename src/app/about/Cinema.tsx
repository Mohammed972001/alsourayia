"use client";

import { useEffect } from "react";

const AR = "٠١٢٣٤٥٦٧٨٩";
const toArabic = (n: number) => String(n).padStart(2, "0").replace(/\d/g, (d) => AR[Number(d)]);

/**
 * Cycles the About cinema (server markup in page.tsx): every few seconds the next install photo is laid in
 * as six strips, like planks, and the counter, floor name, price and progress line follow. Runs only while
 * the hero is on screen and never under prefers-reduced-motion. The next photo is fetched one slide ahead.
 */
export function CinemaCycle({ target, interval = 5500 }: { target: string; interval?: number }) {
  useEffect(() => {
    const root = document.getElementById(target);
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".cin__slide"));
    const count = root.querySelector<HTMLElement>(".cin__count b");
    const name = root.querySelector<HTMLElement>(".cin__name");
    const bar = root.querySelector<HTMLElement>(".cin__bar i");
    if (slides.length < 2 || !count || !name || !bar) return;
    const wide = window.matchMedia("(min-width: 48rem)");
    const preload = (s: HTMLElement) => {
      const src = wide.matches ? s.dataset.src : s.dataset.srcSm;
      if (src) new Image().src = src;
    };
    let cur = 0;
    let timer = 0;
    // Web Animations rather than class toggling: a forced reflow (`void el.offsetWidth`) can be compiled away.
    let barAnim: Animation | null = null;
    const run = () => {
      barAnim?.cancel();
      barAnim = bar.animate([{ width: "0%" }, { width: "100%" }], { duration: interval, easing: "linear", fill: "forwards" });
    };
    const next = () => {
      const k = (cur + 1) % slides.length;
      slides.forEach((s, i) => {
        s.classList.remove("is-prev", "is-first");
        if (i !== k) s.classList.remove("is-on");
      });
      slides[cur].classList.add("is-prev");
      slides[k].classList.add("is-on");
      count.textContent = toArabic(k + 1);
      const nm = name.querySelector("b");
      const pr = name.querySelector("small");
      if (nm) nm.textContent = slides[k].dataset.name ?? "";
      if (pr) pr.textContent = slides[k].dataset.price ?? "";
      name.animate([{ opacity: 0, transform: "translateY(0.6rem)" }, { opacity: 1, transform: "none" }], { duration: 500, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      cur = k;
      preload(slides[(k + 1) % slides.length]);
      run();
    };
    preload(slides[1]);
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (entry.isIntersecting) {
          run();
          timer = window.setInterval(next, interval);
        } else {
          barAnim?.cancel();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [target, interval]);

  return null;
}
