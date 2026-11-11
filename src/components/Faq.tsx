import { Icon } from "./Icon";

/** Native disclosure list: every answer is in the HTML for crawlers and AI readers. */
export function FaqList({ items, openFirst = true }: { items: readonly { q: string; a: string }[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} className="faq__item" open={openFirst && i === 0} data-reveal>
          <summary className="faq__q">
            <span>{f.q}</span>
            <span className="faq__toggle" aria-hidden="true">
              <Icon name="plus" size={20} />
            </span>
          </summary>
          <p className="faq__a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
