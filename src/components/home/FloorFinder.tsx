import { getProduct, rooms } from "@/content/products";
import { SectionHead } from "../SectionHead";
import { FinderPicker } from "./FinderPicker";

/** «اختار أرضيتك»: pick the place, get the floor that fits it. Every answer is in the HTML. */
export function FloorFinder() {
  const places = Object.entries(rooms).map(([key, r]) => {
    const p = getProduct(r.product);
    return { key, name: r.name, text: r.text, image: r.image, product: { slug: p.slug, name: p.name, tagline: p.tagline, price: p.priceFrom } };
  });
  return (
    <section className="section section--sand finder-sec" aria-labelledby="finder-title">
      <div className="container">
        <SectionHead
          id="finder-title"
          eyebrow="تختار إيه؟"
          title="قل لنا المكان، نقول لك الأرضية"
          text="اختر المكان اللي تجهّزه، ونرشّح لك الأرضية اللي تتحمّل استعماله، وسعرها المبدئي."
        />
        <FinderPicker places={places} />
      </div>
    </section>
  );
}
