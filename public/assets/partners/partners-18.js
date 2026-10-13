/* ==========================================================
   LPAL 4 partner page. Not linked from the main website.
   Edit SETTINGS, PACKAGES and MATCHES below.
   ========================================================== */

const SETTINGS = {
  // Sold table spots: shown as "Reserved" and can no longer be booked, e.g. ["t-cam1", "t-c2"].
  //   t-cam1 Camera 1 side · t-cam2 other short side · t-long1 / t-long2 long sides · t-c1..t-c4 corners
  reserved: [],
  // Where inquiries go. Fill in before sending the link to sponsors.
  email: "business@lionpride-armwrestling.com",
  whatsapp: "+43 670 7745771",
  // Show the main event names (keep false until the official reveal on 25 October).
  revealMainEvent: false
};

const STATS = [
  { n: "5.6M+", l: "Combined followers", s: "Athletes on the card + league, Instagram & TikTok" },
  { n: "100K+", l: "Expected live viewers", s: "Free worldwide stream on Kick" },
  { n: "20K", l: "Live viewers at LPAL 3", s: "With only 300K followers on the card" },
  { n: "2M", l: "League reach", s: "Last 30 days, LPAL channels" },
  { n: "11", l: "Matches", s: "Incl. the first LPAL World Title Match" },
  { n: "20", l: "Athletes", s: "From 16 countries, incl. world champions" }
];

/* ---------- packages ----------
   cat: headline | matches | jersey | stream | arena | entry
   once: true = only one partner.  tag: optional small label.  price: number or text. */
