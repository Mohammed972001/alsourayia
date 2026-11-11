"use client";

import { useState } from "react";

/** Filter chips for the floors grid: sets data-filter on the wrapper; CSS hides the other groups. */
export function FloorFilter({ groups, children }: { groups: { id: string; name: string }[]; children: React.ReactNode }) {
  const [active, setActive] = useState("all");
  const chips = [{ id: "all", name: "الكل" }, ...groups];
  return (
    <div className="ffilter" data-filter={active}>
      <div className="ffilter__chips" role="group" aria-label="اعرض حسب المجموعة">
        {chips.map((c) => (
          <button key={c.id} type="button" className="ffilter__chip" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
            {c.name}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
