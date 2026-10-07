# LPAL website

Website of the Lion Pride Armwrestling League, hosted on Cloudflare Pages.

- Fight card, event date and ticket link: top of `public/assets/js/main-N.js` (numbered: when changing it, rename to the next number and update index.html)
- Styles: `public/assets/css/styles-N.css` (numbered the same way)
- Images: `public/assets/img/` (athlete photos in `public/assets/img/athletes/`)
- Deploy: Cloudflare builds from this repo with `npx wrangler deploy` (settings in `wrangler.jsonc`)
