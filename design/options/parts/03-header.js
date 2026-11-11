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
