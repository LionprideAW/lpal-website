"""Lists the translatable text of public/lpal4-athlete-video.html (the English master page).
Used by tools/make-athlete-video.py."""
import re
from bs4 import BeautifulSoup, NavigableString, Tag, Comment

INLINE = {"a", "b", "strong", "em", "i", "span", "code", "br"}
SKIP = {"script", "style", "noscript"}

def segments(src):
    soup = BeautifulSoup(src, "html.parser")
    out = []
    def has_text(el):
        return el.get_text(strip=True) != ""
    def inline(c):
        return c.name in INLINE and not (c.name == "a" and "btn" in c.get("class", []))
    def leaf(el):
        return all(isinstance(c, Comment) or isinstance(c, NavigableString) or (isinstance(c, Tag) and inline(c) and leaf(c)) for c in el.children)
    def visit(el):
        if not isinstance(el, Tag) or el.name in SKIP or el.has_attr("data-notr"):
            return
        if el.name in ("svg",):
            for t in el.find_all("text"):
                if has_text(t): out.append(t.decode_contents())
            return
        if not inline(el) and leaf(el) and has_text(el):
            out.append(el.decode_contents().strip()); return
        for c in el.children:
            if isinstance(c, Tag):
                if inline(c) and leaf(c) and has_text(c) and not leaf(el):
                    out.append(c.decode_contents().strip())
                else:
                    visit(c)
            elif isinstance(c, NavigableString) and not isinstance(c, Comment) and c.strip() and not leaf(el):
                out.append(c.strip())
    visit(soup.body)
    t = soup.title.string
    out.insert(0, t)
    for m in soup.find_all("meta"):
        if m.get("name") == "description" or m.get("property") in ("og:title", "og:description"):
            out.append(m["content"])
    for el in soup.body.find_all(attrs={"aria-label": True}):
        if not el.find_parent(attrs={"data-notr": True}):
            out.append(el["aria-label"])
    js = re.search(r'window\.T = \{ soon: "([^"]+)", copy: "([^"]+)", copied: "([^"]+)" \}', src)
    out += list(js.groups())
    out.append(re.search(r'window\.DEADLINE = "([^"]+)"', src).group(1))
    seen, res = set(), []
    for x in out:
        if x not in seen and re.search(r"[A-Za-z]", x):
            seen.add(x); res.append(x)
    return res

if __name__ == "__main__":
    import json, sys
    src = open(sys.argv[1]).read()
    segs = segments(src)
    miss = [x for x in segs if x not in src]
    print(json.dumps(segs, ensure_ascii=False, indent=0))
    print("COUNT", len(segs), "MISSING", miss, file=sys.stderr)
