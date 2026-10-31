// LPAL Qualifier Tournament presented by TitanGrip: online registration.
// - checks LPAL 4 show tickets in Ticket Tailor (each ticket gives one discount, once)
// - takes payment with Stripe Checkout (money goes to the LPAL Stripe account)
// - stores registrations in D1 (binding DB)
// Secrets (Cloudflare → Worker → Settings → Variables and Secrets):
//   STRIPE_SECRET_KEY, TICKETTAILOR_API_KEY, STRIPE_WEBHOOK_SECRET, QUALIFIER_ADMIN_KEY
// Optional plain variable: TT_EVENT_ID (default below)

const TT_EVENT_DEFAULT = "ev_2489870";
const SITE = "https://lpal.eu";

// Prices in cents. Entry (both arms) depends on the evening ticket; one arm is €10 less.
const ENTRY = { none: 6000, fan: 5000, ga: 5000, gold: 4000, vip: 3000 };
const ONE_ARM_OFF = 1000;
const TICKET_PRICE = { fan: 3000, ga: 3500, gold: 6000, vip: 9000 };
const TIER_NAME = { fan: "Fan Access", ga: "General Access", gold: "Gold", vip: "VIP" };
const TIER_RANK = { vip: 4, gold: 3, ga: 2, fan: 1 };
const SHOWS = ["none", "fan", "ga", "gold", "vip", "have"];
function tierOf(name) {
  const n = String(name || "").toLowerCase();
  if (/vip/.test(n)) return "vip";
  if (/gold/.test(n)) return "gold";
  if (/fan/.test(n)) return "fan";
  return "ga";
}
const entryPrice = (tier, arms) => ENTRY[tier] - (arms === "both" ? 0 : ONE_ARM_OFF);

const CLASSES = {
  senior: ["-77", "-85", "-95", "-110", "+110"],
  amateur: ["-80", "+80"],
  women: ["-60", "-70", "+70"]
};
const DIV_NAME = { senior: "Senior Men", amateur: "Amateur Men", women: "Women" };
const ARM_NAME = { left: "Left arm", right: "Right arm", both: "Both arms" };
const EVENT_DAY = "2027-01-09";

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json", "cache-control": "no-store" }
});
const now = () => Math.floor(Date.now() / 1000);
const clean = (v, max = 120) => String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
const normCode = c => String(c || "").replace(/\s+/g, "").toLowerCase();
const normEmail = e => String(e || "").trim().toLowerCase();
const isEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

