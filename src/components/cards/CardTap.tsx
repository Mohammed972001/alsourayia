"use client";

import { useEffect, useRef } from "react";

/**
 * On touch screens (no hover) the first tap on a glass card opens its frosted bar to show the three points; the
 * second tap follows the link. On screens with hover the card opens on hover/focus and a tap goes straight in.
 */
export function CardTap() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const card = ref.current?.closest("a");
    if (!card) return;
    const noHover = window.matchMedia("(hover: none)");
    const onClick = (e: MouseEvent) => {
      if (!noHover.matches || card.classList.contains("is-open")) return;
      e.preventDefault();
      document.querySelectorAll(".gcard.is-open").forEach((c) => c.classList.remove("is-open"));
      card.classList.add("is-open");
    };
    card.addEventListener("click", onClick);
    return () => card.removeEventListener("click", onClick);
  }, []);
  return <span ref={ref} hidden />;
}
