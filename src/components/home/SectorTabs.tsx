"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

export type SectorTab = {
  key: string;
  label: string;
  title: string;
  text: string;
  points: string[];
  products: { href: string; name: string }[];
  main: string;
  second: string;
};

/** WAI-ARIA tabs (sectors) (arrow keys, Home/End). Inactive panels keep their HTML for crawlers. */
export function SectorTabs({ tabs }: { tabs: SectorTab[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    // RTL: the right arrow moves to the previous tab.
    const map: Record<string, number> = { ArrowLeft: i + 1, ArrowRight: i - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="origins__tabs">
      <div className="tablist" role="tablist" aria-label="الأرضيات حسب نوع المشروع" data-reveal>
        {tabs.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-controls={`panel-${t.key}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            className="tablist__tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="tablist__index">{String(i + 1).padStart(2, "0")}</span>
            <span className="tablist__label">{t.label}</span>
          </button>
        ))}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.key}
          role="tabpanel"
          id={`panel-${t.key}`}
          aria-labelledby={`tab-${t.key}`}
          className={`origin${active === i ? " is-active" : ""}`}
          hidden={active !== i}
        >
          <div className="origin__media">
            <span className="origin__frame" aria-hidden="true" />
            <figure className="origin__main">
              <Photo name={t.main} alt={t.title} sizes="(min-width: 64rem) 36vw, 90vw" />
            </figure>
            <figure className="origin__second">
              <Photo name={t.second} alt="" sizes="(min-width: 64rem) 16vw, 40vw" />
            </figure>
            <span className="origin__number" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="origin__copy">
            <h3 className="origin__name">{t.title}</h3>
            <p className="origin__lead">{t.text}</p>
            <ul className="origin__features">
              {t.points.map((f) => (
                <li key={f}>
                  <Icon name="check" size={18} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="origin__rooms">
              <span>الأرضيات:</span>
              {t.products.map((p) => (
                <Link key={p.href} href={p.href} className="chip chip--link">
                  {p.name}
                </Link>
              ))}
            </p>
            <Link href={t.products[0].href} className="btn btn--dark">
              <span>صفحة {t.products[0].name}</span>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
