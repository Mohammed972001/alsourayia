import { telHref, whatsappHref } from "@/lib/contact";
import { Icon } from "./Icon";

/** Fixed contact bar on phones: WhatsApp and a call. */
export function MobileBar() {
  return (
    <div className="mobile-bar" role="region" aria-label="تواصل سريع">
      <a className="mobile-bar__wa" href={whatsappHref()} data-wa>
        <Icon name="whatsapp" size={20} />
        <span>واتساب</span>
      </a>
      <a className="mobile-bar__call" href={telHref()}>
        <Icon name="phone" size={20} />
        <span>اتصال</span>
      </a>
    </div>
  );
}
