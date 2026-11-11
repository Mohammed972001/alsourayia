import Link from "next/link";
import { notFound } from "next/navigation";
import { CompareTable } from "@/components/CompareTable";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { guidesForHub } from "@/content/guides";
import { collections, hubs, productsIn } from "@/content/products";
import { whatsappHref } from "@/lib/contact";
import { absoluteUrl, breadcrumbNode, faqNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

// The two category hubs that keep their live URLs (/products/category/parquet, /products/category/rubber-flooring).
// Google and TikTok ads land on both. Every other old category URL redirects in src/worker.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return hubs.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/category/[slug]">) {
  const { slug } = await params;
  const hub = hubs.find((h) => h.slug === slug);
  if (!hub) return {};
  const items = productsIn(hub.collection);
  return pageMetadata({ title: `${hub.seoTitle} | موكيت ومفروشات السريع`, description: hub.seoDescription, path: `/products/category/${hub.slug}`, image: items[0].images[0] });
}

export default async function HubPage({ params }: PageProps<"/products/category/[slug]">) {
  const { slug } = await params;
  const hub = hubs.find((h) => h.slug === slug);
  if (!hub) notFound();
  const path = `/products/category/${hub.slug}`;
  const items = productsIn(hub.collection);
  const guides = guidesForHub(path);
  const trail = [
    { name: "الرئيسية", path: "/" },
    { name: "الأرضيات", path: "/products" },
    { name: collections[hub.collection].name, path },
  ];
  const itemList = {
    "@type": "ItemList",
    name: hub.h1,
    itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absoluteUrl(`/products/${p.slug}`) })),
  };
  const photos: [string, string] = [items[0].images[0], (items[1] ?? items[0]).images[0]];
  return (
    <>
      <JsonLd data={graph(webPageNode(path, hub.seoTitle, hub.seoDescription, "CollectionPage"), breadcrumbNode(trail), itemList, faqNode(hub.faq))} />
      <PageHero trail={trail} eyebrow="مقارنة وأنواع" title={hub.h1} lead={hub.summary} images={photos} compact>
        <a className="btn btn--primary" href={whatsappHref(collections[hub.collection].name)} data-wa>
          <Icon name="whatsapp" size={20} />
          <span>اطلب معاينة مجانية</span>
        </a>
        <a className="btn btn--ghost" href={whatsappHref(collections[hub.collection].name, true)} data-wa>
          <Icon name="sample" size={20} />
          <span>اطلب عينة مجانية</span>
        </a>
      </PageHero>

      <section className="section hub-group" aria-labelledby="hub-items-title">
        <div className="container">
          <h2 id="hub-items-title" className="blk-title" data-reveal>
            الأنواع في المحل
          </h2>
          <p className="blk-intro" data-reveal>
            {hub.lead}
          </p>
          <ul className="hub-grid">
            {items.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <ProductCard product={p} sizes="(min-width: 64rem) 28vw, 88vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="hub-compare-title">
        <div className="container">
          <h2 id="hub-compare-title" className="blk-title" data-reveal>
            المقارنة في جدول
          </h2>
          <CompareTable {...hub.compare} />
        </div>
      </section>

      {guides.length > 0 && (
        <section className="section" aria-labelledby="hub-guides-title">
          <div className="container">
            <h2 id="hub-guides-title" className="blk-title" data-reveal>
              أدلة تساعدك تختار
            </h2>
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
      )}

      <section className="section section--sand qa-section" aria-labelledby="hub-faq-title">
        <div className="container qa-section__inner">
          <h2 id="hub-faq-title" className="blk-title" data-reveal>
            أسئلة عن {hub.h1}
          </h2>
          <FaqList items={hub.faq} />
        </div>
      </section>

      <CtaBand product={hub.h1} images={photos} />
    </>
  );
}
