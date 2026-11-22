"""Turns a translation list (same order as tools/athlete-video-en.json) into tools/athlete-video-<lang>.json.
  python3 tools/athlete-video-import.py <lang> <list.json>"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
lang, src = sys.argv[1], sys.argv[2]
en = json.load(open(os.path.join(HERE, "athlete-video-en.json"), encoding="utf-8"))
tr = json.load(open(src, encoding="utf-8"))
assert len(tr) == len(en), (len(tr), len(en))
json.dump(dict(zip(en, tr)), open(os.path.join(HERE, f"athlete-video-{lang}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(lang, "imported", len(tr))
