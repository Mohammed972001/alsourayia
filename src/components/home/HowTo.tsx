import { home } from "@/content/home";
import { SectionHead } from "../SectionHead";

const TICKS = Array.from({ length: 51 }, (_, i) => `M${i * 20} 20V${i % 5 === 0 ? 4 : 12}`).join("");

/** Four steps placed along a measuring tape that runs out across the section. */
export function HowTo() {
  const s = home.steps;
  return (
    <section className="section howto" aria-labelledby="howto-title">
      <div className="container">
        <SectionHead id="howto-title" eyebrow={s.eyebrow} title={s.title} align="center" />
        <div className="ruler">
          <svg className="ruler__tape" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-draw>
            <path d="M0 20H1000" pathLength="1" />
            <path d={TICKS} pathLength="1" />
          </svg>
          <ol className="ruler__steps">
            {s.items.map((step, i) => (
              <li key={step.title} className="ruler__step" data-reveal="tile" style={{ "--i": i + 1 } as React.CSSProperties}>
                <span className="ruler__mark" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="ruler__title">{step.title}</h3>
                <p className="ruler__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
