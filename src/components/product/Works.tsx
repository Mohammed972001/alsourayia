import { Photo } from "../Photo";

type WorksData = { intro: string; images: string[] };

/**
 * «شوفه على الطبيعة»: the owner's photos of the product in place, laid out as a loose board of slightly
 * tilted prints (CSS columns, so any count and any aspect ratio fit).
 */
export function Works({ works, name }: { works: WorksData; name: string }) {
  return (
    <div className="works">
      {works.images.map((img, i) => (
        <figure key={img} className="works__item" data-reveal style={{ "--i": i } as React.CSSProperties}>
          <Photo name={img} alt={`${name} — صورة ${i + 1}`} sizes="(min-width: 64rem) 18vw, 46vw" />
        </figure>
      ))}
    </div>
  );
}
