/* ==========================================================
   LPAL 4 tickets page: interactive hall map + Ticket Tailor checkout.
   Edit SETTINGS and CATS below.
   ========================================================== */

const SETTINGS = {
  // Ticket Tailor checkout link for LPAL 4. While empty, "Buy" shows "Tickets on sale soon".
  checkoutUrl: "https://tickets.lionpride-armwrestling.com/checkout/view-event/id/9342604/chk/521f720ecd00d8c3cdc2925ba9f5471f/?modal_widget=true&widget=true",
  // The LPAL 4 event page on Ticket Tailor (fallback if the checkout cannot open inside our page).
  eventUrl: "https://tickets.lionpride-armwrestling.com/events/lionpridearmwrestlingleague2/2489870",
  instagram: "https://www.instagram.com/lion_pride_armwrestling_league/"
};

const CATS = {
  vip:  { name: "VIP", price: 90, color: "#d3211a",
          inc: ["First 3 rows next to the stage and the athlete walkout", "1 free drink", "1 LPAL 4 event shirt (choose your size at checkout)"] },
  gold: { name: "Gold", price: 60, color: "#c8961a",
          inc: ["Rows 4–9, close to the stage", "1 free drink"] },
  ga:   { name: "General Access", price: 35, color: "#2462c6",
          inc: ["Floor rows 10–11 on both sides of the stage, the rows behind the commentators, or tribune rows 1–5"] },
  fan:  { name: "Fan Access", price: 30, color: "#55657d",
          inc: ["Tribune rows 6–10", "Raised view of the whole venue", "Cheapest ticket"] }
};

/* ---------- hall geometry (units follow the floor plan) ---------- */
const BASE = { x: 190, y: 222, w: 1105, h: 862 };
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
// left side: 11 rows, with one free row between row 1 and the stage
const leftX = r => 352 + (11 - r) * 22.6, rightX = r => 760 + (r - 1) * 22.5;
const floorL = (half, rows) => rows.flatMap(r => range(0, 6).map(i => [leftX(r), (half === "u" ? 547 : 674) + i * 12.3, r]));
const floorR = (half, rows) => rows.flatMap(r => range(0, 6).map(i => [rightX(r), (half === "u" ? 558 : 666) + i * 12, r]));
const comm = rows => rows.flatMap(r => range(0, 9).map(j => [622 + j * 12.6, 515 - (r - 1) * 22.5, r]));
// tribune: centre aisle lines up with the centre of the stage (x 680)
const trib = (side, rows) => rows.flatMap(r => range(0, 19).map(j => [(side === "l" ? 443.5 : 701.5) + j * 11.3, 808 + (r - 1) * 22.6, r]));

