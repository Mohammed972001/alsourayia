/**
 * Tabby and Tamara under the price (round 3, picker option «أ تحت كل سعر»): one line, the two official partner
 * logos on white chips (public/brand: never recoloured), and a bar that splits in four when it comes on screen.
 * The example is plain arithmetic on the owner's starting price for 20 m², and is labelled «مثال».
 */
export function InstalmentLine({ price, compact = false }: { price: number | null; compact?: boolean }) {
  const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
  const total = price !== null ? price * 20 : null;
  return (
    <div className={`inst${compact ? " inst--compact" : ""}`} data-reveal="up">
      <p className="inst__text">
        أو قسّم المبلغ على <b>4 دفعات</b> مع
      </p>
      <span className="inst__logos">
        {/* eslint-disable-next-line @next/next/no-img-element -- official partner logo, SVG as published */}
        <img src="/brand/tabby.svg" alt="تابي" width={81} height={22} />
        {/* eslint-disable-next-line @next/next/no-img-element -- official partner logo, SVG as published */}
        <img src="/brand/tamara-tight.svg" alt="تمارا" width={71} height={22} />
      </span>
      <span className="inst__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      {!compact && total !== null && (
        <small className="inst__example">
          مثال: 20 م² × {price} = <bdi>{fmt(total)}</bdi> ريال، أي 4 دفعات كل دفعة <bdi>{fmt(total / 4)}</bdi> ريال.
        </small>
      )}
      <small className="inst__terms">حسب شروط تابي وتمارا.</small>
    </div>
  );
}