const PACKAGES = [
  { id: "presenting", cat: "headline", name: "Presenting Partner", price: 25000, once: true, tag: "Exclusive",
    items: ["“LPAL 4 presented by [your brand]” on the event name, poster and announcements",
            "Your logo on almost every livestream graphic: scoreboard, athlete cards, lower thirds, breaks",
            "Your logo on the centre spots of the table top, visible in every match and every replay",
            "8+ mentions by the commentators during the stream",
            "Top position on the sponsor wall and the stage",
            "Logo on every official poster, posted as a collaboration by all athletes on the card",
            "Your commercial built into the athletes' contracted reels",
            "Logo on the big LED screen all night",
            "Full report: Kick statistics, clip views after 30 days, photos"] },
  { id: "premium", cat: "headline", name: "Premium Partner", price: 9000, tag: "2 available",
    items: ["Logo on every official poster, posted as a collaboration by all athletes",
            "Your commercial built into athletes' reels (contracted LPAL posts)",
            "Logo on the big LED screen and in the livestream",
            "Official partner title, e.g. “Official Energy Drink of LPAL”",
            "Category exclusivity", "6 VIP tickets"] },

  { id: "table-full", cat: "table", name: "Complete Table", price: 10000, once: true, tag: "Best value · save €3,400",
    covers: ["t-cam1", "t-cam2", "t-long1a", "t-long1b", "t-long2a", "t-long2b", "t-c1", "t-c2", "t-c3", "t-c4", "legs"],
    items: ["All 6 side logos incl. the Camera 1 side, all 4 top corners and all 4 leg sleeves",
            "The table is in frame for every second of all 11 matches", "In every clip, replay and photo for 12 months"] },
  { id: "table-sides", cat: "table", grid: false, name: "Full Table Sides", price: 6500, once: true, tag: "Save €1,500",
    covers: ["t-cam1", "t-cam2", "t-long1a", "t-long1b", "t-long2a", "t-long2b"],
    items: ["All 6 side logos: both short sides and 2 logos on each long side", "Incl. the Camera 1 side under the peg, the most visible spot of the night"] },
  { id: "table-top", cat: "table", grid: false, name: "Full Table Top", price: 3500, once: true, tag: "Save €500",
    covers: ["t-c1", "t-c2", "t-c3", "t-c4"],
    items: ["Your logo in all 4 corners of the table top", "Seen from above in every close-up and slow motion"] },
  { id: "legs", cat: "table", grid: false, name: "Leg Sleeves (all 4)", price: 1400, once: true,
    items: ["Your logo on all 4 table legs", "Seen in every wide shot and walkout"] },
  { id: "table-single", cat: "table", grid: false, name: "Single Table Spot", price: "From €1,000", tag: "Pick on the 3D table", link: "#table",
    items: ["Book exactly one logo spot on the table", "Camera 1 side (main camera) €3,000", "Other short side, long side logo or top corner: €1,000 each"] },
  // single spots (chosen on the 3D table; not shown as cards)
  { id: "t-cam1", cat: "spot", zone: "side-short", name: "Short side A · Camera 1 (main camera)", price: 3000, once: true, tag: "Premium" },
  { id: "t-cam2", cat: "spot", zone: "side-short", name: "Short side B · under the peg", price: 1000, once: true },
  { id: "t-long1a", cat: "spot", zone: "side-long", name: "Long side 1 · left logo", price: 1000, once: true },
  { id: "t-long1b", cat: "spot", zone: "side-long", name: "Long side 1 · right logo", price: 1000, once: true },
  { id: "t-long2a", cat: "spot", zone: "side-long", name: "Long side 2 · left logo", price: 1000, once: true },
  { id: "t-long2b", cat: "spot", zone: "side-long", name: "Long side 2 · right logo", price: 1000, once: true },
  { id: "t-c1", cat: "spot", zone: "corner", name: "Top corner 1", price: 1000, once: true },
  { id: "t-c2", cat: "spot", zone: "corner", name: "Top corner 2", price: 1000, once: true },
  { id: "t-c3", cat: "spot", zone: "corner", name: "Top corner 3", price: 1000, once: true },
  { id: "t-c4", cat: "spot", zone: "corner", name: "Top corner 4", price: 1000, once: true },

  { id: "title", cat: "matches", name: "World Title Match Partner", price: 6000, once: true,
    items: ["The first LPAL World Title Match carries your name", "Your representative presents the championship belt",
            "Logo on the athlete introduction graphics", "Clip of the title match with your name in the title"] },
  { id: "challenger", cat: "matches", name: "Challenger Match Partner", price: 3500, tag: "2 available",
    items: ["One of the two challenger matches carries your name", "You hand over the challenge on stage", "Clip with your name in the title"] },
  { id: "match", cat: "matches", name: "Match Partner", price: 2000, tag: "Several available",
    items: ["One match carries your name", "Mentioned in the announcement and on stream", "Winner photo on stage with your logo"] },
  { id: "fotn", cat: "matches", name: "Fight of the Night", price: 1500, once: true,
    items: ["Your brand awards the best match of the night", "Presented on stage by you", "Mentioned in the results post"] },

  { id: "j-full", cat: "jersey", name: "Full Shirt", price: 12000, once: true, tag: "Best value · save €1,500", view: 0,
    covers: ["j-front", "j-back", "j-shr", "j-shl", "j-both"],
    items: ["Front, back and both shoulders of every athlete jersey", "In every winner photo, interview, walkout and close-up"] },
  { id: "j-front", cat: "jersey", name: "Shirt Front", price: 6000, once: true, view: 0,
    items: ["Your logo on the chest of every athlete jersey", "Front and centre in every winner photo and interview"] },
  { id: "j-back", cat: "jersey", name: "Shirt Back", price: 3000, once: true, view: 180,
    items: ["Large logo on the back of every jersey, under the athlete's name", "Seen in every walkout and award ceremony"] },
  { id: "j-both", cat: "jersey", name: "Both Shoulders", price: 4500, once: true, tag: "Save €500", view: 90,
    covers: ["j-shr", "j-shl"],
    items: ["Your logo on both shoulders of every jersey", "In the close-ups of all 11 matches"] },
  { id: "j-shr", cat: "jersey", name: "One Shoulder (right)", price: 2500, once: true, view: 90,
    items: ["Your logo on the right shoulder of every jersey", "Faces the camera when athletes pull right arm"] },
  { id: "j-shl", cat: "jersey", name: "One Shoulder (left)", price: 2500, once: true, view: 270,
    items: ["Your logo on the left shoulder of every jersey", "Faces the camera when athletes pull left arm"] },

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
const CATS = [["all", "All"], ["headline", "Headline"], ["table", "Table"], ["matches", "Matches"], ["jersey", "Jersey"], ["stream", "Livestream & clips"], ["arena", "Arena"], ["entry", "Entry deals"]];

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
    b: { first: "Tunahan", last: "İlaslan", country: "tr", photo: "tunahan-ilaslan", instagram: "tunahan_ilaslan" }, division: "Lightweight 77kg" },
  { a: { first: "Philipp", last: "Stahlhofen", country: "de", photo: "philipp-stahlhofen", instagram: "philipp_stahlhofen" },
    b: { tba: true }, division: "Lightweight 77kg" }
];
const COUNTRIES = { at: "Austria", de: "Germany", bg: "Bulgaria", ci: "Ivory Coast", es: "Spain", fr: "France", ge: "Georgia", gr: "Greece", it: "Italy",
  lt: "Lithuania", lv: "Latvia", ma: "Morocco", rs: "Serbia", se: "Sweden", sk: "Slovakia", tr: "Turkey" };
