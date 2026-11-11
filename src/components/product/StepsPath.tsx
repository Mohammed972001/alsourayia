"use client";

import { useEffect, useRef } from "react";
import { Icon } from "../Icon";

const H_PATH = "M1000 150 C 960 150, 920 80, 875 80 C 790 80, 720 220, 625 220 C 530 220, 470 80, 375 80 C 280 80, 220 220, 125 220 C 80 220, 40 150, 0 150";
const V_PATH = "M50 0 C 50 40, 80 80, 80 125 C 80 220, 20 280, 20 375 C 20 470, 80 530, 80 625 C 80 720, 20 780, 20 875 C 20 920, 50 960, 50 1000";
const H_STOPS = [[87.5, 26.67], [62.5, 73.33], [37.5, 26.67], [12.5, 73.33]];
const V_STOPS = [[80, 12.5], [20, 37.5], [80, 62.5], [20, 87.5]];
const DIGITS = ["١", "٢", "٣", "٤"];

/**
 * How to order as a drawn road (round 3, user pick «ج الطريق المرسوم»): when the block comes on screen a line is
 * drawn from step to step while a truck travels along it and each stop lights up. Horizontal on wide screens,
 * vertical on phones. Without JavaScript or with reduced motion every step shows lit.
 */
export function StepsPath({ steps }: { steps: { title: string; text: string }[] }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = box.current;
    if (!root) return;
    root.classList.add("is-armed");
    const labels = Array.from(root.querySelectorAll<HTMLElement>(".spath__l"));
    const tracks = Array.from(root.querySelectorAll<HTMLElement>(".spath__track")).map((tr) => {
      const path = tr.querySelector<SVGPathElement>(".spath__line")!;
      return {
        tr,
        path,
        vertical: tr.classList.contains("spath__track--v"),
        dot: tr.querySelector<HTMLElement>(".spath__dot")!,
        reveal: tr.querySelector<HTMLElement>(".spath__reveal")!,
        stops: Array.from(tr.querySelectorAll<HTMLElement>(".spath__stop")).map((el) => ({ el, x: Number(el.dataset.x), y: Number(el.dataset.y) })),
      };
    });
    const paint = (t: number) => {
      for (const k of tracks) {
        if (k.tr.offsetParent === null) continue;
        const vb = k.path.ownerSVGElement!.viewBox.baseVal;
        const p = k.path.getPointAtLength(t * k.path.getTotalLength());
        const px = (p.x / vb.width) * 100;
        const py = (p.y / vb.height) * 100;
        k.dot.style.left = `${px}%`;
        k.dot.style.top = `${py}%`;
        k.dot.classList.toggle("is-on", t > 0);
        k.reveal.style.clipPath = k.vertical ? `inset(0 0 ${100 - py}% 0)` : `inset(0 0 0 ${px}%)`;
        const lit = k.stops.map((s) => t > 0 && (k.vertical ? py >= s.y - 0.5 : px <= s.x + 0.5));
        k.stops.forEach((s, i) => s.el.classList.toggle("is-on", lit[i]));
        labels.forEach((l, i) => l.classList.toggle("is-on", lit[i]));
      }
    };
    let raf = 0;
    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        paint(1);
        return;
      }
      const t0 = performance.now();
      const step = (now: number) => {
        const x = Math.min(1, (now - t0) / 4200);
        paint(x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
        if (x < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    paint(0);
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const track = (vertical: boolean) => {
    const d = vertical ? V_PATH : H_PATH;
    const vb = vertical ? "0 0 100 1000" : "0 0 1000 300";
    return (
      <div className={`spath__track spath__track--${vertical ? "v" : "h"}`} aria-hidden="true">
        <svg className="spath__ghost" viewBox={vb} preserveAspectRatio="none">
          <path d={d} />
        </svg>
        <div className="spath__reveal">
          <svg viewBox={vb} preserveAspectRatio="none">
            <path className="spath__line" d={d} />
          </svg>
        </div>
        {(vertical ? V_STOPS : H_STOPS).map(([x, y]) => (
          <span key={`${x}-${y}`} className="spath__stop" data-x={x} data-y={y} style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        <span className="spath__dot">
          <Icon name="truck" size={20} />
        </span>
      </div>
    );
  };

  return (
    <div className="spath" ref={box}>
      <ol className="spath__labels">
        {steps.map((s, i) => (
          <li key={s.title} className="spath__l" style={{ "--col": i + 1, "--row": i % 2 ? 3 : 1 } as React.CSSProperties}>
            <span className="spath__num">{DIGITS[i]}</span>
            <h3 className="spath__title">{s.title}</h3>
            <p className="spath__text">{s.text}</p>
          </li>
        ))}
      </ol>
      {track(false)}
      {track(true)}
    </div>
  );
}
