import Link from "next/link";
import { collections } from "@/content/products";
import type { Product } from "@/content/types";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { sourceNote } from "./sourceNote";

/**
 * Two-photo card (round 3, user pick «ج الصورة التانية بتدخل بالميل»): on hover the product's second photo wipes
 * in on a slant and the price stamp turns in on the corner. A product with one picture keeps it and the stamp.
 */
export function TwoPhotoCard({ product, sizes = "(min-width: 64rem) 22vw, (min-width: 40rem) 45vw, 88vw" }: { product: Product; sizes?: string }) {
  const [first, second] = product.images;
  const note = sourceNote(first);
  const group = collections[product.collection].name;
  return (
    <Link href={`/products/${product.slug}`} className="tcard">
      <span className="tcard__media">
        <Photo name={first} alt={`${product.name} — ${product.tagline}`} sizes={sizes} className="tcard__img" />
        {second && <Photo name={second} alt="" sizes={sizes} className="tcard__img tcard__alt" />}
        {note && <span className="tcard__note">{note}</span>}
        <span className="tcard__stamp" aria-hidden="true">
          {product.priceFrom !== null ? (
            <>
              <b>{product.priceFrom}</b>
              <small>ريال/م²</small>
            </>
          ) : (
            <small>بعد القياس</small>
          )}
        </span>
        {second && (
          <span className="tcard__dots" aria-hidden="true">
            <i />
            <i />
          </span>
        )}
      </span>
      <span className="tcard__body">
        <span className="tcard__kicker">
          {group} · {product.priceFrom !== null ? <>من <bdi>{product.priceFrom}</bdi> ريال/م²</> : "السعر بعد القياس"}
        </span>
        <span className="tcard__name">{product.name}</span>
        <span className="tcard__line">{product.tagline}</span>
        <span className="tcard__more">
          شوف الأنواع والسعر
          <Icon name="arrow" size={16} />
        </span>
      </span>
    </Link>
  );
}
