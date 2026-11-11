import { site } from "@/content/site";
import { Diamond, Icon, type IconKey } from "./Icon";

const ICONS: IconKey[] = ["measure", "sample", "tools", "truck"];

/**
 * The owner's four confirmed promises, first on every page under the header (the place the sister site
 * gives its instalment strip). A moving strip on phones, a still row on wide screens.
 */
export function ServiceStrip() {
  return (
    <section className="services-strip" aria-label="خدمات المحل">
      <div className="services-strip__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="services-strip__group" aria-hidden={copy === 1 ? true : undefined}>
            {site.services.map((s, i) => (
              <li key={s} className="services-strip__item">
                <Icon name={ICONS[i]} size={18} />
                <span>{s}</span>
                <Diamond className="services-strip__sep" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
