import { SectionHead } from "../SectionHead";
import { Photo } from "../Photo";
import { ReelControls } from "./ReelControls";

// The owner's photos of floors in place, people-free (2026-11-11 check).
const WORKS: { image: string; tag: string }[] = [
  { image: "mosque-13", tag: "مسجد" },
  { image: "office-08", tag: "مكتب" },
  { image: "mosque-05", tag: "مسجد" },
  { image: "gym-06", tag: "نادي" },
  { image: "office-01", tag: "مكتب" },
  { image: "mosque-16", tag: "مسجد" },
  { image: "bath-07", tag: "حمامات" },
  { image: "office-14", tag: "مكتب" },
  { image: "mosque-09", tag: "مسجد" },
  { image: "mosque-15", tag: "مسجد" },
  { image: "office-09", tag: "مكتب" },
  { image: "mosque-17", tag: "مسجد" },
];

/** «من شغلنا»: a strip of the owner's own installations, scrolled sideways like a reel. */
export function WorksReel() {
  return (
    <section className="section reel" aria-labelledby="reel-title">
      <div className="container">
        <div className="reel__head">
          <SectionHead id="reel-title" eyebrow="من شغلنا" title="أرضيات ركّبناها على الطبيعة" />
          <ReelControls target="works-reel" />
        </div>
      </div>
      <ul id="works-reel" className="reel__track" tabIndex={0} aria-label="صور أرضيات من تركيب المحل">
        {WORKS.map((w, i) => (
          <li key={w.image} className="reel__item" data-reveal="lay" style={{ "--i": i % 5 } as React.CSSProperties}>
            <Photo name={w.image} alt={`${w.tag}: أرضية من تركيب المحل`} sizes="(min-width: 64rem) 22vw, 70vw" />
            <span className="reel__tag">{w.tag}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
