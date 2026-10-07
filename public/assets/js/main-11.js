/* ==========================================================
   LPAL site script
   To update the site, edit SETTINGS, MAIN_EVENT and MATCHES below.
   ========================================================== */

const SETTINGS = {
  // Event start, Cologne time (CET = +01:00 in January)
  eventStart: "2027-01-09T19:00:00+01:00",
  watchUrl: "https://kick.com/lionpridearmwrestling",
  // Ticket shop link. While empty, BUY TICKETS stays inactive.
  ticketsUrl: ""
};

// Country codes (ISO 2 letters) -> name shown under the athlete
const COUNTRIES = {
  at: "Austria", bg: "Bulgaria", de: "Germany", fr: "France", ge: "Georgia",
  gr: "Greece", it: "Italy", lt: "Lithuania", lv: "Latvia", ma: "Morocco",
  rs: "Serbia", se: "Sweden", sk: "Slovakia", tr: "Turkey"
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
    b: { first: "", last: "Black Buffalo", country: "fr", photo: "black-buffalo", instagram: "black_buffalo.24" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { a: { first: "Philipp", last: "Stahlhofen", note: "70kg", country: "de", photo: null, instagram: "philipp_stahlhofen" },
    b: { first: "Reza", last: "Motamedi", note: "115kg", country: "de", photo: null, instagram: "reza_silverback" },
    division: "Heavyweight 115kg", arm: "", special: "David vs Goliath" },
  { a: { first: "Ellen B.", last: "Åkesson", country: "se", photo: "ellen-akesson", instagram: "ellen.viking" },
    b: { first: "Ivana", last: "Hradská", country: "sk", photo: "ivana-hradska", instagram: "hradska_ivana" },
    division: "Women's Open Weight 75kg", arm: "Right arm" },
  { a: { first: "Denis", last: "Gruber", country: "at", photo: null, instagram: "gruber.denis" },
    b: { first: "Gabriele", last: "Giurdanella", country: "it", photo: "gabriele-giurdanella", instagram: "gabriele__giurdanella" },
    division: "Middleweight 95kg", arm: "Right arm" },
  { a: { first: "Allan", last: "Barberis", country: "fr", photo: "allan-barberis", instagram: "france.armwrestling" },
    b: { first: "Nikolay", last: "Tsankov", country: "bg", photo: "nikolay-tsankov", instagram: "tsankov.armwrestling" },
    division: "Super Heavyweight 115kg+", arm: "" },
  { a: { first: "Ellen B.", last: "Åkesson", country: "se", photo: "ellen-akesson", instagram: "ellen.viking" },
    b: { first: "Megan", last: "Stone", country: "at", photo: "megan-stone", instagram: "fit_megan_stone__" },
    division: "Women's Heavyweight 70kg", arm: "Left arm" },
  { a: { first: "Gocha", last: "Sitchinava", country: "ge", photo: "gocha-sitchinava", instagram: "sichiarm11" },
    b: { first: "Tunahan", last: "İlaslan", country: "tr", photo: "tunahan-ilaslan", instagram: "tunahan_ilaslan" },
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
  ["Achievements", x => Array.isArray(x.achievements) ? x.achievements.map(esc).join("<br>") : esc(x.achievements || "")]
];

const nameBlock = (x, side) => x
  ? `<div class="b-name b-name-${side}">${x.first ? `<span class="b-first">${esc(x.first)}</span>` : ""}<span class="b-last">${esc(x.last)}</span>${x.note ? `<span class="b-note">${esc(x.note)}</span>` : ""}</div>`
  : `<div class="b-name b-name-${side}"><span class="b-first">To be announced</span><span class="b-last b-tba">TBA</span></div>`;

const detailHTML = (a, b, division, arm) => {
  const rows = STATS.map(([label, get]) => {
    const va = get(a) || "", vb = get(b) || "";
    if (!va && !vb) return "";
    return `<tr><td class="sa">${label === "Country" ? esc(va) : va || "&ndash;"}</td><th>${label}</th><td class="sb">${label === "Country" ? esc(vb) : vb || "&ndash;"}</td></tr>`;
  }).join("") + (arm ? `<tr><td class="sa">${esc(arm)}</td><th>Arm</th><td class="sb">${esc(arm)}</td></tr>` : "");
  return `
    <div class="bout-detail" aria-hidden="true"><div class="bd-inner">
      <div class="bd-head">
        <span class="bd-name bd-name-a">${esc(full(a))}${igIcon(a)}</span>
        <span class="bd-div">${esc(division)}</span>
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
  imgA: me.a && me.a.photo ? bust(me.a.photo) : "assets/img/bust-v2/silhouette-a.webp",
  imgB: me.b && me.b.photo ? bust(me.b.photo) : "assets/img/bust-v2/silhouette-b.webp"
});

$("#bouts").innerHTML = mainHTML + MATCHES.map((m, i) => boutHTML({
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

$("#year").textContent = new Date().getFullYear();
