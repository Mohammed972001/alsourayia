import { Swoosh } from "./Icon";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  /** A faint Latin word drifting behind the heading (decoration, hidden from readers). */
  ghost?: string;
  align?: "start" | "center";
  inverse?: boolean;
  id?: string;
  as?: "h2" | "h1";
};

export function SectionHead({ eyebrow, title, text, ghost, align = "start", inverse = false, id, as: Tag = "h2" }: Props) {
  return (
    <div className={`section-head section-head--${align}${inverse ? " section-head--inverse" : ""}`} data-reveal>
      {ghost && (
        <span className="section-head__ghost" aria-hidden="true" data-parallax="0.12">
          {ghost}
        </span>
      )}
      <p className="eyebrow">
        <Swoosh className="eyebrow__steps" />
        {eyebrow}
      </p>
      <Tag id={id} className="section-head__title">
        {title}
      </Tag>
      {text && <p className="section-head__text">{text}</p>}
    </div>
  );
}
