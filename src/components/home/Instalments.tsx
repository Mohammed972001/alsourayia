import { home } from "@/content/home";
import { getProduct } from "@/content/products";

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

// Tabby and Tamara (round 3, the picker's «ب البلاطات الأربعة»; the user may still pick another style).
// Four payment tiles flip down one after another (the site's tile motion). The amount is an example: the
// owner's starting price times a round area, split in four. The partner logos are the official files, shown
// unaltered on white.
export function Instalments() {
  const s = home.instalments;
  const p = getProduct(s.exampleSlug);
  const total = (p.priceFrom ?? 0) * s.exampleArea;
  const part = total / s.payments.length;
  return (
    <section className="section section--inverse hm-pay" aria-labelledby="pay-title">
      <div className="container hm-pay__inner">
        <div className="hm-pay__copy" data-reveal="up">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id="pay-title" className="hm-pay__title">
            {s.title}
          </h2>
          <p className="hm-pay__text">{s.text}</p>
          <p className="hm-pay__logos">
            {/* eslint-disable-next-line @next/next/no-img-element -- official partner logo, unaltered */}
            <img src="/brand/tabby.svg" alt="تابي" width={133} height={39} loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element -- official partner logo, unaltered */}
            <img src="/brand/tamara-tight.svg" alt="تمارا" width={130} height={40} loading="lazy" />
          </p>
        </div>
        <div className="hm-pay__tiles">
          <ol className="hm-pay__list">
            {s.payments.map((pay, i) => (
              <li key={pay.label} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <small>{pay.label}</small>
                <b>{fmt(part)}</b>
                <span>{pay.when}</span>
              </li>
            ))}
          </ol>
          <p className="hm-pay__note">
            مثال بالريال: {s.exampleArea} م² من {p.name} (من {p.priceFrom} ريال/م²) = {fmt(total)} ريال، على 4 دفعات.
          </p>
        </div>
      </div>
    </section>
  );
}