const VIDEOS = [
  { id: "tLKV5l6-uYM", t: "Larratt vs Toman · LPAL 3", views: "240K views on YouTube" }
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
  if (x.tba) return `<div class="p-ath p-ath-${k}"><div class="p-ath-img"><img src="assets/img/bust-v2/silhouette-athlete.webp" alt="" loading="lazy" decoding="async"></div><div class="p-ath-txt"><p class="p-first">Opponent</p><p class="p-last">TBA</p><p class="p-ctry">Announced soon</p></div></div>`;
  const img = hide ? `assets/img/bust-v2/silhouette-me-${k}.webp` : x.photo ? `assets/img/bust-v2/${x.photo}.webp` : "assets/img/bust-v2/silhouette-athlete.webp";
  return `<div class="p-ath p-ath-${k}">
    <div class="p-ath-img"><img src="${img}" alt="" loading="lazy" decoding="async">${!hide && x.followers ? `<span class="p-fol">${short(x.followers)} followers</span>` : ""}</div>
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

/* ---------- packages + selection (qty for packages with several spots) ---------- */
const sel = new Map();
const TABLE_LIST = ["table-full", "table-sides", "t-cam1", "t-cam2", "t-long1a", "t-long1b", "t-long2a", "t-long2b", "table-top", "t-c1", "t-c2", "t-c3", "t-c4", "legs"];
const tableExtra = () => `<a class="p-btn p-btn-ghost p-btn-sm p-3dlink" href="#table">View 3D model of the table &uarr;</a>
  <button type="button" class="p-expand" aria-expanded="false">View all table spots <span>&#9662;</span></button>
  <ul class="p-spots p-tlist" hidden></ul>`;
const renderTableList = () => { const ul = $(".p-tlist"); if (!ul) return;
  ul.innerHTML = TABLE_LIST.map(id => { const p = pack(id), on = sel.has(id) || PACKAGES.some(b => b.covers && sel.has(b.id) && b.covers.includes(id)), res = isReserved(id);
    return `<li class="${p.covers ? "bundle" : ""}${res ? " res" : ""}"><span>${esc(p.name)}${p.covers ? ` <em>Bundle</em>` : ""}</span><b>${res ? "Reserved" : eur(p.price)}</b>${res ? "" : `<button type="button" class="p-spot-btn${on ? " on" : ""}" data-tl="${id}">${on ? "✓ Added" : "Add"}</button>`}</li>`; }).join("");
  $$("[data-tl]", ul).forEach(b => b.addEventListener("click", () => togglePack(b.dataset.tl))); };
const packHTML = p => `<article class="p-pack${p.id === "presenting" ? " p-pack-hero" : ""}" data-cat="${p.cat}" data-id="${p.id}">
  <div class="p-pack-top">${p.tag ? `<span class="p-pack-tag">${esc(p.tag)}</span>` : ""}${p.once ? `<span class="p-pack-once">1 partner only</span>` : ""}</div>
  <h3>${esc(p.name)}</h3>
  <p class="p-price">${eur(p.price)}${typeof p.price === "number" ? `<small>net${p.max ? " per spot" : ""}</small>` : ""}</p>
  <ul>${p.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
  ${p.link ? `<a class="p-btn p-btn-outline" href="${p.link}">Pick your spot on the table &uarr;</a>` : `<button class="p-btn p-btn-outline p-add" type="button" data-id="${p.id}">Add to selection</button>`}
  ${p.id === "table-full" ? tableExtra() : ""}
</article>`;
$("#p-packs").innerHTML = PACKAGES.filter(p => p.cat !== "spot" && p.grid !== false).map(packHTML).join("");
{ const card = $('.p-pack[data-id="table-full"]'), btn = card && $(".p-expand", card);
  if (btn) btn.addEventListener("click", () => { const ul = $(".p-tlist", card), open = ul.hidden; ul.hidden = !open; btn.setAttribute("aria-expanded", open); card.classList.toggle("p-pack-open", open); renderTableList(); }); }
document.addEventListener("p-sel", renderTableList);
$("#p-filter").innerHTML = CATS.map(([k, n], i) => `<button class="p-chip${i ? "" : " on"}" data-k="${k}" role="tab">${esc(n)}</button>`).join("");
const filterTo = k => {
  $$(".p-chip").forEach(x => x.classList.toggle("on", x.dataset.k === k));
  $$(".p-pack").forEach(p => p.hidden = k !== "all" && p.dataset.cat !== k);
};
$$(".p-chip").forEach(b => b.addEventListener("click", () => filterTo(b.dataset.k)));
const pack = id => PACKAGES.find(p => p.id === id);
const isReserved = id => (SETTINGS.reserved || []).includes(id) || ((pack(id) || {}).covers || []).some(c => (SETTINGS.reserved || []).includes(c));
const addPack = id => {
  if (isReserved(id)) return;
  const p = pack(id); const q = sel.get(id) || 0; if (!p.max && q) return; if (p.max && q >= p.max) return;
  if (p.covers) p.covers.forEach(c => sel.delete(c));                                  // bundle replaces single spots
  PACKAGES.filter(b => b.covers && b.covers.includes(id)).forEach(b => sel.delete(b.id)); // a smaller pick replaces a bundle that includes it
  sel.set(id, q + 1); renderSel();
};
const togglePack = id => { sel.has(id) ? sel.delete(id) : addPack(id); renderSel(); };
const renderSel = () => {
  const list = PACKAGES.filter(p => sel.has(p.id));
  $("#p-sel").innerHTML = list.length ? list.map(p => { const q = sel.get(p.id);
    return `<li><span>${esc(p.name)}${p.max ? `<em class="p-qty"><button type="button" data-dec="${p.id}" aria-label="One less">&minus;</button>${q}<button type="button" data-inc="${p.id}" aria-label="One more">+</button></em>` : ""}</span><b>${eur(typeof p.price === "number" ? p.price * q : p.price)}</b><button type="button" aria-label="Remove ${esc(p.name)}" data-rm="${p.id}">&times;</button></li>`; }).join("")
    : `<li class="p-sel-empty">No packages selected yet</li>`;
  const total = list.reduce((s, p) => s + (typeof p.price === "number" ? p.price * sel.get(p.id) : 0), 0);
  $("#p-sel-total").innerHTML = list.length ? `Total <b>${eur(total)}</b> <small>net, plus VAT</small>` : "";
  $$(".p-add").forEach(b => { const p = pack(b.dataset.id), q = sel.get(p.id) || 0; b.classList.toggle("on", q > 0);
    b.textContent = !q ? "Add to selection" : p.max ? (q >= p.max ? `✓ All ${p.max} spots selected` : `✓ ${q} selected · add another`) : "✓ Selected"; });
  $$("[data-rm]").forEach(b => b.addEventListener("click", () => { sel.delete(b.dataset.rm); renderSel(); }));
  $$("[data-inc]").forEach(b => b.addEventListener("click", () => addPack(b.dataset.inc)));
  $$("[data-dec]").forEach(b => b.addEventListener("click", () => { const q = sel.get(b.dataset.dec) - 1; q ? sel.set(b.dataset.dec, q) : sel.delete(b.dataset.dec); renderSel(); }));
  const n = list.reduce((s, p) => s + sel.get(p.id), 0);
  $("#p-cartbar").hidden = !n;
  $("#p-cart-text").textContent = `${n} item${n === 1 ? "" : "s"} · ${eur(total)}`;
  const lines = list.map(p => `- ${p.name}${p.max ? ` x${sel.get(p.id)}` : ""}: ${eur(typeof p.price === "number" ? p.price * sel.get(p.id) : p.price)}`).join("\n");
  const body = `Hello LPAL team,\n\nWe are interested in partnering with LPAL 4 (9 January 2027, Cologne).\n\nSelected packages:\n${lines || "- (please suggest packages for our budget)"}${total ? `\nTotal: ${eur(total)} net` : ""}\n\nCompany:\nContact person:\nPhone:\n\nThank you!`;
  $("#p-send").href = `mailto:${SETTINGS.email}?subject=${encodeURIComponent("LPAL 4 partnership inquiry")}&body=${encodeURIComponent(body)}`;
  document.dispatchEvent(new Event("p-sel"));
  const wa = $("#p-wa"); if (wa) wa.href = `https://wa.me/${SETTINGS.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(body)}`;
};
$$(".p-add").forEach(b => b.addEventListener("click", () => { const p = pack(b.dataset.id); if (sel.has(p.id) && !p.max) sel.delete(p.id); else addPack(p.id); renderSel(); }));
$("#p-send").insertAdjacentHTML("afterend", `<a class="p-btn p-btn-wa p-btn-block" id="p-wa" href="#" target="_blank" rel="noopener">Send via WhatsApp</a>`);
$("#p-contact-alt").innerHTML = `<a href="mailto:${esc(SETTINGS.email)}">${esc(SETTINGS.email)}</a><br><a href="https://wa.me/${SETTINGS.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener">WhatsApp Business ${esc(SETTINGS.whatsapp)}</a>`;
renderSel();

/* ---------- videos (click to load) ---------- */
$("#p-videos").innerHTML = VIDEOS.map(v => `<div class="p-vid-wrap"><button class="p-vid" data-id="${v.id}" style="background-image:url('https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg'),url('https://i.ytimg.com/vi/${v.id}/hqdefault.jpg')"><span class="p-play"></span><span class="p-vid-t">${esc(v.t)}</span>${v.views ? `<span class="p-vid-views">${esc(v.views)}</span>` : ""}</button>
  <a class="p-vid-link" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Watch on YouTube &rarr;</a></div>`).join("");
$$(".p-vid").forEach(b => b.addEventListener("click", () => {
  b.outerHTML = `<div class="p-vid p-vid-on"><iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.id}?autoplay=1&rel=0" title="${esc(b.querySelector(".p-vid-t").textContent)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
}));

/* ==========================================================
   3D TABLE (pure CSS 3D, modelled on the real LPAL table).
   Drag to spin 360°, click a zone or a button.
   ========================================================== */
const ZONES = [
  { id: "side-short", name: "Short sides", bundle: "table-sides", text: "The two ends of the table, right under the pegs. Side A faces Camera 1, the main camera: the most visible logo spot of the night." },
  { id: "side-long", name: "Long sides", bundle: "table-sides", text: "Two logos on each long side, placed towards the edges so the athletes standing there never cover them. Seen in the side shots and by the crowd." },
  { id: "corner", name: "Top corners", bundle: "table-top", text: "Four spots on the table top, one in each corner. Seen from above in every close-up." },
  { id: "legs", name: "Leg sleeves", text: "The 50 cm sleeves on all four table legs. Booked as one set." , pack: "legs" },
  { id: "center", name: "Centre spots", pack: "presenting", text: "The middle of the table top on both athlete sides. Reserved for the Presenting Partner." },
  { id: "floor", name: "Floor", pack: "floor", text: "The floor around the table, seen in the wide shots of every match." }
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
  let h = `<div class="t-floor" data-zone="floor"><span>Floor partner</span><span>Floor partner</span></div>`;
  const top = `<div class="t-top">
      <div class="t-spot t-c1" data-zone="corner" data-spot="t-c1"></div><div class="t-spot t-c2" data-zone="corner" data-spot="t-c2"></div>
      <div class="t-spot t-c3" data-zone="corner" data-spot="t-c3"></div><div class="t-spot t-c4" data-zone="corner" data-spot="t-c4"></div>
      <div class="t-spot t-mid t-mid-f" data-zone="center"></div><div class="t-spot t-mid t-mid-b" data-zone="center"></div>
    </div>`;
  const longSide = id => ({ zone: "side-long", cls: "t-side t-long", html: `<span class="t-sidespot" data-spot="${id}a">${L("Your logo")}</span><span class="t-sidespot" data-spot="${id}b">${L("Your logo")}</span>` });
  const side = (zone, spot, t) => ({ zone, spot, cls: "t-side", html: `<span class="t-sidespot">${L(t)}</span>` });
  h += box(W, TH, D, 0, TOPY + TH / 2, 0, { top: { cls: "t-mat", html: top },
    right: side("side-short", "t-cam1", "Side A · Camera 1"), left: side("side-short", "t-cam2", "Side B"),
    front: longSide("t-long1"), back: longSide("t-long2"), bottom: { cls: "t-black" } });
  // legs: thin tube, 50 cm sleeve (logo spot) right under the top
  const legTop = TOPY + TH, legH = -legTop, lx = W / 2 - 42, lz = D / 2 - 38;
  [[-1, 1], [1, 1], [1, -1], [-1, -1]].forEach(([sx, sz], i) => {
    h += box(26, legH, 26, sx * lx, legTop / 2, sz * lz, { all: { cls: "t-leg" } });
    h += box(38, 380, 38, sx * lx, legTop + 25 + 190, sz * lz, { all: { zone: "legs", cls: "t-sleeve", html: L("Your logo", "t-vert") }, top: { cls: "t-black" }, bottom: { cls: "t-black" } });
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

  let cur = "side-short", focus = "t-cam1";
  const spotsOf = z => PACKAGES.filter(p => p.cat === "spot" && p.zone === z);
  const mark = () => $$("[data-spot]", wrap).forEach(el => { el.classList.toggle("reserved", isReserved(el.dataset.spot)); el.classList.toggle("picked", sel.has(el.dataset.spot) || PACKAGES.some(b => b.covers && sel.has(b.id) && b.covers.includes(el.dataset.spot))); el.classList.toggle("focus", el.dataset.spot === focus); });
  const select = (id, spot) => {
    cur = id; focus = spot || null; const z = ZONES.find(z => z.id === id);
    $$(".p-zone").forEach(b => b.classList.toggle("on", b.dataset.z === id));
    $$("[data-zone]", wrap).forEach(el => el.classList.toggle("hl", el.dataset.zone === id));
    const list = spotsOf(id), bundle = z.bundle && pack(z.bundle), single = z.pack && pack(z.pack);
    const row = p => { const on = sel.has(p.id) || PACKAGES.some(b => b.covers && sel.has(b.id) && b.covers.includes(p.id));
      const res = isReserved(p.id);
      return `<li class="${p.id === focus ? "focus" : ""}${res ? " res" : ""}"><span>${esc(p.name)}${p.tag ? ` <em>${esc(p.tag)}</em>` : ""}</span><b>${res ? "Reserved" : eur(p.price)}</b>${res ? "" : `<button type="button" class="p-spot-btn${on ? " on" : ""}" data-spot-add="${p.id}">${on ? "✓ Added" : "Add"}</button>`}</li>`; };
    $("#p-zone-info").innerHTML = `<b>${esc(z.name)}</b> ${esc(z.text)}
      ${list.length ? `<ul class="p-spots">${list.map(row).join("")}</ul>` : ""}
      ${bundle ? `<p class="p-spot-bundle">Or book all of them: <a href="#packages" data-bundle="${bundle.id}">${esc(bundle.name)} · ${eur(bundle.price)}</a>${bundle.id === "table-sides" || bundle.id === "table-top" || bundle.id === "legs" ? ` <button type="button" class="p-spot-btn${sel.has(bundle.id) ? " on" : ""}" data-spot-add="${bundle.id}">${sel.has(bundle.id) ? "✓ Added" : "Add all"}</button>` : ""}</p>` : ""}
      ${single ? `<span class="p-zone-act"><span class="p-zone-price">${esc(single.name)} · ${eur(single.price)}</span>${single.id === "presenting" ? `<a class="p-btn p-btn-ghost p-btn-sm" href="#packages" id="p-zone-see">See package</a>` : `<button type="button" class="p-btn p-btn-red p-btn-sm" data-spot-add="${single.id}">${sel.has(single.id) ? "✓ Added" : "Add to selection"}</button>`}</span>` : ""}`;
    $$("[data-spot-add]", $("#p-zone-info")).forEach(b => b.addEventListener("click", () => { togglePack(b.dataset.spotAdd); }));
    const see = $("#p-zone-see"); if (see) see.addEventListener("click", () => filterTo("headline"));
    const bl = $("[data-bundle]"); if (bl) bl.addEventListener("click", () => filterTo("table"));
    mark();
  };
  document.addEventListener("p-sel", () => { if (cur) select(cur, focus); });
  $$(".p-zone").forEach(b => b.addEventListener("click", () => { select(b.dataset.z); idle = 0; }));
  select("side-short", "t-cam1");

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
  const GROUPS = [".p-action-grid", ".p-cred-grid", ".p-gallery", ".p-expo-grid"];
  document.body.insertAdjacentHTML("beforeend", `
  <div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
    <div class="lb-stage" id="lb-stage"><img id="lb-img" alt=""></div>
    <button class="lb-btn lb-close" id="lb-close" aria-label="Close">&times;</button>
    <button class="lb-btn lb-prev" id="lb-prev" aria-label="Previous photo"><svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8" fill="none" stroke="currentColor" stroke-width="2.5"/></svg></button>
    <button class="lb-btn lb-next" id="lb-next" aria-label="Next photo"><svg viewBox="0 0 24 24"><path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.5"/></svg></button>
    <div class="lb-bar"><p id="lb-cap"></p><div class="lb-zoom"><button class="lb-btn" id="lb-out" aria-label="Zoom out">&minus;</button><button class="lb-btn" id="lb-in" aria-label="Zoom in">+</button></div><span id="lb-count"></span></div>
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

/* keep the walkout clip playing (no controls, no pause) */
(() => { const v = document.querySelector(".p-walk video"); if (!v) return; v.muted = true;
  const play = () => v.play().catch(() => {});
  new IntersectionObserver(es => es.forEach(e => e.isIntersecting && play())).observe(v);
  v.addEventListener("pause", () => setTimeout(play, 50)); play(); })();


/* ==========================================================
   3D JERSEY: turntable of the real LPAL 4 jersey (front, right side, back, left side).
   Drag to spin, pick an option to see where the logo goes.
   ========================================================== */
(function jersey3d() {
  const wrap = $("#p-jr"); if (!wrap) return;
  const VIEWS = [
    { a: 0, img: "front", spots: [["j-front", 50, 47.5, 28, 6, 0], ["j-shr", 10, 24, 14, 7, -38], ["j-shl", 90, 24, 14, 7, 38]] },
    { a: 90, img: "side-right", spots: [["j-shr", 25, 22, 34, 7, -55], ["j-front", 84, 47, 20, 5, 0]] },
    { a: 180, img: "back", name: true, spots: [["j-back", 50, 42, 34, 8, 0], ["j-shl", 10, 24, 14, 7, -38], ["j-shr", 90, 24, 14, 7, 38]] },
    { a: 270, img: "side-left", spots: [["j-shl", 66, 21, 34, 7, 55]] }
  ];
  wrap.innerHTML = VIEWS.map((v, i) => `<div class="jr-view" data-i="${i}"><div class="jr-in"><img src="assets/partners/jersey/${v.img}.webp" alt="" draggable="false">
    ${v.name ? `<span class="jr-name">ATHLETE NAME</span>` : ""}${v.spots.map(([id, x, y, w, h, r]) => `<span class="jr-spot" data-j="${id}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;transform:translate(-50%,-50%) rotate(${r}deg)"><b>Logo</b></span>`).join("")}</div></div>`).join("")
    + `<p class="p-3d-hint"><span>&larr;</span> Drag to spin 360&deg; <span>&rarr;</span></p>`;
  const views = $$(".jr-view", wrap);
  const opts = PACKAGES.filter(p => p.cat === "jersey");
  $("#p-jr-opts").innerHTML = opts.map(p => `<button class="p-zone" data-jo="${p.id}">${esc(p.name)}</button>`).join("");
  let cur = "j-front";
  const covered = id => { const p = pack(id); return p.covers ? p.covers.filter(c => !pack(c).covers) : [id]; };
  const isOn = id => sel.has(id) || opts.some(b => b.covers && sel.has(b.id) && b.covers.includes(id));
  const render = () => {
    const p = pack(cur), on = isOn(cur), parts = covered(cur);
    $$(".p-zone[data-jo]").forEach(b => b.classList.toggle("on", b.dataset.jo === cur));
    $$(".jr-spot", wrap).forEach(el => { el.classList.toggle("hl", parts.includes(el.dataset.j)); el.classList.toggle("picked", isOn(el.dataset.j)); });
    $("#p-jr-info").innerHTML = `<b>${esc(p.name)}</b> ${esc(p.items[0])}.<span class="p-zone-act"><span class="p-zone-price">${eur(p.price)}${p.tag ? ` · ${esc(p.tag)}` : ""}</span>
      <button type="button" class="p-btn ${on ? "p-btn-white" : "p-btn-red"} p-btn-sm" id="p-jr-add">${on ? "✓ Added" : "Add to selection"}</button></span>`;
    $("#p-jr-add").addEventListener("click", () => togglePack(cur));
  };
  document.addEventListener("p-sel", render);

  let ang = 0, target = null, vel = 0, drag = false, lx = 0, moved = 0, idle = 0;
  const choose = id => { cur = id; target = pack(id).view || 0; idle = 0; render(); };
  $$(".p-zone[data-jo]").forEach(b => b.addEventListener("click", () => choose(b.dataset.jo)));
  wrap.addEventListener("pointerdown", e => { drag = true; lx = e.clientX; moved = 0; target = null; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - lx; lx = e.clientX; moved += Math.abs(dx); vel = -dx * 0.5; ang += vel; idle = 0; });
  wrap.addEventListener("pointerup", e => {
    drag = false;
    if (moved < 6) { const el = document.elementFromPoint(e.clientX, e.clientY); const sp = el && el.closest(".jr-spot"); if (sp) { cur = sp.dataset.j; render(); } idle = 0; vel = 0; }
  });
  wrap.addEventListener("pointercancel", () => { drag = false; });
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  let visible = true; new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(wrap);
  const loop = () => {
    requestAnimationFrame(loop); if (!visible) return;
    if (target !== null) { let d = ((target - ang) % 360 + 540) % 360 - 180; ang += d * 0.08; if (Math.abs(d) < 0.3) { ang = target; target = null; } }
    else if (!drag) { vel *= 0.9; ang += vel; if (++idle > 300) ang += 0.12; }
    const a = ((ang % 360) + 360) % 360, i = Math.floor(a / 90), f = (a - i * 90) / 90, mix = smooth(0.38, 0.62, f);
    views.forEach((v, k) => {
      let o = 0, sx = 1;
      if (k === i) { o = 1 - mix; sx = 1 - 0.18 * Math.sin(f * Math.PI / 2); }
      else if (k === (i + 1) % 4) { o = mix; sx = 1 - 0.18 * Math.cos(f * Math.PI / 2); }
      v.style.opacity = o.toFixed(3); v.style.transform = `scaleX(${sx.toFixed(3)})`; v.style.pointerEvents = o > 0.5 ? "auto" : "none";
    });
  };
  render(); loop();
})();