const SECTIONS = [
  { id: 1,  cat: "vip",  where: "Left of the stage · upper block",  rows: [1, 3],   seats: floorL("u", range(1, 3)),   rowLab: "top" },
  { id: 2,  cat: "vip",  where: "Left of the stage · lower block",  rows: [1, 3],   seats: floorL("l", range(1, 3)),   rowLab: "bottom" },
  { id: 3,  cat: "gold", where: "Left of the stage · upper block",  rows: [4, 9],   seats: floorL("u", range(4, 9)),   rowLab: "top" },
  { id: 4,  cat: "gold", where: "Left of the stage · lower block",  rows: [4, 9],   seats: floorL("l", range(4, 9)),   rowLab: "bottom" },
  { id: 5,  cat: "ga",   where: "Left of the stage · upper block",  rows: [10, 11], seats: floorL("u", range(10, 11)), rowLab: "top" },
  { id: 6,  cat: "ga",   where: "Left of the stage · lower block",  rows: [10, 11], seats: floorL("l", range(10, 11)), rowLab: "bottom" },
  { id: 7,  cat: "vip",  where: "Right of the stage · upper block", rows: [1, 3],   seats: floorR("u", range(1, 3)),   rowLab: "top" },
  { id: 8,  cat: "vip",  where: "Right of the stage · lower block", rows: [1, 3],   seats: floorR("l", range(1, 3)),   rowLab: "bottom" },
  { id: 9,  cat: "gold", where: "Right of the stage · upper block", rows: [4, 9],   seats: floorR("u", range(4, 9)),   rowLab: "top" },
  { id: 10, cat: "gold", where: "Right of the stage · lower block", rows: [4, 9],   seats: floorR("l", range(4, 9)),   rowLab: "bottom" },
  { id: 18, cat: "ga",   where: "Right of the stage · upper block", rows: [10, 11], seats: floorR("u", range(10, 11)), rowLab: "top" },
  { id: 19, cat: "ga",   where: "Right of the stage · lower block", rows: [10, 11], seats: floorR("l", range(10, 11)), rowLab: "bottom" },
  { id: 11, cat: "ga",   where: "Behind the commentators · floor level", rows: [1, 5], seats: comm(range(1, 5)),        rowLab: "left", kind: "comm" },
  { id: 12, cat: "ga",   where: "Raised tribune · left half",       rows: [1, 5],   seats: trib("l", range(1, 5)),     rowLab: "left",  kind: "trib" },
  { id: 13, cat: "ga",   where: "Raised tribune · right half",      rows: [1, 5],   seats: trib("r", range(1, 5)),     rowLab: "right", kind: "trib" },
  { id: 14, cat: "fan",  where: "Raised tribune · left half",       rows: [6, 10],  seats: trib("l", range(6, 10)),    rowLab: "left",  kind: "trib" },
  { id: 15, cat: "fan",  where: "Raised tribune · right half",      rows: [6, 10],  seats: trib("r", range(6, 10)),    rowLab: "right", kind: "trib" }
];
SECTIONS.forEach(s => {
  const xs = s.seats.map(p => p[0]), ys = s.seats.map(p => p[1]), pad = s.kind === "trib" ? 6 : 7;
  s.box = { x: Math.min(...xs) - 5 - pad, y: Math.min(...ys) - 4.5 - pad, w: Math.max(...xs) - Math.min(...xs) + 10 + pad * 2, h: Math.max(...ys) - Math.min(...ys) + 9 + pad * 2 };
});
const catSections = k => SECTIONS.filter(s => s.cat === k);
Object.entries(CATS).forEach(([k, c]) => { c.key = k; c.seats = catSections(k).reduce((n, s) => n + s.seats.length, 0); });

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const eur = n => "€" + n;
const rowsTxt = s => s.rows[0] === s.rows[1] ? `Row ${s.rows[0]}` : `Rows ${s.rows[0]}–${s.rows[1]}`;
const svgEl = $("#t-map"), stage = $("#t-stage"), mini = $("#t-mini"), tip = $("#t-tip");

