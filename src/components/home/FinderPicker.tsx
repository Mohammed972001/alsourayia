"use client";

import Link from "next/link";
import { useState } from "react";
import { whatsappHref } from "@/lib/contact";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

type Place = { key: string; name: string; text: string; image: string; product: { slug: string; name: string; tagline: string; price: number | null } };

/** Place buttons and one answer card per place; only the chosen card shows, all of them are in the HTML. */
export function FinderPicker({ places }: { places: Place[] }) {
  const [active, setActive] = useState(places[0].key);
  return (
    <div className="picker">
      <div className="picker__places" role="group" aria-label="المكان">
        {places.map((pl, i) => (
          <button
            key={pl.key}
            type="button"
            className="picker__place"
            aria-pressed={active === pl.key}
            onClick={() => setActive(pl.key)}
            data-reveal="tile"
            style={{ "--i": i % 5 } as React.CSSProperties}
          >
            {pl.name}
          </button>
        ))}
      </div>
      <div className="picker__answers" aria-live="polite">
        {places.map((pl) => (
          <article key={pl.key} className="answer" hidden={active !== pl.key}>
            <span className="answer__img">
              <Photo name={pl.image} alt="" sizes="(min-width: 64rem) 22vw, 90vw" />
            </span>
            <div className="answer__body">
              <p className="answer__for">لـ{pl.name}</p>
              <h3 className="answer__name">{pl.product.name}</h3>
              <p className="answer__text">{pl.text}</p>
              <p className="answer__price">{pl.product.price !== null ? `يبدأ من ${pl.product.price} ريال للمتر` : "السعر بعد المعاينة والقياس"}</p>
              <div className="answer__actions">
                <Link className="btn btn--dark btn--sm" href={`/products/${pl.product.slug}`}>
                  <span>صفحة {pl.product.name}</span>
                  <Icon name="arrow" size={16} />
                </Link>
                <a className="btn btn--ghost btn--sm" href={whatsappHref(pl.product.name)} data-wa>
                  <Icon name="whatsapp" size={16} />
                  <span>اسأل عنه</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
