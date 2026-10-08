// LPAL site worker: serves the static site, plus /api/youtube-latest
// which reads the channel's public RSS feed and returns the newest videos.
const CHANNEL_HANDLE = "LionPrideArmwrestlingLeague";
const CHANNEL_ID = "UCSxV_nzYThkWks1sVMAHuaw";
const UA = { "user-agent": "Mozilla/5.0 (compatible; LPAL-site/1.0)" };

async function rss(id) {
  const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`, { headers: UA });
  if (!r.ok) return null;
  const xml = await r.text();
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => {
    const e = m[1];
    const pick = re => (e.match(re) || [])[1] || "";
    return {
      id: pick(/<yt:videoId>([^<]+)<\/yt:videoId>/),
      title: pick(/<title>([^<]*)<\/title>/).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
      published: pick(/<published>([^<]+)<\/published>/)
    };
  }).filter(v => v.id);
  return videos.length ? videos : null;
}

async function channelIdFromHandle() {
  const r = await fetch(`https://www.youtube.com/@${CHANNEL_HANDLE}`, { headers: UA });
  if (!r.ok) return null;
  const html = await r.text();
  const m = html.match(/"channelId":"(UC[\w-]{22})"/) || html.match(/channel\/(UC[\w-]{22})/);
  return m ? m[1] : null;
}

async function latest(ctx) {
  const cache = caches.default;
  const key = new Request("https://lpal-cache/youtube-latest-v1");
  const hit = await cache.match(key);
  if (hit) return hit;
  let videos = await rss(CHANNEL_ID);
  if (!videos) { const id = await channelIdFromHandle(); if (id) videos = await rss(id); }
  const res = new Response(JSON.stringify({ videos: (videos || []).slice(0, 6) }), {
    status: videos ? 200 : 502,
    headers: { "content-type": "application/json", "cache-control": "public, max-age=900" }
  });
  if (videos) ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/youtube-latest") {
      try { return await latest(ctx); }
      catch (e) { return new Response(JSON.stringify({ videos: [] }), { status: 502, headers: { "content-type": "application/json" } }); }
    }
    return env.ASSETS.fetch(request);
  }
};