/* ---------- draw the hall ---------- */
const chair = (x, y, w = 10, h = 9) => `<rect class="chair" x="${(x - w / 2).toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w}" height="${h}" rx="2"/>`;
const rowLabels = s => {
  const rows = range(s.rows[0], s.rows[1]), b = s.box;
  return rows.map(r => {
    const pts = s.seats.filter(p => p[2] === r);
    if (s.rowLab === "top" || s.rowLab === "bottom") return `<text class="rowlab" x="${pts[0][0].toFixed(1)}" y="${(s.rowLab === "top" ? b.y - 5 : b.y + b.h + 5).toFixed(1)}">${r}</text>`;
    const y = pts[0][1];
    return `<text class="rowlab" x="${(s.rowLab === "left" ? b.x - 7 : b.x + b.w + 7).toFixed(1)}" y="${y.toFixed(1)}">R${r}</text>`;
  }).join("");
};
const secSVG = s => {
  const c = CATS[s.cat], b = s.box, lab = { vip: "VIP", gold: "GOLD", ga: "GENERAL", fan: "FAN ACCESS" }[s.cat];
  const fs = Math.min(s.kind === "trib" ? 26 : 21, (b.w - 14) / (lab.length * .56)), cx = b.x + b.w / 2, cy = b.y + b.h / 2;
  const tw = s.kind ? [9, 9] : [10, 9];
  return `<g class="sec" data-s="${s.id}" style="--c:${c.color}" tabindex="0" role="button" aria-label="${esc(c.name)} area, ${esc(s.where)}, ${eur(c.price)}">
    <rect class="sec-bg" x="${b.x.toFixed(1)}" y="${b.y.toFixed(1)}" width="${b.w.toFixed(1)}" height="${b.h.toFixed(1)}" rx="4"/>
    ${s.kind === "trib" ? range(s.rows[0], s.rows[1]).map(rw => { const y = 808 + (rw - 1) * 22.6; return `<rect class="riser" x="${b.x.toFixed(1)}" y="${(y - 11.3).toFixed(1)}" width="${b.w.toFixed(1)}" height="22.6" style="--d:${((rw - 1) * .028).toFixed(3)}"/><rect class="step" x="${b.x.toFixed(1)}" y="${(y - 11.3).toFixed(1)}" width="${b.w.toFixed(1)}" height="3.2"/>`; }).join("") : ""}
    ${s.seats.map(p => chair(p[0], p[1], tw[0], tw[1])).join("")}
    <g class="seclab" style="--fs:${fs.toFixed(1)}"><text class="n" x="${cx}" y="${cy}">${lab}</text></g>
    ${rowLabels(s)}
  </g>`;
};
svgEl.innerHTML = `<defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#eceef1"/><line x1="0" y1="0" x2="0" y2="6" stroke="#cfd4da" stroke-width="3"/></pattern>
    <marker id="arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="#e1261c"/></marker>
  </defs>
  <g id="hall">
    <rect class="floor" x="210" y="238" width="1075" height="812"/>
    <path class="wall" d="M1285 238H210V1050H925M1055 1050H1285"/>
    <rect class="zone" x="705" y="246" width="280" height="137" rx="6"/><text class="zlab" x="845" y="314">FOOD &amp; DRINKS</text>
    <rect class="zone" x="1115" y="397" width="142" height="375" rx="6"/><text class="zlab" x="1186" y="584" transform="rotate(-90 1186 584)">FOOD &amp; DRINKS</text>
    <text class="zlab" x="1275" y="262" style="text-anchor:end;font-size:11px">WC &rarr;</text>
    <rect class="zone merch" x="291" y="300" width="236" height="190" rx="6"><title>Merchandise &amp; sponsors area</title></rect><text class="zlab merch" x="409" y="386">MERCHANDISE</text><text class="zlab merch" x="409" y="406">&amp; SPONSORS</text>
    <rect class="led" x="226" y="526" width="42" height="214" rx="3"/><text class="ledlab" x="247" y="633" transform="rotate(-90 247 633)">LED SCREEN</text>
    <path class="walk" d="M272 656H606" marker-end="url(#arr)"/><text class="walklab" x="470" y="643">ATHLETE WALKOUT</text>
    <rect class="stage" x="622" y="562" width="116" height="184" rx="3"/>
    <text class="stagelab" x="680" y="600">STAGE</text>
    <rect class="table" x="666" y="642" width="28" height="22" rx="2"/><text class="stagesub" x="680" y="678">TABLE</text>
    <rect class="comm" x="622" y="527" width="116" height="27" rx="3"><title>Commentators: not for sale</title></rect><text class="commlab" x="680" y="541">COMMENTATORS</text>
    <polygon class="trib-side" points="433,795 421,803 421,1036 433,1030"/><polygon class="trib-side" points="927,795 939,803 939,1036 927,1030"/>
    <rect class="trib-base" x="433" y="795" width="494" height="235"/>
    <g class="trib-stairs">${range(1, 10).map(rw => { const y = 808 + (rw - 1) * 22.6 - 11.3; return `<rect x="669.5" y="${y.toFixed(1)}" width="21" height="22.6"/><line x1="669.5" x2="690.5" y1="${(y + 1).toFixed(1)}" y2="${(y + 1).toFixed(1)}"/>`; }).join("")}</g>
    <line class="trib-rail" x1="433" x2="927" y1="795" y2="795"/>
    <text class="tribtag" x="433" y="783">RAISED TRIBUNE · ROWS RISE TOWARDS THE BACK</text>
    <text class="tribtag" x="680" y="1044" style="text-anchor:middle">STAIRS</text>
    <text class="tribtag" x="680" y="404" style="text-anchor:middle">FLOOR LEVEL</text>
    <g class="mainview" id="t-mainview" role="button" tabindex="0" aria-label="Main view towards the stage. Show the visualisation"><title>Main view towards the stage · tap to see the visualisation</title>
      <rect x="1018" y="552" width="62" height="108" fill="transparent"/>
      <rect class="mvpulse" x="1017" y="561" width="66" height="24" rx="12"/>
      <rect class="mvbtn" x="1017" y="561" width="66" height="24" rx="12"/>
      <path class="mveye" d="M1024 573c3-4.5 6.5-6.5 10-6.5s7 2 10 6.5c-3 4.5-6.5 6.5-10 6.5s-7-2-10-6.5z"/><circle class="mveyec" cx="1034" cy="573" r="2.6"/>
      <text class="mvbtnt" x="1061" y="573.5">VIEW</text>
      <text class="mvlab" x="1050" y="603">MAIN</text><text class="mvlab" x="1050" y="617">VIEW</text>
      <path class="mvarrow" d="M1076 648H1028" marker-end="url(#arr)"/>
    </g>
    <path class="entry" d="M990 1046l-9 13h18z"/><text class="entrylab" x="990" y="1076">ENTRANCE</text>
    ${SECTIONS.map(secSVG).join("")}
  </g>`;
