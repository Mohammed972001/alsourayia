// Group 13: the instalment badge opens on tap as well as on hover.
(() => {
  const g = document.getElementById("g-pay");
  if (!g) return;
  g.querySelectorAll("[data-py-c]").forEach((b) => b.addEventListener("click", () => {
    b.setAttribute("aria-expanded", String(b.getAttribute("aria-expanded") !== "true"));
  }));
})();
