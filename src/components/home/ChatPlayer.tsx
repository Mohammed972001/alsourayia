"use client";

import { useEffect } from "react";

/**
 * Times the WhatsApp chat on the home page: messages appear one by one (the shop's after a typing indicator)
 * and the steps beside the phone tick as the chat reaches them. It plays when the phone comes into view and
 * loops while it stays there. Without JavaScript, or under reduced motion, the whole chat simply shows.
 */
export function ChatPlayer({ phoneId }: { phoneId: string }) {
  useEffect(() => {
    const phone = document.getElementById(phoneId);
    if (!phone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = phone.closest("section");
    const msgs = Array.from(phone.querySelectorAll<HTMLElement>(".hm-msg"));
    const typing = phone.querySelector<HTMLElement>(".hm-typing");
    const steps = Array.from(section?.querySelectorAll<HTMLElement>("[data-step]:not(.hm-msg)") ?? []);
    let timers: number[] = [];
    let visible = false;
    let playing = false;

    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const mark = (n: number) => steps.forEach((li) => li.classList.toggle("is-done", Number(li.dataset.step) <= n));
    const reset = () => {
      timers.forEach(clearTimeout);
      timers = [];
      msgs.forEach((m) => m.classList.remove("is-in"));
      typing?.classList.remove("is-on");
      mark(0);
    };
    const play = () => {
      reset();
      playing = true;
      let t = 400;
      for (const m of msgs) {
        const shop = m.classList.contains("hm-msg--shop");
        if (shop) {
          at(t, () => typing?.classList.add("is-on"));
          t += 1200;
        }
        at(t, () => {
          typing?.classList.remove("is-on");
          m.classList.add("is-in");
          mark(Number(m.dataset.step));
        });
        t += shop ? 900 : 1100;
      }
      at(t + 5000, () => {
        playing = false;
        if (visible) play();
      });
    };

    phone.classList.add("is-scripted");
    reset();
    const io = new IntersectionObserver(
      ([en]) => {
        visible = en.isIntersecting;
        if (visible && !playing) play();
      },
      { threshold: 0.35 },
    );
    io.observe(phone);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      phone.classList.remove("is-scripted");
    };
  }, [phoneId]);

  return null;
}
