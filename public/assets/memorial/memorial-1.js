/* LPAL memorial page: photos push in with the scroll, text dissolves in, farewell scene. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // text: dissolve in once it comes into view
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".m-reveal").forEach(el => io.observe(el));

  if (reduce) { document.getElementById("m-end")?.classList.add("show"); return; }

  // photos: --p goes from 0 (just entering) to 1 (settled) as you scroll down
  const photos = [...document.querySelectorAll(".m-ph")];
  const end = document.getElementById("m-end");
  const ease = t => 1 - Math.pow(1 - t, 3);
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight;
    photos.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
      el.style.setProperty("--p", ease(t).toFixed(4));
    });
    if (end) {
      const r = end.getBoundingClientRect();
      const e = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      end.style.setProperty("--e", e.toFixed(4));
      end.classList.toggle("show", e > 0.6);
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  update();
})();
