/* ==========================================================
   LPAL 4 partner page. Not linked from the main website.
   Edit SETTINGS, PACKAGES and MATCHES below.
   ========================================================== */

const SETTINGS = {
  // Where inquiries go. Fill in before sending the link to sponsors.
  email: "",
  whatsapp: "",            // e.g. "+43 660 1234567"
  // Show the main event names (keep false until the official reveal on 25 October).
  revealMainEvent: false
};

const STATS = [
  { n: "5.6M+", l: "Combined followers", s: "Athletes on the card + league, Instagram & TikTok" },
  { n: "100K+", l: "Expected live viewers", s: "Free worldwide stream on Kick" },
  { n: "20K", l: "Live viewers at LPAL 3", s: "With only 300K followers on the card" },
  { n: "2M", l: "League reach", s: "Last 30 days, LPAL channels" },
  { n: "10", l: "Matches", s: "Incl. the first LPAL World Title Match" },
  { n: "20", l: "Athletes", s: "From 16 countries, incl. world champions" }
];

/* ---------- packages ----------
   cat: headline | matches | jersey | stream | arena | entry
   once: true = only one partner.  tag: optional small label.  price: number or text. */
const PACKAGES = [
  { id: "presenting", cat: "headline", name: "Presenting Partner", price: 25000, once: true, tag: "Exclusive",
    items: ["“LPAL 4 presented by [your brand]” on the event name, poster and announcements",
            "Your logo on almost every livestream graphic: scoreboard, athlete cards, lower thirds, breaks",
            "Logo on the table mat, visible in every match and every replay",
            "8+ mentions by the commentators during the stream",
            "Top position on the sponsor wall and the stage",
            "Logo on every official poster, posted as a collaboration by all athletes on the card",
            "Your commercial built into the athletes' contracted reels",
            "Logo on the big LED screen all night",
            "Category exclusivity (no competitor on the event)",
            "Full report: Kick statistics, clip views after 30 days, photos"] },
  { id: "premium", cat: "headline", name: "Premium Partner", price: 9000, tag: "2 available",
    items: ["Logo on every official poster, posted as a collaboration by all athletes",
            "Your commercial built into athletes' reels (contracted LPAL posts)",
            "Logo on the big LED screen and in the livestream",
            "Official partner title, e.g. “Official Energy Drink of LPAL”",
            "Category exclusivity", "6 VIP tickets"] },
  { id: "table", cat: "headline", name: "Table Partner", price: 8000, once: true, tag: "Most visible",
    items: ["Logo on the table front and back panels, elbow pads and grip pads",
            "In frame for every second of all 10 matches",
            "Visible in every clip, replay and photo for 12 months",
            "See the 3D table above for every logo zone"] },
  { id: "jersey-full", cat: "headline", name: "Jersey Partner (all areas)", price: 12000, once: true, tag: "Save €1,000",
    items: ["Logo on chest, both sleeves and back of every athlete jersey", "Logo on the referees' shirts",
            "In every winner photo, interview and walkout", "Bookable while all three jersey areas are free"] },

  { id: "title", cat: "matches", name: "World Title Match Partner", price: 6000, once: true,
    items: ["The first LPAL World Title Match carries your name", "Your representative presents the championship belt",
            "Logo on the athlete introduction graphics", "Clip of the title match with your name in the title"] },
  { id: "challenger", cat: "matches", name: "Challenger Match Partner", price: 3500, tag: "2 available",
    items: ["One of the two challenger matches carries your name", "You hand over the challenge on stage", "Clip with your name in the title"] },
  { id: "match", cat: "matches", name: "Match Partner", price: 2000, tag: "Several available",
    items: ["One match carries your name", "Mentioned in the announcement and on stream", "Winner photo on stage with your logo"] },
  { id: "fotn", cat: "matches", name: "Fight of the Night", price: 1500, once: true,
    items: ["Your brand awards the best match of the night", "Presented on stage by you", "Mentioned in the results post"] },

  { id: "chest", cat: "jersey", name: "Jersey Chest", price: 6000, once: true,
    items: ["Chest of every athlete jersey", "Winner photos and interviews", "Referee shirts"] },
  { id: "sleeves", cat: "jersey", name: "Jersey Sleeves", price: 4500, once: true,
    items: ["Both sleeves of every jersey", "In the close-ups of all 10 matches"] },
  { id: "back", cat: "jersey", name: "Jersey Back", price: 2500, once: true,
    items: ["Large logo on the back of every jersey", "Walkouts and award ceremony"] },

  { id: "stream", cat: "stream", name: "Stream Partner", price: 4500, once: true,
    items: ["Logo on screen during the whole broadcast and the recording", "Mentioned in each half of the show"] },
  { id: "costream", cat: "stream", name: "Co-Stream Partner", price: 5000, once: true,
    items: ["Your brand on at least 3 extra Kick co-streams", "Two discount codes, valid 30+ days", "Chat message every 10 minutes"] },
  { id: "clips", cat: "stream", name: "Clip Partner", price: 4000, once: true,
    items: ["2-second brand intro on 30+ match clips", "Name in every clip description", "Clips stay online for 12 months"] },
  { id: "opener", cat: "stream", name: "Show Opener", price: 1500, once: true,
    items: ["Two spots up to 30 seconds before the show starts", "Your still image until the first match"] },
  { id: "spot", cat: "stream", name: "Stream Spot", price: 1200, tag: "Max. 4 per night",
    items: ["One spot up to 30 seconds in a break", "Kept in the recording"] },

  { id: "walkout", cat: "arena", name: "Walkout Partner", price: 5000, once: true,
    items: ["WWE-style walkouts with music, lights and pyro: your brand in every one",
            "Your logo on each athlete's walkout graphic on the big screen",
            "Walkout gate and walkout jackets with your logo", "30+ logo moments of 15 seconds on the LED wall"] },
  { id: "led", cat: "arena", name: "LED Screen Partner", price: 3000, once: true,
    items: ["Your logo in the big LED wall loop all night", "15-second spot on the LED wall between matches",
            "Seen in the hall and in the wide shots of the livestream"] },
  { id: "photowall", cat: "arena", name: "Photo Wall & Fan Table", price: 3000, once: true,
    items: ["Interview wall with your logo", "Armwrestling fan table at the entrance with your branding"] },
  { id: "floor", cat: "arena", name: "Floor Partner", price: 2000, once: true,
    items: ["Logo on the floor around the competition table", "Seen in the wide shots of every match"] },
  { id: "booth", cat: "arena", name: "Booth in the Hall", price: 1500, tag: "Several available",
    items: ["2 × 2 m space, table, two chairs, power", "Sales and sampling allowed", "Banner space"] },
  { id: "food", cat: "arena", name: "Food & Drinks Area", price: 1500, once: true,
    items: ["The food and drinks area carries your name", "Signage on site"] },

  { id: "starter", cat: "entry", name: "Starter Bundle", price: 1500, tag: "New",
    items: ["Large logo on the sponsor wall", "One 30-second stream spot", "Logo in the recap video", "4 tickets"] },
  { id: "online", cat: "entry", name: "Online Partner", price: 750, tag: "New",
    items: ["Logo in the partner section of the LPAL website", "Mention in the recap video", "2 tickets"] },
  { id: "product", cat: "entry", name: "Product Partner", price: "In kind", tag: "New",
    items: ["Supply drinks, supplements or gear for athletes and crew", "Your product visible backstage and in athlete content", "Name on the sponsor wall"] },
  { id: "wall-logo", cat: "entry", name: "Logo on the Sponsor Wall", price: 500,
    items: ["Large logo on the sponsor wall", "Logo in the post-event report", "2 tickets"] },
  { id: "wall-name", cat: "entry", name: "Name on the Sponsor Wall", price: 250,
    items: ["Company name on the sponsor wall", "Listed in the sponsor list", "1 ticket"] }
];
const CATS = [["all", "All"], ["headline", "Headline"], ["matches", "Matches"], ["jersey", "Jersey"], ["stream", "Livestream & clips"], ["arena", "Arena"], ["entry", "Entry deals"]];

