// LPAL Edit Contest: participants register (email + password), submit links to their
// Instagram Reels / TikToks, and only the LPAL team sees and enters the view counts.
// Storage: the same D1 database as the qualifier (binding DB), tables contest_*.
// Admin access: the same key as the qualifier list (QUALIFIER_ADMIN_KEY).

export const CONTEST_PATH = "/ec-ce58cf90";          // public page (hidden address while testing)
export const CONTEST_ADMIN_PATH = "/ca-11b0e358f5";  // private list
export const CONTEST_PUBLIC = false;                 // true = also open on /edit-contest

const END = Date.parse("2026-12-20T23:59:59+01:00"); // last moment to submit links (CET)
const MILLION = 1_000_000;
const MAX_LINKS = 30;
const SESSION_DAYS = 60;
const PBKDF2_ITER = 100000;

const json = (d, s = 200, h = {}) => new Response(JSON.stringify(d), {
  status: s, headers: { "content-type": "application/json", "cache-control": "no-store", ...h }
});
const now = () => Date.now();
const clean = (v, n = 120) => String(v ?? "").trim().slice(0, n);

let ready = false;
async function db(env) {
  if (!ready) {
    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS contest_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, name TEXT, country TEXT,
        instagram TEXT, tiktok TEXT, dob TEXT, guardian_name TEXT, guardian_email TEXT,
        pw_hash TEXT NOT NULL, pw_salt TEXT NOT NULL, created_at INTEGER, failed INTEGER DEFAULT 0,
        locked_until INTEGER DEFAULT 0, disqualified INTEGER DEFAULT 0, note TEXT, promo_ok INTEGER DEFAULT 0)`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS contest_sessions (
        token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires_at INTEGER)`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS contest_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, url TEXT UNIQUE NOT NULL,
        platform TEXT, created_at INTEGER, views INTEGER, views_at INTEGER, million_at INTEGER,
        disqualified INTEGER DEFAULT 0, note TEXT)`)
    ]);
    ready = true;
  }
  return env.DB;
}

// ---------- crypto helpers
const enc = new TextEncoder();
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
const randHex = n => hex(crypto.getRandomValues(new Uint8Array(n)));
async function sha256(s) { return hex(await crypto.subtle.digest("SHA-256", enc.encode(s))); }
async function pwHash(pw, salt) {
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: enc.encode(salt), iterations: PBKDF2_ITER }, key, 256);
  return hex(bits);
}
function same(a, b) { if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }

// ---------- sessions (HttpOnly cookie)
const COOKIE = "lpal_ec";
function cookieOf(request) {
  const m = (request.headers.get("cookie") || "").match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([a-f0-9]{64})"));
  return m ? m[1] : null;
}
async function newSession(d, userId) {
  const token = randHex(32);
  await d.prepare("INSERT INTO contest_sessions (token_hash, user_id, expires_at) VALUES (?,?,?)")
    .bind(await sha256(token), userId, now() + SESSION_DAYS * 864e5).run();
  return `${COOKIE}=${token}; Path=/api/contest; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`;
}
async function currentUser(request, d) {
  const t = cookieOf(request); if (!t) return null;
  const s = await d.prepare("SELECT user_id, expires_at FROM contest_sessions WHERE token_hash=?").bind(await sha256(t)).first();
  if (!s || s.expires_at < now()) return null;
  return d.prepare("SELECT * FROM contest_users WHERE id=?").bind(s.user_id).first();
}

// ---------- links
export function parseLink(raw) {
  let u; try { u = new URL(String(raw).trim()); } catch (e) { return null; }
  if (!/^https?:$/.test(u.protocol)) return null;
  const host = u.hostname.replace(/^(www|m)\./, "").toLowerCase();
  const p = u.pathname.replace(/\/+$/, "");
  if (host === "instagram.com") {
    const m = p.match(/^\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)$/);
    if (m) return { platform: "instagram", url: `https://www.instagram.com/reel/${m[2]}/` };
  }
  if (host === "tiktok.com") {
    const m = p.match(/^\/@([\w.-]+)\/(video|photo)\/(\d+)$/);
    if (m) return { platform: "tiktok", url: `https://www.tiktok.com/@${m[1].toLowerCase()}/video/${m[3]}` };
  }
  if (host === "vm.tiktok.com" || host === "vt.tiktok.com" || (host === "tiktok.com" && /^\/t\/[\w]+$/.test(p))) {
    if (/^\/(t\/)?[\w]+$/.test(p)) return { platform: "tiktok", url: `https://${host}${p}/` };
  }
  return null;
}

function publicUser(u) {
  return { name: u.name, email: u.email, country: u.country, instagram: u.instagram, tiktok: u.tiktok };
}
async function myLinks(d, uid) {
  const r = await d.prepare("SELECT id, url, platform, created_at FROM contest_links WHERE user_id=? ORDER BY created_at DESC").bind(uid).all();
  return r.results || [];
}

