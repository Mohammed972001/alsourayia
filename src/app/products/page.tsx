import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TwoPhotoCard } from "@/components/cards/TwoPhotoCard";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Live } from "@/components/product/Live";
import { collections, products, productsIn } from "@/content/products";
import { whatsappHref } from "@/lib/contact";
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

// The ring of samples (round 3, picker hero «و حلقة العينات»): the shop's swatches and catalogue pictures with
// AI-drawn textures (public/textures), each with its floor's name. Decorative: the list below holds the links.
const RING: { label: string; photo?: string; tex?: string }[] = [
  { label: "موكيت مساجد", tex: "/textures/tex-mosque.webp" },
  { label: "باركيه خشب", photo: "parquet-cat-02" },
  { label: "موكيت مكاتب", photo: "office-swatch-02" },
  { label: "ربل جيم", tex: "/textures/tex-rubber.webp" },
  { label: "موكيت مساجد", photo: "mosque-swatch-04" },
  { label: "مشمع باركيه", tex: "/textures/tex-vinyl.webp" },
  { label: "باركيه SPC", photo: "spc-cat-03" },
  { label: "عشب صناعي", photo: "art-grass" },
  { label: "باركيه خشب", tex: "/textures/tex-parquet.webp" },
  { label: "ربل حمامات", photo: "bath-01" },
];

export default function ProductsPage() {
  const itemList = {
    "@type": "ItemList",
    name: "أرضيات موكيت ومفروشات السريع",
    itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absoluteUrl(`/products/${p.slug}`) })),
  };
  return (
    <>
      <JsonLd data={graph(webPageNode("/products", title, description, "CollectionPage"), breadcrumbNode(trail), itemList)} />
      <section className="plist-hero" aria-labelledby="plist-title">
        <div className="container plist-hero__copy">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">الأرضيات</p>
          <h1 id="plist-title" className="plist-hero__title">
            كل الأرضيات في <em>محل واحد</em>
          </h1>
          <p className="plist-hero__lead">موكيت وباركيه وربل وفينيل، في أربع مجموعات. لكل صنف صفحة فيها أنواعه وسعره المبدئي.</p>
          <div className="plist-hero__actions">
            <a className="btn btn--primary" href={whatsappHref()} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>اطلب معاينة مجانية</span>
            </a>
            <a className="btn btn--ghost" href="#carpet">
              <span>تصفّح المجموعات</span>
              <Icon name="chevronDown" size={18} />
            </a>
          </div>
        </div>
        <Live className="ring" label="عينات من أرضيات المحل تدور في دائرة">
          <div className="ring__spin">
            {RING.map((item, i) => (
              <figure key={`${item.label}-${i}`} className="ring__item" style={{ "--n": i } as React.CSSProperties}>
                {item.photo ? (
                  <Photo name={item.photo} alt="" sizes="11rem" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- AI texture, a plain file in public/textures
                  <img src={item.tex} alt="" width={900} height={900} loading="lazy" />
                )}
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </Live>
        <p className="plist-hero__note">بعض العينات في الدائرة مرسومة توضيحيًا</p>
      </section>

      <nav className="plist-jump container" aria-label="المجموعات">
        {ORDER.map((id) => (
          <a key={id} href={`#${id}`} className="plist-jump__chip">
            {collections[id].name}
            <span>{productsIn(id).length}</span>
          </a>
        ))}
      </nav>

      {ORDER.map((id, gi) => {
        const group = collections[id];
        return (
          <section key={id} id={id} className={`section plist-group${gi % 2 ? " section--sand" : ""}`} aria-labelledby={`${id}-title`}>
            <div className="container">
              <div className="plist-group__head" data-reveal>
                <span className="plist-group__num" aria-hidden="true">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 id={`${id}-title`} className="plist-group__title">
                    {group.name}
                  </h2>
                  <p className="plist-group__note">{group.note}</p>
                </div>
                {group.hub && (
                  <Link href={group.hub} className="text-link plist-group__more">
                    مقارنة {group.name}
                    <Icon name="arrow" size={16} />
                  </Link>
                )}
              </div>
              <ul className="tgrid">
                {productsIn(id).map((p, i) => (
                  <li key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                    <TwoPhotoCard product={p} />
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
