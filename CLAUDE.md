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

## Sponsor pages and price tiers (hidden, noindex)
- /sponsor-opportunities: ENTRY tier, the lowest prices (generic, English, no brand). Total of all packages €23,500, "Presented by" €20,000. Custom packages on request.
- /partners-lpal4: standard tier (English).
- Commercial break video (2–4 breaks of max. 2–3 min, the sponsor video plays 2 times): €500 on /sponsor-opportunities, €1,000 on /partners-lpal4, €2,000 on /partners-lpal4-premium.
- /partners-lpal4-premium: premium tier (English).
- /partners-lpal4-levelup: offer made for Level Equipment (German).
- /partners-lpal4-kick: proposal for KICK.

## Athlete pages (hidden, noindex)
- /lpal4-athlete-video: guide for the LPAL 4 pre-match intro videos (script, shot list, upload). Drive link goes in window.DRIVE_URL at the top of the file.
- Translated copies: /lpal4-athlete-video-fr, -it, -ar (right-to-left), -ka, -tr, -es. Edit only the English page, add the new or changed texts to tools/athlete-video-<lang>.json, then run `python3 tools/make-athlete-video.py` to rebuild them. The Part 1 script stays in English in every language.