mini.setAttribute("viewBox", `${BASE.x} ${BASE.y} ${BASE.w} ${BASE.h}`);
mini.innerHTML = `<use href="#hall"/><rect class="vp" id="t-vp"/>`;

/* ---------- view: zoom + pan ---------- */
let view = { ...BASE }, fitBase = { ...BASE }, anim = 0;
const sz = () => stage.getBoundingClientRect();
const fit = (b, pad = 0) => {
  const r = sz(), ar = r.width / r.height, bx = { x: b.x - pad, y: b.y - pad, w: b.w + pad * 2, h: b.h + pad * 2 };
  if (bx.w / bx.h > ar) { const h = bx.w / ar; return { x: bx.x, y: bx.y - (h - bx.h) / 2, w: bx.w, h }; }
  const w = bx.h * ar; return { x: bx.x - (w - bx.w) / 2, y: bx.y, w, h: bx.h };
};
const clampV = v => {
  const minW = sz().width / 5.2, w = Math.min(Math.max(v.w, minW), fitBase.w), h = w * (fitBase.h / fitBase.w);
  const cx = Math.min(Math.max(v.x + v.w / 2, BASE.x), BASE.x + BASE.w), cy = Math.min(Math.max(v.y + v.h / 2, BASE.y), BASE.y + BASE.h);
  const out = { x: cx - w / 2, y: cy - h / 2, w, h };
  if (w >= fitBase.w * .999) return { ...fitBase };
  return out;
};
const apply = v => {
  view = v;
  svgEl.setAttribute("viewBox", `${v.x} ${v.y} ${v.w} ${v.h}`);
  const k = fitBase.w / v.w; svgEl.style.setProperty("--k", k.toFixed(3)); svgEl.style.setProperty("--ks", (k * sz().width / fitBase.w).toFixed(3));
  const vp = $("#t-vp"); vp.setAttribute("x", v.x); vp.setAttribute("y", v.y); vp.setAttribute("width", v.w); vp.setAttribute("height", v.h);
  mini.classList.toggle("off", v.w >= fitBase.w * .98);
};
const animateTo = (target, dur = 700) => {
  cancelAnimationFrame(anim); const from = { ...view }, to = clampV(target), t0 = performance.now();
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = now => { const p = Math.min(1, (now - t0) / dur), e = ease(p);
    // zoom in log space so it feels like a smooth camera move
    const w = Math.exp(Math.log(from.w) + (Math.log(to.w) - Math.log(from.w)) * e), h = w * (to.h / to.w);
    const cx = from.x + from.w / 2 + (to.x + to.w / 2 - from.x - from.w / 2) * e, cy = from.y + from.h / 2 + (to.y + to.h / 2 - from.y - from.h / 2) * e;
    apply({ x: cx - w / 2, y: cy - h / 2, w, h }); if (p < 1) anim = requestAnimationFrame(step); };
  anim = requestAnimationFrame(step);
};
const toSvg = (cx, cy) => { const r = svgEl.getBoundingClientRect(); return { x: view.x + (cx - r.left) / r.width * view.w, y: view.y + (cy - r.top) / r.height * view.h }; };
const zoomAt = (cx, cy, f, animated) => {
  const p = toSvg(cx, cy), w = view.w * f, h = view.h * f;
  const t = clampV({ x: p.x - (p.x - view.x) * f, y: p.y - (p.y - view.y) * f, w, h });
  animated ? animateTo(t, 350) : (cancelAnimationFrame(anim), apply(t));
};
addEventListener("resize", () => { const was = view.w / fitBase.w; fitBase = fit(BASE); apply(clampV(was >= .98 ? fitBase : { ...view, w: fitBase.w * was })); });
fitBase = fit(BASE); apply(fitBase);

