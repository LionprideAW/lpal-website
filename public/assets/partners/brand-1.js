/* ==========================================================
   LPAL 4 brand page (one page per brand, e.g. partners-lpal4-levelup.html).
   Everything brand-specific is in window.BRAND inside the HTML file.
   Table, jersey, dashboard and photo viewer come from the main partner page.
   ========================================================== */
(function () {
"use strict";
const B = window.BRAND;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const eur = n => n === null || n === undefined ? "Preis auf Anfrage" : n.toLocaleString("de-DE") + " €";

/* ---------- brand name + logo everywhere ---------- */
$$("[data-brand]").forEach(el => { el.textContent = B[el.dataset.brand] || B.name; });
$$("[data-brand-logo]").forEach(el => { el.src = B.logo; el.alt = B.name; });
$("#b-mail").href = "mailto:" + B.email; $("#b-mail").textContent = B.email;
$("#b-wa").href = "https://wa.me/" + B.whatsapp.replace(/\D/g, "");

/* ---------- header + hero video ---------- */
const bar = $("#p-bar");
addEventListener("scroll", () => bar.classList.toggle("solid", scrollY > 40), { passive: true });
const vid = $("#p-video");
vid.src = matchMedia("(max-width: 820px)").matches ? "assets/video/lpal-opener-mobile.mp4" : "assets/video/lpal-opener.mp4";
vid.play().catch(() => {});

/* ---------- most watched YouTube video (click to load) ---------- */
const VIDEOS = [{ id: "tLKV5l6-uYM", t: "Larratt vs Toman · LPAL 3", views: "240.000 Views auf YouTube" }];
$("#p-videos").innerHTML = VIDEOS.map(v => `<div class="p-vid-wrap"><button class="p-vid" data-id="${v.id}" style="background-image:url('https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg'),url('https://i.ytimg.com/vi/${v.id}/hqdefault.jpg')"><span class="p-play"></span><span class="p-vid-t">${esc(v.t)}</span><span class="p-vid-views">${esc(v.views)}</span></button>
  <a class="p-vid-link" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Auf YouTube ansehen &rarr;</a></div>`).join("");
$$(".p-vid").forEach(b => b.addEventListener("click", () => {
  b.outerHTML = `<div class="p-vid p-vid-on"><iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.id}?autoplay=1&rel=0" title="${esc(b.querySelector(".p-vid-t").textContent)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
}));

/* ==========================================================
   SHOP: cards, cart, presented-by tip, offer by email
   ========================================================== */
const P = B.presented;
const ITEMS = B.groups.flatMap(g => g.items);
const sel = new Set();
const isPresented = () => sel.has(P.id);
const total = () => isPresented() ? P.price : ITEMS.filter(i => sel.has(i.id)).reduce((s, i) => s + (i.price || 0), 0);
const allItemsSum = ITEMS.reduce((s, i) => s + (i.price || 0), 0);

$("#b-incl").innerHTML = B.included.map(t => `<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>${esc(t)}</li>`).join("");
$("#b-presented").innerHTML = `<article class="b-card b-card-hero" data-id="${P.id}">
  <div><p class="b-card-tag">Komplettpaket · exklusiv</p><h3>${esc(P.name)}</h3>
  <ul class="b-card-list">${P.items.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
  <div class="b-card-side"><p class="b-price">${eur(P.price)}</p><p class="b-price-note">netto zzgl. MwSt.${allItemsSum > P.price ? ` · statt ${eur(allItemsSum)} einzeln` : ""}</p>
  <button type="button" class="p-btn p-btn-red b-add" data-add="${P.id}">Zum Plan hinzufügen</button></div>
</article>`;
$("#b-groups").innerHTML = B.groups.map(g => `<h3 class="b-group-h">${esc(g.name)}</h3><div class="b-grid">${g.items.map(i => `<article class="b-card" data-id="${i.id}">
  <h4>${esc(i.name)}${i.tag ? ` <span class="b-card-tag-inl">${esc(i.tag)}</span>` : ""}</h4>
  <p class="b-card-t">${esc(i.text)}</p>
  <div class="b-card-foot"><p class="b-price${i.price === null ? " b-price-ask" : ""}">${eur(i.price)}</p><button type="button" class="p-btn p-btn-outline b-add" data-add="${i.id}">Zum Plan hinzufügen</button></div>
</article>`).join("")}</div>`).join("");

const cartBtn = $("#b-cart-btn"), cart = $("#b-cart");
const render = () => {
  const pres = isPresented();
  $$(".b-add").forEach(b => {
    const id = b.dataset.add, on = sel.has(id), incl = pres && id !== P.id;
    b.classList.toggle("on", on); b.disabled = incl;
    b.textContent = incl ? "Im Komplettpaket enthalten" : on ? "Hinzugefügt ✓" : "Zum Plan hinzufügen";
    b.closest(".b-card").classList.toggle("is-on", on || incl);
  });
  const chosen = pres ? [P] : ITEMS.filter(i => sel.has(i.id));
  const t = total();
  $("#b-cart-n").textContent = chosen.length;
  $("#b-cart-total").textContent = eur(t);
  $("#b-cart-total2").textContent = eur(t);
  cartBtn.classList.toggle("has", chosen.length > 0);
  $("#b-cart-list").innerHTML =
    B.included.map(x => `<li class="b-li-incl"><span>${esc(x)}<em>Inklusive</em></span><b>0 €</b></li>`).join("") +
    (chosen.length ? chosen.map(i => `<li><span>${esc(i.name)}${i.tag ? ` · ${esc(i.tag)}` : ""}${i.id === P.id ? `<em>Alle Pakete inklusive</em>` : ""}</span><b>${eur(i.price)}</b><button type="button" class="b-li-x" data-rm="${i.id}" aria-label="${esc(i.name)} entfernen">&times;</button></li>`).join("")
      : `<li class="b-li-empty">Noch nichts ausgewählt. Füge Pakete mit „Zum Plan hinzufügen“ hinzu.</li>`);
  const tip = $("#b-tip");
  tip.hidden = pres || t <= P.threshold;
  if (!tip.hidden) tip.innerHTML = `<p><b>Tipp:</b> Mit ‚${esc(P.name)}‘ bekommst du alles für ${eur(P.price)} – plus Eventname und Erwähnungen.</p><button type="button" class="p-btn p-btn-white p-btn-sm" id="b-switch">Zu Presented by wechseln</button>`;
  const sw = $("#b-switch"); if (sw) sw.addEventListener("click", () => { sel.clear(); sel.add(P.id); render(); });
  $$("[data-rm]").forEach(x => x.addEventListener("click", () => { sel.delete(x.dataset.rm); render(); }));
  $("#b-send").href = mailto(chosen, t);
};
const toggle = id => {
  if (id === P.id) { if (sel.has(id)) sel.delete(id); else { sel.clear(); sel.add(id); } }
  else if (!isPresented()) sel.has(id) ? sel.delete(id) : sel.add(id);
  render();
};
$$(".b-add").forEach(b => b.addEventListener("click", () => {
  const was = sel.has(b.dataset.add); toggle(b.dataset.add);
  if (!was) { cartBtn.classList.remove("bump"); void cartBtn.offsetWidth; cartBtn.classList.add("bump"); }
}));

function mailto(chosen, t) {
  const line = i => `- ${i.name}${i.tag ? " (" + i.tag + ")" : ""}: ${eur(i.price)}`;
  const body = [
    "Hallo LPAL-Team,", "",
    `wir möchten folgendes Paket für LPAL 4 (9. Jänner 2027, Motorworld Köln) anfragen:`, "",
    ...(chosen.length ? chosen.map(line) : ["- (noch keine Pakete ausgewählt)"]),
    ...(chosen.some(i => i.id === P.id) ? ["  (alle Pakete der Seite inklusive)"] : []), "",
    "Bei jeder Buchung inklusive:", ...B.included.map(x => "- " + x + ": 0 €"), "",
    `Gesamt netto zzgl. MwSt.: ${eur(t)}`,
    ...(chosen.some(i => i.price === null) ? ["(zuzüglich der Pakete mit Preis auf Anfrage)"] : []), "",
    "Name:", "Telefon:", "", "Viele Grüße", B.name
  ].join("\n");
  return `mailto:${B.email}?subject=${encodeURIComponent(`Angebot LPAL 4 x ${B.name}`)}&body=${encodeURIComponent(body)}`;
}

const openCart = () => { cart.hidden = false; cartBtn.setAttribute("aria-expanded", "true"); document.documentElement.classList.add("b-noscroll"); };
const closeCart = () => { cart.hidden = true; cartBtn.setAttribute("aria-expanded", "false"); document.documentElement.classList.remove("b-noscroll"); };
cartBtn.addEventListener("click", openCart);
$$("[data-close]", cart).forEach(x => x.addEventListener("click", closeCart));
addEventListener("keydown", e => { if (e.key === "Escape" && !cart.hidden) closeCart(); });
render();

/* ==========================================================
   3D TABLE (same model as the main partner page). Drag to spin, pick a zone.
   ========================================================== */
const ZONES = [
  { id: "side-short", name: "Kurze Seiten", text: "Die beiden Enden des Tisches, direkt unter den Griffen. Seite A zeigt zur Hauptkamera: der sichtbarste Logo-Platz des Abends." },
  { id: "side-long", name: "Lange Seiten", text: "Zwei Logos auf jeder langen Seite, so platziert, dass die Athleten sie nie verdecken. In den Seitenaufnahmen und für das Publikum sichtbar." },
  { id: "corner", name: "Ecken oben", text: "Vier Plätze auf der Tischplatte, einer in jeder Ecke. Von oben in jeder Nahaufnahme zu sehen." },
  { id: "center", name: "Mitte", text: "Die Mitte der Tischplatte auf beiden Athletenseiten, in jeder Nahaufnahme. Hier steht auch der Chalk-Eimer des Official Chalk Partners." },
  { id: "legs", name: "Tischbeine", text: "Die 50-cm-Manschetten an allen vier Tischbeinen." },
  { id: "floor", name: "Boden", text: "Der Boden rund um den Tisch, in jeder Totale jedes Matches zu sehen." }
];
$("#p-zones").innerHTML = ZONES.map((z, i) => `<button class="p-zone${i ? "" : " on"}" data-z="${z.id}">${esc(z.name)}</button>`).join("");
(function table3d() {
  const wrap = $("#p-3d");
  // box(w,h,d, x,y,z, faces, extra transform). y is negative upwards (CSS).
  const box = (w, h, d, x, y, z, f = {}, extra = "") => {
    const faces = [["front", w, h, d / 2], ["back", w, h, d / 2], ["right", d, h, w / 2], ["left", d, h, w / 2], ["top", w, d, h / 2], ["bottom", w, d, h / 2]]
      .map(([n, fw, fh, off]) => {
        const rot = { front: "", back: "rotateY(180deg)", right: "rotateY(90deg)", left: "rotateY(-90deg)", top: "rotateX(90deg)", bottom: "rotateX(-90deg)" }[n];
        const o = f[n] || f.all || {};
        return `<div class="t-face t-${n} ${o.cls || ""}" ${o.zone ? `data-zone="${o.zone}"` : ""} ${o.spot ? `data-spot="${o.spot}"` : ""} style="width:${fw}px;height:${fh}px;margin:${-fh / 2}px 0 0 ${-fw / 2}px;transform:${rot} translateZ(${off}px)">${o.html || ""}</div>`;
      }).join("");
    return `<div class="t-box" style="transform:translate3d(${x}px,${y}px,${z}px) ${extra}">${faces}</div>`;
  };
  const L = (t, cls = "") => `<span class="t-logo ${cls}"><b>${t}</b></span>`;
  // Real competition table (1 cm = 7 px): top 92 x 66 cm, 10 cm thick, 101 cm high, 50 cm leg sleeves, H frame.
  const W = 644, D = 460, TH = 70, TOPY = -880;
  let h = `<div class="t-floor" data-zone="floor"><span>Boden</span><span>Boden</span></div>`;
  const top = `<div class="t-top">
      <div class="t-spot t-c1" data-zone="corner" data-spot="t-c1"></div><div class="t-spot t-c2" data-zone="corner" data-spot="t-c2"></div>
      <div class="t-spot t-c3" data-zone="corner" data-spot="t-c3"></div><div class="t-spot t-c4" data-zone="corner" data-spot="t-c4"></div>
      <div class="t-spot t-mid t-mid-f" data-zone="center"></div><div class="t-spot t-mid t-mid-b" data-zone="center"></div>
    </div>`;
  const longSide = id => ({ zone: "side-long", cls: "t-side t-long", html: `<span class="t-sidespot" data-spot="${id}a">${L("Dein Logo")}</span><span class="t-sidespot" data-spot="${id}b">${L("Dein Logo")}</span>` });
  const side = (zone, spot, t) => ({ zone, spot, cls: "t-side", html: `<span class="t-sidespot">${L(t)}</span>` });
  h += box(W, TH, D, 0, TOPY + TH / 2, 0, { top: { cls: "t-mat", html: top },
    right: side("side-short", "t-cam1", "Seite A · Kamera 1"), left: side("side-short", "t-cam2", "Seite B"),
    front: longSide("t-long1"), back: longSide("t-long2"), bottom: { cls: "t-black" } });
  // legs: thin tube, 50 cm sleeve (logo spot) right under the top
  const legTop = TOPY + TH, legH = -legTop, lx = W / 2 - 42, lz = D / 2 - 38;
  [[-1, 1], [1, 1], [1, -1], [-1, -1]].forEach(([sx, sz], i) => {
    h += box(26, legH, 26, sx * lx, legTop / 2, sz * lz, { all: { cls: "t-leg" } });
    h += box(38, 380, 38, sx * lx, legTop + 25 + 190, sz * lz, { all: { zone: "legs", cls: "t-sleeve", html: L("Dein Logo", "t-vert") }, top: { cls: "t-black" }, bottom: { cls: "t-black" } });
  });
  // H frame on the floor
  [-1, 1].forEach(sx => h += box(28, 28, 2 * lz + 28, sx * lx, -14, 0, { all: { cls: "t-leg" } }));
  h += box(2 * lx, 28, 28, 0, -14, 0, { all: { cls: "t-leg" } });
  // pads (no logos): two gold elbow pads on the centre line, two black side pads angled next to the pegs
  [[-34, -82], [34, 82]].forEach(([x, z]) => h += box(126, 40, 126, x, TOPY - 20, z, { all: { cls: "t-gold" } }));
  [[-1, 30], [1, -30]].forEach(([s, z]) => h += box(190, 66, 44, s * 185, TOPY - 33, z, { all: { cls: "t-padblack" } }, "rotateY(-38deg)"));
  // metal pegs at both short ends (no logos)
  [-1, 1].forEach(s => {
    h += box(20, 120, 20, s * (W / 2 - 38), TOPY - 60, 0, { all: { cls: "t-peg" } });
    h += box(30, 14, 30, s * (W / 2 - 38), TOPY - 121, 0, { all: { cls: "t-peg" } });
    h += box(30, 10, 30, s * (W / 2 - 38), TOPY - 5, 0, { all: { cls: "t-peg" } });
  });
  wrap.insertAdjacentHTML("afterbegin", `<div class="t-stage"><div class="t-rig" id="t-rig">${h}</div></div>`);

  const rig = $("#t-rig");
  let cur = "side-short";
  const select = id => {
    cur = id; const z = ZONES.find(z => z.id === id);
    $$("#p-zones .p-zone").forEach(b => b.classList.toggle("on", b.dataset.z === id));
    $$("[data-zone]", wrap).forEach(el => el.classList.toggle("hl", el.dataset.zone === id));
    $("#p-zone-info").innerHTML = `<b>${esc(z.name)}</b> ${esc(z.text)}`;
  };
  $$("#p-zones .p-zone").forEach(b => b.addEventListener("click", () => { select(b.dataset.z); idle = 0; }));
  select(cur);
  let ry = -32, rx = -24, vel = 0, drag = false, lx0 = 0, ly0 = 0, moved = 0, idle = 0;
  wrap.addEventListener("pointerdown", e => { drag = true; lx0 = e.clientX; ly0 = e.clientY; moved = 0; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", e => {
    if (!drag) return;
    const dx = e.clientX - lx0, dy = e.clientY - ly0; lx0 = e.clientX; ly0 = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    vel = dx * 0.3; ry += vel; rx = Math.max(-75, Math.min(-6, rx - dy * 0.25)); idle = 0;
  });
  wrap.addEventListener("pointerup", e => {
    drag = false;
    if (moved < 6) { wrap.releasePointerCapture(e.pointerId); const el = document.elementFromPoint(e.clientX, e.clientY); const z = el && el.closest("[data-zone]"); if (z) { select(z.dataset.zone, z.dataset.spot || (el.closest("[data-spot]") || {}).dataset?.spot); idle = 0; } }
  });
  wrap.addEventListener("pointercancel", () => { drag = false; });
  const fit = () => rig.style.setProperty("--s", Math.min(wrap.clientWidth / 1150, wrap.clientHeight / 1250).toFixed(3));
  addEventListener("resize", fit); fit();
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(wrap);
  const loop = () => {
    requestAnimationFrame(loop); if (!visible) return;
    if (!drag) { vel *= 0.9; ry += vel; if (++idle > 360) ry += 0.025; }
    rig.style.transform = `translate(-50%,-50%) scale(var(--s)) translateY(480px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  loop();
})();


/* ==========================================================
   3D JERSEY (same turntable as the main partner page)
   ========================================================== */
(function jersey3d() {
  const wrap = $("#p-jr"); if (!wrap) return;
  const VIEWS = [
    { img: "front", spots: [["j-front", 50, 47, 26, 5, 0], ["j-shr", 15, 23, 12, 6, -35], ["j-shl", 85, 23, 12, 6, 35]] },
    { img: "side-right", spots: [["j-shr", 35, 24, 16, 6, -60], ["j-front", 62, 46, 14, 5, 0]] },
    { img: "back", name: true, spots: [["j-back", 50, 47, 26, 5, 0], ["j-shl", 15, 23, 12, 6, -35], ["j-shr", 85, 23, 12, 6, 35]] },
    { img: "side-left", spots: [["j-shl", 50, 25, 18, 6, 55]] }
  ];
  const HOLD = 2000, FADE = 900;
  wrap.innerHTML = VIEWS.map((v, k) => `<div class="jr-slide${k ? "" : " on"}" data-k="${k}"><div class="jr-box"><img src="assets/partners/jersey/${v.img}.webp" alt="" draggable="false">
      ${v.name ? `<span class="jr-name">NAME</span>` : ""}
      ${v.spots.map(([id, x, y, w, h, r]) => `<span class="jr-spot" data-j="${id}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;transform:translate(-50%,-50%) rotate(${r}deg)"><b>Logo</b></span>`).join("")}</div></div>`).join("")
    + `<div class="jr-dots">${VIEWS.map((v, k) => `<button type="button" class="jr-dot${k ? "" : " on"}" data-go="${k}" aria-label="${["Vorne", "Seite", "Rücken", "Andere Seite"][k]}"></button>`).join("")}</div>`;

  const slides = $$(".jr-slide", wrap), dots = $$(".jr-dot", wrap);
  const OPTS = [
    { id: "j-front", name: "Brust vorne", text: "Mittig auf der Brust: in jedem Walkout, am Tisch und auf dem Siegerfoto." },
    { id: "j-back", name: "Rücken", text: "Auf dem Rücken über dem Athletennamen, sichtbar beim Walkout und in den Seitenaufnahmen." },
    { id: "j-shr", name: "Schulter rechts", text: "Auf der rechten Schulter, sichtbar in jeder Nahaufnahme am Tisch." },
    { id: "j-shl", name: "Schulter links", text: "Auf der linken Schulter, sichtbar in jeder Nahaufnahme am Tisch." }
  ];
  $("#p-jr-opts").innerHTML = OPTS.map(o => `<button class="p-zone" data-jo="${o.id}">${esc(o.name)}</button>`).join("");
  let cur = "j-front", idx = 0, pausedUntil = 0;
  const render = () => {
    const o = OPTS.find(x => x.id === cur);
    $$(".p-zone[data-jo]").forEach(b => b.classList.toggle("on", b.dataset.jo === cur));
    $$(".jr-spot", wrap).forEach(el => el.classList.toggle("hl", el.dataset.j === cur));
    $("#p-jr-info").innerHTML = `<b>${esc(o.name)}</b> ${esc(o.text)}`;
  };
  const show = k => {
    idx = (k + VIEWS.length) % VIEWS.length;
    slides.forEach((el, n) => { if (n === idx) { el.classList.remove("on"); void el.offsetWidth; el.classList.add("on"); } else el.classList.remove("on"); });
    dots.forEach((d, n) => d.classList.toggle("on", n === idx));
  };
  const tick = () => { if (Date.now() >= pausedUntil) show(idx + 1); setTimeout(tick, HOLD + FADE); };
  const hold = (ms = 8000) => { pausedUntil = Date.now() + ms; };
  const BEST = { "j-front": 0, "j-shr": 1, "j-back": 2, "j-shl": 3 };
  $$(".p-zone[data-jo]").forEach(b => b.addEventListener("click", () => { cur = b.dataset.jo; render(); show(BEST[cur] ?? 0); hold(); }));
  dots.forEach(d => d.addEventListener("click", () => { show(+d.dataset.go); hold(); }));
  wrap.addEventListener("click", e => { const sp = e.target.closest(".jr-spot"); if (sp) { cur = sp.dataset.j; render(); hold(); } });
  wrap.addEventListener("pointerenter", () => hold(4000));
  let started = false;
  new IntersectionObserver(es => { if (es[0].isIntersecting && !started) { started = true; setTimeout(tick, HOLD + FADE); } }).observe(wrap);
  render();
})();

/* ==========================================================
   AUDIENCE DASHBOARD (counts up when it scrolls into view)
   ========================================================== */
(function dashboard() {
  const board = document.getElementById("d-board"); if (!board) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // daily views chart (values traced from the Instagram screenshot, 19 Jul - 16 Oct)
  const chart = document.getElementById("d-chart");
  const draw = () => {
    const data = JSON.parse(chart.dataset.views), W = chart.clientWidth, H = chart.clientHeight;
    const L = 40, R = 8, T = 14, B = 26, max = 232000;
    const x = i => L + (W - L - R) * i / (data.length - 1), y = v => T + (H - T - B) * (1 - Math.min(v, max) / max);
    const pts = data.map((v, i) => [x(i), y(v)]);
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {           // smooth curve
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2;
      d += ` C${cx.toFixed(1)},${y0.toFixed(1)} ${cx.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
    }
    const area = `${d} L${x(data.length - 1).toFixed(1)},${y(0)} L${L},${y(0)} Z`;
    const grid = [0, 116000, 232000].map(v => `<line class="d-grid-l" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="d-ylab" x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v ? Math.round(v / 1000) + "K" : "0"}</text>`).join("");
    const xl = JSON.parse(chart.dataset.x || '[["19 Jul",0],["1 Sep",44],["16 Oct",89]]').map(([t, i], k) => `<text class="d-xlab" x="${x(i)}" y="${H - 6}" text-anchor="${k === 0 ? "start" : k === 2 ? "end" : "middle"}">${t}</text>`).join("");
    const start = data.findIndex(v => v > 60000) - 1, peak = data.indexOf(Math.max(...data));
    const mark = start > 0 ? `<g class="d-mark"><line x1="${x(start)}" x2="${x(start)}" y1="${T}" y2="${y(0)}"/></g>` : "";
    chart.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-label="Views pro Tag, letzte 30 Tage" role="img">
      <defs><linearGradient id="dGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e1261c" stop-opacity=".45"/><stop offset="1" stop-color="#e1261c" stop-opacity="0"/></linearGradient></defs>
      ${grid}${xl}<path class="d-area" d="${area}"/><path class="d-line" d="${d}"/>${mark}
      <circle class="d-peak" cx="${x(peak)}" cy="${y(data[peak])}" r="4.5"/></svg>`;
    const line = chart.querySelector(".d-line");
    line.style.setProperty("--len", Math.ceil(line.getTotalLength()));
  };
  draw();
  let rw = 0; addEventListener("resize", () => { cancelAnimationFrame(rw); rw = requestAnimationFrame(draw); });

  // count-up numbers
  const fmt = (n, dec) => dec ? n.toFixed(dec).replace(".", ",") : Math.round(n).toLocaleString("de-DE");
  const countUp = () => {
    const els = [...board.querySelectorAll("[data-n]")], t0 = performance.now(), dur = 2000;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      els.forEach(el => { const n = +el.dataset.n, dec = +(el.dataset.dec || 0); el.textContent = fmt(n * ease(p), dec) + (el.dataset.suf || ""); });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const go = () => { board.classList.add("in"); if (reduce) { board.querySelectorAll("[data-n]").forEach(el => { el.textContent = fmt(+el.dataset.n, +(el.dataset.dec || 0)) + (el.dataset.suf || ""); }); } else countUp(); };
  if (!("IntersectionObserver" in window)) return go();
  const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: 0.12 });
  io.observe(board);
})();


/* ---------- retry photos that fail to load (up to 4 times, with a short pause) ---------- */
document.addEventListener("error", e => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || img.classList.contains("p-flag")) return;
  const n = +(img.dataset.retry || 0);
  if (n >= 4) return;
  img.dataset.retry = n + 1;
  setTimeout(() => { img.src = img.src.split("?")[0] + "?r=" + Date.now(); }, 400 * (n + 1));
}, true);


/* ==========================================================
   PHOTO VIEWER: click a photo to open it full screen.
   Arrows / swipe to switch, click or scroll to zoom, drag to move around.
   ========================================================== */
(function viewer() {
  const GROUPS = [".p-action-grid", ".p-cred-grid", ".p-gallery", ".p-expo-grid", ".p-dash-proof"];
  document.body.insertAdjacentHTML("beforeend", `
  <div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Fotoansicht">
    <div class="lb-stage" id="lb-stage"><img id="lb-img" alt=""></div>
    <button class="lb-btn lb-close" id="lb-close" aria-label="Schließen">&times;</button>
    <button class="lb-btn lb-prev" id="lb-prev" aria-label="Vorheriges Foto"><svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8" fill="none" stroke="currentColor" stroke-width="2.5"/></svg></button>
    <button class="lb-btn lb-next" id="lb-next" aria-label="Nächstes Foto"><svg viewBox="0 0 24 24"><path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.5"/></svg></button>
    <div class="lb-bar"><p id="lb-cap"></p><div class="lb-zoom"><button class="lb-btn" id="lb-out" aria-label="Verkleinern">&minus;</button><button class="lb-btn" id="lb-in" aria-label="Vergrößern">+</button></div><span id="lb-count"></span></div>
  </div>`);
  const lb = $("#lb"), stage = $("#lb-stage"), img = $("#lb-img");
  let list = [], idx = 0, z = 1, tx = 0, ty = 0;
  const apply = (anim = true) => { img.style.transition = anim ? "transform .3s cubic-bezier(.2,.8,.2,1)" : "none"; img.style.transform = `translate(${tx}px,${ty}px) scale(${z})`; lb.classList.toggle("zoomed", z > 1); };
  const clamp = () => {
    const r = stage.getBoundingClientRect(), w = img.offsetWidth * z, h = img.offsetHeight * z;
    const mx = Math.max(0, (w - r.width) / 2), my = Math.max(0, (h - r.height) / 2);
    tx = Math.max(-mx, Math.min(mx, tx)); ty = Math.max(-my, Math.min(my, ty));
  };
  const zoomTo = (nz, cx, cy) => {
    const r = stage.getBoundingClientRect(); nz = Math.max(1, Math.min(4, nz));
    const px = (cx ?? r.left + r.width / 2) - (r.left + r.width / 2), py = (cy ?? r.top + r.height / 2) - (r.top + r.height / 2);
    tx = px - (px - tx) * nz / z; ty = py - (py - ty) * nz / z; z = nz;
    if (z === 1) { tx = 0; ty = 0; } clamp(); apply();
  };
  const show = i => {
    idx = (i + list.length) % list.length; const f = list[idx];
    const im = f.querySelector("img, video"); const src = im.tagName === "VIDEO" ? im.poster : im.currentSrc || im.src;
    z = 1; tx = 0; ty = 0; apply(false); img.src = src.split("?")[0]; img.alt = im.alt || "";
    const cap = f.querySelector("figcaption, h3"); $("#lb-cap").textContent = cap ? cap.textContent.trim() : "";
    $("#lb-count").textContent = `${idx + 1} / ${list.length}`;
    lb.classList.toggle("single", list.length < 2);
  };
  const open = (group, item) => {
    list = $$(":scope > figure, :scope > article", group).filter(f => f.querySelector("img, video") && !f.querySelector("video"));
    if (!list.length) return; lb.hidden = false; document.documentElement.style.overflow = "hidden"; show(Math.max(0, list.indexOf(item)));
  };
  const close = () => { lb.hidden = true; document.documentElement.style.overflow = ""; };
  GROUPS.forEach(g => $$(g).forEach(group => $$(":scope > figure, :scope > article", group).forEach(f => {
    if (f.querySelector("video") || !f.querySelector("img")) return;
    f.classList.add("lb-able"); f.addEventListener("click", () => open(group, f));
  })));
  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => show(idx - 1));
  $("#lb-next").addEventListener("click", () => show(idx + 1));
  $("#lb-in").addEventListener("click", () => zoomTo(z + 1));
  $("#lb-out").addEventListener("click", () => zoomTo(z - 1));
  addEventListener("keydown", e => { if (lb.hidden) return;
    if (e.key === "Escape") close(); if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "+" || e.key === "=") zoomTo(z + 1); if (e.key === "-") zoomTo(z - 1); });
  stage.addEventListener("wheel", e => { e.preventDefault(); zoomTo(z * (e.deltaY < 0 ? 1.25 : 0.8), e.clientX, e.clientY); }, { passive: false });
  // drag to pan when zoomed, swipe to switch when not, click to zoom in/out; pinch to zoom
  const pts = new Map(); let sx = 0, sy = 0, stx = 0, sty = 0, moved = 0, pinch0 = 0, z0 = 1;
  stage.addEventListener("pointerdown", e => { pts.set(e.pointerId, e); stage.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; stx = tx; sty = ty; moved = 0;
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); z0 = z; } });
  stage.addEventListener("pointermove", e => {
    if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, e);
    if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); z = Math.max(1, Math.min(4, z0 * d / pinch0)); clamp(); apply(false); moved = 99; return; }
    const dx = e.clientX - sx, dy = e.clientY - sy; moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
    if (z > 1) { tx = stx + dx; ty = sty + dy; clamp(); apply(false); } else { img.style.transition = "none"; img.style.transform = `translateX(${dx}px)`; }
  });
  const up = e => {
    if (!pts.has(e.pointerId)) return; pts.delete(e.pointerId); if (pts.size) return;
    const dx = e.clientX - sx;
    if (moved < 8) { const hit = document.elementFromPoint(e.clientX, e.clientY); if (hit === img) zoomTo(z > 1 ? 1 : 2.5, e.clientX, e.clientY); else if (z === 1) close(); else zoomTo(1); return; }
    if (z === 1) { if (Math.abs(dx) > 60 && list.length > 1) show(idx + (dx < 0 ? 1 : -1)); else apply(); }
  };
  stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
})();


})();
