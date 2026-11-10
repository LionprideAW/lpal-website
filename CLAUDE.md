# LPAL website: project notes

## Official links (always use these)
- Kick channel: https://kick.com/lpal_kick (the only correct Kick address; never kick.com/lionpridearmwrestling)
- Instagram: https://www.instagram.com/lion_pride_armwrestling_league/
- YouTube: https://www.youtube.com/@LionPrideArmwrestlingLeague
- Public contact email: business@lionpride-armwrestling.com

## Rules from the owner
- Never publish changes to lpal.eu (push to main = live deploy) without the owner's go-ahead.
- Keys and secrets go into Cloudflare, never into the chat or the repo.
- Legal texts (terms, participation policy) stay in English only.
- The qualifier organiser (Peter & Schäfer GbR) must not appear on the main website.
- After editing index.html or tickets.html, run `python3 tools/make-de.py` to rebuild the German pages.
- Bump the number in an asset file name (e.g. main-93.js → main-94.js) when changing it, because /assets is cached.
