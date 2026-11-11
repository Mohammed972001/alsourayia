"use client";

import { useId, useState } from "react";
import { Icon } from "../Icon";

const WASTE = [5, 10, 15] as const;

function parse(value: string): number | null {
  const normalized = value.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(",", ".").trim();
  if (normalized === "") return null;
  const n = Number(normalized);
  return Number.isFinite(n) && n > 0 && n <= 200 ? n : NaN;
}

/** Approximate quantity: length x width plus a waste allowance, and the count of 50 x 50 cm tiles for tile products. */
export function QuantityCalc({ product, whatsapp, tiles = false }: { product: string; whatsapp: string; tiles?: boolean }) {
  const id = useId();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [waste, setWaste] = useState<(typeof WASTE)[number]>(10);

  const l = parse(length);
  const w = parse(width);
  const invalidL = Number.isNaN(l);
  const invalidW = Number.isNaN(w);
  const ready = l !== null && w !== null && !invalidL && !invalidW;
  const area = ready ? l * w : 0;
  const total = ready ? Math.ceil(area * (1 + waste / 100) * 10) / 10 : 0;
  const tileCount = ready ? Math.ceil(total / 0.25) : 0;
  const fmt = (n: number) => new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 1 }).format(n);

  const message = ready
    ? `السلام عليكم، أبغى أستفسر عن ${product} لمساحة ${l} × ${w} م (حوالي ${total} م² مع الهدر${tiles ? `، ${tileCount} بلاطة 50×50` : ""}).`
    : null;
  const href = message ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}` : `https://wa.me/${whatsapp}`;

  return (
    <div className="calc">
      <div className="calc__fields">
        <div className={`field${invalidL ? " field--error" : ""}`}>
          <label htmlFor={`${id}-l`}>الطول (متر)</label>
          <input
            id={`${id}-l`}
            inputMode="decimal"
            autoComplete="off"
            placeholder="مثال: 5"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            aria-invalid={invalidL}
            aria-describedby={invalidL ? `${id}-l-err` : undefined}
          />
          {invalidL && (
            <p id={`${id}-l-err`} className="field__error">
              اكتب رقمًا بين 0 و200.
            </p>
          )}
        </div>
        <div className={`field${invalidW ? " field--error" : ""}`}>
          <label htmlFor={`${id}-w`}>العرض (متر)</label>
          <input
            id={`${id}-w`}
            inputMode="decimal"
            autoComplete="off"
            placeholder="مثال: 4"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            aria-invalid={invalidW}
            aria-describedby={invalidW ? `${id}-w-err` : undefined}
          />
          {invalidW && (
            <p id={`${id}-w-err`} className="field__error">
              اكتب رقمًا بين 0 و200.
            </p>
          )}
        </div>
        <fieldset className="field field--choices">
          <legend>نسبة الهدر للقص</legend>
          <div className="segmented">
            {WASTE.map((p) => (
              <label key={p} className="segmented__option">
                <input type="radio" name={`${id}-waste`} value={p} checked={waste === p} onChange={() => setWaste(p)} />
                <span>{fmt(p)}٪</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="calc__result" aria-live="polite">
        <p className="calc__label">الكمية التقريبية</p>
        <p className="calc__value">
          {ready ? (
            <>
              <bdi>{fmt(total)}</bdi> <span>م²</span>
            </>
          ) : (
            <span className="calc__empty">اكتب الطول والعرض</span>
          )}
        </p>
        {tiles && ready && (
          <p className="calc__tiles">
            حوالي <bdi>{fmt(tileCount)}</bdi> بلاطة مقاس 50×50 سم
          </p>
        )}
        <p className="calc__note">
          {ready ? `المساحة ${fmt(area)} م² + ${fmt(waste)}٪ هدر. الرقم تقريبي؛ نؤكده في المعاينة المجانية.` : "الحساب تقريبي، ويتأكد في المعاينة والقياس المجاني."}
        </p>
        <a
          className={`btn btn--primary${ready ? "" : " is-waiting"}`}
          href={href}
          aria-disabled={!ready}
          data-keep-text
          onClick={(e) => {
            if (!ready) {
              e.preventDefault();
              return;
            }
          }}
        >
          <Icon name="whatsapp" size={20} />
          <span>أرسل المقاس على واتساب</span>
        </a>
      </div>
    </div>
  );
}
