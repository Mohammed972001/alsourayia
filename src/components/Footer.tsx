import Link from "next/link";
import { collections, productsIn } from "@/content/products";
import type { CollectionId } from "@/content/types";
import { legalLine, site } from "@/content/site";
import { displayPhone, telHref, whatsappHref } from "@/lib/contact";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Photo } from "./Photo";

const ORDER: CollectionId[] = ["carpet", "parquet", "rubber", "special"];

/**
 * Footer (round 3, user pick «ب الفاتح بصورة المحل», 2026-11-12): a light panel with the big lockup, a wide
 * strip of the showroom photo with the address, the four floor groups and the site pages as columns, a
 * contact row, the legal line and the agency credit.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <Logo />
          <p className="site-footer__line">تعال شوف العينات على الطبيعة في {site.area}.</p>
        </div>

        <figure className="site-footer__strip">
          <Photo name="showroom" alt="ممر داخل المحل بين معروضات الموكيت والسجاد" sizes="(min-width: 78rem) 78rem, 100vw" />
          <figcaption>
            <a href={site.mapUrl} target="_blank" rel="noopener">
              <Icon name="pin" size={18} />
              <span>
                {site.street}، {site.district}
              </span>
            </a>
          </figcaption>
        </figure>

        <nav className="site-footer__cols" aria-label="روابط الموقع">
          {ORDER.map((id) => (
            <div key={id}>
              <p className="site-footer__title">
                {collections[id].hub ? <Link href={collections[id].hub!}>{collections[id].name}</Link> : collections[id].name}
              </p>
              <ul>
                {productsIn(id).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="site-footer__title">المحل</p>
            <ul>
              <li><Link href="/products">كل الأرضيات</Link></li>
              <li><Link href="/about">عن المحل</Link></li>
              <li><Link href="/catalogs">الكتالوجات</Link></li>
              <li><Link href="/guides">أدلة الشراء</Link></li>
              <li><Link href="/faq">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact">تواصل وزيارة</Link></li>
              {site.social.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener">
                    حسابنا على {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="site-footer__contact">
          <span>
            <Icon name="clock" size={18} />
            {site.hoursText}
          </span>
          <a href={telHref()} dir="ltr">
            <Icon name="phone" size={18} />
            {displayPhone(site.phone)}
          </a>
          <a href={telHref(true)} dir="ltr">
            <Icon name="phone" size={18} />
            {displayPhone(site.phone2)}
          </a>
          <a className="btn btn--wa btn--sm" href={whatsappHref()} data-wa>
            <Icon name="whatsapp" size={18} />
            <span>راسلنا على واتساب</span>
          </a>
        </div>

        <div className="site-footer__bottom">
          <p>
            © <bdi>{year}</bdi> {legalLine()}
          </p>
          <p className="site-footer__links">
            <Link href="/privacy">سياسة الخصوصية</Link>
            {/* Agency credit. data-credit keeps the lead tracker off it. */}
            <a href="https://www.digitalizing-tech.com" target="_blank" rel="nofollow noopener" dir="ltr" data-credit>
              Powered by Digitalizing Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