const center = () => { const r = svgEl.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
$("#t-zin").addEventListener("click", () => zoomAt(...center(), 1 / 1.6, true));
$("#t-zout").addEventListener("click", () => zoomAt(...center(), 1.6, true));
$("#t-zhome").addEventListener("click", () => home());

/* pointer: drag to pan, pinch to zoom, tap to select */
const ptrs = new Map(); let gest = null;
const hint = $("#t-hint"); const hideHint = () => hint.classList.add("off");
svgEl.addEventListener("pointerdown", e => {
  svgEl.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); cancelAnimationFrame(anim); hideTip();
  if (ptrs.size === 1) gest = { type: "pan", x: e.clientX, y: e.clientY, v: { ...view }, moved: 0, sec: e.target.closest(".sec"), mv: e.target.closest(".mainview") };
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; gest = { type: "pinch", d: Math.hypot(a[0] - b[0], a[1] - b[1]), c: toSvg((a[0] + b[0]) / 2, (a[1] + b[1]) / 2), v: { ...view }, moved: 99 }; }
});
svgEl.addEventListener("pointermove", e => {
  if (!ptrs.has(e.pointerId)) { hover(e); return; }
  ptrs.set(e.pointerId, [e.clientX, e.clientY]); const r = svgEl.getBoundingClientRect();
  if (gest && gest.type === "pan" && ptrs.size === 1) {
    const dx = e.clientX - gest.x, dy = e.clientY - gest.y; gest.moved = Math.max(gest.moved, Math.hypot(dx, dy));
    if (gest.moved > 5) { svgEl.classList.add("drag"); hideHint();
      apply(clampV({ ...gest.v, x: gest.v.x - dx / r.width * gest.v.w, y: gest.v.y - dy / r.height * gest.v.h })); }
  } else if (gest && gest.type === "pinch" && ptrs.size === 2) {
    const [a, b] = [...ptrs.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]), f = gest.d / d;
    const w = gest.v.w * f, h = gest.v.h * f, mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const px = (mx - r.left) / r.width, py = (my - r.top) / r.height; hideHint();
    apply(clampV({ x: gest.c.x - px * w, y: gest.c.y - py * h, w, h }));
  }
});
const endPtr = e => {
  if (!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId); svgEl.classList.remove("drag");
  if (gest && gest.type === "pan" && gest.moved <= 5 && ptrs.size === 0) { const s = gest.sec; if (s) selectSection(+s.dataset.s); else if (gest.mv) openPreview(e); }
  if (ptrs.size === 0) gest = null;
};
svgEl.addEventListener("pointerup", endPtr); svgEl.addEventListener("pointercancel", endPtr);
svgEl.addEventListener("pointerleave", () => hideTip());
svgEl.addEventListener("wheel", e => { e.preventDefault(); hideHint(); zoomAt(e.clientX, e.clientY, Math.exp(e.deltaY * (e.ctrlKey ? .01 : .0018)), false); }, { passive: false });
svgEl.addEventListener("keydown", e => { const s = e.target.closest && e.target.closest(".sec"); if (s && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selectSection(+s.dataset.s); } });
mini.addEventListener("click", e => { const r = mini.getBoundingClientRect(), x = BASE.x + (e.clientX - r.left) / r.width * BASE.w, y = BASE.y + (e.clientY - r.top) / r.height * BASE.h;
  const w = Math.min(view.w, fitBase.w / 2), h = w * fitBase.h / fitBase.w; animateTo({ x: x - w / 2, y: y - h / 2, w, h }, 500); });

