import Link from "next/link";
import { notFound } from "next/navigation";
import { CompareTable } from "@/components/CompareTable";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { getGuide, guides } from "@/content/guides";
import { productBySlug } from "@/content/products";
import type { Product } from "@/content/types";
import { absoluteUrl, breadcrumbNode, faqNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const first = productBySlug.get(g.productIds[0]);
  return pageMetadata({ title: `${g.title} | موكيت ومفروشات السريع`, description: g.metaDescription, path: `/guides/${g.slug}`, image: first?.images[0] });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const related = g.productIds.map((id) => productBySlug.get(id)).filter((p): p is Product => Boolean(p));
  const trail = [
    { name: "الرئيسية", path: "/" },
    { name: "أدلة الشراء", path: "/guides" },
    { name: g.heading, path },
  ];
  const article = {
    "@type": "Article",
    headline: g.heading,
    description: g.answerSummary,
    inLanguage: "ar-SA",
    url: absoluteUrl(path),
    mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
    dateModified: g.updatedAt,
    author: { "@id": `${absoluteUrl("/")}#store` },
    publisher: { "@id": `${absoluteUrl("/")}#store` },
  };
  const photos: [string, string] = related.length > 1 ? [related[0].images[0], related[1].images[0]] : [related[0].images[0], related[0].images[1] ?? related[0].images[0]];
  return (
    <article>
      <JsonLd data={graph(webPageNode(path, g.title, g.metaDescription), article, breadcrumbNode(trail), faqNode(g.faqs.map((f) => ({ q: f.question, a: f.answer }))))} />
      <PageHero trail={trail} eyebrow="دليل شراء" title={g.heading} lead={g.answerSummary} images={photos} />

      <div className="container guide-body">
        <section className="pdp-block" aria-labelledby="g-compare">
          <h2 id="g-compare" className="pdp-block__title" data-reveal>
            {g.comparison.heading}
          </h2>
          <CompareTable columns={[...g.comparison.columns]} rows={g.comparison.rows.map((r) => ({ label: r.label, values: [...r.values] }))} />
        </section>

        {g.sections.map((s, i) => (
          <section key={s.heading} className="pdp-block" aria-labelledby={`g-s${i}`}>
            <h2 id={`g-s${i}`} className="pdp-block__title" data-reveal>
              {s.heading}
            </h2>
            {s.intro && (
              <p className="prose" data-reveal>
                {s.intro}
              </p>
            )}
            {s.paragraphs?.map((para) => (
              <p key={para} className="prose" data-reveal>
                {para}
              </p>
            ))}
            {s.bullets && (
              <ul className="care__list" data-reveal>
                {s.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="check" size={18} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="pdp-block" aria-labelledby="g-faq">
          <h2 id="g-faq" className="pdp-block__title" data-reveal>
            أسئلة شائعة
          </h2>
          <FaqList items={g.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
        </section>

        <p className="guide-body__hub" data-reveal>
          <Link href={g.hubHref} className="text-link">
            {g.hubLabel}
            <Icon name="arrow" size={16} />
          </Link>
        </p>
      </div>

      <section className="section section--sand related" aria-labelledby="g-related">
        <div className="container">
          <h2 id="g-related" className="related__title" data-reveal>
            الأرضيات في هذا الدليل
          </h2>
          <ul className="related__grid">
            {related.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <ProductCard product={p} sizes="(min-width: 64rem) 26vw, 88vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand product={related[0]?.name} images={photos} />
    </article>
  );
}
