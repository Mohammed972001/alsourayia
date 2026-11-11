import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { FloorFinder } from "@/components/home/FloorFinder";
import { Floors } from "@/components/home/Floors";
import { Hero } from "@/components/home/Hero";
import { HowTo } from "@/components/home/HowTo";
import { Projects } from "@/components/home/Projects";
import { Showroom } from "@/components/home/Showroom";
import { WorksReel } from "@/components/home/WorksReel";
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
      <Floors />
      <Projects />
      <WorksReel />
      <FloorFinder />
      <HowTo />
      <Showroom />
      <section className="section section--sand faq-section" aria-labelledby="faq-title">
        <div className="container faq-section__inner">
          <SectionHead id="faq-title" eyebrow={home.faqHead.eyebrow} title={home.faqHead.title} />
          <FaqList items={home.faq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
