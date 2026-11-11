import { home } from "@/content/home";
import { productBySlug, rooms } from "@/content/products";
import { SectionHead } from "../SectionHead";
import { RoomsAccordion, type RoomPanel } from "./RoomsAccordion";

/** «لكل مكان أرضيته» as an accordion of places. */
export function Rooms() {
  const head = home.roomsHead;
  const panels: RoomPanel[] = Object.entries(rooms).map(([key, r]) => {
    const product = productBySlug.get(r.product)!;
    return { key, name: r.name, text: r.text, image: r.image, href: `/products/${product.slug}`, product: product.name };
  });
  return (
    <section className="section rooms" aria-labelledby="rooms-title">
      <div className="container">
        <SectionHead id="rooms-title" eyebrow={head.eyebrow} title={head.title} text={head.text} ghost="Spaces" />
        <RoomsAccordion rooms={panels} />
      </div>
    </section>
  );
}
