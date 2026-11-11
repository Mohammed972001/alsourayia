import { home } from "@/content/home";
import { collections, products } from "@/content/products";
import type { CollectionId } from "@/content/types";
import { ProductCard } from "../ProductCard";
import { SectionHead } from "../SectionHead";
import { FloorFilter } from "./FloorFilter";

const ORDER: CollectionId[] = ["carpet", "parquet", "rubber", "special"];

/** All eleven floors, filterable by group. Every card is in the HTML; the filter only hides. */
export function Floors() {
  const head = home.collectionsHead;
  return (
    <section className="section floors" aria-labelledby="floors-title">
      <div className="container">
        <SectionHead id="floors-title" eyebrow={head.eyebrow} title={head.title} text={head.text} />
        <FloorFilter groups={ORDER.map((id) => ({ id, name: collections[id].name }))}>
          <ul className="fgrid">
            {products.map((p, i) => (
              <li key={p.slug} data-col={p.collection} data-reveal="tile" style={{ "--i": i % 4 } as React.CSSProperties}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </FloorFilter>
      </div>
    </section>
  );
}
