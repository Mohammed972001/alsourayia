import { home } from "@/content/home";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { SectionHead } from "../SectionHead";
import { ChatPlayer } from "./ChatPlayer";

// «طريقة الطلب» as the user's «ب محادثة واتساب» (round 3): a phone where the usual first chat types itself —
// the customer sends a photo of the room, the shop answers with the free visit, the free sample, then supply
// and fitting — and the four steps beside it tick as the chat reaches them. The whole chat is in the HTML;
// ChatPlayer only times it while it is on screen. The room photo is the AI drawing (labelled in alt text).
export function ChatSteps() {
  const s = home.steps;
  return (
    <section className="section hm-chat" aria-labelledby="chat-title">
      <div className="container hm-chat__inner">
        <div className="hm-chat__copy">
          <SectionHead id="chat-title" eyebrow={s.eyebrow} title={s.title} text={s.text} />
          <ol className="hm-chat__steps">
            {s.items.map((it, i) => (
              <li key={it.title} data-step={i + 1} className="is-done" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span className="hm-chat__tick" aria-hidden="true">
                  <Icon name="check" size={16} />
                </span>
                <span>
                  <b>{it.title}</b>
                  <small>{it.text}</small>
                </span>
              </li>
            ))}
          </ol>
          <a className="btn btn--lg hm-wa" href={whatsappHref()} data-wa>
            <Icon name="whatsapp" size={22} />
            <span>{s.cta}</span>
          </a>
        </div>
        <div id="hm-phone" className="hm-phone" data-reveal="up" aria-label="مثال لمحادثة واتساب مع المحل">
          <div className="hm-phone__top">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img className="hm-phone__av" src="/brand/emblem.webp" alt="" width={36} height={36} loading="lazy" />
            <span className="hm-phone__who">
              <b>{site.short}</b>
              <small>متصل الآن</small>
            </span>
            <Icon name="phone" size={20} />
          </div>
          <div className="hm-phone__body">
            {s.chat.map((m, i) => (
              <div key={i} className={`hm-msg hm-msg--${m.from}${"photo" in m ? " hm-msg--photo" : ""}${"swatch" in m ? " hm-msg--card" : ""}`} data-step={m.step}>
                {"photo" in m && <Photo name="ai-room" alt="صورة غرفة فاضية (رسمة توضيحية)" sizes="240px" />}
                {"swatch" in m && (
                  // eslint-disable-next-line @next/next/no-img-element -- static texture
                  <img className="hm-msg__swatch" src="/textures/tex-mosque.webp" alt="" width={54} height={54} loading="lazy" />
                )}
                <p>
                  {"title" in m && <b>{m.title}</b>}
                  {m.text}
                </p>
                {m.from === "me" && (
                  <span className="hm-msg__ticks" aria-hidden="true">
                    <Icon name="check" size={13} />
                    <Icon name="check" size={13} />
                  </span>
                )}
              </div>
            ))}
            <div className="hm-typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="hm-phone__input" aria-hidden="true">
            <span>اكتب رسالة</span>
            <span className="hm-phone__send">
              <Icon name="whatsapp" size={18} />
            </span>
          </div>
        </div>
        <ChatPlayer phoneId="hm-phone" />
      </div>
    </section>
  );
}
