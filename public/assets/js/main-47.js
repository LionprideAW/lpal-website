/* ==========================================================
   LPAL site script
   To update the site, edit SETTINGS, MAIN_EVENT and MATCHES below.
   ========================================================== */

const SETTINGS = {
  // Event start, Cologne time (CET = +01:00 in January)
  eventStart: "2027-01-09T17:00:00+01:00",
  watchUrl: "https://kick.com/lionpridearmwrestling",
  // Ticket shop link. While empty, BUY TICKETS stays inactive.
  ticketsUrl: ""
};

// Country codes (ISO 2 letters) -> name shown under the athlete
const COUNTRIES = {
  at: "Austria", bg: "Bulgaria", de: "Germany", fr: "France", ge: "Georgia",
  gr: "Greece", it: "Italy", lt: "Lithuania", lv: "Latvia", ma: "Morocco",
  rs: "Serbia", se: "Sweden", sk: "Slovakia", tr: "Turkey",
  cz: "Czech Republic", hu: "Hungary", mk: "North Macedonia", pl: "Poland",
  ca: "Canada", hr: "Croatia", md: "Moldova", ro: "Romania", ua: "Ukraine"
};

// Main event: fill in a/b on 30 October (same format as the matches below).
const MAIN_EVENT = {
  title: "LPAL World Title Match",
  reveal: "Announced 30 October",
  a: null,
  b: null
};

