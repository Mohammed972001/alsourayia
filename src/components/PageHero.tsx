import { Breadcrumbs } from "./Breadcrumbs";
import { Swoosh } from "./Icon";
import { Photo } from "./Photo";

type Props = {
  trail: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  lead: string;
  images?: [string, string];
};

/** Inner-page hero: title on the start side, two layered photos on the end side. */
export function PageHero({ trail, eyebrow, title, lead, images }: Props) {
  return (
    <section className={`page-hero${images ? " page-hero--media" : ""}`} aria-labelledby="page-title">
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
