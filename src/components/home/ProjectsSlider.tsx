import Link from "next/link";
import { home } from "@/content/home";
import { getProduct } from "@/content/products";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { SectionHead } from "../SectionHead";
import { SliderControls } from "./SliderControls";

const AR = "٠١٢٣٤٥٦٧٨٩";
const ar2 = (n: number) => String(n).padStart(2, "0").replace(/\d/g, (d) => AR[Number(d)]);

// «من شغلنا» as the user's «ج سلايدر كبير بالأرقام» (round 3): the owner's installs, one big photo at a time
// with a slow push-in, the slide number, a progress line to the next one, arrows and a thumbnail strip.
// Everything is server-rendered; SliderControls (no markup of its own) switches the slides while on screen.
export function ProjectsSlider() {
  const head = home.projectsHead;
  const slides = home.projects.map((s) => ({ ...s, p: getProduct(s.product) }));
  return (
    <section className="section section--sand hm-proj" aria-labelledby="proj-title">
      <div className="container">
        <SectionHead id="proj-title" eyebrow={head.eyebrow} title={head.title} />
        <div id="hm-slider" className="hm-slider" data-reveal="up" aria-roledescription="عرض صور" aria-label={head.title}>
          <div className="hm-slider__stage">
            {slides.map((s, i) => (
              <figure key={s.image} className={`hm-slider__slide${i === 0 ? " is-on" : ""}`} aria-hidden={i === 0 ? undefined : true}>
                <Photo name={s.image} alt={`${s.place}: ${s.p.name} من تركيب المحل`} sizes="(min-width: 78rem) 78rem, 100vw" />
                <figcaption>
                  <span className="hm-slider__place">{s.place}</span>
                  <Link className="hm-slider__name" href={`/products/${s.p.slug}`} tabIndex={i === 0 ? undefined : -1}>
                    {s.p.name}
                  </Link>
                </figcaption>
              </figure>
            ))}
            <p className="hm-slider__count">
              <b>{ar2(1)}</b>
              <span>/ {ar2(slides.length)}</span>
            </p>
            <div className="hm-slider__nav">
              <button type="button" data-go="prev" aria-label="الصورة السابقة">
                <Icon name="arrow" size={20} className="hm-arrows__prev" />
              </button>
              <button type="button" data-go="next" aria-label="الصورة التالية">
                <Icon name="arrow" size={20} />
              </button>
            </div>
            <div className="hm-slider__progress" aria-hidden="true">
              <span />
            </div>
          </div>
          <div className="hm-slider__thumbs">
            {slides.map((s, i) => (
              <button key={s.image} type="button" data-go={i} className={i === 0 ? "is-on" : undefined} aria-label={`${s.place}: ${s.p.name}`} aria-pressed={i === 0}>
                <Photo name={s.image} alt="" sizes="120px" />
              </button>
            ))}
          </div>
        </div>
        <SliderControls rootId="hm-slider" />
      </div>
    </section>
  );
}