/* hover tooltip */
let tipSec = 0;
function hover(e) {
  if (e.pointerType === "touch") return;
  const g = e.target.closest(".sec"); if (!g) { hideTip(); return; }
  const s = SECTIONS.find(x => x.id === +g.dataset.s), c = CATS[s.cat], r = stage.getBoundingClientRect();
  if (tipSec !== s.id) { tip.innerHTML = `<b>${esc(c.name)}</b><em>${eur(c.price)}</em><small>${esc(s.where)} · ${rowsTxt(s)} · free seating</small>`; tip.style.setProperty("--c2", c.color === "#55657d" ? "#9fb0c8" : c.color); tipSec = s.id; }
  tip.hidden = false; tip.style.left = (e.clientX - r.left) + "px"; tip.style.top = (e.clientY - r.top) + "px";
  if (!state.cat) hl(new Set(catSections(s.cat).map(x => x.id)), false);
}
function hideTip() { tip.hidden = true; tipSec = 0; if (!state.cat) hl(null); }

/* ---------- state: overview / category / section ---------- */
const state = { cat: null, sec: null };
const panel = $("#t-panel"), crumb = $("#t-crumb");
function hl(ids, dim = true) {
  $$(".sec", svgEl).forEach(g => { const on = !!ids && ids.has(+g.dataset.s); g.classList.toggle("hl", on); g.classList.toggle("sel", state.sec === +g.dataset.s); });
  svgEl.classList.toggle("focus", !!ids && dim);
}
const unionBox = list => { const x = Math.min(...list.map(s => s.box.x)), y = Math.min(...list.map(s => s.box.y)), X = Math.max(...list.map(s => s.box.x + s.box.w)), Y = Math.max(...list.map(s => s.box.y + s.box.h)); return { x, y, w: X - x, h: Y - y }; };
const setHash = h => { try { history.replaceState(null, "", h ? "#" + h : location.pathname); } catch (e) {} };

function home() {
  state.cat = null; state.sec = null; hl(null); crumb.hidden = true; renderOverview(); animateTo(fitBase); setHash(""); syncChips();
}
function focusCat(k, id = null) {
  state.cat = k; state.sec = id; const list = catSections(k); hl(new Set(list.map(s => s.id)));
  let t; if (id) { const s = SECTIONS.find(x => x.id === id); t = fit(s.box, s.kind === "trib" ? 22 : 30); const mw = sz().width / 3.2;
    if (t.w < mw) { const cx = t.x + t.w / 2, cy = t.y + t.h / 2, f = mw / t.w; t = { x: cx - t.w * f / 2, y: cy - t.h * f / 2, w: t.w * f, h: t.h * f }; } }
  else t = fit(unionBox(list), 36);
  animateTo(t); renderCat(k); showCrumb(`<i style="--c:${CATS[k].color}"></i>${esc(CATS[k].name)} · ${eur(CATS[k].price)}`); setHash(k); syncChips(); hideHint(); hideTip();
}
function selectSection(id) { focusCat(SECTIONS.find(x => x.id === id).cat, id); }
function mbar() {
  const bar = $("#t-mbar"), k = state.cat; bar.hidden = !k; document.body.classList.toggle("has-mbar", !!k); if (!k) return;
  const c = CATS[k]; $("#t-mbar-t").innerHTML = `${esc(c.name)}<small>Free seating in all ${esc(c.name)} areas</small>`;
  const b = $("#t-mbar-buy"); b.dataset.k = k; b.lastElementChild.textContent = eur(c.price);
}
$("#t-mbar-buy").addEventListener("click", e => openCheckout(e.currentTarget.dataset.k));
function showCrumb(html) { $("#t-crumb-t").innerHTML = html; crumb.hidden = false; }
const mv = $("#t-mainview");
mv.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPreview(); } });
$("#t-crumb-back").addEventListener("click", home);

/* ---------- panel ---------- */
const SHIRTS = ["red", "yellow"];
const shirt = (btn = true) => `<div class="t-shirt">${SHIRTS.map(c => btn
    ? `<button type="button" data-shirt="${c}" aria-label="Show the ${c} shirt, front and back"><img src="assets/tickets/shirt-${c}-front-sm.webp" alt="" loading="lazy"></button>`
    : `<img src="assets/tickets/shirt-${c}-front-sm.webp" alt="" loading="lazy">`).join("")}<span>The official LPAL 4 event shirt is included. Pick your size (S–XXXXL) during checkout.${btn ? " Tap a shirt to see front and back." : ""}</span></div>`;
