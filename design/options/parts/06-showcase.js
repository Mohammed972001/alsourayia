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
