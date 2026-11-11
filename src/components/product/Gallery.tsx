"use client";

import { useState } from "react";
import { Photo } from "../Photo";

/** Product gallery: an arch-topped main photo with overlapping thumbnails and a bronze frame. */
export function Gallery({ images, name, label }: { images: string[]; name: string; label: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="gallery">
      <span className="gallery__frame" aria-hidden="true" />
      <figure className="gallery__main" data-reveal="lay">
        {images.map((img, i) => (
          <Photo
            key={img}
            name={img}
            alt={i === 0 ? `${name} — صورة رئيسية` : `${name} — صورة ${i + 1}`}
            sizes="(min-width: 64rem) 42vw, 92vw"
            priority={i === 0}
            className={i === active ? "is-active" : undefined}
          />
        ))}
        <figcaption className="gallery__label">{label}</figcaption>
      </figure>
      <div className="gallery__thumbs" role="group" aria-label={`صور ${name}`}>
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            className="gallery__thumb"
            aria-pressed={i === active}
            aria-label={`عرض الصورة ${i + 1}`}
            onClick={() => setActive(i)}
          >
            <Photo name={img} alt="" sizes="96px" />
          </button>
        ))}
      </div>
    </div>
  );
}
