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

/* English / French switch (for Ethan's family). ?lang=fr opens the page in French;
   a French browser opens it in French too. The choice is remembered on this device. */
(() => {
  const FR = {
  "back": "Retour à LPAL",
  "kicker": "En mémoire de",
  "sub": "Athlète de bras de fer <i></i> France",
  "quote": "Certains athlètes n’ont besoin que de quelques instants sur scène pour laisser un héritage qui vivra pour toujours.",
  "i1": "Nous avons eu l’honneur et le privilège de connaître Ethan et de partager avec lui deux événements inoubliables. Même si le temps passé ensemble a été bien trop court, les souvenirs qu’il nous a laissés resteront à jamais dans nos cœurs.",
  "i2": "Il est monté sur scène avec un sourire capable d’illuminer toute la salle, il a tiré de tout son cœur, et il en est reparti porté par l’amour, le respect et les acclamations de toute une salle.",
  "i3": "Ethan était bien plus qu’un athlète sur notre scène. Il est devenu un membre de notre famille, une part de notre histoire, et il fera pour toujours partie de la Lion Pride.",
  "i4": "C’est bien plus qu’une histoire de force. C’est une histoire de cœur, de courage, et celle d’un jeune homme qui a profondément marqué tous ceux qui ont eu le privilège de le connaître.",
  "i5": "Voici l’histoire d’Ethan Lovei.",
  "ch1": "Chapitre I",
  "ch1m": "3 mai 2025 <i></i> Stage3, Vienne",
  "ch1t": "Sa première fois sur la scène de LPAL. Dans la catégorie poids légers, Ethan a affronté Nemanja Milanovic et l’a poussé jusqu’au bout : cinq manches, un duel décidé 3:2.",
  "c1": "<b>L’entrée</b>Ses premiers pas sur la grande scène",
  "c2": "<b>Face à face</b><p>Le sourire aux lèvres à la table, en plein combat contre Nemanja Milanovic.</p>",
  "c3": "<b>Une force tranquille</b><p>Calme et humble, il dégageait une intensité intérieure palpable pour tous ceux qui l’entouraient.</p>",
  "l1": "Cinq manches. Ce soir-là, il a tout donné sur la table.",
  "c4": "<b>Avec le cœur</b>Une interview d’après-combat pleine d’émotion, qui nous a tous touchés en plein cœur. Ce soir-là, nous avons compris qu’il était quelqu’un de vraiment exceptionnel.",
  "ch2": "Chapitre II",
  "ch2m": "31 janvier 2026 <i></i> Stage3, Vienne",
  "ch2t": "Ethan est revenu à Vienne, les couleurs de la France sur la manche. Face à Sup1nator, il a tout donné et s’est imposé 3:0.",
  "c5": "<b>Le retour</b>Son entrée sur la scène LPAL 3",
  "l2": "Cette énergie, c’était Ethan.",
  "c6": "<b>Notre champion pour toujours</b>Ethan a remporté le plus beau des titres : il a gagné nos cœurs, et il restera à jamais notre champion.",
  "c7": "<b>3:0</b>La victoire, avec son père juste derrière lui",
  "l3": "Son père était toujours à ses côtés : son plus grand soutien et sa plus grande source d’inspiration dans ce sport.",
  "l4": "Un sourire chaleureux, un grand cœur, et toute une salle derrière lui.",
  "e1": "Même si tu n’es plus à nos côtés, tu vivras pour toujours dans nos cœurs. Ton esprit, ta force et les souvenirs que tu nous laisses feront toujours partie de nous.",
  "e2": "Une fois Lion, toujours Lion.",
  "e3": "À jamais aimé. À jamais regretté. À jamais membre de la Lion Pride."
};
  const META = {
    en: { title: "In memory of Ethan Lovei | LPAL", lang: "en" },
    fr: { title: "En mémoire d’Ethan Lovei | LPAL", lang: "fr" }
  };
  const els = [...document.querySelectorAll("[data-i18n]")];
  els.forEach(el => { el.dataset.en = el.innerHTML; });
  const btns = [...document.querySelectorAll(".m-lang button")];
  const set = (lang, save) => {
    els.forEach(el => { const fr = FR[el.dataset.i18n]; el.innerHTML = lang === "fr" && fr ? fr : el.dataset.en; });
    document.documentElement.lang = META[lang].lang;
    document.title = META[lang].title;
    btns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    if (save) { try { localStorage.setItem("lpal-memorial-lang", lang); } catch (e) {} }
  };
  btns.forEach(b => b.addEventListener("click", () => set(b.dataset.lang, true)));
  let start = "en";
  const q = new URLSearchParams(location.search).get("lang");
  let saved = null; try { saved = localStorage.getItem("lpal-memorial-lang"); } catch (e) {}
  if (q === "fr" || q === "en") start = q;
  else if (saved === "fr" || saved === "en") start = saved;
  else if (/^fr\b/i.test(navigator.language || "")) start = "fr";
  if (start !== "en") set(start, false);
})();

/* retry photos that fail to load (weak mobile connection) */
document.addEventListener("error", e => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement)) return;
  const n = +(img.dataset.retry || 0);
  if (n >= 4) return;
  img.dataset.retry = n + 1;
  setTimeout(() => {
    const bust = "r=" + Date.now();
    if (img.srcset) img.srcset = img.srcset.replace(/\.webp(\?r=\d+)?/g, ".webp?" + bust);
    img.src = img.src.split("?")[0] + "?" + bust;
  }, 500 * (n + 1));
}, true);
