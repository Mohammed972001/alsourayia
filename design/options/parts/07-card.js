// 7 · cards: on touch screens the frosted card opens its three points on tap.
(() => {
  const root = document.getElementById("g-card");
  if (!root) return;
  root.querySelectorAll(".cd-d").forEach((card) => card.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.toggle("is-open");
  }));
})();
