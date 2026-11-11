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
