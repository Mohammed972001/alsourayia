// Group 9 (how to order): the self-typing WhatsApp chat (b) and the drawn path with a travelling dot (c).
(() => {
  const root = document.getElementById("g-steps");
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Start when picker.js adds .play, reset when it is removed, restart on the option's replay button.
  const watch = (el, start, reset) => {
    let on = el.classList.contains("play");
    if (on) start();
    new MutationObserver(() => {
      const now = el.classList.contains("play");
      if (now && !on) start();
      else if (!now && on) reset();
      on = now;
    }).observe(el, { attributes: true, attributeFilter: ["class"] });
    el.closest(".pk-opt").querySelector("[data-replay]")?.addEventListener("click", () => start());
  };

  // ---- b: chat ----------------------------------------------------------------------------------
  root.querySelectorAll("[data-chat]").forEach((phone) => {
    const opt = phone.closest(".pk-opt");
    const msgs = [...phone.querySelectorAll(".sp-msg")];
    const typing = phone.querySelector(".sp-typing");
    const steps = [...opt.querySelectorAll(".sp-b__list li")];
    let timers = [];
    let visible = false;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(phone);
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const mark = (n) => steps.forEach((li) => li.classList.toggle("is-done", Number(li.dataset.step) <= n));
    const reset = () => { clear(); msgs.forEach((m) => m.classList.remove("is-in")); typing.classList.remove("is-on"); mark(0); };
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const start = () => {
      reset();
      if (reduce) { msgs.forEach((m) => m.classList.add("is-in")); mark(4); return; }
      let t = 500;
      msgs.forEach((m) => {
        const shop = m.classList.contains("sp-msg--shop");
        if (shop) {
          at(t, () => typing.classList.add("is-on"));
          t += 1300;
        }
        at(t, () => { typing.classList.remove("is-on"); m.classList.add("is-in"); mark(Number(m.dataset.step)); });
        t += shop ? 900 : 1200;
      });
      // Loop while the phone is on screen.
      at(t + 5000, () => { if (visible) start(); });
    };
    watch(phone, start, reset);
  });

  // ---- c: drawn path ----------------------------------------------------------------------------
  root.querySelectorAll("[data-path]").forEach((box) => {
    const labels = [...box.querySelectorAll(".sp-c__l")];
    const tracks = [...box.querySelectorAll(".sp-c__track")].map((tr) => {
      const path = tr.querySelector(".sp-c__line");
      const vb = path.ownerSVGElement.viewBox.baseVal;
      let len = 0;
      try { len = path.getTotalLength(); } catch { /* not rendered */ }
      const stops = [...tr.querySelectorAll(".sp-c__stop")].map((s) => ({ el: s, x: parseFloat(s.style.getPropertyValue("--x")), y: parseFloat(s.style.getPropertyValue("--y")) }));
      return { tr, path, vb, len, stops, vertical: tr.classList.contains("sp-c__track--v"), dot: tr.querySelector(".sp-c__dot"), reveal: tr.querySelector(".sp-c__reveal") };
    });
    let raf = 0;
    const paint = (t) => {
      tracks.forEach((k) => {
        if (!k.len) { try { k.len = k.path.getTotalLength(); } catch { return; } }
        const p = k.path.getPointAtLength(t * k.len);
        const px = (p.x / k.vb.width) * 100;
        const py = (p.y / k.vb.height) * 100;
        k.dot.style.left = `${px}%`;
        k.dot.style.top = `${py}%`;
        k.dot.classList.toggle("is-on", t > 0);
        k.reveal.style.clipPath = k.vertical ? `inset(0 0 ${100 - py}% 0)` : `inset(0 0 0 ${px}%)`;
        const lit = k.stops.map((s) => t > 0 && (k.vertical ? py >= s.y - 0.5 : px <= s.x + 0.5));
        k.stops.forEach((s, i) => s.el.classList.toggle("is-on", lit[i]));
        if (k.tr.offsetParent !== null) labels.forEach((l, i) => l.classList.toggle("is-on", lit[i]));
      });
    };
    const reset = () => { cancelAnimationFrame(raf); paint(0); };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) { paint(1); return; }
      const t0 = performance.now();
      const dur = 4200;
      const step = (now) => {
        const x = Math.min(1, (now - t0) / dur);
        paint(x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
        if (x < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    paint(0);
    watch(box, start, reset);
  });
})();