/* ---------- fight card ---------- */
// Main event: names stay out of this file until the official reveal on 25 October
// (fill in a/b like the matches below and set revealMainEvent: true).
const MAIN_EVENT = { title: "LPAL World Title Match", reveal: "Revealed 25 October", a: {}, b: {} };
// followers: combined Instagram + TikTok (only where known)
const MATCHES = [
  { a: { first: "Luka", last: "Tsinadze", country: "ge", photo: "luka-tsinadze", instagram: "tsinadze_" },
    b: { first: "Nemanja", last: "Grujic", country: "rs", photo: "nemanja-grujic", instagram: "_nemanjagrujic" }, division: "Middleweight 95kg" },
  { a: { first: "Avtandil", last: "Tutberidze", country: "ge", photo: "avtandil-tutberidze", instagram: "tutberidzea___" },
    b: { first: "Sandris", last: "Sedis", country: "lv", photo: "sandris-sedis", instagram: "panzer_sedis" }, division: "Heavyweight 115kg" },
  { a: { first: "Rachid", last: "Ellouah", country: "ma", photo: "rachid-ellouah", instagram: "rachid_hanma", tiktok: "armwrestlingmaroc", followers: 1419800 },
    b: { first: "", last: "Black Buffalo", country: "ci", photo: "black-buffalo-3", instagram: "black_buffalo.24", tiktok: "black_buffalo24", followers: 1228000 }, division: "Middleweight 95kg" },
  { a: { first: "Ellen B.", last: "Åkesson", country: "se", photo: "ellen-akesson", instagram: "ellen.viking", tiktok: "ellenviking", followers: 1546000 },
    b: { first: "Ivana", last: "Hradská", country: "sk", photo: "ivana-hradska-3", instagram: "hradska_ivana" }, division: "Women's Open Weight" },
  { a: { first: "Denis", last: "Gruber", country: "at", photo: "denis-gruber-2", instagram: "gruber.denis" },
    b: { first: "Gabriele", last: "Giurdanella", country: "it", photo: "gabriele-giurdanella", instagram: "gabriele__giurdanella" }, division: "Middleweight 95kg" },
  { a: { first: "Allan", last: "Barberis", country: "fr", photo: "allan-barberis", instagram: "france.armwrestling" },
    b: { first: "Nikolay", last: "Tsankov", country: "bg", photo: "nikolay-tsankov", instagram: "tsankov.armwrestling" }, division: "Super Heavyweight 115kg+" },
  { a: { first: "Martin", last: "Vodopija", country: "at", photo: "martin-vodpija", instagram: "martin_armwrestling" },
    b: { first: "David", last: "Garcia", country: "es", photo: "david-garcia-2", instagram: "_24david24", tiktok: "24david24_", followers: 1361000 }, division: "Lightweight 77kg" },
  { a: { first: "Ellen B.", last: "Åkesson", country: "se", photo: "ellen-akesson", instagram: "ellen.viking", tiktok: "ellenviking", followers: 1546000 },
    b: { first: "Megan", last: "Stone", country: "at", photo: "megan-stone", instagram: "fit_megan_stone__" }, division: "Women's Middleweight 70kg" },
  { a: { first: "Gocha", last: "Sitchinava", country: "ge", photo: "gocha-sitchinava", instagram: "sichiarm11", followers: 13988 },
    b: { first: "Tunahan", last: "İlaslan", country: "tr", photo: "tunahan-ilaslan", instagram: "tunahan_ilaslan" }, division: "Lightweight 77kg" }
];
const COUNTRIES = { at: "Austria", bg: "Bulgaria", ci: "Ivory Coast", es: "Spain", fr: "France", ge: "Georgia", gr: "Greece", it: "Italy",
  lt: "Lithuania", lv: "Latvia", ma: "Morocco", rs: "Serbia", se: "Sweden", sk: "Slovakia", tr: "Turkey" };