// photo = file name (without .webp). Chest-up crop in assets/img/bust-v2/, full body in assets/img/athletes-v2/. When photos change, save them in a new folder name (e.g. -v3) so browsers load the new ones.
//         null = black silhouette.
// country = code from COUNTRIES.
// Optional, shown when a match is clicked: instagram, age, height, weight, achievements
//   instagram: "handle" (without @), e.g. instagram: "lpal_athlete"
//   e.g. age: 27, height: "185 cm", weight: "95 kg", achievements: ["European Champion 2024", "LPAL 2 winner"]
// A row only appears once at least one of the two athletes has that value.
const MATCHES = [
  { a: { first: "Luka", last: "Tsinadze", country: "ge", photo: "luka-tsinadze", instagram: "tsinadze_" },
    b: { first: "Nemanja", last: "Grujic", country: "rs", photo: "nemanja-grujic", instagram: "_nemanjagrujic" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { a: { first: "Sandris", last: "Sedis", country: "lv", photo: "sandris-sedis", instagram: "panzer_sedis" },
    b: { first: "Avtandil", last: "Tutberidze", country: "ge", photo: "avtandil-tutberidze", instagram: "tutberidzea___" },
    division: "Heavyweight 115kg", arm: "Left arm" },
  { a: { first: "Rachid", last: "Ellouah", country: "ma", photo: null, instagram: "rachid_hanma" },
    b: { first: "", last: "Black Buffalo", country: "fr", photo: "black-buffalo-3", instagram: "black_buffalo.24" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { hidden: true, // opponent being changed: hidden until the new match is confirmed
    a: { first: "Philipp", last: "Stahlhofen", note: "70kg", country: "de", photo: null, instagram: "philipp_stahlhofen" },
    b: { first: "Reza", last: "Motamedi", note: "115kg", country: "de", photo: null, instagram: "reza_silverback" },
    division: "Heavyweight 115kg", arm: "Right arm", special: "David vs Goliath" },
  { a: { first: "Ellen B.", last: "Åkesson", country: "se", photo: "ellen-akesson", instagram: "ellen.viking" },
    b: { first: "Ivana", last: "Hradská", country: "sk", photo: "ivana-hradska-2", instagram: "hradska_ivana" },
    division: "Women's Open Weight 75kg", arm: "Right arm" },
  { a: { first: "Denis", last: "Gruber", country: "at", photo: "denis-gruber-2", instagram: "gruber.denis" },
    b: { first: "Gabriele", last: "Giurdanella", country: "it", photo: "gabriele-giurdanella", instagram: "gabriele__giurdanella" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { a: { first: "Allan", last: "Barberis", country: "fr", photo: "allan-barberis", instagram: "france.armwrestling" },
    b: { first: "Nikolay", last: "Tsankov", country: "bg", photo: "nikolay-tsankov", instagram: "tsankov.armwrestling" },
    division: "Super Heavyweight 115kg+", arm: "Right arm" },
  { a: { first: "Ellen B.", last: "Åkesson", country: "se", photo: "ellen-akesson", instagram: "ellen.viking" },
    b: { first: "Megan", last: "Stone", country: "at", photo: "megan-stone", instagram: "fit_megan_stone__" },
    division: "Women's Middleweight 70kg", arm: "Left arm" },
  { a: { first: "Gocha", last: "Sitchinava", country: "ge", photo: "gocha-sitchinava", instagram: "sichiarm11" },
    b: { first: "Tunahan", last: "İlaslan", country: "tr", photo: "tunahan-ilaslan", instagram: "tunahan_ilaslan" },
    division: "Lightweight 77kg", arm: "Left arm" }
];

// Athlete stats shown when a match is opened (age, height, weight, accolades). Key = last name.
const ATHLETE_STATS = {
  "Tsinadze":      { age: 22, height: "179 cm", weight: "95 kg",  achievements: ["Georgian Champion", "WAF World Champion", "EAF European Champion"] },
  "Grujic":        { age: 26, height: "177 cm", weight: "95 kg",  achievements: ["Overall Serbian Champion"] },
  "Gruber":        { age: 25, height: "194 cm", weight: "95 kg",  achievements: ["Overall Austrian Champion"] },
  "Giurdanella":   { age: 29, height: "179 cm", weight: "90 kg",  achievements: ["Overall Italian Champion"] },
  "Sedis":         { age: 32, height: "194 cm", weight: "110 kg", achievements: ["Overall Latvian Champion", "WAF World Champion", "EAF European Champion"] },
  "Tutberidze":    { age: 22, height: "187 cm", weight: "110 kg", achievements: ["Georgian Champion", "WAF World Champion", "EAF European Champion"] },
  "Stahlhofen":    { age: 32, height: "166 cm", weight: "70 kg",  achievements: ["13-time German Champion", "WAF World Champion"] },
  "Black Buffalo": { age: 35, height: "179 cm", weight: "95 kg",  achievements: ["No. 4 in Africa", "No. 1 in Ivory Coast"] },
  "Ellouah":       { age: 23, height: "189 cm", weight: "95 kg",  achievements: ["Overall Moroccan Champion"] },
  "Åkesson":       { age: 27, height: "166 cm", weight: "70 kg",  achievements: ["Powerlifting World Champion", "Armwrestling Champion"] },
  "Stone":         { age: 37, height: "167 cm", weight: "65 kg",  achievements: ["Austrian National Champion"] },
  "Hradská":       { age: 21, height: "185 cm", weight: "80 kg",  achievements: ["WAF World Champion", "EAF European Champion", "Slovakian Champion"] },
  "Barberis":      { age: 33, height: "185 cm", weight: "118 kg", achievements: ["Overall French Champion", "4th at EAF European Championship"] },
  "Tsankov":       { age: 29, height: "193 cm", weight: "120 kg", achievements: ["Bulgarian Champion", "4th at EAF European Championship"] },
  "İlaslan":       { age: 24, height: "185 cm", weight: "77 kg",  achievements: ["7-time Turkish Champion", "2nd at WAF World Championship"] },
  "Sitchinava":    { age: 29, height: "180 cm", weight: "77 kg",  achievements: ["Georgian Champion", "WAF World Champion", "EAF European Champion"] }
};
MATCHES.forEach(m => [m.a, m.b].forEach(x => { if (x && ATHLETE_STATS[x.last]) Object.assign(x, ATHLETE_STATS[x.last]); }));

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

/* ---------- sliding red line in the top bar ---------- */
const bar = $(".bar");
const line = $(".nav-line");
const brand = $(".brand");
const moveLine = (el, w) => {
  const b = bar.getBoundingClientRect(), r = el.getBoundingClientRect();
  const width = w ?? r.width;
  line.style.width = width + "px";
  line.style.transform = `translateX(${r.left - b.left + (r.width - width) / 2}px)`;
};
const LOGO_W = 30;   // the line keeps one short width, like UFC.com
const restLine = () => moveLine(brand, LOGO_W);
$$(".nav-left .nav-link").forEach(a => {
  a.addEventListener("mouseenter", () => { moveLine(a, LOGO_W); $$(".nav-link").forEach(x => x.classList.toggle("is-hot", x === a)); });
  a.addEventListener("focus", () => moveLine(a, LOGO_W));
});
brand.addEventListener("mouseenter", restLine);
$(".nav-left").addEventListener("mouseleave", () => { restLine(); $$(".nav-link").forEach(x => x.classList.remove("is-hot")); });
// on load: draw the line in from the centre of the logo
line.classList.add("no-anim"); restLine(); line.style.opacity = 0; line.getBoundingClientRect();
line.classList.remove("no-anim");
setTimeout(() => { line.style.opacity = ""; }, 250);
// keep it under the logo while the bar resizes (scroll) and on window resize
let raf;
const follow = () => { cancelAnimationFrame(raf); const t0 = performance.now();
  const step = t => { if (!$(".nav-left:hover")) { line.classList.add("no-anim"); restLine(); } if (t - t0 < 650) raf = requestAnimationFrame(step); else line.classList.remove("no-anim"); };
  raf = requestAnimationFrame(step); };
let wasScrolled = header.classList.contains("scrolled");
window.addEventListener("scroll", () => { const s2 = header.classList.contains("scrolled"); if (s2 !== wasScrolled) { wasScrolled = s2; follow(); } }, { passive: true });
window.addEventListener("resize", () => { line.classList.add("no-anim"); restLine(); setTimeout(() => line.classList.remove("no-anim"), 50); });

/* ---------- opener video (lighter file on phones) ---------- */
const video = $("#opener");
if (video) {
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
}

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
if ($("#countdown")) { tick(); setInterval(tick, 1000); }

/* ---------- fight card (UFC-style list, click to expand) ---------- */
const bust = p => p ? `assets/img/bust-v2/${p}.webp` : "assets/img/bust-v2/silhouette-athlete.webp";
const body = p => p ? `assets/img/athletes-v2/${p}.webp` : "assets/img/silhouette-athlete.webp";
const flag = c => c ? `<img class="flag" src="https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${c}.svg" alt="" width="22" height="16" loading="lazy" onerror="this.remove()">` : "";
const country = x => x && x.country ? `${flag(x.country)}<span>${esc(COUNTRIES[x.country] || "")}</span>` : "";
const ticketsBtn = `<a class="btn btn-ghost-dark btn-sm" href="#" data-tickets aria-disabled="true">Buy tickets</a>`;
const watchBtn = `<a class="btn btn-red btn-sm" href="${SETTINGS.watchUrl}" target="_blank" rel="noopener">Watch here</a>`;

const IG_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>`;
// One Instagram icon next to each athlete's name; opens their profile without closing the match.
const igIcon = x => {
  if (!x || !x.instagram) return "";
  const h = String(x.instagram).replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/[/?#].*$/, "");
  return `<a class="ig-icon" href="https://www.instagram.com/${encodeURIComponent(h)}/" target="_blank" rel="noopener" aria-label="${esc(full(x))} on Instagram" title="@${esc(h)}">${IG_ICON}</a>`;
};

const STATS = [
  ["Country", x => x.country ? COUNTRIES[x.country] : ""],
  ["Age", x => x.age],
  ["Height", x => x.height],
  ["Weight", x => x.weight],
  ["Accolades", x => (Array.isArray(x.achievements) ? x.achievements : x.achievements ? [x.achievements] : []).map(a => `<span class="acc">${esc(a)}</span>`).join("")]
];

const nameBlock = (x, side) => x
  ? `<div class="b-name b-name-${side}">${x.first ? `<span class="b-first">${esc(x.first)}</span>` : ""}<span class="b-last">${esc(x.last)}</span>${x.note ? `<span class="b-note">${esc(x.note)}</span>` : ""}</div>`
  : `<div class="b-name b-name-${side}"><span class="b-first">To be announced</span><span class="b-last b-tba">TBA</span></div>`;

const detailHTML = (a, b, division, arm) => {
  const rows = STATS.map(([label, get]) => {
    const va = get(a) || "", vb = get(b) || "";
    if (!va && !vb) return "";
    return `<tr><td class="sa">${label === "Country" ? esc(va) : va || "&ndash;"}</td><th>${label}</th><td class="sb">${label === "Country" ? esc(vb) : vb || "&ndash;"}</td></tr>`;
  }).join("");
  return `
    <div class="bout-detail" aria-hidden="true"><div class="bd-inner">
      <div class="bd-head">
        <span class="bd-name bd-name-a">${esc(full(a))}${igIcon(a)}</span>
        <span class="bd-div">${esc(division)}${arm ? ` &middot; ${esc(arm)}` : ""}</span>
        <span class="bd-name bd-name-b">${igIcon(b)}${esc(full(b))}</span>
      </div>
      <div class="bd-body">
        <div class="bd-photo bd-photo-a"><img src="${body(a.photo)}" alt="" loading="lazy"></div>
        <table class="bd-stats"><tbody>${rows}</tbody></table>
        <div class="bd-photo bd-photo-b"><img src="${body(b.photo)}" alt="" loading="lazy"></div>
      </div>
    </div></div>`;
};

const boutHTML = ({ a, b, label, sub, imgA, imgB, main, division, arm }) => {
  const canOpen = a && b;
  return `
  <li class="bout${main ? " bout-main" : ""}">
    <div class="bout-card${canOpen ? " can-open" : ""}"${canOpen ? ` role="button" tabindex="0" aria-expanded="false" aria-label="Show details: ${esc(full(a))} vs ${esc(full(b))}"` : ""}>
      ${canOpen ? `<span class="b-expand" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" fill="none" stroke="currentColor" stroke-width="2"/></svg></span>` : ""}
      <div class="bout-compact"><div>
        <p class="bout-label">${label}</p>
        <div class="bout-row">
          <div class="b-photo b-photo-a"><img src="${imgA}" alt="${a ? esc(full(a)) : "Main event athlete to be announced"}" loading="lazy"></div>
          ${nameBlock(a, "a")}
          <span class="b-vs">vs</span>
          ${nameBlock(b, "b")}
          <div class="b-photo b-photo-b"><img src="${imgB}" alt="${b ? esc(full(b)) : "Main event athlete to be announced"}" loading="lazy"></div>
        </div>
      </div></div>
      ${canOpen ? detailHTML(a, b, division, arm) : ""}
      <div class="bout-bar">
        <div class="b-country">${country(a)}</div>
        <div class="b-mid">${sub}</div>
        <div class="b-country b-country-b">${country(b)}</div>
      </div>
    </div>
    <div class="bout-actions">${watchBtn}${ticketsBtn}</div>
  </li>`;
};

const me = MAIN_EVENT;
const mainHTML = boutHTML({
  a: me.a, b: me.b, main: true, division: me.title, arm: me.arm,
  label: `<span class="tag tag-red">Main event</span> ${esc(me.title)}`,
  sub: `<span class="b-reveal">${esc(me.reveal)}</span>`,
  imgA: me.a && me.a.photo ? bust(me.a.photo) : "assets/img/bust-v2/silhouette-me-a.webp",
  imgB: me.b && me.b.photo ? bust(me.b.photo) : "assets/img/bust-v2/silhouette-me-b.webp"
});

if ($("#bouts")) $("#bouts").innerHTML = mainHTML + MATCHES.filter(m => !m.hidden).map((m, i) => boutHTML({
  a: m.a, b: m.b, division: m.division, arm: m.arm,
  label: `${esc(m.division)}${m.arm ? ` &middot; ${esc(m.arm)}` : ""}${m.special ? ` &middot; <span class="b-special">“${esc(m.special)}”</span>` : ""}`,
  sub: `Match ${i + 1}`,
  imgA: bust(m.a.photo), imgB: bust(m.b.photo)
})).join("");

const toggleBout = card => {
  const open = !card.classList.contains("open");
  $$(".bout-card.open").forEach(c => { if (c !== card) { c.classList.remove("open"); c.setAttribute("aria-expanded", "false"); $(".bout-detail", c).setAttribute("aria-hidden", "true"); } });
  card.classList.toggle("open", open);
  card.setAttribute("aria-expanded", open);
  $(".bout-detail", card).setAttribute("aria-hidden", !open);
  if (open) setTimeout(() => {
    const r = card.getBoundingClientRect();
    if (r.top < 80 || r.bottom > window.innerHeight) window.scrollBy({ top: r.top - 90, behavior: "smooth" });
  }, 380);
};
$$(".bout-card.can-open").forEach(card => {
  card.addEventListener("click", e => { if (e.target.closest("a")) return; toggleBout(card); });
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleBout(card); } });
});

/* ==========================================================
   PAST EVENTS: results with winner, score and a WATCH MATCH button
   winner: "a" or "b".  score: [a, b].  video: YouTube video ID.
   ========================================================== */
const PAST_EVENTS = {
  "lpal-1": {
    photos: "assets/img/lpal1",
    matches: [
      { a: { first: "Petros", last: "Peridis", country: "gr", photo: "petros-peridis" },
        b: { first: "Kevin", last: "Berberich", country: "de", photo: "kevin-berberich" },
        winner: "a", score: [3, 2], division: "Lightweight 75kg", arm: "Right arm", video: "bOixpPwSWy8" },
      { a: { first: "Christos", last: "Zablaras", country: "gr", photo: "christos-zablaras" },
        b: { first: "Nemanja", last: "Grujic", country: "rs", photo: "nemanja-grujic" },
        winner: "b", score: [0, 3], division: "Light Heavyweight 105kg", arm: "Right arm", video: "T1hlA9g3A2k" },
      { a: { first: "Gabor", last: "Szakacs", country: "hu", photo: "gabor-szakacs" },
        b: { first: "Denis", last: "Gruber", country: "at", photo: "denis-gruber" },
        winner: "b", score: [1, 3], division: "Middleweight 95kg", arm: "Right arm", video: "zyAUEWteMMQ" },
      { a: { first: "Vaclav", last: "Vaculovic", country: "cz", photo: "vaclav-vaculovic" },
        b: { first: "Allan", last: "Barberis", country: "fr", photo: "allan-barberis" },
        winner: "b", score: [1, 3], division: "Heavyweight 115kg", arm: "Right arm", video: "QKLZJDTkuhA" },
      { a: { first: "Simon", last: "Polak", country: "cz", photo: "simon-polak" },
        b: { first: "Emil", last: "Faccoli", country: "it", photo: "emil-faccoli" },
        winner: "a", score: [3, 1], division: "Middleweight 95kg", arm: "Left arm", video: "OZtcUOuPgY8" },
      { a: { first: "Oleksandr", last: "Bezkorovainyi", country: "at", photo: "oleksandr-bezkorovainyi" },
        b: { first: "Mario", last: "Lukic", country: "at", photo: "mario-lukic" },
        winner: "b", score: [2, 3], division: "Middleweight 95kg", arm: "Right arm", video: "gIekkJu395I" },
      { a: { first: "Hristo", last: "Delidzhakov", country: "bg", photo: "hristo-delidzhakov" },
        b: { first: "Slobodan", last: "Novakovic", country: "rs", photo: "slobodan-novakovic" },
        winner: "a", score: [4, 1], division: "Welterweight 85kg", arm: "Right arm", video: "eCpqZvqmJtE", note: "All 5 rounds pulled" },
      { a: { first: "Markus", last: "Liebminger", country: "at", photo: "markus-liebminger" },
        b: { first: "Andrija", last: "Simic", country: "hr", photo: "andrija-simic" },
        winner: "b", score: [0, 3], division: "Super Heavyweight 115kg+", arm: "Left arm", video: "VsEUoZWVB9U" },
      { a: { first: "Engelbert", last: "Staudacher", country: "at", photo: "engelbert-staudacher" },
        b: { first: "Marko", last: "Lakicevic", country: "rs", photo: "marko-lakicevic" },
        winner: "b", score: [0, 3], division: "Welterweight 85kg", arm: "Right arm", video: "QFPpFpWw7oM" },
      { a: { first: "Ivan", last: "Gregoricka", country: "cz", photo: "ivan-gregoricka" },
        b: { first: "David", last: "Bogdan", country: "rs", photo: "david-bogdan" },
        winner: "a", score: [3, 0], division: "Lightweight 75kg", arm: "Left arm", video: "stttLCWFuJg" },
      { a: { first: "Martin", last: "Hentschel", country: "at", photo: "martin-hentschel" },
        b: { first: "Veljko", last: "Stanojevic", country: "rs", photo: "veljko-stanojevic" },
        winner: "a", score: [3, 0], division: "Super Heavyweight 115kg+", arm: "Right arm", video: "uN6M7CYc5ro" }
    ]
  },
  "lpal-2": {
    photos: "assets/img/lpal2",
    matches: [
      { a: { first: "Sandris", last: "Sedis", country: "lv", photo: "sandris-sedis" },
        b: { first: "Peter", last: "Celes", country: "sk", photo: "peter-celes" },
        winner: "a", score: [3, 0], division: "Light Heavyweight 105kg", arm: "Right arm", video: "WA-kChIg_D4" },
      { a: { first: "Toms", last: "Rozits", country: "lv", photo: "toms-rozits" },
        b: { first: "Kersten", last: "Mercieca", country: "it", photo: "kersten-mercieca" },
        winner: "a", score: [3, 0], division: "Welterweight 85kg", arm: "Right arm", video: "VDsGK5NLwNM" },
      { a: { first: "Nemanja", last: "Milanovic", country: "rs", photo: "nemanja-milanovic" },
        b: { first: "Ethan", last: "Lovei", country: "fr", photo: "ethan-lovei" },
        winner: "a", score: [3, 2], division: "Lightweight 75kg", arm: "Right arm", video: "SyzrYnhGD8A" },
      { a: { first: "Ivana", last: "Pitakova", country: "sk", photo: "ivana-pitakova" },
        b: { first: "Susie", last: "Ann", country: "lv", photo: "susie-ann" },
        winner: "a", score: [3, 0], division: "Women's Open Weight 75kg+", arm: "Right arm", video: "iXb3Q3IYwaA" },
      { a: { first: "Nora", last: "Krasnyánszki", country: "hu", photo: "nora-krasnyanszki" },
        b: { first: "Paulina", last: "Janoszka", country: "pl", photo: "paulina-janoszka" },
        winner: "a", score: [3, 0], division: "Women's Middleweight 70kg", arm: "Right arm", video: "etP-cVN9gCk" },
      { a: { first: "Bastien", last: "Cervelli", country: "fr", photo: "bastien-cervelli" },
        b: { first: "Martin", last: "Minarovic", country: "cz", photo: "martin-minarovic" },
        winner: "a", score: [3, 0], division: "Light Heavyweight 105kg", arm: "Right arm", video: "0FUdFXk0DJs" },
      { a: { first: "Nikolay", last: "Tsankov", country: "bg", photo: "nikolay-tsankov" },
        b: { first: "Predrag", last: "Djordjevic", country: "rs", photo: "predrag-djordjevic" },
        winner: "a", score: [3, 0], division: "Heavyweight 115kg", arm: "Right arm", video: "BFxa20HYhQg" },
      { a: { first: "Ivan", last: "Serafimovski", country: "mk", photo: "ivan-serafimovski" },
        b: { first: "Mattia", last: "Vezzola", country: "it", photo: "mattia-vezzola" },
        winner: "b", score: [1, 3], division: "Welterweight 85kg", arm: "Right arm", video: "EC7kBAMLYhI" },
      { a: { first: "Nemanja", last: "Vedjic", country: "rs", photo: "nemanja-vedjic" },
        b: { first: "Michel", last: "Neumann", country: "de", photo: "michel-neumann" },
        winner: "a", score: [3, 1], division: "Light Heavyweight 105kg", arm: "Right arm", video: "03wBP72gMvo" },
      { a: { first: "Viachaslau", last: "Kuksa", country: "pl", photo: "viachaslau-kuksa" },
        b: { first: "Veljko", last: "Petrovic", country: "rs", photo: "veljko-petrovic" },
        winner: "a", score: [3, 1], division: "Middleweight 95kg", arm: "Right arm", video: "ahemjSufVao" }
    ]
  },
  "lpal-3": {
    photos: "assets/img/lpal3",
    matches: [
      { a: { first: "Auden", last: "Larratt", country: "ca", photo: "auden-larratt" },
        b: { first: "Honza", last: "Toman", country: "cz", photo: "honza-toman" },
        winner: "a", score: [3, 1], division: "Middleweight 95kg", arm: "Right arm", video: "tLKV5l6-uYM" },
      { a: { first: "Kersten", last: "Mercieca", country: "it", photo: "kersten-mercieca" },
        b: { first: "Roman", last: "Riabtsev", country: "ua", photo: "roman-riabtsev" },
        winner: "b", score: [2, 3], division: "Welterweight 85kg", arm: "Right arm", video: "b-X8FmHz2Bc" },
      { a: { first: "Ethan", last: "Lovei", country: "fr", photo: "ethan-lovei" },
        b: { first: "", last: "Sup1nator", country: "md", photo: "sup1nator" },
        winner: "a", score: [3, 0], division: "Lightweight 75kg", arm: "Right arm", video: "BW0liGzKn-Y" },
      { a: { first: "Nemanja", last: "Grujic", country: "rs", photo: "nemanja-grujic" },
        b: { first: "Martin", last: "Minarovic", country: "cz", photo: "martin-minarovic" },
        winner: "a", score: [3, 0], division: "Light Heavyweight 105kg", arm: "Right arm", video: "XXZkEHcvfME" },
      { a: { first: "Avtandil", last: "Tutberidze", country: "ge", photo: "avtandil-tutberidze" },
        b: { first: "Vaclav", last: "Vaculovic", country: "cz", photo: "vaclav-vaculovic" },
        winner: "b", score: [0, 3], division: "Heavyweight 115kg", arm: "Left arm", video: "LJCl1BAGJ1o" },
      { a: { first: "Bastien", last: "Cervelli", country: "fr", photo: "bastien-cervelli" },
        b: { first: "Andrija", last: "Simic", country: "hr", photo: "andrija-simic" },
        winner: "a", score: [3, 1], division: "Light Heavyweight 105kg", arm: "Right arm", video: "hkWi8VEi2W4" },
      { a: { first: "Sandris", last: "Sedis", country: "lv", photo: "sandris-sedis" },
        b: { first: "Beniamin", last: "Blajan", country: "ro", photo: "beniamin-blajan" },
        winner: "a", score: [3, 1], division: "Heavyweight 115kg", arm: "Left arm", video: "DoJyxREyLRY" },
      { a: { first: "Slobodan", last: "Novakovic", country: "rs", photo: "slobodan-novakovic" },
        b: { first: "Josef", last: "Lukacik", country: "cz", photo: "josef-lukacik" },
        winner: "a", score: [3, 2], division: "Middleweight 95kg", arm: "Right arm", video: "WywgX0en7HE" },
      { a: { first: "Mattia", last: "Vezzola", country: "it", photo: "mattia-vezzola" },
        b: { first: "Oleksandr", last: "Bezkorovainyi", country: "at", photo: "oleksandr-bezkorovainyi" },
        winner: "a", score: [3, 1], division: "Middleweight 85kg", arm: "Right arm", video: "0gXBpZ4_Ays" },
      { a: { first: "Daniel", last: "Kubaji", country: "ro", photo: "daniel-kubaji" },
        b: { first: "Viachaslau", last: "Kuksa", country: "pl", photo: "viachaslau-kuksa" },
        winner: "a", score: [3, 1], division: "Middleweight 95kg", arm: "Left arm", video: "kI4UzkikADY" }
    ]
  }
};

const PLAY_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>`;
const resultHTML = (m, i, dir) => {
  const side = (x, k) => {
    const won = m.winner === k;
    return { won, photo: `<div class="b-photo b-photo-${k}${won ? "" : " is-loser"}">${won ? `<span class="win-tag">Win</span>` : ""}<img src="${dir}/bust/${x.photo}.webp" alt="${esc(full(x))}" loading="lazy"></div>` };
  };
  const A = side(m.a, "a"), B = side(m.b, "b");
  return `
  <li class="bout result">
    <div class="bout-card">
      <p class="bout-label">${esc(m.division)}${m.arm ? ` &middot; ${esc(m.arm)}` : ""}${m.note ? ` &middot; <span class="b-special">${esc(m.note)}</span>` : ""}</p>
      <div class="bout-row">
        ${A.photo}
        ${nameBlock(m.a, "a").replace('class="b-name', `class="b-name${A.won ? " is-winner" : ""}${m.a.last.length > 9 ? " b-long" : ""}`)}
        <div class="score" aria-label="Score ${m.score[0]} to ${m.score[1]}">
          <span class="${A.won ? "s-win" : ""}">${m.score[0]}</span><span class="s-sep">:</span><span class="${B.won ? "s-win" : ""}">${m.score[1]}</span>
        </div>
        ${nameBlock(m.b, "b").replace('class="b-name', `class="b-name${B.won ? " is-winner" : ""}${m.b.last.length > 9 ? " b-long" : ""}`)}
        ${B.photo}
      </div>
      <div class="bout-bar">
        <div class="b-country">${country(m.a)}</div>
        <div class="b-mid">Match ${i + 1}</div>
        <div class="b-country b-country-b">${country(m.b)}</div>
      </div>
    </div>
    <div class="bout-actions">
      <button class="btn btn-red btn-sm" data-video="${esc(m.video)}" data-title="${esc(m.a.last)} vs ${esc(m.b.last)}">${PLAY_ICON}Watch match</button>
      <a class="yt-link" href="https://www.youtube.com/watch?v=${encodeURIComponent(m.video)}" target="_blank" rel="noopener">Open on YouTube</a>
    </div>
  </li>`;
};

const resultsEl = $("#results");
if (resultsEl) {
  const ev = PAST_EVENTS[resultsEl.dataset.event];
  resultsEl.innerHTML = ev.matches.map((m, i) => resultHTML(m, i, ev.photos)).join("");
}

/* ---------- video pop-up (plays the YouTube match on the site) ---------- */
const modal = $("#video-modal");
if (modal) {
  const frame = $(".vm-frame", modal), title = $(".vm-title", modal), yt = $(".vm-yt", modal);
  let lastFocus;
  const openVideo = (id, t) => {
    lastFocus = document.activeElement;
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="${esc(t)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    title.textContent = t; yt.href = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
    modal.hidden = false; document.body.classList.add("no-scroll");
    requestAnimationFrame(() => modal.classList.add("show"));
    $(".vm-close", modal).focus();
  };
  const closeVideo = () => {
    modal.classList.remove("show"); document.body.classList.remove("no-scroll");
    setTimeout(() => { modal.hidden = true; frame.innerHTML = ""; }, 250);
    if (lastFocus) lastFocus.focus();
  };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-video]"); if (b) { e.preventDefault(); openVideo(b.dataset.video, b.dataset.title); }
  });
  $(".vm-close", modal).addEventListener("click", closeVideo);
  modal.addEventListener("click", e => { if (e.target === modal) closeVideo(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeVideo(); });
}

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

/* ---------- retry photos that failed to load (e.g. mid-update) ---------- */
document.addEventListener("error", e => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || img.dataset.retried || img.classList.contains("flag")) return;
  img.dataset.retried = "1";
  img.src = img.src.split("?")[0] + "?r=" + Date.now();
}, true);

/* ==========================================================
   PRIDE STORIES. Newest first. Photo = 4:5 image (864x1080) in assets/img/stories/.
   text: paragraphs separated by a blank line.
   ========================================================== */
const STORIES = [
  { id: "ellen-signs", tag: "Signing", date: "2026-10-09", photo: "ellen-signs.jpg",
    title: "Ellen B. Åkesson signs with LPAL",
    text: "Former WWE athlete and Sweden's Strongest Woman Ellen B. Åkesson is officially an LPAL athlete." },
  { id: "ellen-two-opponents", tag: "History", date: "2026-10-09", photo: "ellen-two-opponents.jpg",
    title: "Two opponents, one night",
    text: "Ellen B. Åkesson will be the first woman ever to pull against two different opponents at the same event.\n\nBoth opponents are elite WAF athletes. The matches will be revealed soon." },
  { id: "world-title-match", tag: "World title", date: "2026-10-09", photo: "world-title-match.jpg",
    title: "The first LPAL World Title Match",
    text: "The first ever LPAL World Title Match takes place on 9 January 2027 in Cologne, Germany.\n\nThe match will be revealed on 30 October." }
];
const STORY_MS = 7000;

const stRow = $("#st-row");
if (stRow) {
  const seenKey = "lpal-stories-seen";
  let seen = [];
  try { seen = JSON.parse(localStorage.getItem(seenKey) || "[]"); } catch (e) {}
  const markSeen = id => { if (!seen.includes(id)) seen.push(id); try { localStorage.setItem(seenKey, JSON.stringify(seen)); } catch (e) {} };
  const fmt = d => { try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return ""; } };
  const src = s => `assets/img/stories/${s.photo}`;

  const renderRow = () => {
    stRow.innerHTML = STORIES.map((s, i) => `
      <button class="st-card${seen.includes(s.id) ? " is-seen" : ""}" data-i="${i}" aria-label="Open story: ${esc(s.title)}">
        <span class="st-img"><img src="${src(s)}" alt="" loading="lazy"></span>
        <span class="st-cap">${esc(s.title)}</span>
      </button>`).join("");
    $$(".st-card", stRow).forEach(c => c.addEventListener("click", () => open(+c.dataset.i, c)));
  };

  const sv = $("#sv"), bars = $("#sv-bars"), img = $("#sv-img");
  let cur = 0, timer = null, start = 0, elapsed = 0, paused = false, lastFocus = null;

  const setBars = () => {
    bars.innerHTML = STORIES.map((_, i) => `<span class="sv-bar"><i style="width:${i < cur ? 100 : 0}%"></i></span>`).join("");
  };
  const tick = () => {
    if (paused) return;
    const p = Math.min(1, (elapsed + performance.now() - start) / STORY_MS);
    const fill = bars.children[cur] && bars.children[cur].firstChild;
    if (fill) fill.style.width = (p * 100) + "%";
    if (p >= 1) { next(); return; }
    timer = requestAnimationFrame(tick);
  };
  const show = i => {
    cancelAnimationFrame(timer);
    cur = i; elapsed = 0; start = performance.now();
    const s = STORIES[i];
    const under = $("#sv-under");
    if (img.getAttribute("src")) { under.src = img.src; under.hidden = false; } else { under.hidden = true; }
    img.src = src(s); img.alt = s.title;
    $("#sv-bg").style.backgroundImage = `url('${src(s)}')`;
    $("#sv-tag").textContent = s.tag;
    $("#sv-h").textContent = s.title;
    $("#sv-date").textContent = fmt(s.date);
    $("#sv-body").innerHTML = String(s.text).split(/\n\s*\n/).map(p => `<p>${esc(p)}</p>`).join("");
    $("#sv-body").scrollTop = 0;
    $("#sv-prev").disabled = i === 0;
    markSeen(s.id);
    setBars();
    sv.classList.remove("swap"); void sv.offsetWidth; sv.classList.add("swap");
    if (!paused) timer = requestAnimationFrame(tick);
  };
  const next = () => cur < STORIES.length - 1 ? show(cur + 1) : close();
  const prev = () => show(Math.max(0, cur - 1));
  const setPaused = v => {
    if (v === paused) return;
    if (v) { elapsed += performance.now() - start; cancelAnimationFrame(timer); }
    else { start = performance.now(); timer = requestAnimationFrame(tick); }
    paused = v; sv.classList.toggle("is-paused", v);
    $("#sv-pause").setAttribute("aria-label", v ? "Play" : "Pause");
  };
  // open: the photo grows out of the clicked card and dissolves in
  const card = $(".sv-card");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flipFrom = el => {
    if (!el || reduce) return;
    const a = el.getBoundingClientRect(), b = card.getBoundingClientRect();
    if (!b.width) return;
    card.style.transition = "none";
    card.style.transformOrigin = "0 0";
    card.style.transform = `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width},${a.height / b.height})`;
    card.style.opacity = ".4";
    card.getBoundingClientRect();
    card.style.transition = "transform .55s cubic-bezier(.2,.8,.2,1), opacity .45s ease";
    card.style.transform = ""; card.style.opacity = "";
  };
  let openedFrom = null;
  function open(i, fromEl) {
    lastFocus = document.activeElement; openedFrom = fromEl || null; paused = false; sv.classList.remove("is-paused");
    $("#sv-img").removeAttribute("src");
    sv.hidden = false; document.body.classList.add("no-scroll");
    show(i);
    requestAnimationFrame(() => { sv.classList.add("show"); flipFrom(openedFrom); });
    $("#sv-close").focus();
  }
  function close() {
    cancelAnimationFrame(timer); sv.classList.remove("show"); document.body.classList.remove("no-scroll");
    const target = stRow.querySelector(`.st-card[data-i="${cur}"]`);
    if (target && !reduce && window.innerWidth > 860) {
      const a = target.getBoundingClientRect(), b = card.getBoundingClientRect();
      card.style.transformOrigin = "0 0";
      card.style.transition = "transform .4s cubic-bezier(.4,0,.2,1), opacity .35s ease";
      card.style.transform = `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width},${a.height / b.height})`;
      card.style.opacity = "0";
    }
    setTimeout(() => { sv.hidden = true; img.removeAttribute("src"); card.style.transition = card.style.transform = card.style.opacity = ""; }, 420);
    renderRow(); if (lastFocus) lastFocus.focus();
  }
  $("#sv-close").addEventListener("click", close);
  $("#sv-next").addEventListener("click", next);
  $("#sv-prev").addEventListener("click", prev);
  $("#sv-pause").addEventListener("click", () => setPaused(!paused));
  // hold to pause (like Instagram), and pause while reading the text
  const photo = $(".sv-photo");
  let holdT;
  let held = false;
  photo.addEventListener("pointerdown", e => { if (e.target.closest(".sv-top")) return; holdT = setTimeout(() => { held = true; setPaused(true); }, 180); });
  const release = () => { clearTimeout(holdT); if (held) { held = false; setPaused(false); } };
  photo.addEventListener("pointerup", release);
  photo.addEventListener("pointercancel", release);
  $(".sv-text").addEventListener("pointerenter", e => { if (e.pointerType === "mouse") setPaused(true); });
  let lastHold = 0;
  photo.addEventListener("pointerup", () => { if (held) lastHold = performance.now(); }, true);
  const tapGuard = fn => () => { if (performance.now() - lastHold < 300) return; fn(); };
  $(".sv-tap-r").addEventListener("click", tapGuard(next));
  $(".sv-tap-l").addEventListener("click", tapGuard(prev));
  $(".sv-text").addEventListener("pointerleave", e => { if (e.pointerType === "mouse") setPaused(false); });
  // swipe on phones
  let sx = null;
  sv.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  sv.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 60) (dx < 0 ? next : prev)(); sx = null; });
  sv.addEventListener("click", e => { if (e.target === sv || e.target.id === "sv-bg") close(); });
  document.addEventListener("keydown", e => {
    if (sv.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === " ") { e.preventDefault(); setPaused(!paused); }
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden && !sv.hidden) setPaused(true); });

  const scrollBy = d => stRow.scrollBy({ left: d * stRow.clientWidth * 0.8, behavior: "smooth" });
  $("#st-prev").addEventListener("click", () => scrollBy(-1));
  $("#st-next").addEventListener("click", () => scrollBy(1));
  renderRow();
}

/* ---------- YouTube: newest upload (looked up by the site's worker) ---------- */
const yt = $("#yt-latest");
if (yt) {
  const play = id => { yt.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`; };
  fetch("/api/youtube-latest")
    .then(r => r.json())
    .then(d => {
      const v = d.videos && d.videos[0];
      if (!v) throw new Error("none");
      play(v.id);
      if (v.title && $("#yt-title")) $("#yt-title").textContent = v.title;
    })
    .catch(() => play(yt.dataset.fallback));
}

/* ==========================================================
   INSTAGRAM FEED (Behold). Tries the JSON feed and draws UFC-style
   post cards; falls back to the Behold widget, then to the follow card.
   ========================================================== */
const IG = {
  feedId: "y1zs5Nh5ujrxm99MwNEU",
  profile: "https://www.instagram.com/lion_pride_armwrestling_league/",
  username: "lion_pride_armwrestling_league"
};
const igBox = $("#ig-feed");
if (igBox) {
  const fmtDate = t => { try { return new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return ""; } };
  const num = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K" : String(n);
  const pic = p => (p.sizes && (p.sizes.large || p.sizes.medium || p.sizes.full) || {}).mediaUrl || p.thumbnailUrl || p.mediaUrl || "";
  const thumb = p => (p.sizes && (p.sizes.small || p.sizes.medium) || {}).mediaUrl || p.thumbnailUrl || p.mediaUrl || "";
  const HEART = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.4 3.2 5 6.6 5c2 0 3.4 1.1 4.4 2.5C12 6.1 13.4 5 15.4 5 18.8 5 21 8.4 19.5 11.8 17.5 16.4 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
  const BUBBLE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 1 3.3 6.5L3 20l1.5-4A8 8 0 0 1 4 12z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
  const showWidget = () => {
    igBox.classList.add("ig-has-widget");
    const w = document.createElement("div"); w.className = "ig-widget";
    w.innerHTML = `<behold-widget feed-id="${IG.feedId}"></behold-widget>`;
    igBox.insertBefore(w, igBox.querySelector(".btn-ig"));
    const sc = document.createElement("script"); sc.type = "module"; sc.src = "https://w.behold.so/widget.js";
    document.head.append(sc);
  };
  fetch(`https://feeds.behold.so/${IG.feedId}`)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      const posts = (Array.isArray(data) ? data : data.posts || []).filter(p => p && (p.mediaUrl || p.thumbnailUrl || p.sizes));
      if (!posts.length) throw new Error("empty");
      const user = data.username || IG.username;
      const avatar = data.profilePictureUrl || "assets/img/favicon-lpal-512.png";
      const p = posts[0];
      const cap = String(p.prunedCaption || p.caption || "").trim();
      const short = cap.length > 170 ? cap.slice(0, 170).replace(/\s+\S*$/, "") + "…" : cap;
      const likes = typeof p.likeCount === "number" ? `<span class="ig-stat">${HEART}${num(p.likeCount)}</span>` : "";
      const comments = typeof p.commentsCount === "number" ? `<span class="ig-stat">${BUBBLE}${num(p.commentsCount)}</span>` : "";
      const IG_LOGO = `<svg class="ig-logo" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>`;
      igBox.innerHTML = `
        ${IG_LOGO}
        <h3 class="ig-headline">Latest on Instagram</h3>
        <article class="ig-embed">
          <div class="ig-head">
            <span class="ig-avatar"><img src="${esc(avatar)}" alt=""></span>
            <div class="ig-who">
              <p class="ig-name">${esc(user)}</p>
              <p class="ig-sub">Instagram &middot; <a class="ig-follow" href="${IG.profile}" target="_blank" rel="noopener">Follow</a></p>
            </div>
            <a class="ig-mark" href="${esc(p.permalink || IG.profile)}" target="_blank" rel="noopener" aria-label="Open on Instagram">${IG_LOGO}</a>
          </div>
          ${cap ? `<p class="ig-caption" data-full="${esc(cap)}">${esc(short)}${cap.length > short.length ? ` <button class="ig-more">more</button>` : ""}</p>` : ""}
          <a class="ig-post" href="${esc(p.permalink || IG.profile)}" target="_blank" rel="noopener">
            <img src="${esc(pic(p))}" alt="${esc(short || "Latest LPAL Instagram post")}" loading="lazy">
            ${p.mediaType === "VIDEO" ? `<span class="ig-play" aria-hidden="true">${PLAY_ICON}</span>` : ""}
          </a>
          <p class="ig-date">${esc(fmtDate(p.timestamp))}</p>
          <div class="ig-meta">${likes}${comments}</div>
        </article>
        ${posts.length > 1 ? `<div class="ig-thumbs">${posts.slice(1, 4).map(q => `<a href="${esc(q.permalink || IG.profile)}" target="_blank" rel="noopener"><img src="${esc(thumb(q))}" alt="LPAL Instagram post" loading="lazy"></a>`).join("")}</div>` : ""}
        <a class="btn btn-ig btn-sm" href="${IG.profile}" target="_blank" rel="noopener">View more on Instagram</a>`;
      const more = $(".ig-more", igBox);
      if (more) more.addEventListener("click", e => { const c = e.target.closest(".ig-caption"); c.textContent = c.dataset.full; });
    })
    .catch(showWidget);
}

