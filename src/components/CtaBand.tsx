import { home } from "@/content/home";
import { whatsappHref } from "@/lib/contact";
import { Icon, Swoosh } from "./Icon";
import { Photo } from "./Photo";

type Props = { title?: string; text?: string; button?: string; product?: string; images?: [string, string] };

/** The closing WhatsApp card: dark, inset, with two layered photos. */
export function CtaBand({ title = home.cta.title, text = home.cta.text, button = home.cta.button, product, images = ["mosque-05", "office-swatch-03"] }: Props) {
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__card" data-reveal>
          <Swoosh className="cta__steps" />
          <div className="cta__copy">
            <h2 id="cta-title" className="cta__title">
              {title}
            </h2>
            <p className="cta__text">{text}</p>
            <a className="btn btn--inverse btn--lg" href={whatsappHref(product)} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>{button}</span>
            </a>
          </div>
          <div className="cta__media" aria-hidden="true">
            <figure className="cta__photo cta__photo--back" data-parallax="0.05">
              <Photo name={images[0]} alt="" sizes="(min-width: 64rem) 28vw, 60vw" />
            </figure>
            <figure className="cta__photo cta__photo--front" data-parallax="-0.07">
              <Photo name={images[1]} alt="" sizes="(min-width: 64rem) 16vw, 40vw" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
