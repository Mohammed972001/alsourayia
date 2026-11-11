import Link from "next/link";
import { collections } from "@/content/products";
import type { Product } from "@/content/types";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

/**
 * Product card: three stacked photos that fan out on hover, inside a stage that tilts with the pointer
 * (Motion.tsx sets --rx/--ry on [data-tilt]), and the owner's starting price when there is one.
 */
export function ProductCard({ product, priority = false, sizes = "(min-width: 64rem) 22vw, (min-width: 40rem) 45vw, 88vw" }: { product: Product; priority?: boolean; sizes?: string }) {
  const [a, b, c] = product.images;
  return (
    <Link href={`/products/${product.slug}`} className="pcard">
      <span className="pcard__stage" data-tilt>
        <span className="pcard__ph pcard__ph--3" aria-hidden="true">
          <Photo name={c ?? a} alt="" sizes={sizes} />
        </span>
        <span className="pcard__ph pcard__ph--2" aria-hidden="true">
          <Photo name={b ?? a} alt="" sizes={sizes} />
        </span>
        <span className="pcard__ph pcard__ph--1">
          <Photo name={a} alt={`${product.name} — ${product.tagline}`} sizes={sizes} priority={priority} />
          <span className="pcard__frame" aria-hidden="true" />
        </span>
        <span className="pcard__chip">{collections[product.collection].name}</span>
        <span className="pcard__go" aria-hidden="true">
          <Icon name="arrowUp" size={20} />
        </span>
      </span>
      <span className="pcard__name">{product.name}</span>
      <span className="pcard__line">{product.tagline}</span>
      {product.priceFrom !== null && (
        <span className="pcard__price">
          من <bdi>{product.priceFrom}</bdi> ريال للمتر
        </span>
      )}
    </Link>
  );
}