if ($("#year")) $("#year").textContent = new Date().getFullYear();

/* shrink long last names so they never run into the photos */
function fitNames() {
  $$("#bouts .b-last").forEach(e => {
    e.style.fontSize = "";
    let f = parseFloat(getComputedStyle(e).fontSize);
    while (e.scrollWidth > e.clientWidth + 1 && f > 14) { f -= 1; e.style.fontSize = f + "px"; }
  });
}
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNames);
fitNames();
window.addEventListener("resize", () => requestAnimationFrame(fitNames));

/* ==========================================================
   ATHLETES PAGE: everyone who pulled from LPAL 1 to LPAL 4,
   grouped by weight division. Newest event photo is used.
   ========================================================== */
// Athletes on the LPAL 4 roster whose match is not on the card yet.
const EXTRA_ATHLETES = [
  { first: "Philipp", last: "Stahlhofen", country: "de", photo: null, instagram: "philipp_stahlhofen", division: "Lightweight 77kg", lpal4: true }
];
const CHIP_LABEL = { lw: "77kg", ww: "85kg", mw: "95kg", lhw: "105kg", hw: "115kg", shw: "115kg+", w: "Women" };
const DIVISIONS = [
  ["lw", "Lightweight 77kg"], ["ww", "Welterweight 85kg"], ["mw", "Middleweight 95kg"],
  ["lhw", "Light Heavyweight 105kg"], ["hw", "Heavyweight 115kg"], ["shw", "Super Heavyweight 115kg+"],
  ["w", "Women"]
];
// 70kg and the old 75kg division both go into Lightweight 77kg.
const divKey = d => {
  const s = String(d), kg = parseInt((s.match(/(\d+)\s*kg/i) || [])[1], 10);
  if (/women/i.test(s)) return "w";   // all women in one section for now
  if (/\+/.test(s)) return "shw";
  return kg <= 77 ? "lw" : kg <= 85 ? "ww" : kg <= 95 ? "mw" : kg <= 105 ? "lhw" : "hw";
};