function ageOn(dob, at) {
  const b = new Date(dob + "T00:00:00Z"), a = new Date(at);
  if (isNaN(b)) return null;
  let y = a.getUTCFullYear() - b.getUTCFullYear();
  if (a.getUTCMonth() < b.getUTCMonth() || (a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() < b.getUTCDate())) y--;
  return y;
}
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i;
const handle = v => clean(v, 40).replace(/^@+/, "").replace(/[^\w.]/g, "");

// ---------- participant API
async function register(request, env) {
  const d = await db(env);
  const b = await request.json().catch(() => ({}));
  const email = clean(b.email, 120).toLowerCase();
  const name = clean(b.name, 80), country = clean(b.country, 60), dob = clean(b.dob, 10);
  const pw = String(b.password || "");
  const err = {};
  if (name.length < 2) err.name = 1;
  if (!EMAIL_RE.test(email)) err.email = 1;
  if (pw.length < 8 || pw.length > 200) err.password = 1;
  if (!country) err.country = 1;
  const age = ageOn(dob, now());
  if (age === null || age > 100) err.dob = 1;
  else if (age < 13) return json({ error: "too_young" }, 400);
  const minor = age !== null && age < 18;
  const gname = clean(b.guardian_name, 80), gemail = clean(b.guardian_email, 120).toLowerCase();
  if (minor && (gname.length < 2 || !EMAIL_RE.test(gemail) || !b.guardian_consent)) err.guardian = 1;
  if (!b.accept) err.accept = 1;
  const ig = handle(b.instagram), tk = handle(b.tiktok);
  if (!ig && !tk) err.handles = 1;
  if (Object.keys(err).length) return json({ error: "fields", fields: err }, 400);
  if (await d.prepare("SELECT id FROM contest_users WHERE email=?").bind(email).first()) return json({ error: "exists" }, 409);
  const salt = randHex(16);
  const r = await d.prepare(`INSERT INTO contest_users (email,name,country,instagram,tiktok,dob,guardian_name,guardian_email,pw_hash,pw_salt,created_at,promo_ok)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).bind(email, name, country, ig, tk, dob, minor ? gname : null, minor ? gemail : null,
    await pwHash(pw, salt), salt, now(), b.promo_ok ? 1 : 0).run();
  const id = r.meta.last_row_id;
  return json({ ok: true }, 200, { "set-cookie": await newSession(d, id) });
}

async function login(request, env) {
  const d = await db(env);
  const b = await request.json().catch(() => ({}));
  const email = clean(b.email, 120).toLowerCase(), pw = String(b.password || "");
  const u = await d.prepare("SELECT * FROM contest_users WHERE email=?").bind(email).first();
  if (!u) { await pwHash(pw || "x", "dummy-salt"); return json({ error: "wrong" }, 401); }
  if (u.locked_until > now()) return json({ error: "locked" }, 429);
  if (!same(await pwHash(pw, u.pw_salt), u.pw_hash)) {
    const f = (u.failed || 0) + 1;
    await d.prepare("UPDATE contest_users SET failed=?, locked_until=? WHERE id=?").bind(f >= 8 ? 0 : f, f >= 8 ? now() + 15 * 60e3 : 0, u.id).run();
    return json({ error: f >= 8 ? "locked" : "wrong" }, f >= 8 ? 429 : 401);
  }
  await d.prepare("UPDATE contest_users SET failed=0, locked_until=0 WHERE id=?").bind(u.id).run();
  return json({ ok: true }, 200, { "set-cookie": await newSession(d, u.id) });
}

async function logout(request, env) {
  const d = await db(env); const t = cookieOf(request);
  if (t) await d.prepare("DELETE FROM contest_sessions WHERE token_hash=?").bind(await sha256(t)).run();
  return json({ ok: true }, 200, { "set-cookie": `${COOKIE}=; Path=/api/contest; HttpOnly; Secure; SameSite=Lax; Max-Age=0` });
}

async function me(request, env) {
  const d = await db(env); const u = await currentUser(request, d);
  if (!u) return json({ user: null, open: now() <= END, end: END });
  return json({ user: publicUser(u), links: await myLinks(d, u.id), open: now() <= END, end: END, max: MAX_LINKS });
}

async function addLink(request, env) {
  const d = await db(env); const u = await currentUser(request, d);
  if (!u) return json({ error: "login" }, 401);
  if (now() > END) return json({ error: "closed" }, 403);
  const b = await request.json().catch(() => ({}));
  const l = parseLink(b.url);
  if (!l) return json({ error: "bad_link" }, 400);
  const n = await d.prepare("SELECT COUNT(*) n FROM contest_links WHERE user_id=?").bind(u.id).first();
  if ((n?.n || 0) >= MAX_LINKS) return json({ error: "max" }, 400);
  const vid = (l.url.match(/\/video\/(\d+)$/) || [])[1];
  const dup = vid
    ? await d.prepare("SELECT user_id FROM contest_links WHERE url LIKE ?").bind("%/video/" + vid).first()
    : await d.prepare("SELECT user_id FROM contest_links WHERE url=?").bind(l.url).first();
  if (dup) return json({ error: dup.user_id === u.id ? "dup_own" : "dup_other" }, 409);
  await d.prepare("INSERT INTO contest_links (user_id,url,platform,created_at) VALUES (?,?,?,?)").bind(u.id, l.url, l.platform, now()).run();
  return json({ ok: true, links: await myLinks(d, u.id) });
}

async function delLink(request, env) {
  const d = await db(env); const u = await currentUser(request, d);
  if (!u) return json({ error: "login" }, 401);
  const b = await request.json().catch(() => ({}));
  await d.prepare("DELETE FROM contest_links WHERE id=? AND user_id=?").bind(Number(b.id) || 0, u.id).run();
  return json({ ok: true, links: await myLinks(d, u.id) });
}

// ---------- admin API (header x-admin-key = QUALIFIER_ADMIN_KEY)
function adminOk(request, env) {
  const k = request.headers.get("x-admin-key") || "";
  return env.QUALIFIER_ADMIN_KEY && k.length >= 6 && same(k, env.QUALIFIER_ADMIN_KEY);
}
async function adminList(d) {
  const users = (await d.prepare("SELECT id,email,name,country,instagram,tiktok,dob,guardian_name,guardian_email,created_at,disqualified,note,promo_ok FROM contest_users ORDER BY created_at").all()).results || [];
  const links = (await d.prepare("SELECT * FROM contest_links ORDER BY created_at").all()).results || [];
  const first = await d.prepare("SELECT l.*, u.name, u.email FROM contest_links l JOIN contest_users u ON u.id=l.user_id WHERE l.million_at IS NOT NULL AND l.disqualified=0 AND u.disqualified=0 ORDER BY l.million_at LIMIT 1").first();
  return { users, links, first_million: first || null, end: END, now: now() };
}
async function admin(request, env, url) {
  if (!adminOk(request, env)) return json({ error: "unauthorized" }, 401);
  const d = await db(env);
  const action = url.searchParams.get("action") || "list";
  if (request.method === "POST") {
    const b = await request.json().catch(() => ({}));
    if (action === "views") {
      const id = Number(b.id) || 0;
      const v = b.views === "" || b.views === null ? null : Math.max(0, Math.round(Number(b.views)));
      if (v !== null && !Number.isFinite(v)) return json({ error: "bad" }, 400);
      const cur = await d.prepare("SELECT million_at FROM contest_links WHERE id=?").bind(id).first();
      if (!cur) return json({ error: "nf" }, 404);
      // first time a link reaches 1,000,000 is remembered; correcting it below 1M clears it again
      const million = v !== null && v >= MILLION ? (cur.million_at || now()) : null;
      await d.prepare("UPDATE contest_links SET views=?, views_at=?, million_at=? WHERE id=?").bind(v, now(), million, id).run();
    } else if (action === "dq-link") {
      await d.prepare("UPDATE contest_links SET disqualified=?, note=? WHERE id=?").bind(b.on ? 1 : 0, clean(b.note, 200) || null, Number(b.id) || 0).run();
    } else if (action === "dq-user") {
      await d.prepare("UPDATE contest_users SET disqualified=?, note=? WHERE id=?").bind(b.on ? 1 : 0, clean(b.note, 200) || null, Number(b.id) || 0).run();
    } else if (action === "reset-pw") {
      const id = Number(b.id) || 0;
      const temp = randHex(5);
      const salt = randHex(16);
      await d.prepare("UPDATE contest_users SET pw_hash=?, pw_salt=?, failed=0, locked_until=0 WHERE id=?").bind(await pwHash(temp, salt), salt, id).run();
      await d.prepare("DELETE FROM contest_sessions WHERE user_id=?").bind(id).run();
      return json({ ok: true, temp });
    } else if (action === "del-link") {
      await d.prepare("DELETE FROM contest_links WHERE id=?").bind(Number(b.id) || 0).run();
    } else return json({ error: "action" }, 400);
  }
  return json(await adminList(d));
}

export async function handleContest(request, env, url) {
  try {
    if (!env.DB) return json({ error: "no_db" }, 500);
    const p = url.pathname.replace(/^\/api\/contest\//, "");
    const post = request.method === "POST";
    // simple CSRF guard: write requests must come from our own pages
    if (post) {
      const o = request.headers.get("origin");
      if (o && new URL(o).host !== url.host) return json({ error: "origin" }, 403);
    }
    if (p === "me") return me(request, env);
    if (p === "register" && post) return register(request, env);
    if (p === "login" && post) return login(request, env);
    if (p === "logout" && post) return logout(request, env);
    if (p === "link" && post) return addLink(request, env);
    if (p === "link-delete" && post) return delLink(request, env);
    if (p === "admin") return admin(request, env, url);
    return json({ error: "not_found" }, 404);
  } catch (e) {
    return json({ error: "server", detail: String(e && e.message || e).slice(0, 200) }, 500);
  }
}
