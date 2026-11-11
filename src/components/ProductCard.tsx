import Link from "next/link";
import type { Product } from "@/content/types";
import { CardTap } from "./cards/CardTap";
import { sourceNote } from "./cards/sourceNote";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

/**
 * Glass card (round 3, user pick «د الصورة كاملة وشريط زجاج»): the whole card is the photo; a frosted bar holds
 * the name and the owner's starting price, and opens on hover or focus (first tap on touch) to show three of
 * the product's own points. Works in grids and in a horizontal rail. Props unchanged since round 2.
 */
export function ProductCard({ product, priority = false, sizes = "(min-width: 64rem) 22vw, (min-width: 40rem) 45vw, 88vw" }: { product: Product; priority?: boolean; sizes?: string }) {
  const note = sourceNote(product.images[0]);
  const points = product.features.slice(0, 3).map((f) => f.title);
  return (
    <Link href={`/products/${product.slug}`} className="gcard">
      <Photo name={product.images[0]} alt={`${product.name} — ${product.tagline}`} sizes={sizes} priority={priority} className="gcard__img" />
      {note && <span className="gcard__note">{note}</span>}
      <span className="gcard__glass">
        <span className="gcard__top">
          <span className="gcard__name">{product.name}</span>
          <span className="gcard__price">
            {product.priceFrom !== null ? (
              <>
                من <bdi>{product.priceFrom}</bdi> ريال/م²
              </>
            ) : (
              "السعر بعد القياس"
            )}
          </span>
        </span>
        <span className="gcard__more">
          <span>
            <span className="gcard__points">
              {points.map((t) => (
                <span key={t}>
                  <Icon name="check" size={16} />
                  {t}
                </span>
              ))}
              <span className="gcard__go">
                شوف الصنف
                <Icon name="arrow" size={16} />
              </span>
            </span>
          </span>
        </span>
      </span>
      <CardTap />
    </Link>
  );
}
