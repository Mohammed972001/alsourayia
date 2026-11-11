import Link from "next/link";
import { collections, productsIn } from "@/content/products";
import type { CollectionId } from "@/content/types";
import { legalLine, site } from "@/content/site";
import { displayPhone, telHref, whatsappHref } from "@/lib/contact";
import { Icon, type IconKey } from "./Icon";
import { Logo } from "./Logo";

const ORDER: CollectionId[] = ["carpet", "parquet", "rubber", "special"];
const PROMISE_ICONS: IconKey[] = ["measure", "sample", "tools", "truck"];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <ul className="site-footer__promises">
          {site.services.map((sv, i) => (
            <li key={sv}>
              <Icon name={PROMISE_ICONS[i]} size={22} />
              <span>{sv}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo inverse />
          <p>{site.about}</p>
          <a className="btn btn--inverse btn--sm" href={whatsappHref()} data-wa>
            <Icon name="whatsapp" size={18} />
            <span>راسلنا على واتساب</span>
          </a>
        </div>

        <nav className="site-footer__col site-footer__col--products" aria-label="المنتجات">
          <p className="site-footer__title">المنتجات</p>
          <div className="site-footer__groups">
            {ORDER.map((id) => (
              <ul key={id} aria-label={collections[id].name}>
                {productsIn(id).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </nav>

        <nav className="site-footer__col" aria-label="روابط">
          <p className="site-footer__title">الموقع</p>
          <ul>
            <li><Link href="/products">كل المنتجات</Link></li>
            <li><Link href="/products/category/parquet">الباركيه</Link></li>
            <li><Link href="/products/category/rubber-flooring">الربل والمطاط</Link></li>
            <li><Link href="/guides">أدلة الشراء</Link></li>
            <li><Link href="/catalogs">الكتالوجات</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/faq">الأسئلة الشائعة</Link></li>
            <li><Link href="/contact">تواصل وزيارة</Link></li>
          </ul>
        </nav>

        <div className="site-footer__col">
          <p className="site-footer__title">المحل</p>
          <ul className="site-footer__facts">
            <li>
              <Icon name="pin" size={18} />
              <a href={site.mapUrl} target="_blank" rel="noopener">
                {site.street}، {site.district}، {site.city}
              </a>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>{site.hoursText}</span>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={telHref()} dir="ltr">
                {displayPhone(site.phone)}
              </a>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={telHref(true)} dir="ltr">
                {displayPhone(site.phone2)}
              </a>
            </li>
            {site.social.map((s) => (
              <li key={s.url}>
                <Icon name="play" size={18} />
                <a href={s.url} target="_blank" rel="noopener">
                  حسابنا على {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="container site-footer__bottom">
        <p>
          © <bdi>{year}</bdi> {legalLine()}
        </p>
        <p className="site-footer__links">
          <Link href="/privacy">سياسة الخصوصية</Link>
          {/* Agency credit. data-credit keeps the lead tracker off it. */}
          <a href="https://wa.me/201003736539" target="_blank" rel="nofollow noopener" dir="ltr" data-credit>
            Powered by Digitalizing Tech
          </a>
        </p>
      </div>
    </footer>
  );
}
