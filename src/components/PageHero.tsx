import { Breadcrumbs } from "./Breadcrumbs";
import { Swoosh } from "./Icon";
import { Photo } from "./Photo";

type Props = {
  trail: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  lead: string;
  images?: [string, string];
  /** A smaller title for long, search-shaped headings (the hubs), so the buttons stay on the first screen. */
  compact?: boolean;
  /** Buttons under the lead. */
  children?: React.ReactNode;
};

/** Inner-page hero: title on the start side, two layered photos on the end side. */
export function PageHero({ trail, eyebrow, title, lead, images, compact = false, children }: Props) {
  return (
    <section className={`page-hero${images ? " page-hero--media" : ""}${compact ? " page-hero--compact" : ""}`} aria-labelledby="page-title">
      <div className="container page-hero__inner">
        <div className="page-hero__copy">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow page-hero__eyebrow" data-reveal>
            <Swoosh className="eyebrow__steps" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="page-hero__title" data-reveal>
            {title}
          </h1>
          <p className="page-hero__lead" data-reveal>
            {lead}
          </p>
          {children && (
            <div className="page-hero__actions" data-reveal>
              {children}
            </div>
          )}
        </div>
        {images && (
          <div className="page-hero__media" aria-hidden="true">
            <figure className="page-hero__photo page-hero__photo--a" data-reveal="wipe">
              <Photo name={images[0]} alt="" sizes="(min-width: 64rem) 30vw, 70vw" priority />
            </figure>
            <figure className="page-hero__photo page-hero__photo--b" data-parallax="-0.08" data-reveal="rise">
              <Photo name={images[1]} alt="" sizes="(min-width: 64rem) 14vw, 36vw" />
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}
