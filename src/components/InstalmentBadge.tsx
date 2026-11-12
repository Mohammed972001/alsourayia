"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";

const STEPS = ["اليوم", "بعد شهر", "بعد شهرين", "بعد 3 شهور"];

/**
 * Tabby and Tamara badge (round 3, the user's pick «ج شارة بتفتح», 2026-11-12). A small white badge with the two
 * official partner logos (public/brand, never recoloured) that opens on hover, focus or tap into the four
 * payments. The panel floats below the badge, so opening it never moves the page.
 */
export function InstalmentBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className={`ibadge ibadge--${tone}${open ? " is-open" : ""}`}>
      <button type="button" className="ibadge__head" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        <span className="ibadge__logos">
          {/* eslint-disable-next-line @next/next/no-img-element -- official partner logo, SVG as published */}
          <img src="/brand/tabby.svg" alt="تابي" width={66} height={18} />
          {/* eslint-disable-next-line @next/next/no-img-element -- official partner logo, SVG as published */}
          <img src="/brand/tamara-tight.svg" alt="تمارا" width={58} height={18} />
        </span>
        <span className="ibadge__label">قسّط على 4 دفعات</span>
        <Icon name="chevronDown" size={16} />
      </button>
      <div id={id} className="ibadge__panel" role="region" aria-label="الدفعات الأربع">
        <ol className="ibadge__steps">
          {STEPS.map((s, i) => (
            <li key={s}>
              <b>{["١", "٢", "٣", "٤"][i]}</b>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="ibadge__terms">مع تابي أو تمارا، حسب شروطهم.</p>
      </div>
    </div>
  );
}