/* ---------------- database ---------------- */
let schemaReady = false;
async function db(env) {
  if (!env.DB) throw new Error("no_db");
  if (!schemaReady) {
    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS registrations (
        id TEXT PRIMARY KEY, created_at INTEGER, status TEXT, session_id TEXT, lang TEXT,
        first_name TEXT, last_name TEXT, email TEXT, dob TEXT, age INTEGER, country TEXT, instagram TEXT, club TEXT,
        division TEXT, weight_class TEXT, arms TEXT, price INTEGER, discount INTEGER,
        tt_ticket_id TEXT, tt_code TEXT, tt_type TEXT, guardian_name TEXT, guardian_email TEXT,
        paid_at INTEGER, amount_paid INTEGER, payment_intent TEXT, livemode INTEGER,
        ticket_ok INTEGER, ticket_checked_at INTEGER, note TEXT, comment TEXT)`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS ticket_claims (
        ticket_key TEXT PRIMARY KEY, ticket_id TEXT, registration_id TEXT, status TEXT, expires_at INTEGER)`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT, updated_at INTEGER)`)
    ]);
    // newer columns (bundle tickets, refunds); ignore "duplicate column" on existing tables
    for (const col of ["show_type TEXT", "tier TEXT", "entry_price INTEGER", "ticket_price INTEGER", "issued_ticket_id TEXT",
      "issued_code TEXT", "issue_error TEXT", "selected INTEGER", "refunded_at INTEGER"]) {
      try { await env.DB.prepare("ALTER TABLE registrations ADD COLUMN " + col).run(); } catch (e) {}
    }
    schemaReady = true;
  }
  return env.DB;
}

/* ---------------- Ticket Tailor ---------------- */
async function tt(env, path) {
  const r = await fetch("https://api.tickettailor.com/v1" + path, {
    headers: { authorization: "Basic " + btoa(env.TICKETTAILOR_API_KEY + ":"), accept: "application/json" }
  });
  if (!r.ok) throw new Error("tt_" + r.status);
  return r.json();
}
async function ttAll(env, path) {
  const out = [];
  let after = "";
  for (let i = 0; i < 40; i++) {
    const sep = path.includes("?") ? "&" : "?";
    const page = await tt(env, path + sep + "limit=100" + (after ? "&starting_after=" + encodeURIComponent(after) : ""));
    const data = page.data || [];
    out.push(...data);
    if (data.length < 100 || !(page.links && page.links.next)) break;
    after = data[data.length - 1].id;
  }
  return out;
}
const ticketVoid = t => {
  const s = String(t.status || "").toLowerCase();
  return !!t.voided_at || ["void", "voided", "cancelled", "canceled", "refunded", "deleted"].includes(s);
};
const orderVoid = o => {
  const s = String((o && o.status) || "").toLowerCase();
  return ["cancelled", "canceled", "refunded", "void", "voided"].includes(s);
};

// All LPAL 4 tickets with their code, attendee email, buyer email and validity.
async function ticketIndex(env, fresh = false) {
  const d = await db(env);
  if (!fresh) {
    const hit = await d.prepare("SELECT v, updated_at FROM kv WHERE k='tt_index'").first();
    if (hit && now() - hit.updated_at < 120) return JSON.parse(hit.v);
  }
  const ev = env.TT_EVENT_ID || TT_EVENT_DEFAULT;
  const [tickets, orders] = await Promise.all([
    ttAll(env, "/issued_tickets?event_id=" + ev),
    ttAll(env, "/orders?event_id=" + ev).catch(() => [])
  ]);
  const ordersById = {};
  for (const o of orders) ordersById[o.id] = o;
  const list = tickets
    .filter(t => !t.event_id || t.event_id === ev)
    .map(t => {
      const o = ordersById[t.order_id];
      const buyer = o && o.buyer_details ? (o.buyer_details.email || "") : "";
      return {
        id: t.id, code: t.barcode || t.code || "", email: normEmail(t.email), buyer: normEmail(buyer),
        type: clean(t.description || t.ticket_type_name || "", 80),
        tier: tierOf(t.description || t.ticket_type_name || ""),
        valid: !ticketVoid(t) && !orderVoid(o)
      };
    });
  await d.prepare("INSERT INTO kv (k,v,updated_at) VALUES ('tt_index',?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated_at=excluded.updated_at")
    .bind(JSON.stringify(list), now()).run();
  return list;
}

// LPAL 4 ticket types (Fan, General, Gold, VIP) with their Ticket Tailor ids
async function ticketTypes(env) {
  const ev = env.TT_EVENT_ID || TT_EVENT_DEFAULT;
  const e = await tt(env, "/events/" + ev);
  return (e.ticket_types || []).map(t => {
    const left = t.quantity_available ?? t.available ?? (t.quantity != null && t.quantity_issued != null ? t.quantity - t.quantity_issued : null);
    return { id: t.id, name: t.name, tier: tierOf(t.name), status: t.status, left,
      soldOut: String(t.status || "").toLowerCase().includes("sold_out") || left === 0 };
  });
}

// After payment: create the evening ticket in Ticket Tailor (bundle). Safe to call again.
async function issueBundleTicket(env, reg) {
  const d = await db(env);
  if (!reg.show_type || !TICKET_PRICE[reg.show_type] || reg.issued_ticket_id) return reg;
  try {
    if (!env.TICKETTAILOR_API_KEY) throw new Error("no Ticket Tailor key");
    const types = await ticketTypes(env);
    const t = types.find(x => x.tier === reg.show_type);
    if (!t) throw new Error("ticket type not found: " + TIER_NAME[reg.show_type]);
    const body = new URLSearchParams({
      event_id: env.TT_EVENT_ID || TT_EVENT_DEFAULT, ticket_type_id: t.id,
      full_name: `${reg.first_name} ${reg.last_name}`, email: reg.email, reference: "Qualifier " + reg.id
    });
    const r = await fetch("https://api.tickettailor.com/v1/issued_tickets", {
      method: "POST", body,
      headers: { authorization: "Basic " + btoa(env.TICKETTAILOR_API_KEY + ":"), accept: "application/json", "content-type": "application/x-www-form-urlencoded" }
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok || !out.id) throw new Error("Ticket Tailor " + r.status + " " + JSON.stringify(out).slice(0, 160));
    const code = out.barcode || "";
    await d.prepare("UPDATE registrations SET issued_ticket_id=?, issued_code=?, issue_error=NULL WHERE id=?").bind(out.id, code, reg.id).run();
    // a bundle ticket can't be used again for the "already have a ticket" price
    if (code) await d.prepare(`INSERT INTO ticket_claims (ticket_key, ticket_id, registration_id, status, expires_at) VALUES (?,?,?,'used',0)
      ON CONFLICT(ticket_key) DO NOTHING`).bind(normCode(code), out.id, reg.id).run();
    return { ...reg, issued_ticket_id: out.id, issued_code: code, issue_error: null };
  } catch (e) {
    const msg = String(e.message || e).slice(0, 300);
    await d.prepare("UPDATE registrations SET issue_error=? WHERE id=?").bind(msg, reg.id).run();
    return { ...reg, issue_error: msg };
  }
}

async function claimedKeys(env) {
  const d = await db(env);
  const rows = (await d.prepare("SELECT ticket_key, status, expires_at FROM ticket_claims").all()).results || [];
  const t = now();
  return new Set(rows.filter(r => r.status === "used" || r.expires_at > t).map(r => r.ticket_key));
}

// Find the tickets that belong to an email or a code. Returns {matches, free}
async function findTickets(env, { email, code }, fresh = false) {
  const list = await ticketIndex(env, fresh);
  let matches = [];
  if (code) {
    const exact = list.filter(t => t.code === String(code).replace(/\s+/g, ""));
    matches = exact.length ? exact : list.filter(t => normCode(t.code) === normCode(code));
  } else if (email) {
    const e = normEmail(email);
    matches = list.filter(t => t.email === e);
    // buyer's order: tickets with no other attendee email first, so friends with their own email keep theirs
    if (!matches.length) matches = list.filter(t => t.buyer === e).sort((x, y) => (x.email && x.email !== e ? 1 : 0) - (y.email && y.email !== e ? 1 : 0));
  }
  const used = await claimedKeys(env);
  // best ticket first (VIP > Gold > General > Fan): it gives the cheapest entry
  const free = matches.filter(t => t.valid && !used.has(normCode(t.code))).sort((a, b) => TIER_RANK[b.tier] - TIER_RANK[a.tier]);
  return { matches, free, used };
}

/* ---------------- Stripe ---------------- */
function form(obj, prefix = "", out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object") form(v, key, out);
    else out.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(v)));
  }
  return out.join("&");
}
async function stripe(env, method, path, body) {
  const r = await fetch("https://api.stripe.com/v1" + path, {
    method,
    headers: { authorization: "Bearer " + env.STRIPE_SECRET_KEY, "content-type": "application/x-www-form-urlencoded" },
    body: body ? form(body) : undefined
  });
  const data = await r.json();
  if (!r.ok) throw new Error("stripe_" + ((data.error && data.error.message) || r.status));
  return data;
}

async function verifyStripeSig(env, raw, header) {
  if (!env.STRIPE_WEBHOOK_SECRET || !header) return false;
  const parts = Object.fromEntries(header.split(",").map(p => p.split("=")).map(([k, ...v]) => [k, v.join("=")]));
  const t = Number(parts.t);
  if (!t || Math.abs(now() - t) > 600) return false;
  const sigs = header.split(",").filter(p => p.startsWith("v1=")).map(p => p.slice(3));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.STRIPE_WEBHOOK_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${raw}`));
  const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("");
  return sigs.includes(hex);
}

