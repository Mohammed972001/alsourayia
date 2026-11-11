/* ---- 03-header.js ---- */
// Group 3: header demos. a: group buttons switch the photo panel. d: the menu button opens the full-screen menu.
(() => {
  const g = document.getElementById("g-header");
  if (!g) return;
  const btns = [...g.querySelectorAll("[data-hd-a]")];
  const panels = [...g.querySelectorAll(".hd-a__panel")];
  const show = (k) => {
    btns.forEach((b, i) => b.classList.toggle("is-open", i === k));
    panels.forEach((p, i) => p.classList.toggle("is-open", i === k));
  };
  btns.forEach((b, i) => {
    b.addEventListener("click", () => show(i));
    b.addEventListener("mouseenter", () => show(i));
  });

  const d = g.querySelector("[data-hd-d]");
  if (d) {
    d.querySelector("[data-hd-d-toggle]").addEventListener("click", () => d.classList.toggle("is-open"));
    // Opens once by itself the first time it is on screen, so the menu is seen without a click.
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { setTimeout(() => d.classList.add("is-open"), 900); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(d);
  }
})();

/* ---- 04-hero.js ---- */
// Group 4: hero demos. a: floors swap in the AI room (auto, or by tapping a floor). e: the installs cinema.
// Both loops run only while their frame is on screen.
(() => {
  const g = document.getElementById("g-hero");
  if (!g) return;
  const ar = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const toAr = (n) => String(n).padStart(2, "0").replace(/\d/g, (d) => ar[d]);
  const whenVisible = (el, cb) => {
    let on = false;
    new IntersectionObserver(([en]) => { on = en.isIntersecting; cb(on); }, { threshold: 0.2 }).observe(el);
    return () => on;
  };

  // a: the room that gets floored.
  const a = g.querySelector("[data-hr-a]");
  if (a) {
    const planes = [...a.querySelectorAll(".hr-a__plane")];
    const chips = [...a.querySelectorAll(".hr-a__chips button")];
    const tag = a.querySelector(".hr-a__tag");
    const facts = [["موكيت مساجد", "من 40 ريال/م²"], ["باركيه خشب", "من 65 ريال/م²"], ["مشمع باركيه وفينيل", "من 19 ريال/م²"], ["موكيت مكاتب", "من 45 ريال/م²"], ["ربل جيم", "من 65 ريال/م²"]];
    let cur = 0; let timer = 0; let hold = 0;
    const show = (k) => {
      if (k === cur) return;
      planes.forEach((p, i) => { p.classList.remove("is-prev"); if (i !== k) p.classList.remove("is-on"); });
      planes[cur].classList.add("is-prev");
      planes[cur].classList.remove("is-on");
      void planes[k].offsetWidth;
      planes[k].classList.add("is-on");
      chips.forEach((c, i) => c.classList.toggle("is-on", i === k));
      tag.innerHTML = `<b>${facts[k][0]}</b><span>${facts[k][1]}</span>`;
      tag.classList.remove("is-new"); void tag.offsetWidth; tag.classList.add("is-new");
      cur = k;
    };
    chips.forEach((c, i) => c.addEventListener("click", () => { show(i); hold = Date.now() + 9000; }));
    whenVisible(a, (on) => {
      clearInterval(timer);
      if (on) timer = setInterval(() => { if (Date.now() > hold) show((cur + 1) % planes.length); }, 3400);
    });
  }

  // e: cinema. Each slide is cut into six strips (built here) that slide in like planks.
  const e = g.querySelector("[data-hr-e]");
  if (e) {
    const slides = [...e.querySelectorAll(".hr-e__slide")];
    slides.forEach((s) => {
      for (let i = 0; i < 6; i++) {
        const strip = document.createElement("div");
        strip.className = "hr-e__strip"; strip.style.setProperty("--i", i);
        strip.append(document.createElement("i"));
        s.append(strip);
      }
    });
    const count = e.querySelector(".hr-e__count b");
    const name = e.querySelector(".hr-e__name");
    const bar = e.querySelector(".hr-e__bar i");
    const DUR = 5500;
    let cur = 0; let timer = 0;
    const run = () => { bar.classList.remove("run"); void bar.offsetWidth; bar.style.setProperty("--dur", `${DUR}ms`); bar.classList.add("run"); };
    const next = () => {
      const k = (cur + 1) % slides.length;
      slides.forEach((s, i) => { s.classList.remove("is-prev"); if (i !== k) s.classList.remove("is-on"); });
      slides[cur].classList.add("is-prev");
      void slides[k].offsetWidth;
      slides[k].classList.add("is-on");
      count.textContent = toAr(k + 1);
      name.innerHTML = `<b>${slides[k].dataset.name}</b><small>${slides[k].dataset.price}</small>`;
      name.classList.remove("is-new"); void name.offsetWidth; name.classList.add("is-new");
      cur = k; run();
    };
    whenVisible(e, (on) => {
      clearInterval(timer);
      if (on) { run(); timer = setInterval(next, DUR); }
    });
  }
})();

/* ---- 06-showcase.js ---- */
// 6 · showcase demos: rail arrows and progress, the cursor photo of the big list, group tabs.
(() => {
  const root = document.getElementById("g-showcase");
  if (!root) return;

  // b — rail: arrows scroll one card, the bar shows where you are (RTL scrollLeft runs negative in Chrome).
  root.querySelectorAll(".sh-railwrap").forEach((wrap) => {
    const rail = wrap.querySelector(".sh-rail");
    const bar = wrap.querySelector(".sh-rail__bar span");
    const prev = wrap.querySelector('[data-dir="prev"]');
    const next = wrap.querySelector('[data-dir="next"]');
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const pos = max > 0 ? Math.abs(rail.scrollLeft) / max : 0;
      const size = Math.min(1, rail.clientWidth / rail.scrollWidth);
      bar.style.width = `${size * 100}%`;
      bar.style.insetInlineStart = `${pos * (1 - size) * 100}%`;
      prev.disabled = pos <= 0.01;
      next.disabled = pos >= 0.99;
    };
    const step = () => (rail.querySelector(".sh-r")?.getBoundingClientRect().width || 240) + 16;
    // In RTL "next" moves toward the left, so scrollBy takes a negative left.
    prev.addEventListener("click", () => rail.scrollBy({ left: step() }));
    next.addEventListener("click", () => rail.scrollBy({ left: -step() }));
    rail.addEventListener("scroll", update, { passive: true });
    new ResizeObserver(update).observe(rail);
    update();
  });

  // c — big list: the photo eases after the cursor; on phones a tap opens the photo under the name.
  root.querySelectorAll(".sh-list").forEach((list) => {
    const float = list.querySelector(".sh-float");
    const img = float.querySelector("img");
    const note = float.querySelector(".sh-float__note");
    const rows = list.querySelector(".sh-list__rows");
    let x = 0; let y = 0; let tx = 0; let ty = 0; let raf = 0; let current = "";
    const tick = () => {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16;
      float.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    rows.addEventListener("mousemove", (e) => {
      const r = list.getBoundingClientRect();
      const w = float.offsetWidth; const h = float.offsetHeight;
      tx = Math.min(Math.max(e.clientX - r.left - w / 2, 0), r.width - w);
      ty = Math.min(Math.max(e.clientY - r.top - h - 18, 0), r.height - h);
      if (!float.classList.contains("is-on")) { x = tx; y = ty; }
      if (!raf) raf = requestAnimationFrame(tick);
    });
    rows.querySelectorAll(".sh-li").forEach((li) => {
      li.addEventListener("mouseenter", () => {
        if (current !== li.dataset.img) { img.src = li.dataset.img; current = li.dataset.img; }
        note.textContent = li.dataset.note || "";
        float.classList.add("is-on");
      });
      li.querySelector("button").addEventListener("click", () => {
        const open = !li.classList.contains("is-open");
        rows.querySelectorAll(".sh-li.is-open").forEach((o) => o.classList.remove("is-open"));
        li.classList.toggle("is-open", open);
      });
    });
    rows.addEventListener("mouseleave", () => float.classList.remove("is-on"));
  });

  // d — tabs: switch panels; they cycle on their own while on screen until the user picks one.
  root.querySelectorAll(".sh-tabs").forEach((tabs) => {
    const buttons = [...tabs.querySelectorAll("[data-tab]")];
    const panels = [...tabs.querySelectorAll("[data-panel]")];
    let i = 0; let touched = false; let visible = false;
    const show = (k) => {
      i = k;
      buttons.forEach((b, j) => b.setAttribute("aria-selected", String(j === k)));
      panels.forEach((p, j) => p.classList.toggle("is-on", j === k));
    };
    buttons.forEach((b, j) => b.addEventListener("click", () => { touched = true; show(j); }));
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(tabs);
    setInterval(() => { if (!touched && visible) show((i + 1) % buttons.length); }, 4200);
  });
})();

/* ---- 07-card.js ---- */
// 7 · cards: on touch screens the frosted card opens its three points on tap.
(() => {
  const root = document.getElementById("g-card");
  if (!root) return;
  root.querySelectorAll(".cd-d").forEach((card) => card.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.toggle("is-open");
  }));
})();