const card = k => { const c = CATS[k], n = catSections(k).length;
  return `<button type="button" class="t-card" data-cat="${k}" style="--c:${c.color}">
    <div class="t-card-top"><h3>${esc(c.name)}</h3><span class="t-price">${eur(c.price)}</span></div>
    <p class="t-meta">${c.seats} seats · ${n} area${n > 1 ? "s" : ""} on the map</p>
    <ul class="t-inc">${c.inc.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    ${k === "vip" ? shirt(false) : ""}
    <span class="t-card-go">Show on map &rarr;</span>
  </button>`; };
const howto = `<div class="t-howto"><b>How free seating works</b>You book a ticket type, not a seat. On the night, sit anywhere in the areas of your ticket type, e.g. any red VIP area. First come, first served. Our staff check that every guest stays in their category.</div>`;
const perks = `<p class="t-small">VIP and Gold: you get your drink (and VIP shirt) voucher cards at the entrance after your ticket is scanned.</p>`;
const buyBtn = k => `<button type="button" class="t-buy" data-buy="${k}"><span>Buy ${esc(CATS[k].name)} ticket</span><span>${eur(CATS[k].price)}</span></button>`;
function bindPanel() {
  $$(".t-card", panel).forEach(b => {
    b.addEventListener("click", () => focusCat(b.dataset.cat));
    b.addEventListener("mouseenter", () => { if (!state.cat) hl(new Set(catSections(b.dataset.cat).map(s => s.id))); });
    b.addEventListener("mouseleave", () => { if (!state.cat) hl(null); });
  });
  $$("[data-buy]", panel).forEach(b => b.addEventListener("click", () => openCheckout(b.dataset.buy)));
  $$("[data-shirt]", panel).forEach(b => b.addEventListener("click", () => openShirt(b.dataset.shirt)));
  $$("[data-sec]", panel).forEach(b => b.addEventListener("click", () => selectSection(+b.dataset.sec)));
  const pv = $("#t-preview", panel); if (pv) pv.addEventListener("click", openPreview);
  const back = $(".t-back2", panel); if (back) back.addEventListener("click", () => back.dataset.to ? focusCat(back.dataset.to) : home());
}
function renderOverview() {
  panel.innerHTML = `<button type="button" class="t-preview" id="t-preview"><img src="assets/tickets/venue-preview-sm.webp" alt="Visualisation of the LPAL 4 setup: stage with the table in the middle, chairs on the floor and a raised tribune" loading="lazy"><span>How LPAL 4 will look<small>AI visualisation of the planned setup · tap to enlarge</small></span></button>
    <h1 class="t-ph">Pick your ticket</h1><p class="t-psub">Choose a ticket type, or tap an area on the map.</p>
    ${Object.keys(CATS).map(card).join("")}${howto}`;
  bindPanel();
}
function renderCat(k) {
  const c = CATS[k], list = catSections(k), many = list.length > 1;
  panel.innerHTML = `<button type="button" class="t-back2">&larr; All ticket types</button>
    <div class="t-sec-head" style="--c:${c.color}"><span class="t-sec-num">${esc(c.name[0])}</span><div><h2>${esc(c.name)}</h2><p>${eur(c.price)} per ticket · ${c.seats} seats</p></div></div>
    <ul class="t-inc" style="--c:${c.color}">${c.inc.map(i => `<li>${esc(i)}</li>`).join("")}</ul>${k === "vip" ? shirt() : ""}
    ${buyBtn(k)}
    <p class="t-small">With a ${esc(c.name)} ticket you can sit anywhere in ${many ? `all ${list.length} ${esc(c.name)} areas` : `the ${esc(c.name)} area`}. No seat numbers: first come, first served.</p>
    <p class="t-psub" style="margin:18px 0 8px">Where you can sit</p>
    ${list.map(s => `<button type="button" class="t-card${state.sec === s.id ? " hl" : ""}" data-sec="${s.id}" style="--c:${c.color};padding:10px 12px 10px 14px"><div class="t-card-top"><h3 style="font-size:14.5px">${esc(s.where)}</h3></div><p class="t-meta" style="margin:2px 0 0">${rowsTxt(s)} · ${s.seats.length} seats</p></button>`).join("")}
    ${k === "vip" || k === "gold" ? perks : ""}`;
  bindPanel();
}

