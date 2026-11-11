import Link from "next/link";
import { home } from "@/content/home";
import { Icon } from "../Icon";
import { mediaUrl } from "../Photo";
import { SectionHead } from "../SectionHead";

// Three rulers with each material placed along them. Positions are a plain ordering of the same words the
// product pages use, not measurements.
const MATERIALS = {
  carpet: { name: "موكيت", image: "mosque-swatch-02", href: "/products/mokite" },
  parquet: { name: "باركيه خشب", image: "parquet-cat-06", href: "/products/parket" },
  spc: { name: "SPC", image: "spc-cat-06", href: "/products/water-resistant-carpet" },
  vinyl: { name: "فينيل", image: "vinyl-05", href: "/products/vinyl-roll" },
  rubber: { name: "ربل", image: "gym-01", href: "/products/rabal-gem" },
} as const;
type Key = keyof typeof MATERIALS;

const AXES: { title: string; from: string; to: string; marks: [Key, number][] }[] = [
  { title: "الملمس", from: "ناعم ودافئ", to: "متين ومرن", marks: [["carpet", 8], ["parquet", 34], ["vinyl", 54], ["spc", 70], ["rubber", 92]] },
  { title: "مع الماء", from: "يبتعد عن الرطوبة", to: "يتحمّل الماء", marks: [["carpet", 7], ["parquet", 24], ["rubber", 62], ["vinyl", 78], ["spc", 93]] },
  { title: "الحركة عليه", from: "خفيفة", to: "أوزان وأجهزة", marks: [["carpet", 10], ["parquet", 30], ["vinyl", 46], ["spc", 64], ["rubber", 93]] },
];

const LEGEND = [
  { name: "موكيت", best: "غرف النوم والمجالس والمساجد والمكاتب", href: "/products/mokite" },
  { name: "باركيه خشب", best: "الغرف الجافة بشكل الخشب", href: "/products/parket" },
  { name: "SPC", best: "المطابخ والملاحق والأماكن الرطبة", href: "/products/water-resistant-carpet" },
  { name: "مشمع باركيه", best: "المحلات والشقق بأقل تكلفة", href: "/products/vinyl-roll" },
  { name: "ربل", best: "النوادي ودورات المياه", href: "/products/category/rubber-flooring" },
];

export function Compare() {
  const head = home.compareHead;
  return (
    <section className="section section--sand compare" aria-labelledby="compare-title">
      <div className="container">
        <SectionHead id="compare-title" eyebrow={head.eyebrow} title={head.title} text={head.text} ghost="Compare" align="center" />
        <div className="scale" data-reveal>
          {AXES.map((axis) => (
            <div key={axis.title} className="scale__axis">
              <h3 className="scale__title">{axis.title}</h3>
              <div className="scale__line">
                {axis.marks.map(([key, x], i) => {
                  const m = MATERIALS[key];
                  return (
                    <span key={key} className="scale__mark" style={{ "--x": `${x}%`, "--i": i } as React.CSSProperties}>
                      <span className="scale__dot" style={{ backgroundImage: `url(${mediaUrl(m.image, 160)})` }} aria-hidden="true" />
                      <span className="scale__tag">{m.name}</span>
                    </span>
                  );
                })}
              </div>
              <p className="scale__ends">
                <span>{axis.from}</span>
                <span>{axis.to}</span>
              </p>
            </div>
          ))}
        </div>
        <ul className="scale__legend">
          {LEGEND.map((c) => (
            <li key={c.name} data-reveal>
              <span className="scale__legend-name">{c.name}</span>
              <span className="scale__legend-best">الأنسب لـ{c.best}</span>
              <Link href={c.href} className="text-link">
                التفاصيل
                <Icon name="arrow" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