const VIDEOS = [
  { id: "DoJyxREyLRY", t: "Sedis vs Blajan · LPAL 3" },
  { id: "BFxa20HYhQg", t: "Tsankov vs Djordjevic · LPAL 2" },
  { id: "WywgX0en7HE", t: "Novakovic vs Lukacik · LPAL 3" }
];

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const full = x => (x.first + " " + x.last).trim();
const eur = n => typeof n === "number" ? "€" + n.toLocaleString("en-US") : n;
const short = n => n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M" : n >= 1e3 ? Math.round(n / 1e3) + "K" : String(n);
const flag = c => c ? `<img class="p-flag" src="https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${c}.svg" alt="" width="20" height="15" loading="lazy" onerror="this.remove()">` : "";
const IG = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>`;
const TT = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>`;
const socials = x => (x.instagram ? `<a class="p-soc p-ig" href="https://www.instagram.com/${encodeURIComponent(x.instagram)}/" target="_blank" rel="noopener" aria-label="${esc(full(x))} on Instagram">${IG}<span>@${esc(x.instagram)}</span></a>` : "")
  + (x.tiktok ? `<a class="p-soc p-tt" href="https://www.tiktok.com/@${encodeURIComponent(x.tiktok)}" target="_blank" rel="noopener" aria-label="${esc(full(x))} on TikTok">${TT}<span>@${esc(x.tiktok)}</span></a>` : "");

