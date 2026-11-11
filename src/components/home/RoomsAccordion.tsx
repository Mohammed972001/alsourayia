"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Photo } from "../Photo";

export type RoomPanel = { key: string; name: string; text: string; image: string; href: string; product: string };

/**
 * «أ الأكورديون» (user pick, 2026-11-10): one panel open at a time; hover, focus or tap opens a panel.
 * It cycles on its own while in view until someone interacts, and never under reduced motion.
 * Every panel is a real link, so all names and texts are in the HTML.
 */
export function RoomsAccordion({ rooms }: { rooms: RoomPanel[] }) {
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const box = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    if (box.current) io.observe(box.current);
    const id = window.setInterval(() => {
      if (visible && !touched.current) setActive((a) => (a + 1) % rooms.length);
    }, 3400);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [rooms.length]);

  const open = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  return (
    <ul className="acc" ref={box}>
      {rooms.map((r, i) => (
        <li key={r.key} className={`acc__panel${active === i ? " is-on" : ""}`} onMouseEnter={() => open(i)} onFocus={() => open(i)}>
          <Link
            href={r.href}
            className="acc__link"
            onClick={(e) => {
              // On touch screens the first tap opens the panel; the second follows the link.
              if (active !== i) {
                e.preventDefault();
                open(i);
              }
            }}
          >
            <Photo name={r.image} alt={`${r.name}: ${r.text}`} sizes="(min-width: 64rem) 50vw, 92vw" className="acc__img" />
            <span className="acc__shade" aria-hidden="true" />
            <span className="acc__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="acc__label">{r.name}</span>
            <span className="acc__body">
              <span className="acc__name">{r.name}</span>
              <span className="acc__text">{r.text}</span>
              <span className="acc__go">{r.product}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
