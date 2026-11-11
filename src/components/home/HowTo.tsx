import { home } from "@/content/home";
import { SectionHead } from "../SectionHead";

/** Four steps rising along the badge's swoosh: photo, free inspection, free sample, supply and installation. */
export function HowTo() {
  const s = home.steps;
  return (
    <section className="section howto" aria-labelledby="howto-title">
      <div className="container">
        <SectionHead id="howto-title" eyebrow={s.eyebrow} title={s.title} ghost="Process" />
        <ol className="stairs">
          {s.items.map((step, i) => (
            <li key={step.title} className="stairs__step" data-reveal style={{ "--i": i } as React.CSSProperties}>
              <span className="stairs__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="stairs__title">{step.title}</h3>
              <p className="stairs__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
