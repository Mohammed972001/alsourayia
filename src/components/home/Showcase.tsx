import { home } from "@/content/home";
import { collections, productsIn } from "@/content/products";
import type { CollectionId } from "@/content/types";
import { ProductCard } from "../ProductCard";
import { SectionHead } from "../SectionHead";
import { ShowcaseControls } from "./ShowcaseControls";

// Showcase (round 3: the user's «ب شريط بيتسحب» merged with «د تبويبات المجموعات»). All eleven floors in one
// rail you drag, swipe or step with the arrows; the four group tabs jump the rail to their group and light up
// as the rail passes through it. The cards themselves are the shared ProductCard.
const GROUPS: CollectionId[] = ["carpet", "parquet", "rubber", "special"];

export function Showcase() {
  const head = home.showcaseHead;
  const items = GROUPS.flatMap((g) => productsIn(g));
  return (
    <section className="section hm-show" aria-labelledby="show-title">
      <div className="container hm-show__head">
        <SectionHead id="show-title" eyebrow={head.eyebrow} title={head.title} />
        <ShowcaseControls
          railId="hm-rail"
          barId="hm-rail-bar"
          groups={GROUPS.map((id) => ({ id, name: collections[id].name, count: productsIn(id).length }))}
          hint={head.hint}
        />
      </div>
      <div className="container hm-show__box">
        <ul id="hm-rail" className="hm-rail" tabIndex={0} aria-label="كل الأرضيات">
          {items.map((p, i) => (
            <li key={p.slug} className="hm-rail__item" data-col={p.collection} data-reveal style={{ "--i": i % 4 } as React.CSSProperties}>
              <ProductCard product={p} sizes="(min-width: 64rem) 23vw, (min-width: 40rem) 40vw, 76vw" />
            </li>
          ))}
        </ul>
        <div className="hm-rail__bar" aria-hidden="true">
          <span id="hm-rail-bar" />
        </div>
      </div>
    </section>
  );
}
