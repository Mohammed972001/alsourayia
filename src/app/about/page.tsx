import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { mediaUrl, Photo } from "@/components/Photo";
import { getProduct, products } from "@/content/products";
import { legalLine, site } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import { breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";
import { CinemaCycle } from "./Cinema";

const title = "من نحن | موكيت ومفروشات السريع في حراج بن قاسم بالرياض";
const description =
  "موكيت ومفروشات السريع محل أرضيات في حراج بن قاسم بالرياض، تابع لمؤسسة فنون العاديات لديكورات والارضيات العالميه: ماذا نبيع، وكيف تطلب، وما نقدمه مع كل طلب.";

export const metadata = pageMetadata({ title, description, path: "/about", image: "showroom" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "من نحن", path: "/about" },
];

const values = [
  { icon: "measure", title: "معاينة وقياس مجانًا", text: "نأخذ المقاسات ونشوف حالة الأرضية في مكانك بالرياض قبل أي سعر نهائي." },
  { icon: "sample", title: "عينة قبل الطلب", text: "تلمس العينة وتشوف لونها على أرضك قبل ما تقرر، مجانًا." },
  { icon: "tools", title: "توريد وتركيب", text: "نورّد ونركّب في الرياض، ونورّد لكل مدن المملكة." },
] as const;

// The cinema (round 3, picker hero «هـ سينما الشغل»): the owner's own install photos, people-free.
const reel = [
  { photo: "mosque-12", product: "mosque-carpets" },
  { photo: "office-08", product: "office-carpet" },
  { photo: "gym-06", product: "rabal-gem" },
  { photo: "mosque-13", product: "mosque-carpets" },
  { photo: "bath-01", product: "non-slip-rubber" },
].map(({ photo, product }) => {
  const p = getProduct(product);
  return { photo, name: p.name, price: p.priceFrom !== null ? `من ${p.priceFrom} ريال/م²` : "السعر بعد القياس" };
});

const STRIPS = [0, 1, 2, 3, 4, 5];
const total = String(reel.length).padStart(2, "0").replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/about", title, description, "AboutPage"), breadcrumbNode(trail))} />

      {/* Dark and full-bleed: the transparent header sits over it (Header.tsx HEADER_OVER). */}
      <section className="cin" id="about-cinema" aria-labelledby="page-title">
        <div className="cin__slides" aria-hidden="true">
          {reel.map((r, i) => (
            <div
              key={r.photo}
              className={`cin__slide${i === 0 ? " is-on is-first" : ""}`}
              data-name={r.name}
              data-price={r.price}
              data-src={mediaUrl(r.photo, 1200)}
              data-src-sm={mediaUrl(r.photo, 828)}
              style={{ "--img": `url(${mediaUrl(r.photo, 1200)})`, "--img-sm": `url(${mediaUrl(r.photo, 828)})` } as React.CSSProperties}
            >
              {i === 0 && <Photo name={r.photo} alt="" sizes="100vw" className="cin__base" priority />}
              {STRIPS.map((k) => (
                <span key={k} className="cin__strip" style={{ "--i": k } as React.CSSProperties}>
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="cin__shade" />
        <div className="container cin__inner">
          <div className="cin__copy">
            <Breadcrumbs trail={trail} />
            <p className="eyebrow">من شغلنا في الرياض</p>
            <h1 id="page-title" className="cin__title">
              موكيت ومفروشات السريع
            </h1>
            <p className="cin__lead">محل أرضيات في {site.area} بالرياض: موكيت وباركيه وربل وفينيل، للمساجد والمكاتب والنوادي والعيادات والبيوت.</p>
            <div className="cin__actions">
              <a className="btn btn--wa btn--lg" href={whatsappHref()} data-wa>
                <Icon name="whatsapp" size={20} />
                <span>اطلب معاينة مجانية</span>
              </a>
              <Link className="btn btn--outline-inverse btn--lg" href="/products">
                <span>شوف الأرضيات</span>
              </Link>
            </div>
          </div>
          <div className="cin__now" aria-hidden="true">
            <span className="cin__count">
              <b>٠١</b> / {total}
            </span>
            <span className="cin__name">
              <b>{reel[0].name}</b>
              <small>{reel[0].price}</small>
            </span>
            <span className="cin__bar">
              <i />
            </span>
          </div>
        </div>
        <CinemaCycle target="about-cinema" />
      </section>

      <section className="section about-story" aria-labelledby="story-title">
        <div className="container about-story__inner">
          <figure className="about-story__photo" data-reveal="lay">
            <Photo name="showroom-rubber-01" alt="رولات ربل وعينات أرضيات داخل المحل" sizes="(min-width: 64rem) 46vw, 92vw" />
            <figcaption>من داخل المحل في حراج بن قاسم.</figcaption>
          </figure>
          <div className="about-story__copy">
            <p className="eyebrow" data-reveal>
              المحل
            </p>
            <h2 id="story-title" className="blk-title" data-reveal>
              محل في قلب الحراج
            </h2>
            <p className="prose" data-reveal>
              محلنا في حراج بن قاسم القديم، سوق العرب الدولي، بحي المنفوحة في الرياض. نبيع الموكيت والباركيه والربل والفينيل وأرضيات خاصة مثل الفوم والعشب الصناعي، ونرتّب المعاينة والقياس والتركيب. هذا الموقع امتداد للمحل: صفحة لكل صنف فيها أنواعه وسعره المبدئي وطريقة اختياره، حتى تكتب لنا وأنت عارف ما تبغى.
            </p>
            <p className="prose" data-reveal>
              {legalLine()}.
            </p>
            <dl className="facts about-story__facts" data-reveal>
              <div>
                <dt>الاسم التجاري</dt>
                <dd>{site.name}</dd>
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
              <div>
                <dt>الرقم الضريبي</dt>
                <dd>
                  <bdi>{site.vatNumber}</bdi>
                </dd>
              </div>
              <div>
                <dt>المواعيد</dt>
                <dd>{site.hoursText}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title" className="blk-title" data-reveal>
            كيف نعمل
          </h2>
          <ul className="about-values">
            {values.map((v, i) => (
              <li key={v.title} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span className="about-values__num" aria-hidden="true">
                  {"١٢٣"[i]}
                </span>
                <span className="about-values__icon">
                  <Icon name={v.icon} size={26} />
                </span>
                <h3 className="about-values__title">{v.title}</h3>
                <p className="about-values__text">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="lines-title">
        <div className="container">
          <h2 id="lines-title" className="blk-title" data-reveal>
            ماذا نبيع
          </h2>
          <ul className="about-lines">
            {products.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
                <Link href={`/products/${p.slug}`}>
                  <span>{p.name}</span>
                  <small>{p.tagline}</small>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
