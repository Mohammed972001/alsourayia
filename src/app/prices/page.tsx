import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { getProduct, products } from "@/content/products";
import { breadcrumbNode, faqNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

const title = "اسعار الموكيت والباركيه في الرياض - سعر المتر لكل صنف | موكيت ومفروشات السريع";
const description =
  "سعر المتر في موكيت ومفروشات السريع بحراج بن قاسم: موكيت منازل من 15 ريال، موكيت مساجد من 40، باركيه خشب من 65، باركيه SPC من 75، مشمع باركيه من 19، عشب صناعي من 10، وربل جيم من 65.";

export const metadata = pageMetadata({ title, description, path: "/prices" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "الأسعار", path: "/prices" },
];

// Every figure is read from the product itself (src/content/products.ts), so this page cannot drift from the product pages.
const from = (slug: string) => getProduct(slug).priceFrom;

const faq = [
  {
    q: "كم سعر متر الموكيت في الرياض؟",
    a: `موكيت المنازل للغرف والمجالس يبدأ من ${from("mokite")} ريالًا للمتر المربع، وموكيت المساجد من ${from("mosque-carpets")}، وموكيت المكاتب (بلاط 50 × 50) من ${from("office-carpet")}. السعر النهائي حسب الموديل والكمية، ويتأكد بعد القياس.`,
  },
  {
    q: "كم سعر متر الباركيه؟",
    a: `الباركيه الخشب (HDF) يبدأ من ${from("parket")} ريالًا للمتر المربع، والباركيه SPC ضد الماء من ${from("water-resistant-carpet")}، ومشمع الباركيه (فينيل رول) من ${from("vinyl-roll")}.`,
  },
  {
    q: "كم سعر متر العشب الصناعي؟",
    a: `العشب الصناعي يبدأ من ${from("artificial-grass")} ريالات للمتر المربع، ويختلف السعر حسب ارتفاع الوبر والكثافة.`,
  },
  {
    q: "كم سعر متر الربل؟",
    a: `ربل الجيم يبدأ من ${from("rabal-gem")} ريالًا للمتر المربع، وربل الحمامات ضد الانزلاق من ${from("non-slip-rubber")}.`,
  },
  { q: "كم تكلفة التوصيل؟", a: "تكلفة التوصيل حسب مكانك، ونكتبها لك في عرض السعر قبل أن تعتمد الطلب." },
  {
    q: "هل يمكن إرجاع الطلب؟",
    a: "لا يوجد إرجاع بعد اعتماد الطلب. لذلك المعاينة والقياس مجانًا في الرياض والعينة مجانية، لتتأكد من اللون والخامة قبل أن تطلب.",
  },
];

export default function PricesPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/prices", title, description), breadcrumbNode(trail), faqNode(faq))} />
      <PageHero
        trail={trail}
        eyebrow="الأسعار"
        title="أسعار الموكيت والباركيه والأرضيات في الرياض"
        lead="سعر المتر المربع الذي يبدأ منه كل صنف في محلنا بحراج بن قاسم. السعر النهائي حسب الموديل والكمية، ونؤكده لك بعد القياس."
      />
      <section className="section" aria-labelledby="prices-table-title">
        <div className="container">
          <h2 id="prices-table-title" className="faq-page__title">
            سعر المتر لكل صنف
          </h2>
          <div className="ctable" data-reveal>
            <table>
              <caption>الأسعار بالريال السعودي للمتر المربع، وهي بداية السعر لكل صنف.</caption>
              <thead>
                <tr>
                  <th scope="col">الصنف</th>
                  <th scope="col">يبدأ من</th>
                  <th scope="col">يناسب</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row">
                      <Link href={`/products/${p.slug}`}>{p.name}</Link>
                    </th>
                    <td>{p.priceFrom === null ? "حسب المقاس والكمية" : `${p.priceFrom} ريال للمتر`}</td>
                    <td>{p.tagline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section section--sand faq-section" aria-labelledby="prices-faq-title">
        <div className="container faq-page__inner">
          <div className="faq-page__groups">
            <section>
              <h2 id="prices-faq-title" className="faq-page__title">
                أسئلة عن الأسعار
              </h2>
              <FaqList items={faq} />
            </section>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
