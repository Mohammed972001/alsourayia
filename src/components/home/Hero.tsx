import Link from "next/link";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";
import { whatsappHref } from "@/lib/contact";
import { Icon, Swoosh } from "../Icon";
import { mediaUrl, Photo } from "../Photo";

// Hero (same motion system as the sister build, round 1 for this shop): (1) a carpet roll sweeps across and
// unrolls an owner photo of a mosque they carpeted, (2) a fan of the shop's own samples opens over its corner,
// (3) the word «السريع» stays filled with a slowly moving carpet pattern. Every photo is the owner's.
const FAN: [string, string][] = [
  ["mosque-carpets", "mosque-swatch-03"],
  ["office-carpet", "office-swatch-01"],
  ["vinyl-roll", "vinyl-01"],
  ["rabal-gem", "gym-01"],
  ["non-slip-rubber", "bath-01"],
];

export function Hero() {
  const h = home.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__arch" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker" data-reveal>
            <Icon name="pin" size={18} />
            {h.kicker}
          </p>
          <h1 id="hero-title" className="hero__title" data-reveal>
            <span className="hero__title-top">{h.titleTop}</span>
            <span className="hero__title-word" style={{ "--word-texture": `url(${mediaUrl("mosque-swatch-04", 480)})` } as React.CSSProperties}>
              {h.titleWord}
            </span>
            <span className="hero__title-sub">{h.subtitle}</span>
          </h1>
          <Swoosh className="hero__steps" />
          <p className="hero__lead" data-reveal>
            {h.lead}
          </p>
          <div className="hero__actions" data-reveal>
            <a className="btn btn--primary btn--lg" href={whatsappHref()} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>{h.primary}</span>
            </a>
            <Link className="btn btn--ghost btn--lg" href="/products">
              <span>{h.secondary}</span>
              <Icon name="arrow" size={20} />
            </Link>
          </div>
        </div>

        <div className="hero__stage">
          <span className="hero__frame" aria-hidden="true" />
          <div className="hero__unroll">
            <Photo name="mosque-12" alt="مسجد بأقواس وثريا مفروش بموكيت بنقشة المحاريب من تركيب المحل" sizes="(min-width: 64rem) 46vw, 92vw" priority className="hero__unroll-img" />
            <span className="hero__unroll-shade" aria-hidden="true" />
            <span className="hero__roll" aria-hidden="true" style={{ "--roll-texture": `url(${mediaUrl("mosque-swatch-01", 160)})` } as React.CSSProperties} />
          </div>
          <ul className="hero__fan" aria-label="عينات من الأصناف">
            {FAN.map(([slug, image], k) => {
              const p = getProduct(slug);
              return (
                <li key={slug} className="hero__card" style={{ "--k": k, "--a": `${(k - 2) * -12}deg` } as React.CSSProperties}>
                  <Link href={`/products/${p.slug}`} aria-label={p.name}>
                    <Photo name={image} alt="" sizes="160px" />
                    <span>{p.short}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
