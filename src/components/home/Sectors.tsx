import { home } from "@/content/home";
import { getProduct } from "@/content/products";
import { SectionHead } from "../SectionHead";
import { SectorTabs, type SectorTab } from "./SectorTabs";

/** «حسب المشروع»: mosques, offices, gyms, clinics and homes side by side. All panels are in the HTML. */
export function Sectors() {
  const head = home.sectorsHead;
  const tabs: SectorTab[] = home.sectors.map((s) => ({
    key: s.key,
    label: s.label,
    title: s.title,
    text: s.text,
    points: [...s.points],
    products: s.products.map((slug) => {
      const p = getProduct(slug);
      return { href: `/products/${p.slug}`, name: p.name };
    }),
    main: s.images[0],
    second: s.images[1],
  }));
  return (
    <section className="section section--sand origins" aria-labelledby="sectors-title">
      <div className="container">
        <SectionHead id="sectors-title" eyebrow={head.eyebrow} title={head.title} text={head.text} ghost="Projects" align="center" />
        <SectorTabs tabs={tabs} />
      </div>
    </section>
  );
}
