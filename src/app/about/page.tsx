import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { products } from "@/content/products";
import { legalLine, site } from "@/content/site";
import { breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

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

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/about", title, description, "AboutPage"), breadcrumbNode(trail))} />
      <PageHero
        trail={trail}
        eyebrow="من نحن"
        title="موكيت ومفروشات السريع"
        lead={`محل أرضيات في ${site.area} بالرياض: موكيت وباركيه وربل وفينيل، للمساجد والمكاتب والنوادي والعيادات والبيوت.`}
        images={["showroom", "mosque-swatch-05"]}
      />

      <section className="section about-story" aria-labelledby="story-title">
        <div className="container about-story__inner">
          <figure className="about-story__photo" data-reveal="lay">
            <Photo name="showroom-rubber-01" alt="رولات ربل وعينات أرضيات داخل المحل" sizes="(min-width: 64rem) 46vw, 92vw" />
            <figcaption>من داخل المحل في حراج بن قاسم.</figcaption>
          </figure>
          <div>
            <h2 id="story-title" className="pdp-block__title" data-reveal>
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
          <h2 id="values-title" className="pdp-block__title" data-reveal>
            كيف نعمل
          </h2>
          <ul className="values">
            {values.map((v, i) => (
              <li key={v.title} className="feature" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span className="feature__icon">
                  <Icon name={v.icon} size={26} />
                </span>
                <h3 className="feature__title">{v.title}</h3>
                <p className="feature__text">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="lines-title">
        <div className="container">
          <h2 id="lines-title" className="pdp-block__title" data-reveal>
            ماذا نبيع
          </h2>
          <ul className="about-lines">
            {products.map((p) => (
              <li key={p.slug} data-reveal>
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
