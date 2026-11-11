type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "start" | "center";
  inverse?: boolean;
  id?: string;
  as?: "h2" | "h1";
};

/**
 * Section head: a copper eyebrow, the title, and a short measuring-tape rule that draws under it. On wide
 * screens the text sits beside the title, split by the rule, instead of under it.
 */
export function SectionHead({ eyebrow, title, text, align = "start", inverse = false, id, as: Tag = "h2" }: Props) {
  return (
    <div className={`section-head section-head--${align}${text ? " section-head--split" : ""}${inverse ? " section-head--inverse" : ""}`}>
      <div className="section-head__main" data-reveal="up">
        <p className="eyebrow">{eyebrow}</p>
        <Tag id={id} className="section-head__title">
          {title}
        </Tag>
        <svg className="section-head__tape" viewBox="0 0 160 12" aria-hidden="true" focusable="false" data-draw>
          <path d="M1 10H159" pathLength="1" />
          <path d="M1 10V3M21 10V6M41 10V4M61 10V6M81 10V3M101 10V6M121 10V4M141 10V6M159 10V3" pathLength="1" />
        </svg>
      </div>
      {text && (
        <p className="section-head__text" data-reveal="up" style={{ "--i": 1 } as React.CSSProperties}>
          {text}
        </p>
      )}
    </div>
  );
}
