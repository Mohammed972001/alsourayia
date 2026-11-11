import Link from "next/link";
import { home } from "@/content/home";
import { products } from "@/content/products";
import { Icon } from "../Icon";
import { ProductCard } from "../ProductCard";
import { SectionHead } from "../SectionHead";

export function Collections() {
  const head = home.collectionsHead;
  return (
    <section className="section collections" aria-labelledby="collections-title">
      <div className="container">
        <SectionHead id="collections-title" eyebrow={head.eyebrow} title={head.title} text={head.text} ghost="Collection" />
        <ul className="pgrid">
          {products.map((p, i) => (
            <li key={p.slug} data-reveal style={{ "--i": i % 4 } as React.CSSProperties}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
        <p className="collections__more" data-reveal>
          <Link href="/products" className="btn btn--dark">
            <span>كل الأرضيات في صفحة واحدة</span>
            <Icon name="arrow" size={18} />
          </Link>
        </p>
      </div>
    </section>
  );
}
