import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { ChatSteps } from "@/components/home/ChatSteps";
import { Collage } from "@/components/home/Collage";
import { HeroFloat } from "@/components/home/HeroFloat";
import { ProjectsSlider } from "@/components/home/ProjectsSlider";
import { Showcase } from "@/components/home/Showcase";
import { Slab } from "@/components/home/Slab";
import { Tapes } from "@/components/home/Tapes";
import { JsonLd } from "@/components/JsonLd";
import { SectionHead } from "@/components/SectionHead";
import { home } from "@/content/home";
import { faqNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

export const metadata = pageMetadata({ title: home.seoTitle, description: home.seoDescription, path: "/" });

// Home, round 3 (the user's picks, 2026-11-12): floating-samples hero under the transparent header, crossing
// tapes, the floors rail with group tabs, the 3D floor of starting prices, the installs slider, the WhatsApp
// chat steps, the shop collage (Tabby/Tamara is the badge in the hero), FAQ, contact band.
export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/", home.seoTitle, home.seoDescription), faqNode(home.faq))} />
      <HeroFloat />
      <Tapes />
      <Showcase />
      <Slab />
      <ProjectsSlider />
      <ChatSteps />
      <Collage />
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
