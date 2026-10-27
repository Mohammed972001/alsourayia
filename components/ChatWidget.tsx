"use client";

// Chat assistant widget (from the client-site-deploy skill template), in the site colours.
// Talks to POST /api/chat (app/api/chat/route.ts → lib/chat).
import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/contact";
import { Icon } from "@/components/icons/Icon";

const WA_GENERAL = whatsappLink();

const TEXT = {
  title: "مساعد موكيت ومفروشات السريع",
  greeting: "أهلًا بك. اسألني عن ربل الجيم أو مطاط دورات المياه أو مطاط الخيل، أو عن الموكيت والأرضيات.",
  suggestions: ["أي ربل يناسب الجيم؟", "مطاط للحمامات ضد الانزلاق", "كيف أطلب عرض سعر؟"],
};

const THEME = {
  launcher: "bg-ink text-white hover:bg-brass-deep",
  header: "bg-ink text-white",
  panel: "border-line bg-white",
  body: "bg-cream",
  bot: "bg-white text-ink",
  user: "bg-brass-deep text-white",
  chip: "border-line bg-white text-ink hover:border-brass hover:text-brass-deep",
  link: "text-brass-deep",
  send: "bg-ink text-white hover:bg-brass-deep",
  input: "border-line text-ink focus:border-brass",
  footer: "bg-brass-soft text-ink-soft",
};

type Turn = { role: "user" | "assistant"; content: string };
const URL_RE = /(https?:\/\/[^\s)،]+)/g;
const IS_URL = /^https?:\/\//;

function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_RE).map((part, i) =>
        IS_URL.test(part) ? (
          <a key={i} href={part} className={`break-all underline underline-offset-2 ${THEME.link}`}>
            {part.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function ChatIcon() {
  return (
    <Icon name="message" size={24} />
  );
}

// `defaultOpen`: ChatLauncher mounts this module only after the first tap on
// its stand-in button, so the panel has to start open to answer that tap.
export default function ChatWidget({
  panelPosition = "bottom-24 end-5",
  defaultOpen = false,
}: {
  panelPosition?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next: Turn[] = [...turns, { role: "user", content: question }];
    setTurns(next);
    setInput("");
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string };
      if (!res.ok || !data.reply) throw new Error(String(res.status));
      setTurns([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "إغلاق المساعد" : "اسأل المساعد"}
        aria-expanded={open}
        aria-controls="site-chat"
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-colors ${THEME.launcher}`}
      >
        <ChatIcon />
      </button>

      {open && (
        <section
          id="site-chat"
          aria-label={TEXT.title}
          className={`fixed z-[61] flex h-[min(520px,75vh)] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl ${panelPosition} ${THEME.panel}`}
        >
          <header className={`flex items-center justify-between px-4 py-3 ${THEME.header}`}>
            <div>
              <p className="text-sm font-semibold">{TEXT.title}</p>
              <p className="text-xs opacity-75">ردود آلية من معلومات الموقع</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="إغلاق" className="grid h-8 w-8 place-items-center rounded-full opacity-80 hover:opacity-100">
              <Icon name="close" size={20} />
            </button>
          </header>

          <div ref={listRef} className={`flex-1 space-y-3 overflow-y-auto p-4 text-sm leading-relaxed ${THEME.body}`} aria-live="polite">
            <p className={`max-w-[85%] rounded-2xl rounded-ss-sm px-3 py-2 shadow-sm ${THEME.bot}`}>{TEXT.greeting}</p>
            {turns.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {TEXT.suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className={`rounded-full border px-3 py-1.5 text-xs ${THEME.chip}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {turns.map((t, i) =>
              t.role === "user" ? (
                <p key={i} className={`ms-auto max-w-[85%] whitespace-pre-line rounded-2xl rounded-se-sm px-3 py-2 ${THEME.user}`}>
                  {t.content}
                </p>
              ) : (
                <p key={i} className={`max-w-[85%] whitespace-pre-line rounded-2xl rounded-ss-sm px-3 py-2 shadow-sm ${THEME.bot}`}>
                  <Linkified text={t.content} />
                </p>
              ),
            )}
            {busy && <p className={`w-fit rounded-2xl px-3 py-2 opacity-70 shadow-sm ${THEME.bot}`}>يكتب…</p>}
            {failed && (
              <p className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm ${THEME.bot}`}>
                تعذّر الرد الآن.{" "}
                <a href={WA_GENERAL} target="_blank" rel="noopener" className={`underline underline-offset-2 ${THEME.link}`}>
                  كلّمنا على الواتساب
                </a>
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className={`flex items-center gap-2 border-t p-3 ${THEME.panel}`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="اكتب سؤالك…"
              aria-label="سؤالك"
              className={`min-w-0 flex-1 rounded-full border bg-transparent px-4 py-2 text-sm outline-none ${THEME.input}`}
            />
            <button type="submit" disabled={busy || !input.trim()} className={`rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-40 ${THEME.send}`}>
              إرسال
            </button>
          </form>
          <a href={WA_GENERAL} target="_blank" rel="noopener" className={`py-2 text-center text-xs hover:underline ${THEME.footer}`}>
            لعرض سعر دقيق كلّمنا على الواتساب
          </a>
        </section>
      )}
    </>
  );
}
