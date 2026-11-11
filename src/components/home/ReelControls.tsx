"use client";

import { Icon } from "../Icon";

/** Previous / next buttons for a horizontal reel (the reel also scrolls by touch, wheel and keyboard). */
export function ReelControls({ target }: { target: string }) {
  const move = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    // RTL: scrolling towards the end of the reel moves left.
    if (el) el.scrollBy({ left: -dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="reel__controls">
      <button type="button" className="reel__btn" onClick={() => move(-1)} aria-label="الصور السابقة">
        <Icon name="chevron" size={22} className="reel__prev" />
      </button>
      <button type="button" className="reel__btn" onClick={() => move(1)} aria-label="الصور التالية">
        <Icon name="chevron" size={22} />
      </button>
    </div>
  );
}
