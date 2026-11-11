import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { sourceNote } from "./sourceNote";

/**
 * Hanging sample tag (round 3, user pick «ب بطاقة العينة المتعلقة»): a punched card on a string with the sample's
 * photo; it swings into place when its rack comes on screen and sways on hover. The link asks for that sample
 * on WhatsApp (data-keep-text: the tracker keeps the sample's wording and adds the source).
 */
export function SampleTag({ image, title, href, cta = "اطلب العينة", index = 0 }: { image: string; title: string; href: string; cta?: string; index?: number }) {
  const note = sourceNote(image);
  return (
    <li className="stag" style={{ "--i": index % 5 } as React.CSSProperties}>
      <span className="stag__string" aria-hidden="true" />
      <a className="stag__card" href={href} data-wa data-keep-text>
        <span className="stag__hole" aria-hidden="true" />
        <span className="stag__brand">السريع · عينة</span>
        <span className="stag__swatch">
          <Photo name={image} alt="" sizes="(min-width: 64rem) 11rem, 42vw" />
          {note && <span className="stag__note">{note}</span>}
        </span>
        <span className="stag__title">{title}</span>
        <span className="stag__ask">
          {cta}
          <Icon name="whatsapp" size={16} />
        </span>
      </a>
    </li>
  );
}