/* ---------- header + hero ---------- */
const bar = $("#p-bar");
addEventListener("scroll", () => bar.classList.toggle("solid", scrollY > 40), { passive: true });
const vid = $("#p-video");
vid.src = matchMedia("(max-width: 820px)").matches ? "assets/video/lpal-opener-mobile.mp4" : "assets/video/lpal-opener.mp4";
vid.play().catch(() => {});

/* ---------- numbers ---------- */
$("#p-stats").innerHTML = STATS.map(s => `<div class="p-stat"><span class="p-stat-n">${esc(s.n)}</span><span class="p-stat-l">${esc(s.l)}</span><span class="p-stat-s">${esc(s.s)}</span></div>`).join("");

/* ---------- fight card ---------- */
const side = (x, k, hide) => {
  const img = hide ? `assets/img/bust-v2/silhouette-me-${k}.webp` : x.photo ? `assets/img/bust-v2/${x.photo}.webp` : "assets/img/bust-v2/silhouette-athlete.webp";
  return `<div class="p-ath p-ath-${k}">
    <div class="p-ath-img"><img src="${img}" alt="${hide ? "To be announced" : esc(full(x))}" loading="lazy">${!hide && x.followers ? `<span class="p-fol">${short(x.followers)} followers</span>` : ""}</div>
    <div class="p-ath-txt">
      ${hide ? `<p class="p-first">To be announced</p><p class="p-last">TBA</p>` :
        `${x.first ? `<p class="p-first">${esc(x.first)}</p>` : ""}<p class="p-last">${esc(x.last)}</p>
         <p class="p-ctry">${flag(x.country)}${esc(COUNTRIES[x.country] || "")}</p>
         <div class="p-socs">${socials(x)}</div>`}
    </div>
  </div>`;
};
const bout = (m, main) => `<li class="p-bout${main ? " p-bout-main" : ""}">
  <p class="p-div">${main ? `<span class="p-tag">Main event</span> ` : ""}${esc(main ? m.title : m.division)}</p>
  <div class="p-bout-row">${side(m.a, "a", main && !SETTINGS.revealMainEvent)}<span class="p-vs">vs</span>${side(m.b, "b", main && !SETTINGS.revealMainEvent)}</div>
  ${main && !SETTINGS.revealMainEvent ? `<p class="p-reveal">${esc(m.reveal)}</p>` : ""}
</li>`;
$("#p-bouts").innerHTML = bout(MAIN_EVENT, true) + MATCHES.map(m => bout(m, false)).join("");

