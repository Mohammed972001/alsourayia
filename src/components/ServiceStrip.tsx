import { site } from "@/content/site";
import { Icon, type IconKey } from "./Icon";

const ICONS: IconKey[] = ["measure", "sample", "tools", "truck"];

/** The owner's four confirmed promises, first on every page under the header: still tiles, 2 x 2 on phones. */
export function ServiceStrip() {
  return (
    <section className="services-strip" aria-label="خدمات المحل">
      <div className="services-strip__track">
        <ul className="services-strip__group">
          {site.services.map((s, i) => (
            <li key={s} className="services-strip__item">
              <Icon name={ICONS[i]} size={18} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
