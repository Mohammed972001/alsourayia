import Link from "next/link";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Icon, Swoosh } from "../Icon";
import { Photo } from "../Photo";
import { SectionHead } from "../SectionHead";

/** The real shop in Haraj bin Qasim: the owner's showroom photos, the legal name, the address and hours. */
export function Showroom() {
  const s = home.showroom;
  return (
    <section className="section section--inverse showroom" aria-labelledby="showroom-title">
      <Swoosh className="showroom__steps" />
      <div className="container showroom__inner">
        <div className="showroom__media">
          <figure className="showroom__photo" data-reveal="wipe">
            <Photo name="showroom" alt="ممر داخل المحل بين معروضات الموكيت والسجاد وعلى الأرض ثلاث عينات" sizes="(min-width: 64rem) 52vw, 100vw" />
          </figure>
          <figure className="showroom__inset" data-parallax="-0.06" data-reveal="rise">
            <Photo name="showroom-rubber-02" alt="رولات ربل جيم واقفة داخل المحل" sizes="(min-width: 64rem) 16vw, 40vw" />
          </figure>
          <p className="showroom__caption">من داخل المحل</p>
        </div>

        <div className="showroom__copy">
          <SectionHead id="showroom-title" eyebrow={s.eyebrow} title={s.title} ghost="Showroom" inverse />
          <p className="showroom__text" data-reveal>
            {s.text}
          </p>
          <dl className="facts facts--inverse" data-reveal>
            <div>
              <dt>العنوان</dt>
              <dd>
                {site.area}، {site.district}
              </dd>
            </div>
            <div>
              <dt>المواعيد</dt>
              <dd>{site.hoursText}</dd>
            </div>
            <div>
              <dt>المنشأة</dt>
              <dd>{site.legalName}</dd>
            </div>
            <div>
              <dt>الرقم الوطني الموحد</dt>
              <dd>
                <bdi>{site.unifiedNumber}</bdi>
              </dd>
            </div>
          </dl>
          <div className="showroom__actions" data-reveal>
            <a className="btn btn--inverse" href={site.mapUrl} target="_blank" rel="noopener">
              <Icon name="pin" size={20} />
              <span>{s.mapCta}</span>
            </a>
            <Link className="btn btn--outline-inverse" href="/contact">
              <span>صفحة الزيارة</span>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
