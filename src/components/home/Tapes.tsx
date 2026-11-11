import { products } from "@/content/products";
import { site } from "@/content/site";
import type { IconKey } from "../Icon";
import { Icon } from "../Icon";

// Strip «شريطين متعاكسين» (round 3): two measuring tapes cross under the hero and run opposite ways, one with
// the owner's four promises, one with the floor names. The moving copies are decoration (aria-hidden); the
// promises are read once from the plain list.
const SERVICE_ICONS: IconKey[] = ["measure", "sample", "tools", "truck"];

export function Tapes() {
  const services = site.services.map((s, i) => ({ text: s, icon: SERVICE_ICONS[i] ?? "check" }));
  const names = products.map((p) => p.name);
  return (
    <section className="hm-tapes" aria-label="خدماتنا">
      <ul className="visually-hidden">
        {site.services.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="hm-tape hm-tape--a" aria-hidden="true">
        <div className="hm-tape__track">
          {[0, 1].map((k) => (
            <ul key={k} className="hm-tape__set">
              {[...services, ...services].map((s, i) => (
                <li key={`${s.text}-${i}`}>
                  <Icon name={s.icon} size={22} />
                  {s.text}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="hm-tape hm-tape--b" aria-hidden="true">
        <div className="hm-tape__track">
          {[0, 1].map((k) => (
            <ul key={k} className="hm-tape__set">
              {names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
