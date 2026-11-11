import { Photo } from "../Photo";

type WorksData = { intro: string; images: string[] };

/** The owner photos of the product in place: an even grid of square tiles, the first one 2 x 2. */
export function Works({ works, name }: { works: WorksData; name: string }) {
  return (
    <div className="works">
      {works.images.map((img, i) => (
        <figure key={img} className="works__item" data-reveal="tile" style={{ "--i": i } as React.CSSProperties}>
          <Photo name={img} alt={`${name} — صورة ${i + 1}`} sizes="(min-width: 64rem) 18vw, 46vw" />
        </figure>
      ))}
    </div>
  );
}
