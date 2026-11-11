import Link from "next/link";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";
import { site } from "@/content/site";
import { displayPhone, telHref, whatsappHref } from "@/lib/contact";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

// «المحل» as the user's hero «د كولاج المنتجات» reused as a section (round 3): a real photo from inside the
// shop in the middle, and AI product shots (a carpet roll, oak planks, rubber tiles, a vinyl roll) floating
// around it with their starting prices. The shots keep their cream studio backdrop and sit on a slightly
// darker panel with mix-blend-mode: darken, so the backdrop disappears and the soft shadows stay. The blended
// images carry their own fly-in and bob; their parents get no transform or z-index (that would isolate them).
export function Collage() {
  const s = home.showroom;
  return (
    <section className="section hm-col" aria-labelledby="col-title">
      <div className="container hm-col__inner">
        <div className="hm-col__copy" data-reveal="up">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id="col-title" className="hm-col__title">
            {s.title}
          </h2>
          <p className="hm-col__text">{s.text}</p>
          <dl className="hm-col__rows">
            <div>
              <dt>
                <Icon name="pin" size={18} />
                العنوان
              </dt>
              <dd>
                {site.street}، {site.district}، {site.city}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="clock" size={18} />
                المواعيد
              </dt>
              <dd>{site.hoursText}</dd>
            </div>
            <div>
              <dt>
                <Icon name="phone" size={18} />
                اتصال
              </dt>
              <dd>
                <a href={telHref()} dir="ltr">
                  {displayPhone(site.phone)}
                </a>
                <span aria-hidden="true"> · </span>
                <a href={telHref(true)} dir="ltr">
                  {displayPhone(site.phone2)}
                </a>
              </dd>
            </div>
          </dl>
          <div className="hm-col__actions">
            <a className="btn btn--primary" href={site.mapUrl} target="_blank" rel="noopener">
              <Icon name="pin" size={20} />
              <span>{s.mapCta}</span>
            </a>
            <a className="btn hm-wa" href={whatsappHref()} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>واتساب</span>
            </a>
          </div>
        </div>
        <div className="hm-col__stage" data-reveal="up">
          <figure className="hm-col__photo">
            <Photo name="showroom" alt="ممر داخل المحل بين معروضات الموكيت والسجاد" sizes="(min-width: 64rem) 26vw, 56vw" />
            <figcaption>{s.photoCaption}</figcaption>
          </figure>
          {s.cutouts.map((c, i) => {
            const p = getProduct(c.slug);
            return (
              <figure key={c.image} className={`hm-col__obj hm-col__obj--${i}`} style={{ "--n": i } as React.CSSProperties}>
                <Photo name={c.image} alt="" className="hm-col__shot" sizes="(min-width: 64rem) 16vw, 36vw" />
                <figcaption>
                  <Link href={`/products/${p.slug}`}>
                    {c.label}
                    <b>من {p.priceFrom}</b>
                  </Link>
                </figcaption>
              </figure>
            );
          })}
          <span className="hm-note">رسمة توضيحية</span>
        </div>
      </div>
    </section>
  );
}
