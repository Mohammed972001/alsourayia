import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { collections, products, productsIn } from "@/content/products";
import type { CollectionId } from "@/content/types";
import { absoluteUrl, breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

const title = "أرضيات موكيت ومفروشات السريع | موكيت وباركيه وربل وفينيل في الرياض";
const description =
  "كل أرضيات موكيت ومفروشات السريع في حراج بن قاسم بالرياض: موكيت مساجد ومكاتب ومنازل، باركيه خشب وSPC ومشمع باركيه، فينيل طبي، ربل جيم وحمامات، فوم وعشب صناعي، مع السعر المبدئي لكل صنف.";

export const metadata = pageMetadata({ title, description, path: "/products", image: "showroom" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "الأرضيات", path: "/products" },
];

const ORDER: CollectionId[] = ["carpet", "parquet", "rubber", "special"];

export default function ProductsPage() {
  const itemList = {
    "@type": "ItemList",
    name: "أرضيات موكيت ومفروشات السريع",
    itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absoluteUrl(`/products/${p.slug}`) })),
  };
  return (
    <>
      <JsonLd data={graph(webPageNode("/products", title, description, "CollectionPage"), breadcrumbNode(trail), itemList)} />
      <PageHero
        trail={trail}
        eyebrow="الأرضيات"
        title="كل الأرضيات في محل واحد"
        lead="موكيت وباركيه وربل وفينيل، في أربع مجموعات. ادخل صفحة أي صنف لتعرف أنواعه وسعره المبدئي وطريقة اختياره، واطلب معاينة وقياسًا مجانًا."
        images={["showroom", "gym-01"]}
      />

      <nav className="hub-jump container" aria-label="المجموعات">
        {ORDER.map((id) => (
          <a key={id} href={`#${id}`} className="chip">
            {collections[id].name}
          </a>
        ))}
      </nav>

      {ORDER.map((id, gi) => {
        const group = collections[id];
        return (
          <section key={id} id={id} className={`section hub-group${gi % 2 ? " section--sand" : ""}`} aria-labelledby={`${id}-title`}>
            <div className="container">
              <div className="hub-group__head" data-reveal>
                <span className="hub-group__num" aria-hidden="true">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 id={`${id}-title`} className="hub-group__title">
                    {group.name}
                  </h2>
                  <p className="hub-group__note">{group.note}</p>
                </div>
                {group.hub && (
                  <Link href={group.hub} className="text-link hub-group__more">
                    مقارنة {group.name}
                    <Icon name="arrow" size={16} />
                  </Link>
                )}
              </div>
              <ul className="pgrid">
                {productsIn(id).map((p, i) => (
                  <li key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
