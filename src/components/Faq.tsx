import { Icon } from "./Icon";

/** Native disclosure list: every answer is in the HTML for crawlers and AI readers. Styles: r3-pages.css (.qa). */
export function FaqList({ items, openFirst = true }: { items: readonly { q: string; a: string }[]; openFirst?: boolean }) {
  return (
    <div className="qa">
      {items.map((f, i) => (
        <details key={f.q} className="qa__item" open={openFirst && i === 0} data-reveal>
          <summary className="qa__q">
            <span>{f.q}</span>
            <span className="qa__toggle" aria-hidden="true">
              <Icon name="plus" size={20} />
            </span>
          </summary>
          <p className="qa__a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
