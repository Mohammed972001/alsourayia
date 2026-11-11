import Link from "next/link";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

// Hero «لوح البلاط» (round 2 for this shop, 2026-11-11: the user asked that it not copy the sister build).
// A board of the shop's own floors is set down tile by tile, then a measuring tape runs out along its edge —
// the free measuring visit the shop is known for. The word «السريع» gets the badge's swoosh, drawn.
const TILES: { image: string; href: string; label: string }[] = [
  { image: "mosque-12", href: "/products/mosque-carpets", label: "موكيت مساجد" },
  { image: "office-swatch-02", href: "/products/office-carpet", label: "موكيت مكاتب" },
  { image: "vinyl-01", href: "/products/vinyl-roll", label: "مشمع باركيه" },
  { image: "gym-01", href: "/products/rabal-gem", label: "ربل جيم" },
  { image: "mosque-swatch-04", href: "/products/mosque-carpets", label: "عينة مساجد" },
  { image: "bath-01", href: "/products/non-slip-rubber", label: "ربل حمامات" },
];

export function Hero() {
  const h = home.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker" data-reveal="up">
            <Icon name="pin" size={18} />
            {h.kicker}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-top" data-reveal="up">
              {h.titleTop}
            </span>
            <span className="hero__title-word" data-reveal="up" style={{ "--i": 1 } as React.CSSProperties}>
              {h.titleWord}
              <svg className="hero__swoosh" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-draw>
                <path d="M4 34C70 12 170 4 296 14" pathLength="1" />
              </svg>
            </span>
            <span className="hero__title-sub" data-reveal="up" style={{ "--i": 2 } as React.CSSProperties}>
              {h.subtitle}
            </span>
          </h1>
          <p className="hero__lead" data-reveal="up" style={{ "--i": 3 } as React.CSSProperties}>
            {h.lead}
          </p>
          <div className="hero__actions" data-reveal="up" style={{ "--i": 4 } as React.CSSProperties}>
            <a className="btn btn--primary btn--lg" href={whatsappHref()} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>{h.primary}</span>
            </a>
            <Link className="btn btn--ghost btn--lg" href="/products">
              <span>{h.secondary}</span>
              <Icon name="arrow" size={20} />
            </Link>
          </div>
          <p className="hero__hours" data-reveal="up" style={{ "--i": 5 } as React.CSSProperties}>
            <Icon name="clock" size={18} />
            <span>{site.hoursText}</span>
          </p>
        </div>

        <div className="hero__board">
          <ul className="tiles" aria-label="من أرضيات المحل">
            {TILES.map((t, k) => (
              <li key={t.image} className={`tiles__tile${k === 0 ? " tiles__tile--big" : ""}`} style={{ "--k": k } as React.CSSProperties}>
                <Link href={t.href}>
                  <Photo name={t.image} alt={k === 0 ? "مسجد بأقواس مفروش بموكيت بنقشة المحاريب من تركيب المحل" : ""} sizes={k === 0 ? "(min-width: 64rem) 30vw, 62vw" : "(min-width: 64rem) 15vw, 31vw"} priority={k === 0} />
                  <span className="tiles__label">{t.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="tape" aria-hidden="true">
            <span className="tape__case">
              <Icon name="measure" size={20} />
            </span>
            <span className="tape__strip" />
            <span className="tape__tag">{site.services[0]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
