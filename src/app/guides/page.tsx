import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { guides } from "@/content/guides";
import { absoluteUrl, breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

const title = "أدلة شراء الأرضيات | موكيت ومفروشات السريع";
const description = "أدلة قصيرة من موكيت ومفروشات السريع تساعدك تختار الأرضية: الفرق بين الأنواع، وما تقيسه قبل طلب السعر، وما تراجعه يوم التركيب.";

export const metadata = pageMetadata({ title, description, path: "/guides", image: "vinyl-03" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "أدلة الشراء", path: "/guides" },
];

export default function GuidesPage() {
  const list = {
    "@type": "ItemList",
    name: "أدلة شراء الأرضيات",
    itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.heading, url: absoluteUrl(`/guides/${g.slug}`) })),
  };
  return (
    <>
      <JsonLd data={graph(webPageNode("/guides", title, description, "CollectionPage"), breadcrumbNode(trail), list)} />
      <PageHero trail={trail} eyebrow="أدلة الشراء" title="قبل ما تختار أرضيتك" lead="أجوبة مختصرة على أسئلة تتكرر في المحل، مع جدول مقارنة في كل دليل." />
      <section className="section" aria-label="الأدلة">
        <div className="container">
          <ul className="guide-list">
            {guides.map((g) => (
              <li key={g.slug} data-reveal>
                <Link href={`/guides/${g.slug}`} className="guide-link">
                  <span className="guide-link__title">{g.heading}</span>
                  <span className="guide-link__text">{g.answerSummary}</span>
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
