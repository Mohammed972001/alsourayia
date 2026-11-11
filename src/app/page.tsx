import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { Collections } from "@/components/home/Collections";
import { Compare } from "@/components/home/Compare";
import { Hero } from "@/components/home/Hero";
import { HowTo } from "@/components/home/HowTo";
import { Rooms } from "@/components/home/Rooms";
import { Sectors } from "@/components/home/Sectors";
import { Showroom } from "@/components/home/Showroom";
import { JsonLd } from "@/components/JsonLd";
import { SectionHead } from "@/components/SectionHead";
import { home } from "@/content/home";
import { faqNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

export const metadata = pageMetadata({ title: home.seoTitle, description: home.seoDescription, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/", home.seoTitle, home.seoDescription), faqNode(home.faq))} />
      <Hero />
      <Collections />
      <Sectors />
      <Showroom />
      <Rooms />
      <Compare />
      <HowTo />
      <section className="section section--sand faq-section" aria-labelledby="faq-title">
        <div className="container faq-section__inner">
          <SectionHead id="faq-title" eyebrow={home.faqHead.eyebrow} title={home.faqHead.title} ghost="FAQ" />
          <FaqList items={home.faq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
