import Link from "next/link";
import { home } from "@/content/home";
import { legalLine, site } from "@/content/site";
import { displayPhone, telHref } from "@/lib/contact";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { SectionHead } from "../SectionHead";

/** The shop as a visit ticket: address, hours and numbers on a perforated card, beside three photos from inside. */
export function Showroom() {
  const s = home.showroom;
  return (
    <section className="section visit" aria-labelledby="visit-title">
      <div className="container visit__inner">
        <div className="visit__copy">
          <SectionHead id="visit-title" eyebrow={s.eyebrow} title={s.title} />
          <p className="visit__text" data-reveal="up">
            {s.text}
          </p>
          <div className="ticket" data-reveal="lay">
            <dl className="ticket__rows">
              <div>
                <dt>
                  <Icon name="pin" size={18} />
                  العنوان
                </dt>
                <dd>
                  {site.street}، {site.district}
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
            <div className="ticket__stub">
              <a className="btn btn--primary" href={site.mapUrl} target="_blank" rel="noopener">
                <Icon name="pin" size={20} />
                <span>{s.mapCta}</span>
              </a>
              <Link className="text-link" href="/contact">
                صفحة الزيارة
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
          <p className="visit__legal">{legalLine()}</p>
        </div>
        <div className="visit__photos">
          <figure className="visit__photo visit__photo--a" data-reveal="lay">
            <Photo name="showroom" alt="ممر داخل المحل بين معروضات الموكيت والسجاد، وعلى الأرض ثلاث عينات" sizes="(min-width: 64rem) 30vw, 70vw" />
          </figure>
          <figure className="visit__photo visit__photo--b" data-reveal="lay" style={{ "--i": 1 } as React.CSSProperties}>
            <Photo name="showroom-rubber-02" alt="رولات ربل جيم واقفة داخل المحل" sizes="(min-width: 64rem) 16vw, 40vw" />
          </figure>
          <figure className="visit__photo visit__photo--c" data-reveal="lay" style={{ "--i": 2 } as React.CSSProperties}>
            <Photo name="showroom-rubber-01" alt="رولات ربل وعينات أرضيات على رفوف المحل" sizes="(min-width: 64rem) 16vw, 40vw" />
          </figure>
        </div>
      </div>
    </section>
  );
}
