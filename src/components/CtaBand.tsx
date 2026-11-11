import { home } from "@/content/home";
import { site } from "@/content/site";
import { displayPhone, telHref, whatsappHref } from "@/lib/contact";
import { Icon } from "./Icon";

type Props = { title?: string; text?: string; button?: string; product?: string; images?: [string, string] };

/** The closing band: copper with a herringbone weave, WhatsApp first and both numbers beside it. */
export function CtaBand({ title = home.cta.title, text = home.cta.text, button = home.cta.button, product }: Props) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container cta__inner">
        <div className="cta__copy" data-reveal="up">
          <h2 id="cta-title" className="cta__title">
            {title}
          </h2>
          <p className="cta__text">{text}</p>
        </div>
        <div className="cta__actions" data-reveal="up" style={{ "--i": 1 } as React.CSSProperties}>
          <a className="btn btn--light btn--lg" href={whatsappHref(product)} data-wa>
            <Icon name="whatsapp" size={20} />
            <span>{button}</span>
          </a>
          <p className="cta__phones">
            <Icon name="phone" size={18} />
            <a href={telHref()} dir="ltr">
              {displayPhone(site.phone)}
            </a>
            <span aria-hidden="true">·</span>
            <a href={telHref(true)} dir="ltr">
              {displayPhone(site.phone2)}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