const athletesEl = $("#athletes");
if (athletesEl) {
  const roster = new Map();
  const keyOf = x => (x.first + " " + x.last).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  const add = (x, info) => {
    const k = keyOf(x);
    const r = roster.get(k) || { first: x.first, last: x.last, wins: 0, losses: 0, events: [], divs: [], img: null };
    Object.assign(r, { first: x.first, last: x.last, country: x.country || r.country });
    if (!r.divs.includes(info.div)) r.divs.push(info.div);   // listed in every division they pulled in
    if (x.instagram) r.instagram = x.instagram;
    if (info.img) r.img = info.img;               // later events overwrite: newest photo wins
    if (!r.events.includes(info.event)) r.events.push(info.event);
    if (info.won === true) r.wins++;
    if (info.won === false) r.losses++;
    if (info.event === "LPAL 4") r.lpal4 = true;
    roster.set(k, r);
  };
  // Oldest to newest, so the newest division and photo are kept.
  ["lpal-1", "lpal-2", "lpal-3"].forEach((id, n) => {
    const ev = PAST_EVENTS[id];
    ev.matches.forEach(m => ["a", "b"].forEach(s => add(m[s], {
      div: divKey(m.division), event: `LPAL ${n + 1}`, won: m.winner === s,
      img: m[s].photo ? `${ev.photos}/bust/${m[s].photo}.webp` : null
    })));
  });
  MATCHES.filter(m => !m.hidden).forEach(m => ["a", "b"].forEach(s => m[s] && add(m[s], {
    div: divKey(m.division), event: "LPAL 4", won: null, img: m[s].photo ? bust(m[s].photo) : null
  })));
  EXTRA_ATHLETES.forEach(x => add(x, { div: divKey(x.division), event: "LPAL 4", won: null, img: x.photo ? bust(x.photo) : null }));

  const all = [...roster.values()];
  const SIL = "assets/img/bust-v2/silhouette-athlete.webp";
  const cardHTML = a => {
    const fights = a.wins + a.losses;
    const record = fights ? `<span class="ath-rec"><b>${a.wins}-${a.losses}</b> W-L</span>` : `<span class="ath-rec ath-debut">LPAL debut</span>`;
    const search = `${a.first} ${a.last} ${COUNTRIES[a.country] || ""}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return `
    <article class="ath-card" data-q="${esc(search)}">
      <div class="ath-photo">
        ${a.lpal4 ? `<span class="ath-next">LPAL 4</span>` : ""}
        <img src="${a.img || SIL}" alt="${esc(full(a))}" loading="lazy">
      </div>
      <div class="ath-info">
        <p class="ath-first">${a.first ? esc(a.first) : "&nbsp;"}</p>
        <h3 class="ath-last"><span>${esc(a.last)}</span></h3>
        <div class="ath-country">${country(a)}${igIcon(a)}</div>
        <div class="ath-meta">${record}<span class="ath-events">${a.events.map(e => e.replace("LPAL ", "")).join(" · ").replace(/^/, "LPAL ")}</span></div>
      </div>
    </article>`;
  };
  const sortAth = (x, y) => (y.lpal4 ? 1 : 0) - (x.lpal4 ? 1 : 0) || y.wins - x.wins || x.losses - y.losses || x.last.localeCompare(y.last);

  athletesEl.innerHTML = DIVISIONS.map(([k, name]) => {
    const list = all.filter(a => a.divs.includes(k)).sort(sortAth);
    if (!list.length) return "";
    return `
    <section class="ath-div" id="div-${k}" data-div="${k}">
      <div class="ath-div-head"><h2 class="ath-div-title">${esc(name)}</h2><span class="ath-div-count">${list.length} athletes</span></div>
      <div class="ath-grid">${list.map(cardHTML).join("")}</div>
    </section>`;
  }).join("");

  const countries = new Set(all.map(a => a.country).filter(Boolean));
  $("#ath-totals").innerHTML = `<span><b>${all.length}</b> athletes</span><span><b>${countries.size}</b> countries</span><span><b>4</b> events</span>`;

  const present = DIVISIONS.filter(([k]) => $(`#div-${k}`));
  $("#ath-chips").innerHTML = [["all", "All"], ...present.map(([k, n]) => [k, n.replace("Women's ", "W. ")])]
    .map(([k, n], i) => [k, k === "all" ? n : CHIP_LABEL[k]]).map(([k, n], i) => `<button class="ath-chip${i ? "" : " active"}" role="tab" aria-selected="${!i}" data-k="${k}">${esc(n)}</button>`).join("");

  let curDiv = "all";
  // Long last names shrink to fit the card instead of breaking mid-word.
  const fitAth = () => $$(".ath-last span", athletesEl).forEach(e => {
    e.style.fontSize = "";
    const box = e.parentElement; let f = parseFloat(getComputedStyle(box).fontSize);
    while (e.scrollWidth > box.clientWidth + 1 && f > 14) { f -= 1; e.style.fontSize = f + "px"; }
  });
  fitAth();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAth);
  window.addEventListener("resize", () => requestAnimationFrame(fitAth));
  const apply = () => {
    const q = $("#ath-q").value.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    let shown = 0;
    $$(".ath-div", athletesEl).forEach(sec => {
      let n = 0;
      $$(".ath-card", sec).forEach(c => { const ok = !q || c.dataset.q.includes(q); c.hidden = !ok; n += ok; });
      sec.hidden = (curDiv !== "all" && sec.dataset.div !== curDiv) || !n;
      if (!sec.hidden) shown += n;
    });
    $("#ath-empty").hidden = shown > 0;
  };
  $$(".ath-chip").forEach(b => b.addEventListener("click", () => {
    curDiv = b.dataset.k;
    $$(".ath-chip").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
    b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    apply();
    const top = $(".ath-sec").getBoundingClientRect().top + scrollY - 70;
    if (scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }));
  $("#ath-q").addEventListener("input", apply);
}