/* ---------- packages + selection ---------- */
const sel = new Set();
const packHTML = p => `<article class="p-pack${p.id === "presenting" ? " p-pack-hero" : ""}" data-cat="${p.cat}" data-id="${p.id}">
  <div class="p-pack-top">${p.tag ? `<span class="p-pack-tag">${esc(p.tag)}</span>` : ""}${p.once ? `<span class="p-pack-once">1 partner only</span>` : ""}</div>
  <h3>${esc(p.name)}</h3>
  <p class="p-price">${eur(p.price)}${typeof p.price === "number" ? `<small>net</small>` : ""}</p>
  <ul>${p.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
  <button class="p-btn p-btn-outline p-add" type="button" data-id="${p.id}">Add to selection</button>
</article>`;
$("#p-packs").innerHTML = PACKAGES.map(packHTML).join("");
$("#p-filter").innerHTML = CATS.map(([k, n], i) => `<button class="p-chip${i ? "" : " on"}" data-k="${k}" role="tab">${esc(n)}</button>`).join("");
$$(".p-chip").forEach(b => b.addEventListener("click", () => {
  $$(".p-chip").forEach(x => x.classList.toggle("on", x === b));
  $$(".p-pack").forEach(p => p.hidden = b.dataset.k !== "all" && p.dataset.cat !== b.dataset.k);
}));
const renderSel = () => {
  const list = PACKAGES.filter(p => sel.has(p.id));
  $("#p-sel").innerHTML = list.length ? list.map(p => `<li><span>${esc(p.name)}</span><b>${eur(p.price)}</b><button type="button" aria-label="Remove ${esc(p.name)}" data-rm="${p.id}">&times;</button></li>`).join("")
    : `<li class="p-sel-empty">No packages selected yet</li>`;
  const total = list.reduce((s, p) => s + (typeof p.price === "number" ? p.price : 0), 0);
  $("#p-sel-total").innerHTML = list.length ? `Total <b>${eur(total)}</b> <small>net, plus VAT</small>` : "";
  $$(".p-add").forEach(b => { const on = sel.has(b.dataset.id); b.classList.toggle("on", on); b.textContent = on ? "✓ Selected" : "Add to selection"; });
  $$("[data-rm]").forEach(b => b.addEventListener("click", () => { sel.delete(b.dataset.rm); renderSel(); }));
  const cb = $("#p-cartbar"); cb.hidden = !list.length;
  $("#p-cart-text").textContent = `${list.length} package${list.length === 1 ? "" : "s"} · ${eur(total)}`;
  const body = encodeURIComponent(`Hello LPAL team,\n\nWe are interested in partnering with LPAL 4 (9 January 2027, Cologne).\n\nSelected packages:\n${list.map(p => `- ${p.name}: ${eur(p.price)}`).join("\n") || "- (please suggest packages for our budget)"}\n\nCompany:\nContact person:\nPhone:\n\nThank you!`);
  const send = $("#p-send");
  if (SETTINGS.email) send.href = `mailto:${SETTINGS.email}?subject=${encodeURIComponent("LPAL 4 partnership inquiry")}&body=${body}`;
  else { send.href = "#contact"; send.classList.add("disabled"); send.textContent = "Contact details coming soon"; }
};
$$(".p-add").forEach(b => b.addEventListener("click", () => { sel.has(b.dataset.id) ? sel.delete(b.dataset.id) : sel.add(b.dataset.id); renderSel(); }));
$("#p-contact-alt").innerHTML = [SETTINGS.email && `<a href="mailto:${esc(SETTINGS.email)}">${esc(SETTINGS.email)}</a>`,
  SETTINGS.whatsapp && `<a href="https://wa.me/${SETTINGS.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener">WhatsApp ${esc(SETTINGS.whatsapp)}</a>`].filter(Boolean).join(" · ");
