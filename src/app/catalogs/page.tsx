import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { catalogGroups } from "@/content/catalogs";
import { whatsappHref } from "@/lib/contact";
import { breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

const title = "كتالوجات الأرضيات والموكيت | موكيت ومفروشات السريع";
const description = "كتالوجات موكيت المربعات والفينيل الطبي وأرضيات SPC واللامينيت من موكيت ومفروشات السريع، للعرض والتحميل. اختر التصميم وأرسل لنا اسمه لنرسل عرض السعر.";

export const metadata = pageMetadata({ title, description, path: "/catalogs", image: "office-swatch-01" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "الكتالوجات", path: "/catalogs" },
];

/** The suppliers' catalogues the owner asked to publish (2026-11-03), unchanged apart from smaller covers. */
export default function CatalogsPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/catalogs", title, description, "CollectionPage"), breadcrumbNode(trail))} />
      <PageHero trail={trail} eyebrow="الكتالوجات" title="كتالوجات الأرضيات والموكيت" lead="افتح الكتالوج أو حمّله، ثم أرسل لنا اسم التصميم ومساحة المكان لنرسل عرض السعر." />
      {catalogGroups.map((group, gi) => (
        <section key={group.title} className={`section catalogs${gi % 2 ? " section--sand" : ""}`} aria-labelledby={`cat-${gi}`}>
          <div className="container">
            <h2 id={`cat-${gi}`} className="blk-title" data-reveal>
              {group.title}
            </h2>
            <ul className="catalogs__grid">
              {group.items.map((c, i) => {
                const file = `/catalogs/${c.slug}-v1.pdf`;
                return (
                  <li key={c.slug} className="catalog" data-reveal style={{ "--i": i % 4 } as React.CSSProperties}>
                    <span className="catalog__cover">
                      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized catalogue cover */}
                      <img src={`/catalogs/covers/${c.slug}.webp`} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="catalog__body">
                      <span className="catalog__title">{c.title}</span>
                      <span className="catalog__text">{c.description}</span>
                      <span className="catalog__actions">
                        <a className="btn btn--dark btn--sm" href={file} target="_blank" rel="noopener">
                          عرض<span className="visually-hidden"> {c.title}</span>
                        </a>
                        <a className="btn btn--ghost btn--sm" href={file} download>
                          تحميل<span className="visually-hidden"> {c.title}</span>
                        </a>
                        <a className="catalog__ask" href={whatsappHref(`كتالوج ${c.title}`)} data-wa aria-label={`اسأل عن كتالوج ${c.title} على واتساب`}>
                          <Icon name="whatsapp" size={18} />
                        </a>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
