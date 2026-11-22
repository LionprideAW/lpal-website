"""Builds the translated athlete video guides from the English master page.

  python3 tools/make-athlete-video.py

Master:        public/lpal4-athlete-video.html  (edit only this one)
Translations:  tools/athlete-video-<lang>.json  ({"English text": "translation"}; the full English list
               is written to tools/athlete-video-en.json on every run)
Output:        public/lpal4-athlete-video-<lang>.html
If you change English text on the master page, update the same entry in every language file.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from athlete_video_segments import segments  # noqa: E402

ROOT = os.path.dirname(HERE)
MASTER = os.path.join(ROOT, "public", "lpal4-athlete-video.html")
LANGS = {
    "fr": {}, "it": {}, "es": {}, "tr": {},
    "ar": {"dir": "rtl", "font": "Noto+Kufi+Arabic:wght@400;500;700;800", "family": '"Noto Kufi Arabic"'},
    "ka": {"font": "Noto+Sans+Georgian:wght@400;500;700;800", "family": '"Noto Sans Georgian"'},
}

src = open(MASTER, encoding="utf-8").read()
en = segments(src)
json.dump(en, open(os.path.join(HERE, "athlete-video-en.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
JS_KEYS = {"Upload link coming soon": 'soon: "{}"', "Copy": 'copy: "{}"', "Copied": 'copied: "{}"', "Sunday, 6 December 2026": 'window.DEADLINE = "{}"'}
assert all(k in en for k in JS_KEYS)
ATTR = ('content="{}"', 'aria-label="{}"')

def tags(s):
    return sorted(re.findall(r"<[^>]+>", s))

ok = True
for lang, cfg in LANGS.items():
    path = os.path.join(HERE, f"athlete-video-{lang}.json")
    if not os.path.exists(path):
        print(f"{lang}: no translation file, skipped"); continue
    d = json.load(open(path, encoding="utf-8"))
    missing = [e for e in en if e not in d]
    if missing:
        for e in missing: print(f"{lang}: missing translation: {e[:90]}")
        ok = False; continue
    tr = [d[e] for e in en]
    bad = [(i, e, t) for i, (e, t) in enumerate(zip(en, tr)) if tags(e) != tags(t)]
    if bad:
        for i, e, t in bad[:5]:
            print(f"{lang} #{i}: HTML tags differ\n  en: {e}\n  {lang}: {t}")
        ok = False; continue
    out = src
    for e, t in sorted(zip(en, tr), key=lambda p: -len(p[0])):
        n = 0
        a = ">" + e + "<"
        if a in out:
            n += out.count(a); out = out.replace(a, ">" + t + "<")
        else:
            out, k = re.subn(r">(\s+)" + re.escape(e) + r"(\s+)<", lambda m: ">" + m.group(1) + t + m.group(2) + "<", out)
            n += k
        for f in ATTR:
            a = f.format(e)
            if a in out:
                n += out.count(a); out = out.replace(a, f.format(t.replace('"', "&quot;")))
        if e in JS_KEYS:
            f = JS_KEYS[e]; a = f.format(e)
            if a in out:
                n += 1; out = out.replace(a, f.format(t.replace('"', '\\"')))
        if n == 0:
            print(f"{lang}: not replaced: {e[:80]}"); ok = False
    out = out.replace('<html lang="en">', f'<html lang="{lang}"' + (f' dir="{cfg["dir"]}"' if cfg.get("dir") else "") + ">", 1)
    out = out.replace('window.LANG = "en";', f'window.LANG = "{lang}";', 1)
    if cfg.get("font"):
        fam = cfg["family"]
        extra = (f'<link href="https://fonts.googleapis.com/css2?family={cfg["font"]}&display=swap" rel="stylesheet">\n'
                 "<style>\n"
                 f"body{{font-family:{fam},Roboto,sans-serif}}\n"
                 f"h1,h2,h3,.k,.btn,.tag,.deadline b,.fact b,.steps b,.num,.tip i,.script small,.copy,.bar nav a,.lang-h{{font-family:{fam},sans-serif!important;font-weight:800!important;letter-spacing:0!important;text-transform:none!important}}\n"
                 "h1{font-size:clamp(38px,9vw,76px)}h2{font-size:clamp(30px,6vw,48px)}h3{font-size:24px;line-height:1.25}h1,h2{line-height:1.2}\n"
                 f"svg text{{font-family:{fam},sans-serif!important;letter-spacing:0!important}}\n"
                 "</style>\n")
        out = out.replace("</head>", extra + "</head>", 1)
    open(os.path.join(ROOT, "public", f"lpal4-athlete-video-{lang}.html"), "w", encoding="utf-8").write(out)
    print(f"{lang}: written")
sys.exit(0 if ok else 1)
