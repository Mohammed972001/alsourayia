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
