import Link from "next/link";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";
import { whatsappHref } from "@/lib/contact";
import { Icon } from "../Icon";

// «الأرضية بتتركب» (round 3, the user's hero ج reused as a home section). A 3D floor of six tiles, each a
// top-down texture (AI drawings, and the drawn grass), drops into place tile by tile when it comes into view;
// every tile carries a standing tag with its starting price. Pure CSS 3D (isometric, no perspective).
// Chrome flattens a preserve-3d element that has an opacity animation or a filtered child, so the tiles drop
// with `translate` only and their side layers are darkened with a gradient (see r3-home.css).
export function Slab() {
  const s = home.slab;
  return (
    <section className="hm-slab" aria-labelledby="slab-title">
      <div className="container hm-slab__inner">
        <div className="hm-slab__copy" data-reveal="up">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id="slab-title" className="hm-slab__title">
            {s.title}
          </h2>
          <p className="hm-slab__text">{s.text}</p>
          <div className="hm-slab__actions">
            <a className="btn btn--primary" href={whatsappHref()} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>اطلب معاينة مجانية</span>
            </a>
            <Link className="btn btn--ghost" href="/products">
              <span>كل الأرضيات</span>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
        <div className="hm-slab__stage" data-reveal="up">
          <div className="hm-slab__iso">
            {s.tiles.map((t, i) => {
              const p = getProduct(t.slug);
              return (
                <Link
                  key={t.slug}
                  href={`/products/${p.slug}`}
                  className="hm-slab__tile"
                  style={{ "--t": `url(${t.texture})`, "--n": i, "--x": i % 3, "--y": Math.floor(i / 3) } as React.CSSProperties}
                  aria-label={`${t.label}، من ${p.priceFrom} ريال للمتر`}
                >
                  <span className="hm-slab__tag" aria-hidden="true">
                    {t.label} <b>{p.priceFrom}</b>
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="hm-slab__unit">{s.unit}</p>
          <span className="hm-note">{s.note}</span>
        </div>
      </div>
    </section>
  );
}
