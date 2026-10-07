/* ==========================================================
   LPAL site script
   To update the site, edit SETTINGS and MATCHES below.
   ========================================================== */

const SETTINGS = {
  // Event start, Cologne time (CET = +01:00 in January)
  eventStart: "2027-01-09T19:00:00+01:00",
  watchUrl: "https://kick.com/lionpridearmwrestling",
  // Ticket shop link. While empty, BUY TICKETS stays inactive.
  ticketsUrl: ""
};

// photo = file in assets/img/athletes/ (without .webp). null = black silhouette.
// text  = short description shown next to the match (optional).
const MAIN_EVENT = {
  title: "World title match",
  reveal: "Announced 30 October"
};

const MATCHES = [
  { a: { first: "Luka", last: "Tsinadze", photo: "luka-tsinadze" },
    b: { first: "Nemanja", last: "Grujic", photo: "nemanja-grujic" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { a: { first: "Sandris", last: "Sedis", photo: "sandris-sedis" },
    b: { first: "Avtandil", last: "Tutberidze", photo: "avtandil-tutberidze" },
    division: "Heavyweight 115kg", arm: "Left arm" },
  { a: { first: "Rachid", last: "Ellouah", photo: null },
    b: { first: "", last: "Black Buffalo", photo: "black-buffalo" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { a: { first: "Philipp", last: "Stahlhofen", note: "70KG", photo: null },
    b: { first: "Reza", last: "Motamedi", note: "115KG", photo: null },
    division: "Heavyweight 115kg", arm: "", special: "David vs Goliath" },
  { a: { first: "Ellen B.", last: "Åkesson", photo: "ellen-akesson" },
    b: { first: "Ivana", last: "Hradská", photo: "ivana-hradska" },
    division: "Women's Open Weight 75kg", arm: "Right arm" },
  { a: { first: "Denis", last: "Gruber", photo: null },
    b: { first: "Gabriele", last: "Giurdanella", photo: "gabriele-giurdanella" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { a: { first: "Allan", last: "Barberis", photo: "allan-barberis" },
    b: { first: "Nikolay", last: "Tsankov", photo: "nikolay-tsankov" },
    division: "Super Heavyweight 115kg+", arm: "" },
  { a: { first: "Ellen B.", last: "Åkesson", photo: "ellen-akesson" },
    b: { first: "Megan", last: "Stone", photo: "megan-stone" },
    division: "Women's Heavyweight 70kg", arm: "Left arm" },
  { a: { first: "Gocha", last: "Sitchinava", photo: "gocha-sitchinava" },
    b: { first: "Tunahan", last: "İlaslan", photo: "tunahan-ilaslan" },
    division: "Lightweight 77kg", arm: "Left arm" }
];

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const full = x => (x.first + " " + x.last).trim();

/* ---------- header: white & centred -> black & full width ---------- */
const header = $("#site-header");
const menuBtn = $(".menu-btn");
const menu = $("#mobile-menu");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40 || !menu.hidden);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const setMenu = open => {
  menu.hidden = !open;
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  onScroll();
};
menuBtn.addEventListener("click", () => setMenu(menu.hidden));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ---------- opener video (lighter file on phones) ---------- */
const video = $("#opener");
video.src = window.matchMedia("(max-width: 820px)").matches
  ? "assets/video/lpal-opener-mobile.mp4" : "assets/video/lpal-opener.mp4";
video.play().catch(() => {});
const soundBtn = $("#sound-btn");
soundBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  if (!video.muted) video.play().catch(() => {});
  soundBtn.classList.toggle("on", !video.muted);
  soundBtn.setAttribute("aria-label", video.muted ? "Turn sound on" : "Turn sound off");
});

/* ---------- countdown ---------- */
const target = new Date(SETTINGS.eventStart).getTime();
const cdEl = k => $(`[data-cd="${k}"]`);
const pad = n => String(n).padStart(2, "0");
function tick() {
  let t = Math.max(0, target - Date.now());
  const d = Math.floor(t / 864e5); t -= d * 864e5;
  const h = Math.floor(t / 36e5); t -= h * 36e5;
  const m = Math.floor(t / 6e4); t -= m * 6e4;
  cdEl("d").textContent = pad(d); cdEl("h").textContent = pad(h);
  cdEl("m").textContent = pad(m); cdEl("s").textContent = pad(Math.floor(t / 1e3));
}
tick(); setInterval(tick, 1000);

/* ---------- fight card carousel ---------- */
const img = p => p ? `assets/img/athletes/${p}.webp` : "assets/img/silhouette-athlete.webp";
const ticketsBtn = `<a class="btn btn-ghost-dark" href="#" data-tickets aria-disabled="true">Buy tickets</a>`;
const watchBtn = `<a class="btn btn-red" href="${SETTINGS.watchUrl}" target="_blank" rel="noopener">Watch here</a>`;

const mainSlide = `
  <article class="slide slide-main" aria-label="Main event">
    <div class="stage">
      <div class="stage-ath stage-a"><img src="assets/img/silhouette-a.webp" alt="Main event athlete to be announced"></div>
      <div class="stage-ath stage-b"><img src="assets/img/silhouette-b.webp" alt="Main event athlete to be announced"></div>
      <div class="me-center">
        <span class="tag tag-red">Main event</span>
        <h3>${esc(MAIN_EVENT.title)}</h3>
        <p class="me-q">??? vs ???</p>
      </div>
    </div>
    <div class="info">
      <p class="info-kicker">Main event</p>
      <h3 class="info-title">LPAL ${esc(MAIN_EVENT.title)}</h3>
      <div class="info-tags"><span class="tag tag-red">${esc(MAIN_EVENT.reveal)}</span></div>
      <p class="info-text">Two athletes, one LPAL world title. The names are revealed on 30 October. Follow us on Instagram to see it first.</p>
      <div class="info-actions">${watchBtn}${ticketsBtn}<p class="soon">Tickets on sale soon</p></div>
    </div>
  </article>`;

const matchSlide = (m, i) => `
  <article class="slide" aria-label="Match ${i + 1}: ${esc(full(m.a))} vs ${esc(full(m.b))}">
    <div class="stage">
      <div class="stage-ath stage-a"><img src="${img(m.a.photo)}" alt="${esc(full(m.a))}" loading="lazy"></div>
      <div class="stage-ath stage-b"><img src="${img(m.b.photo)}" alt="${esc(full(m.b))}" loading="lazy"></div>
      <div class="stage-shade"></div>
      <div class="stage-names">
        <div class="sn sn-a">${m.a.first ? `<span class="sn-first">${esc(m.a.first)}</span>` : ""}<span class="sn-last">${esc(m.a.last)}</span>${m.a.note ? `<span class="sn-note">${esc(m.a.note)}</span>` : ""}</div>
        <span class="sn-vs">VS</span>
        <div class="sn sn-b">${m.b.first ? `<span class="sn-first">${esc(m.b.first)}</span>` : ""}<span class="sn-last">${esc(m.b.last)}</span>${m.b.note ? `<span class="sn-note">${esc(m.b.note)}</span>` : ""}</div>
      </div>
    </div>
    <div class="info">
      <p class="info-kicker">Match ${i + 1}${m.special ? ` &middot; “${esc(m.special)}”` : ""}</p>
      <h3 class="info-title">${esc(m.a.last)} <span class="vs">vs</span> ${esc(m.b.last)}</h3>
      <div class="info-tags"><span class="tag">${esc(m.division)}</span>${m.arm ? `<span class="tag">${esc(m.arm)}</span>` : ""}</div>
      ${m.text ? `<p class="info-text">${esc(m.text)}</p>` : ""}
      <div class="info-actions">${watchBtn}${ticketsBtn}<p class="soon">Tickets on sale soon</p></div>
    </div>
  </article>`;

const slides = $("#slides");
slides.innerHTML = mainSlide + MATCHES.map(matchSlide).join("");
const slideEls = $$(".slide", slides);
const total = slideEls.length;

const chipLabels = ["Main event", ...MATCHES.map(m => `${m.a.last} vs ${m.b.last}`)];
$("#chips").innerHTML = chipLabels.map((l, i) => `<button class="chip" data-i="${i}">${esc(l)}</button>`).join("");
const chips = $$(".chip");

let current = 0;
const goTo = i => {
  i = Math.max(0, Math.min(total - 1, i));
  slides.scrollTo({ left: slideEls[i].offsetLeft - slides.offsetLeft, behavior: "smooth" });
};
const update = () => {
  const i = Math.round(slides.scrollLeft / slides.clientWidth);
  if (i === current && chips[i].classList.contains("active")) return;
  current = i;
  $("#card-count").textContent = i === 0 ? "Main event" : `Match ${i} / ${total - 1}`;
  $("#prev").disabled = i === 0;
  $("#next").disabled = i === total - 1;
  chips.forEach((c, k) => c.classList.toggle("active", k === i));
  const chip = chips[i];
  chip.parentElement.scrollTo({ left: chip.offsetLeft - chip.parentElement.offsetLeft - 40, behavior: "smooth" });
};
slides.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
window.addEventListener("resize", () => goTo(current));
$("#prev").addEventListener("click", () => goTo(current - 1));
$("#next").addEventListener("click", () => goTo(current + 1));
chips.forEach(c => c.addEventListener("click", () => goTo(+c.dataset.i)));
slides.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
});
chips[0].classList.add("active");
current = -1; update();

/* ---------- tickets (inactive until a link is set) ---------- */
const toast = $("#toast");
let toastTimer;
const showToast = msg => {
  toast.textContent = msg; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
};
$$("[data-tickets]").forEach(a => {
  if (SETTINGS.ticketsUrl) {
    a.href = SETTINGS.ticketsUrl; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("aria-disabled");
  } else {
    a.addEventListener("click", e => { e.preventDefault(); showToast("Tickets on sale soon"); });
  }
});
if (SETTINGS.ticketsUrl) $$(".soon").forEach(s => s.remove());

$("#year").textContent = new Date().getFullYear();
