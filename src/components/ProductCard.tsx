import Link from "next/link";
import { collections } from "@/content/products";
import type { Product } from "@/content/types";
import { Icon } from "./Icon";
import { Photo, photoSource } from "./Photo";

/**
 * Floor card: one photo with a cut corner and a tape-tick edge, the name, one line, and the owner's starting
 * price on a tag. Hover lifts the photo and runs a copper rule under the name.
 */
export function ProductCard({ product, priority = false, sizes = "(min-width: 64rem) 22vw, (min-width: 40rem) 45vw, 88vw" }: { product: Product; priority?: boolean; sizes?: string }) {
  const source = photoSource(product.images[0]);
  return (
    <Link href={`/products/${product.slug}`} className="fcard">
      <span className="fcard__media">
        <Photo name={product.images[0]} alt={`${product.name} — ${product.tagline}`} sizes={sizes} priority={priority} />
        <span className="fcard__label">{collections[product.collection].name}</span>
        {source !== "owner" && <span className="fcard__note">{source === "art" ? "رسم توضيحي" : "من الكتالوج"}</span>}
      </span>
      <span className="fcard__body">
        <span className="fcard__name">{product.name}</span>
        <span className="fcard__line">{product.tagline}</span>
        <span className="fcard__foot">
          {product.priceFrom !== null ? (
            <span className="fcard__price">
              من <bdi>{product.priceFrom}</bdi> ريال/م²
            </span>
          ) : (
            <span className="fcard__price fcard__price--ask">السعر بعد القياس</span>
          )}
          <span className="fcard__go" aria-hidden="true">
            <Icon name="arrow" size={18} />
          </span>
        </span>
      </span>
    </Link>
  );
}
