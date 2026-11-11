import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { home } from "@/content/home";
import { products } from "@/content/products";
import { breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

const title = "الأسئلة الشائعة عن الموكيت والباركيه والربل | موكيت ومفروشات السريع";
const description =
  "إجابات مختصرة من موكيت ومفروشات السريع عن موكيت المساجد والمكاتب والمنازل، والباركيه وSPC، والفينيل الطبي، والربل والفوم والعشب: الفرق والكمية والعناية وطلب السعر.";

export const metadata = pageMetadata({ title, description, path: "/faq" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "الأسئلة الشائعة", path: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      {/* No FAQPage here: the same answers are marked up once, on the home and product pages. */}
      <JsonLd data={graph(webPageNode("/faq", title, description), breadcrumbNode(trail))} />
      <PageHero
        trail={trail}
        eyebrow="أسئلة"
        title="الأسئلة الشائعة"
        lead="جمعنا هنا الأسئلة التي تتكرر عن كل صنف. لم تجد سؤالك؟ اكتب لنا على واتساب."
      />
      <section className="section faq-page" aria-labelledby="faq-general">
        <div className="container faq-page__inner">
          <nav className="faq-page__toc" aria-label="أقسام الأسئلة">
            <a href="#faq-general" className="chip">
              عامة
            </a>
            {products.map((p) => (
              <a key={p.slug} href={`#faq-${p.slug}`} className="chip">
                {p.name}
              </a>
            ))}
          </nav>
          <div className="faq-page__groups">
            <section aria-labelledby="faq-general-title" id="faq-general">
              <h2 id="faq-general-title" className="faq-page__title">
                أسئلة عامة
              </h2>
              <FaqList items={home.faq} />
            </section>
            {products.map((p) => (
              <section key={p.slug} id={`faq-${p.slug}`} aria-labelledby={`faq-${p.slug}-title`}>
                <h2 id={`faq-${p.slug}-title`} className="faq-page__title">
                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                </h2>
                <FaqList items={p.faq} openFirst={false} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