/* ---------------- registration flow ---------------- */
function ageOn(dob, day = EVENT_DAY) {
  const [y, m, d] = dob.split("-").map(Number);
  const [Y, M, D] = day.split("-").map(Number);
  return Y - y - ((M < m || (M === m && D < d)) ? 1 : 0);
}

function validate(b) {
  const r = {
    lang: b.lang === "de" ? "de" : "en",
    first_name: clean(b.first_name, 60), last_name: clean(b.last_name, 60),
    email: normEmail(b.email).slice(0, 120), dob: clean(b.dob, 10), country: clean(b.country, 60),
    instagram: clean(b.instagram, 60).replace(/^@+/, ""), club: clean(b.club, 80),
    division: clean(b.division, 10), weight_class: clean(b.weight_class, 6), arms: clean(b.arms, 6),
    guardian_name: clean(b.guardian_name, 80), guardian_email: normEmail(b.guardian_email).slice(0, 120),
    code: clean(b.code, 30), show: SHOWS.includes(b.show) ? b.show : "",
    comment: String(b.comment == null ? "" : b.comment).replace(/\r/g, "").trim().slice(0, 1000)
  };
  const err = [];
  if (!r.first_name) err.push("first_name");
  if (!r.last_name) err.push("last_name");
  if (!isEmail(r.email)) err.push("email");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.dob)) err.push("dob");
  else { r.age = ageOn(r.dob); if (r.age < 8 || r.age > 90) err.push("dob"); }
  if (!r.country) err.push("country");
  if (!CLASSES[r.division]) err.push("division");
  else if (!CLASSES[r.division].includes(r.weight_class)) err.push("weight_class");
  if (!ARM_NAME[r.arms]) err.push("arms");
  if (!r.show) err.push("show");
  if (!b.accept_policy) err.push("accept_policy");
  if (!b.accept_rules) err.push("accept_rules");
  if (r.age !== undefined && r.age < 18) {
    if (!r.guardian_name) err.push("guardian_name");
    if (!isEmail(r.guardian_email)) err.push("guardian_email");
    if (!b.guardian_consent) err.push("guardian_consent");
  }
  return { r, err };
}

