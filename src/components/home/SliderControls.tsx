"use client";

import { useEffect } from "react";

const AR = "٠١٢٣٤٥٦٧٨٩";
const ar2 = (n: number) => String(n).padStart(2, "0").replace(/\d/g, (d) => AR[Number(d)]);
const DURATION = 5500;

/**
 * Drives the server-rendered projects slider: arrows, thumbnails, the counter and the progress line, and an
 * autoplay that runs only while the slider is on screen and never under reduced motion. Renders nothing.
 */
export function SliderControls({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".hm-slider__slide"));
    const thumbs = Array.from(root.querySelectorAll<HTMLButtonElement>(".hm-slider__thumbs button"));
    const count = root.querySelector<HTMLElement>(".hm-slider__count b");
    const progress = root.querySelector<HTMLElement>(".hm-slider__progress");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0;
    let timer = 0;
    let visible = false;

    const run = () => {
      if (!progress) return;
      progress.classList.remove("run");
      void progress.offsetWidth;
      if (visible && !reduce) progress.classList.add("run");
    };
    const show = (k: number) => {
      cur = (k + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const on = i === cur;
        s.classList.toggle("is-on", on);
        if (on) s.removeAttribute("aria-hidden");
        else s.setAttribute("aria-hidden", "true");
        s.querySelector("a")?.setAttribute("tabindex", on ? "0" : "-1");
      });
      thumbs.forEach((t, i) => {
        t.classList.toggle("is-on", i === cur);
        t.setAttribute("aria-pressed", String(i === cur));
      });
      if (count) count.textContent = ar2(cur + 1);
      run();
    };
    const restart = () => {
      window.clearInterval(timer);
      if (visible && !reduce) timer = window.setInterval(() => show(cur + 1), DURATION);
    };

    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-go]");
      if (!btn || !root.contains(btn)) return;
      const go = btn.dataset.go;
      show(go === "next" ? cur + 1 : go === "prev" ? cur - 1 : Number(go));
      restart();
    };
    root.addEventListener("click", onClick);
    const io = new IntersectionObserver(
      ([en]) => {
        visible = en.isIntersecting;
        run();
        restart();
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => {
      root.removeEventListener("click", onClick);
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [rootId]);

  return null;
}
