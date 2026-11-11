import Link from "next/link";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { SectionHead } from "../SectionHead";

/** «حسب المشروع» as a mosaic: the mosque tile is the big one; each tile names the floors that fit and links to them. */
export function Projects() {
  const head = home.sectorsHead;
  return (
    <section className="section section--sand projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead id="projects-title" eyebrow={head.eyebrow} title={head.title} text={head.text} />
        <ul className="mosaic">
          {home.sectors.map((s, i) => {
            const main = getProduct(s.products[0]);
            return (
              <li key={s.key} className={`mosaic__tile mosaic__tile--${s.key}`} data-reveal="lay" style={{ "--i": i } as React.CSSProperties}>
                <Photo name={s.images[0]} alt={s.title} sizes={i === 0 ? "(min-width: 64rem) 46vw, 92vw" : "(min-width: 64rem) 24vw, 92vw"} />
                <div className="mosaic__body">
                  <span className="mosaic__label">{s.label}</span>
                  <h3 className="mosaic__title">{s.title}</h3>
                  <p className="mosaic__text">{s.text}</p>
                  <ul className="mosaic__links">
                    {s.products.map((slug) => {
                      const p = getProduct(slug);
                      return (
                        <li key={slug}>
                          <Link href={`/products/${p.slug}`}>
                            {p.name}
                            <Icon name="arrow" size={14} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <span className="visually-hidden">الأنسب: {main.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