async function startCheckout(request, env) {
  if (!env.STRIPE_SECRET_KEY) return json({ error: "not_ready" }, 503);
  let b;
  try { b = await request.json(); } catch (e) { return json({ error: "bad_request" }, 400); }
  const { r, err } = validate(b);
  if (err.length) return json({ error: "invalid", fields: err }, 400);
  const d = await db(env);
  const id = "q_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const expires = now() + 31 * 60;

  // ticket discount: find a free ticket and reserve it for this registration
  let ticket = null;
  if (r.show === "have") {
    if (!env.TICKETTAILOR_API_KEY) return json({ error: "ticket_check_failed" }, 502);
    let found;
    try { found = await findTickets(env, { email: r.code ? "" : r.email, code: r.code }, true); }
    catch (e) { return json({ error: "ticket_check_failed" }, 502); }
    for (const t of found.free) {
      const res = await d.prepare(`INSERT INTO ticket_claims (ticket_key, ticket_id, registration_id, status, expires_at) VALUES (?,?,?,?,?)
        ON CONFLICT(ticket_key) DO UPDATE SET ticket_id=excluded.ticket_id, registration_id=excluded.registration_id, status='reserved', expires_at=excluded.expires_at
        WHERE ticket_claims.status='reserved' AND ticket_claims.expires_at < ?`)
        .bind(normCode(t.code), t.id, id, "reserved", expires + 300, now()).run();
      if (res.meta && res.meta.changes) { ticket = t; break; }
    }
    if (!ticket) return json({ error: found.matches.length ? "ticket_used" : "ticket_not_found" }, 409);
  }

  const bundle = TICKET_PRICE[r.show] ? r.show : null;
  if (bundle && env.TICKETTAILOR_API_KEY) {
    try {
      const tt = (await ticketTypes(env)).find(t => t.tier === bundle);
      if (tt && tt.soldOut) return json({ error: "sold_out", tier: bundle }, 409);
    } catch (e) { /* Ticket Tailor unreachable: still sell, the ticket is issued after payment or by hand */ }
  }
  const tier = bundle || (ticket ? ticket.tier : "none");
  const entry = entryPrice(tier, r.arms);
  const ticketPrice = bundle ? TICKET_PRICE[bundle] : 0;
  const price = entry + ticketPrice;
  const cls = `${r.weight_class.replace("-", "−")} kg`;
  const title = `LPAL Qualifier presented by TitanGrip · ${DIV_NAME[r.division]} ${cls} · ${ARM_NAME[r.arms]}` +
    (ticket ? ` · with ${TIER_NAME[ticket.tier]} ticket` : "");
  const lines = { 0: { quantity: 1, price_data: { currency: "eur", unit_amount: entry, product_data: { name: title } } } };
  if (bundle) lines[1] = { quantity: 1, price_data: { currency: "eur", unit_amount: ticketPrice,
    product_data: { name: `LPAL 4 evening ticket · ${TIER_NAME[bundle]} · Sat 9 Jan 2027, MOTORWORLD Cologne` } } };
  const meta = {
    registration: id, name: `${r.first_name} ${r.last_name}`, dob: r.dob, age: r.age, country: r.country,
    division: DIV_NAME[r.division], weight_class: cls, arms: ARM_NAME[r.arms], instagram: r.instagram,
    club: r.club, comment: r.comment.slice(0, 480), ticket_code: ticket ? ticket.code : "", evening_ticket: bundle ? TIER_NAME[bundle] + " (bundle)" : (ticket ? TIER_NAME[ticket.tier] + " (had already)" : "none"), guardian: r.guardian_name ? `${r.guardian_name} <${r.guardian_email}>` : ""
  };
  let session;
  try {
    session = await stripe(env, "POST", "/checkout/sessions", {
      mode: "payment",
      locale: r.lang,
      customer_email: r.email,
      client_reference_id: id,
      expires_at: expires,
      line_items: lines,
      metadata: meta,
      payment_intent_data: { description: title + (bundle ? ` + ${TIER_NAME[bundle]} ticket` : "") + " · " + meta.name, metadata: meta, receipt_email: r.email },
      success_url: `${SITE}/qualifier?paid={CHECKOUT_SESSION_ID}${r.lang === "de" ? "&lang=de" : ""}`,
      cancel_url: `${SITE}/qualifier?cancelled=1${r.lang === "de" ? "&lang=de" : ""}`
    });
  } catch (e) {
    if (ticket) await d.prepare("DELETE FROM ticket_claims WHERE ticket_key=? AND registration_id=?").bind(normCode(ticket.code), id).run();
    return json({ error: "payment_unavailable", detail: String(e.message || e).slice(0, 200) }, 502);
  }
  await d.prepare(`INSERT INTO registrations (id, created_at, status, session_id, lang, first_name, last_name, email, dob, age, country, instagram, club,
      division, weight_class, arms, price, discount, tt_ticket_id, tt_code, tt_type, guardian_name, guardian_email, livemode, comment,
      show_type, tier, entry_price, ticket_price)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(id, now(), "pending", session.id, r.lang, r.first_name, r.last_name, r.email, r.dob, r.age, r.country, r.instagram, r.club,
      r.division, r.weight_class, r.arms, price, ticket ? 1 : 0, ticket ? ticket.id : null, ticket ? ticket.code : null, ticket ? ticket.type : null,
      r.guardian_name || null, r.guardian_email || null, session.livemode ? 1 : 0, r.comment || null,
      r.show, tier, entry, ticketPrice).run();
  return json({ url: session.url });
}

// mark a registration paid (idempotent); used by the webhook, the success page and the admin sync
async function markFromSession(env, s) {
  const d = await db(env);
  const id = s.client_reference_id || (s.metadata && s.metadata.registration);
  if (!id) return null;
  const reg = await d.prepare("SELECT * FROM registrations WHERE id=?").bind(id).first();
  if (!reg) return null;
  if (s.payment_status === "paid" && reg.status !== "paid") {
    await d.prepare("UPDATE registrations SET status='paid', paid_at=?, amount_paid=?, payment_intent=? WHERE id=?")
      .bind(now(), s.amount_total || reg.price, s.payment_intent || null, id).run();
    if (reg.tt_code) {
      const key = normCode(reg.tt_code);
      const claim = await d.prepare("SELECT * FROM ticket_claims WHERE ticket_key=?").bind(key).first();
      if (!claim || claim.registration_id === id) {
        await d.prepare(`INSERT INTO ticket_claims (ticket_key, ticket_id, registration_id, status, expires_at) VALUES (?,?,?,'used',0)
          ON CONFLICT(ticket_key) DO UPDATE SET status='used', registration_id=excluded.registration_id`).bind(key, reg.tt_ticket_id, id).run();
      } else {
        await d.prepare("UPDATE registrations SET note=? WHERE id=?").bind("Ticket was also used by registration " + claim.registration_id, id).run();
      }
    }
    return await issueBundleTicket(env, { ...reg, status: "paid" });
  }
  if (s.status === "expired" && reg.status === "pending") {
    await d.prepare("UPDATE registrations SET status='expired' WHERE id=?").bind(id).run();
    await d.prepare("DELETE FROM ticket_claims WHERE registration_id=? AND status='reserved'").bind(id).run();
    return { ...reg, status: "expired" };
  }
  return reg;
}

async function status(url, env) {
  const sid = url.searchParams.get("session_id") || "";
  if (!/^cs_[A-Za-z0-9_]+$/.test(sid) || !env.STRIPE_SECRET_KEY) return json({ error: "bad_request" }, 400);
  let s;
  try { s = await stripe(env, "GET", "/checkout/sessions/" + sid); } catch (e) { return json({ error: "not_found" }, 404); }
  const reg = await markFromSession(env, s);
  if (!reg) return json({ error: "not_found" }, 404);
  return json({
    paid: s.payment_status === "paid", first_name: reg.first_name, division: reg.division, weight_class: reg.weight_class,
    arms: reg.arms, amount: s.amount_total, discount: !!reg.discount, email: reg.email,
    show: reg.show_type, tier: reg.tier, ticket_code: reg.issued_code || null, ticket_pending: !!(TICKET_PRICE[reg.show_type] && !reg.issued_ticket_id)
  });
}

async function webhook(request, env) {
  const raw = await request.text();
  if (!(await verifyStripeSig(env, raw, request.headers.get("stripe-signature")))) return json({ error: "bad_signature" }, 400);
  const ev = JSON.parse(raw);
  const s = ev.data && ev.data.object;
  if (s && s.object === "checkout.session" && /^checkout\.session\.(completed|async_payment_succeeded|expired)$/.test(ev.type)) {
    await markFromSession(env, s);
  }
  return json({ received: true });
}

async function ticketCheck(request, env) {
  if (!env.TICKETTAILOR_API_KEY) return json({ error: "not_ready" }, 503);
  let b;
  try { b = await request.json(); } catch (e) { return json({ error: "bad_request" }, 400); }
  const email = normEmail(b.email), code = clean(b.code, 30);
  if (!code && !isEmail(email)) return json({ error: "bad_request" }, 400);
  try {
    const { matches, free } = await findTickets(env, { email: code ? "" : email, code });
    return json({ found: matches.length, available: free.length, discount: free.length > 0, tier: free.length ? free[0].tier : null });
  } catch (e) {
    return json({ error: "ticket_check_failed" }, 502);
  }
}

/* ---------------- admin ---------------- */
function adminOk(request, env) {
  const k = request.headers.get("x-admin-key") || "";
  return env.QUALIFIER_ADMIN_KEY && k.length >= 6 && k === env.QUALIFIER_ADMIN_KEY;
}

async function admin(request, env, url) {
  if (!adminOk(request, env)) return json({ error: "unauthorized" }, 401);
  const d = await db(env);
  const action = url.searchParams.get("action") || "list";
  const diag = {
    stripe: env.STRIPE_SECRET_KEY ? (env.STRIPE_SECRET_KEY.startsWith("sk_live") || env.STRIPE_SECRET_KEY.startsWith("rk_live") ? "live" : "test") : "missing",
    tickettailor: env.TICKETTAILOR_API_KEY ? "set" : "missing",
    webhook: env.STRIPE_WEBHOOK_SECRET ? "set" : "missing",
    event_id: env.TT_EVENT_ID || TT_EVENT_DEFAULT
  };
  if (action === "sync") {
    // pending registrations: ask Stripe whether they were paid or expired
    const pend = (await d.prepare("SELECT session_id FROM registrations WHERE status='pending'").all()).results || [];
    for (const p of pend) { try { await markFromSession(env, await stripe(env, "GET", "/checkout/sessions/" + p.session_id)); } catch (e) {} }
    // discounted registrations: is the show ticket still valid?
    const list = await ticketIndex(env, true);
    const byKey = {};
    for (const t of list) byKey[normCode(t.code)] = t;
    const disc = (await d.prepare("SELECT id, tt_code FROM registrations WHERE status='paid' AND discount=1").all()).results || [];
    for (const r of disc) {
      const t = byKey[normCode(r.tt_code)];
      await d.prepare("UPDATE registrations SET ticket_ok=?, ticket_checked_at=? WHERE id=?").bind(t && t.valid ? 1 : 0, now(), r.id).run();
    }
  }
  if (action === "sync") {
    const todo = (await d.prepare("SELECT * FROM registrations WHERE status='paid' AND show_type IN ('fan','ga','gold','vip') AND issued_ticket_id IS NULL").all()).results || [];
    for (const r of todo) await issueBundleTicket(env, r);
  }
  if (action === "refund" && request.method === "POST") {
    const id = url.searchParams.get("id") || "";
    const reg = await d.prepare("SELECT * FROM registrations WHERE id=?").bind(id).first();
    if (!reg || reg.status !== "paid" || !reg.payment_intent) return json({ error: "not_refundable" }, 400);
    try {
      await stripe(env, "POST", "/refunds", { payment_intent: reg.payment_intent, metadata: { reason: "Selected for LPAL 4 super match" } });
    } catch (e) { return json({ error: "refund_failed", detail: String(e.message || e).slice(0, 200) }, 502); }
    await d.prepare("UPDATE registrations SET status='refunded', selected=1, refunded_at=? WHERE id=?").bind(now(), id).run();
  }
  if (action === "ttcheck") {
    try {
      const events = await tt(env, "/events?limit=100");
      const list = await ticketIndex(env, true);
      diag.tt_events = (events.data || []).map(e => ({ id: e.id, name: e.name, start: e.start && (e.start.date || e.start.iso) }));
      diag.tt_tickets = list.length;
      diag.tt_valid = list.filter(t => t.valid).length;
      diag.tt_types = (await ticketTypes(env)).map(t => ({ name: t.name, id: t.id, tier: TIER_NAME[t.tier], left: t.left, status: t.status }));
    } catch (e) { diag.tt_error = String(e.message || e); }
  }
  const rows = (await d.prepare("SELECT * FROM registrations ORDER BY created_at DESC").all()).results || [];
  return json({ diag, registrations: rows });
}

/* ---------------- router ---------------- */
export async function handleQualifier(request, env, url) {
  const p = url.pathname;
  try {
    if (p === "/api/qualifier/config") {
      const mode = !env.STRIPE_SECRET_KEY ? "off" : (/^(sk|rk)_live/.test(env.STRIPE_SECRET_KEY) ? "live" : "test");
      return json({ payments: mode, tickets: !!env.TICKETTAILOR_API_KEY, entry: ENTRY, oneArmOff: ONE_ARM_OFF, ticketPrice: TICKET_PRICE, classes: CLASSES });
    }
    if (p === "/api/qualifier/ticket" && request.method === "POST") return await ticketCheck(request, env);
    if (p === "/api/qualifier/checkout" && request.method === "POST") return await startCheckout(request, env);
    if (p === "/api/qualifier/status") return await status(url, env);
    if (p === "/api/qualifier/stripe-webhook" && request.method === "POST") return await webhook(request, env);
    if (p === "/api/qualifier/admin") return await admin(request, env, url);
    return json({ error: "not_found" }, 404);
  } catch (e) {
    return json({ error: "server_error", detail: String(e.message || e).slice(0, 200) }, 500);
  }
}