/* ---------- filters + legend ---------- */
const chips = $("#t-filters");
chips.innerHTML = `<button type="button" class="t-chip on" data-k="">All tickets</button>` +
  Object.entries(CATS).map(([k, c]) => `<button type="button" class="t-chip" data-k="${k}" style="--c:${c.color}"><i></i>${esc(c.name)} <b>${eur(c.price)}</b></button>`).join("");
$$(".t-chip", chips).forEach(b => b.addEventListener("click", () => b.dataset.k ? focusCat(b.dataset.k) : home()));
function syncChips() { mbar(); $$(".t-chip", chips).forEach(b => b.classList.toggle("on", (b.dataset.k || null) === (state.cat || null))); }
$("#t-legend").innerHTML = Object.values(CATS).map(c => `<p style="--c:${c.color}"><i></i>${esc(c.name)} · ${eur(c.price)}</p>`).join("") + `<p><i class="na"></i>Not for sale</p>`;

/* ---------- checkout (Ticket Tailor) ---------- */
const co = $("#t-co"), coBody = $("#t-co-body");
function openCheckout(k) {
  const c = CATS[k]; $("#t-co-t").textContent = `LPAL 4 · choose “${c.name}” at checkout · ${eur(c.price)}`;
  coBody.innerHTML = SETTINGS.checkoutUrl
    ? `<iframe src="${esc(SETTINGS.checkoutUrl)}" title="Ticket checkout" allow="payment"></iframe><a class="t-co-alt" href="${esc(SETTINGS.eventUrl)}" target="_blank" rel="noopener">Checkout not loading? Open it in a new tab &rarr;</a>`
    : `<div class="t-soon"><h3>Tickets on sale soon</h3><p>Ticket sales for LPAL 4 open shortly. Follow us on Instagram to be the first to know.</p><a href="${SETTINGS.instagram}" target="_blank" rel="noopener">Follow LPAL on Instagram</a></div>`;
  $(".t-co-box").classList.toggle("soon", !SETTINGS.checkoutUrl);
  co.hidden = false; document.body.style.overflow = "hidden"; $("#t-co-x").focus();
}
/* main view: the picture opens with a circular reveal from where you clicked */
const pview = $("#t-view");
function openPreview(e) {
  let x = innerWidth / 2, y = innerHeight / 2;
  if (e && e.clientX != null) { x = e.clientX; y = e.clientY; }
  else { const b = $("#t-mainview").getBoundingClientRect(); if (b.width) { x = b.left + b.width / 2; y = b.top + b.height / 2; } }
  pview.style.setProperty("--ox", x + "px"); pview.style.setProperty("--oy", y + "px");
  pview.hidden = false; document.body.style.overflow = "hidden"; void pview.offsetWidth; pview.classList.add("open"); $("#t-view-x").focus();
}
function closePreview() {
  pview.classList.remove("open"); document.body.style.overflow = "";
  setTimeout(() => { if (!pview.classList.contains("open")) pview.hidden = true; }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 750);
}
$("#t-view-x").addEventListener("click", closePreview);
pview.addEventListener("click", e => { if (e.target === pview || e.target.tagName === "IMG") closePreview(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !pview.hidden) closePreview(); });
function openShirt(c) {
  $("#t-co-t").textContent = "LPAL 4 event shirt · front & back";
  coBody.innerHTML = `<img class="t-shirt-big" src="assets/tickets/shirt-${c}.webp" alt="LPAL 4 event shirt, ${c} design, front and back">`;
  $(".t-co-box").classList.add("soon"); co.hidden = false; document.body.style.overflow = "hidden"; $("#t-co-x").focus();
}
const closeCo = () => { co.hidden = true; coBody.innerHTML = ""; document.body.style.overflow = ""; };
$("#t-co-x").addEventListener("click", closeCo);
co.addEventListener("click", e => { if (e.target === co) closeCo(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !co.hidden) closeCo(); });

/* ---------- start ---------- */
renderOverview();
const h = location.hash.slice(1);
if (CATS[h]) setTimeout(() => focusCat(h), 300);
setTimeout(hideHint, 6000);
