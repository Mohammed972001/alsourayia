import { home } from "@/content/home";
import { site } from "@/content/site";
import { displayPhone, telHref, whatsappHref } from "@/lib/contact";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

// `images` is kept so callers built for the older band still type-check; the card uses the AI scene.
type Props = { title?: string; text?: string; button?: string; product?: string; images?: [string, string] };

/**
 * The closing card (round 3, user pick «ج الكارت الغامق بالرسمة», 2026-11-12): the logo teal, with the AI
 * scene of floating floor samples zooming slowly on one side, and on the other the title, both numbers in
 * display type and WhatsApp.
 */
export function CtaBand({ title = home.cta.title, text = home.cta.text, button = home.cta.button, product }: Props) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__card" data-reveal="up">
          <div className="cta__art" aria-hidden="true">
            <Photo name="ai-float-dark" alt="" sizes="(min-width: 64rem) 40rem, 100vw" />
            <span className="cta__note">رسمة توضيحية</span>
          </div>
          <div className="cta__copy">
            <p className="eyebrow">جاهزين نقيس مكانك</p>
            <h2 id="cta-title" className="cta__title">
              {title}
            </h2>
            <p className="cta__text">{text}</p>
            <ul className="cta__phones">
              <li>
                <Icon name="phone" size={20} />
                <a href={telHref()} dir="ltr">
                  {displayPhone(site.phone)}
                </a>
                <small>اتصال وواتساب</small>
              </li>
              <li>
                <Icon name="phone" size={20} />
                <a href={telHref(true)} dir="ltr">
                  {displayPhone(site.phone2)}
                </a>
                <small>اتصال</small>
              </li>
            </ul>
            <a className="btn btn--wa btn--lg" href={whatsappHref(product)} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>{button}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