/* ---- 08-projects.js ---- */
// 8 · projects: the numbered slider advances on its own while on screen; arrows and thumbnails jump.
(() => {
  const root = document.getElementById("g-projects");
  if (!root) return;
  const digits = (n) => String(n).padStart(2, "0").replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  root.querySelectorAll(".pj-slider").forEach((box) => {
    const slides = [...box.querySelectorAll(".pj-s__slide")];
    const thumbs = [...box.querySelectorAll(".pj-s__thumbs button")];
    const count = box.querySelector(".pj-s__count b");
    const bar = box.querySelector(".pj-s__progress");
    const DUR = 5000;
    let i = 0; let timer = 0; let visible = false;
    const go = (k) => {
      i = (k + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle("is-on", j === i));
      thumbs.forEach((t, j) => t.classList.toggle("is-on", j === i));
      count.textContent = digits(i + 1);
      bar.classList.remove("run"); void bar.offsetWidth;
      if (visible) bar.classList.add("run");
      clearTimeout(timer);
      if (visible) timer = setTimeout(() => go(i + 1), DUR);
    };
    bar.style.setProperty("--pj-dur", `${DUR}ms`);
    box.querySelector('[data-go="next"]').addEventListener("click", () => go(i + 1));
    box.querySelector('[data-go="prev"]').addEventListener("click", () => go(i - 1));
    thumbs.forEach((t, j) => t.addEventListener("click", () => go(j)));
    new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) go(i); else { clearTimeout(timer); bar.classList.remove("run"); }
    }, { threshold: 0.3 }).observe(box);
  });
})();

/* ---- 09-steps.js ---- */
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

/* ---- 13-pay.js ---- */
// Group 13: the instalment badge opens on tap as well as on hover.
(() => {
  const g = document.getElementById("g-pay");
  if (!g) return;
  g.querySelectorAll("[data-py-c]").forEach((b) => b.addEventListener("click", () => {
    b.setAttribute("aria-expanded", String(b.getAttribute("aria-expanded") !== "true"));
  }));
})();
