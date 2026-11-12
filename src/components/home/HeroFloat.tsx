import Link from "next/link";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import { Icon } from "../Icon";
import { InstalmentBadge } from "../InstalmentBadge";
import { Photo } from "../Photo";

// Hero «العينات الطايرة» (round 3, user pick 2026-11-12). Floor samples float in a dark teal space (an AI
// drawing, labelled), the picture drifts closer, copper dust rises and a light sweep passes; the name rises in
// and one line turns through the places the shop floors. CSS only: no script, and still under reduced motion.
// It sits under the transparent header, so its content is padded by --header-h.
export function HeroFloat() {
  const h = home.hero;
  const words = [...h.turnWords, h.turnWords[0]];
  return (
    <section className="hm-hero" aria-labelledby="hero-title">
      <Photo name="ai-float-dark" alt="" className="hm-hero__bg" sizes="100vw" priority />
      <div className="hm-hero__dust" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="hm-hero__shine" aria-hidden="true" />
      <div className="container hm-hero__inner">
        <div className="hm-hero__copy">
          <p className="hm-hero__kicker">{h.kicker}</p>
          <h1 id="hero-title" className="hm-hero__title">
            <span className="hm-hero__l1">{h.titleTop}</span>
            <span className="hm-hero__l2">{h.titleWord}</span>
            <span className="visually-hidden"> — {h.subtitle}</span>
          </h1>
          <p className="hm-hero__turn">
            <span aria-hidden="true">
              {h.turnLead}{" "}
              <span className="hm-hero__slot">
                {words.map((w, i) => (
                  <span key={`${w}-${i}`}>{w}</span>
                ))}
              </span>
            </span>
            <span className="visually-hidden">
              {h.turnLead} {h.turnWords.join("، ")}
            </span>
          </p>
          <div className="hm-hero__actions">
            <a className="btn btn--lg hm-wa" href={whatsappHref()} data-wa>
              <Icon name="whatsapp" size={22} />
              <span>{h.primary}</span>
            </a>
            <Link className="btn btn--lg hm-hero__ghost" href="/products">
              <span>{h.secondary}</span>
              <Icon name="arrow" size={20} />
            </Link>
          </div>
          <InstalmentBadge tone="dark" />
          <ul className="hm-hero__facts">
            {[site.services[0], site.services[1], site.services[3]].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
      <span className="hm-note hm-hero__note">{h.imageNote}</span>
    </section>
  );
}
