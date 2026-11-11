// Design options picker for «موكيت السريع», round 3 (2026-11-12).
// Builds the side nav from the groups, applies the chosen palette (group "colors") and display font (group
// "font") to every frame, saves picks in localStorage and copies them as text for the chat.
(() => {
  const KEY = "suraya-choices-v3";
  const groups = [...document.querySelectorAll(".pk-group[data-key]")];
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { state = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ } };

  // Side nav.
  const nav = document.getElementById("pk-nav");
  groups.forEach((g) => {
    const a = document.createElement("a");
    a.href = `#${g.id}`;
    a.dataset.for = g.dataset.key;
    a.textContent = `${g.querySelector(".pk-gh__n").textContent} ${g.dataset.label}`;
    nav.append(a);
  });

  // Palette and font on every frame (frames inside those two groups keep their own).
  const applyFrames = () => {
    document.querySelectorAll(".site").forEach((s) => {
      if (s.dataset.fixed !== "c" && s.dataset.fixed !== "cf") s.dataset.c = state.colors || "a";
      if (s.dataset.fixed !== "f" && s.dataset.fixed !== "cf") s.dataset.f = state.font || "a";
    });
  };

  const optionOf = (g) => {
    const v = state[g.dataset.key];
    return v ? g.querySelector(`.pk-opt[data-value="${v}"]`) : null;
  };

  const paint = () => {
    let n = 0;
    groups.forEach((g) => {
      const v = state[g.dataset.key];
      g.querySelectorAll(".pk-opt").forEach((o) => {
        const on = o.dataset.value === v;
        o.classList.toggle("is-chosen", on);
        const b = o.querySelector(".pk-pick");
        if (b) { b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "اخترته" : "اختار ده"; }
      });
      const link = nav.querySelector(`a[data-for="${g.dataset.key}"]`);
      if (link) link.classList.toggle("done", Boolean(v));
      if (v) n++;
    });
    document.getElementById("pk-count").textContent = `${n}/${groups.length}`;
    document.getElementById("pk-sum-list").replaceChildren(...groups.map((g) => {
      const li = document.createElement("li");
      const o = optionOf(g);
      li.textContent = `${g.dataset.label}: ${o ? o.dataset.label : "لسه"}`;
      if (!o) li.className = "miss";
      return li;
    }));
    applyFrames();
  };

  const notes = document.getElementById("pk-notes");
  if (notes) {
    notes.value = state.notes || "";
    notes.addEventListener("input", () => { state.notes = notes.value; save(); });
  }

  const summaryText = () => {
    const lines = ["اختياراتي لموكيت السريع (الجولة الثالثة):", ...groups.map((g, i) => {
      const o = optionOf(g);
      return `${i + 1}. ${g.dataset.label}: ${o ? o.dataset.label : "لسه"}`;
    })];
    if (state.notes && state.notes.trim()) lines.push(`ملاحظات: ${state.notes.trim()}`);
    return lines.join("\n");
  };

  const toast = (msg) => {
    const t = document.getElementById("pk-toast");
    t.textContent = msg; t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1800);
  };

  const replay = (root) => root.querySelectorAll("[data-play]").forEach((el) => {
    el.classList.remove("play"); void el.offsetWidth; el.classList.add("play");
  });

  document.addEventListener("click", (e) => {
    const pick = e.target.closest(".pk-pick");
    if (pick) {
      const opt = pick.closest(".pk-opt"); const g = pick.closest(".pk-group");
      state[g.dataset.key] = state[g.dataset.key] === opt.dataset.value ? undefined : opt.dataset.value;
      save(); paint(); return;
    }
    const view = e.target.closest("[data-set-view]");
    if (view) {
      document.body.dataset.view = view.dataset.setView;
      document.querySelectorAll("[data-set-view]").forEach((b) => b.setAttribute("aria-pressed", String(b === view)));
      return;
    }
    const again = e.target.closest("[data-replay]");
    if (again) { replay(again.closest(".pk-opt")); return; }
    if (e.target.closest(".frame a[href='#']")) e.preventDefault();
  });

  document.getElementById("pk-copy").addEventListener("click", async () => {
    const text = summaryText();
    try { await navigator.clipboard.writeText(text); toast("اتنسخت، الصقها في الشات"); }
    catch { window.prompt("انسخ النص ده:", text); }
  });

  // Play-once animations start when they scroll into view.
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("play"); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll("[data-play]").forEach((el) => io.observe(el));

  // Some photos have no 828/1200 size: fall back to 480.
  const fallback = (img) => {
    const src = img.getAttribute("src") || "";
    if (/-(828|1200|1920)\.webp$/.test(src)) img.src = src.replace(/-(828|1200|1920)\.webp$/, "-480.webp");
  };
  document.querySelectorAll("img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("loading") !== "lazy") fallback(img);
    else img.addEventListener("error", () => fallback(img), { once: true });
  });

  paint();
})();