renderSel();

/* ---------- videos (click to load) ---------- */
$("#p-videos").innerHTML = VIDEOS.map(v => `<button class="p-vid" data-id="${v.id}" style="background-image:url('https://i.ytimg.com/vi/${v.id}/hqdefault.jpg')"><span class="p-play"></span><span class="p-vid-t">${esc(v.t)}</span></button>`).join("");
$$(".p-vid").forEach(b => b.addEventListener("click", () => {
  b.outerHTML = `<div class="p-vid p-vid-on"><iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.id}?autoplay=1&rel=0" title="${esc(b.querySelector(".p-vid-t").textContent)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
}));

/* ==========================================================
   3D TABLE (three.js). Drag to spin, click a zone or a button.
   ========================================================== */
const ZONES = [
  { id: "mat", name: "Table mat", pack: "presenting", text: "Covers the whole top of the table. Included in the Presenting Partner package." },
  { id: "panels", name: "Front & back panels", pack: "table", text: "The two big panels facing the cameras and the crowd. Table Partner." },
  { id: "elbow", name: "Elbow pads", pack: "table", text: "In every close-up of the grip. Table Partner." },
  { id: "pads", name: "Hand pads", pack: "table", text: "Where the match is won. Seen in every pin. Table Partner." },
  { id: "pegs", name: "Grip pegs", pack: "table", text: "The pegs athletes hold with their free hand. Table Partner." },
  { id: "floor", name: "Floor around the table", pack: "floor", text: "Seen in the wide shots of every match. Floor Partner." }
];
$("#p-zones").innerHTML = ZONES.map((z, i) => `<button class="p-zone${i ? "" : " on"}" data-z="${z.id}">${esc(z.name)}</button>`).join("");

(function table3d() {
  const wrap = $("#p-3d");
  // box(w,h,d, x,y,z, {face: {cls, zone, html}}, extra transform). y is negative upwards.
  const face = (name, w, h, f = {}) => {
    const T = { front: `translateZ(${0}px)`, back: "rotateY(180deg)", right: "rotateY(90deg)", left: "rotateY(-90deg)", top: "rotateX(90deg)", bottom: "rotateX(-90deg)" }[name];
    return { name, w, h, T, ...f };
  };
  const box = (w, h, d, x, y, z, f = {}, extra = "") => {
    const faces = [
      ["front", w, h, d / 2], ["back", w, h, d / 2], ["right", d, h, w / 2], ["left", d, h, w / 2], ["top", w, d, h / 2], ["bottom", w, d, h / 2]
    ].map(([n, fw, fh, off]) => {
      const rot = { front: "", back: "rotateY(180deg)", right: "rotateY(90deg)", left: "rotateY(-90deg)", top: "rotateX(90deg)", bottom: "rotateX(-90deg)" }[n];
      const o = f[n] || f.all || {};
      return `<div class="t-face t-${n} ${o.cls || ""}" ${o.zone ? `data-zone="${o.zone}"` : ""} style="width:${fw}px;height:${fh}px;margin:${-fh / 2}px 0 0 ${-fw / 2}px;transform:${rot} translateZ(${off}px)">${o.html || ""}</div>`;
    }).join("");
    return `<div class="t-box" style="transform:translate3d(${x}px,${y}px,${z}px) ${extra}">${faces}</div>`;
  };
  const logo = (big, small) => `<span class="t-logo"><b>${big}</b>${small ? `<i>${small}</i>` : ""}</span>`;
  const Z = (zone, cls, html) => ({ zone, cls, html });
  let h = "";
  // floor
  h += `<div class="t-floor" data-zone="floor"><span>Floor partner</span><span>Floor partner</span></div>`;
  // foot + base with front/back panels
  h += box(540, 36, 390, 0, -18, 0, { all: { cls: "t-dark" } });
  const panel = Z("panels", "t-panel", logo("Your logo", "Table partner"));
  h += box(460, 480, 270, 0, -276, 0, { front: panel, back: panel, all: { cls: "t-dark2" } });
  // table top with mat
  h += box(580, 26, 370, 0, -529, 0, { top: Z("mat", "t-mat", logo("Your logo", "Presenting partner")), all: { cls: "t-edge" } });
  // elbow pads
  [-95, 95].forEach(x => h += box(104, 22, 104, x, -553, 0, { top: Z("elbow", "t-pad", logo("Logo")), all: { cls: "t-padside", zone: "elbow" } }));
  // hand pads (slanted)
  [-1, 1].forEach(s => h += box(64, 30, 150, s * 238, -556, 0, { top: Z("pads", "t-pad", logo("Logo")), all: { cls: "t-padside", zone: "pads" } }, `rotateZ(${s * 18}deg)`));
  // grip pegs
  [-1, 1].forEach(s => {
    h += box(16, 150, 16, s * 284, -617, 0, { all: { cls: "t-steel", zone: "pegs" } });
    h += box(26, 64, 26, s * 284, -660, 0, { all: { cls: "t-grip", zone: "pegs" } });
  });
  wrap.insertAdjacentHTML("afterbegin", `<div class="t-stage"><div class="t-rig" id="t-rig">${h}</div></div>`);
  const rig = $("#t-rig");

  let cur = "mat";
  const select = id => {
    cur = id; const z = ZONES.find(z => z.id === id);
    $$(".p-zone").forEach(b => b.classList.toggle("on", b.dataset.z === id));
    $$("[data-zone]", wrap).forEach(el => el.classList.toggle("hl", el.dataset.zone === id));
    const p = PACKAGES.find(p => p.id === z.pack);
    $("#p-zone-info").innerHTML = `<b>${esc(z.name)}</b> ${esc(z.text)} ${p ? `<a href="#packages" data-goto="${p.id}">${esc(p.name)} · ${eur(p.price)} &rarr;</a>` : ""}`;
    const g = $("[data-goto]");
    if (g) g.addEventListener("click", () => setTimeout(() => { const el = $(`.p-pack[data-id="${p.id}"]`); if (el) { el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1600); } }, 450));
  };
  $$(".p-zone").forEach(b => b.addEventListener("click", () => { select(b.dataset.z); idle = 0; }));
  select("mat");

  // drag to spin 360°, slow auto-spin when idle
  let ry = -30, rx = -20, vel = 0, drag = false, lx = 0, ly = 0, moved = 0, idle = 0;
  wrap.addEventListener("pointerdown", e => { drag = true; lx = e.clientX; ly = e.clientY; moved = 0; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", e => {
    if (!drag) return;
    const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    vel = dx * 0.4; ry += vel; rx = Math.max(-55, Math.min(-6, rx - dy * 0.25)); idle = 0;
  });
  wrap.addEventListener("pointerup", e => {
    drag = false;
    if (moved < 6) { wrap.releasePointerCapture(e.pointerId); const el = document.elementFromPoint(e.clientX, e.clientY); const z = el && el.closest("[data-zone]"); if (z) select(z.dataset.zone); }
  });
  wrap.addEventListener("pointercancel", () => { drag = false; });
  const fit = () => { const s = Math.min(wrap.clientWidth / 1150, wrap.clientHeight / 1000); rig.style.setProperty("--s", s.toFixed(3)); };
  addEventListener("resize", fit); fit();
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(wrap);
  const loop = () => {
    requestAnimationFrame(loop); if (!visible) return;
    if (!drag) { vel *= 0.93; ry += vel; if (++idle > 90) ry += 0.18; }
    rig.style.transform = `translate(-50%,-50%) scale(var(--s)) translateY(360px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  loop();
})();
