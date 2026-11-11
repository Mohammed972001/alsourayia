"use client";

import { useEffect, useState } from "react";
import { Icon } from "../Icon";

type Group = { id: string; name: string; count: number };

/**
 * Group tabs, arrows and the progress line for the home rail (round 3). The rail is server-rendered; this
 * island only scrolls it. RTL: Chrome reports scrollLeft from 0 down to a negative number, so positions use
 * its absolute value. A mouse can drag the rail; touch keeps native scrolling and snap.
 */
export function ShowcaseControls({ railId, barId, groups, hint }: { railId: string; barId: string; groups: Group[]; hint: string }) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const rail = document.getElementById(railId);
    const bar = document.getElementById(barId);
    if (!rail) return;
    const items = Array.from(rail.querySelectorAll<HTMLElement>("[data-col]"));

    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const pos = max > 0 ? Math.min(1, Math.abs(rail.scrollLeft) / max) : 0;
      const size = Math.min(1, rail.clientWidth / rail.scrollWidth);
      if (bar) {
        bar.style.width = `${size * 100}%`;
        bar.style.insetInlineStart = `${pos * (1 - size) * 100}%`;
      }
      setEdges({ start: pos <= 0.01, end: pos >= 0.99 });
      // The group of the card nearest the start (right) edge.
      const right = rail.getBoundingClientRect().right;
      let best = items[0];
      let gap = Infinity;
      for (const it of items) {
        const d = Math.abs(right - it.getBoundingClientRect().right);
        if (d < gap) {
          gap = d;
          best = it;
        }
      }
      if (pos >= 0.99) best = items[items.length - 1];
      if (best?.dataset.col) setActive(best.dataset.col);
    };

    // Mouse drag (touch and pens scroll natively).
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = rail.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        rail.classList.add("is-dragging");
      }
      if (moved) rail.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      rail.classList.remove("is-dragging");
    };
    // A drag must not open the card it started on.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();

    rail.addEventListener("scroll", update, { passive: true });
    rail.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    rail.addEventListener("click", onClick, true);
    rail.addEventListener("dragstart", onDragStart);
    const ro = new ResizeObserver(update);
    ro.observe(rail);
    update();
    return () => {
      rail.removeEventListener("scroll", update);
      rail.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      rail.removeEventListener("click", onClick, true);
      rail.removeEventListener("dragstart", onDragStart);
      ro.disconnect();
    };
  }, [railId, barId]);

  const step = (dir: 1 | -1) => {
    const rail = document.getElementById(railId);
    const card = rail?.querySelector<HTMLElement>("[data-col]");
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 16;
    // RTL: moving towards the end scrolls left.
    rail.scrollBy({ left: -dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const jump = (id: string) => {
    const rail = document.getElementById(railId);
    const first = rail?.querySelector<HTMLElement>(`[data-col="${id}"]`);
    if (!rail || !first) return;
    setActive(id);
    const delta = first.getBoundingClientRect().right - rail.getBoundingClientRect().right;
    rail.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="hm-show__controls">
      <div className="hm-tabs" role="group" aria-label={hint}>
        {groups.map((g) => (
          <button key={g.id} type="button" className="hm-tabs__btn" aria-pressed={active === g.id} onClick={() => jump(g.id)}>
            {g.name}
            <span className="hm-tabs__count">{g.count}</span>
          </button>
        ))}
      </div>
      <div className="hm-arrows">
        <button type="button" className="hm-arrows__btn" onClick={() => step(-1)} disabled={edges.start} aria-label="الأصناف السابقة">
          <Icon name="arrow" size={20} className="hm-arrows__prev" />
        </button>
        <button type="button" className="hm-arrows__btn" onClick={() => step(1)} disabled={edges.end} aria-label="الأصناف التالية">
          <Icon name="arrow" size={20} />
        </button>
      </div>
    </div>
  );
}
