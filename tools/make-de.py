#!/usr/bin/env python3
"""Builds the German main page (public/de.html, served at lpal.eu/de) from public/index.html.
Run after every change to index.html:   python3 tools/make-de.py
Each pair is (English text in index.html, German text). The script stops if a text is not found."""
import json, re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent / "public"
src = (ROOT / "index.html").read_text()

PAIRS = [
 # head
 ('<html lang="en">', '<html lang="de">'),
 ('<title>LPAL | Lion Pride Armwrestling League</title>', '<title>LPAL | Lion Pride Armwrestling League – Armwrestling live in Köln</title>'),
 ('content="Lion Pride Armwrestling League. Elite armwrestling live from Cologne, Germany on 9 January 2027. Fight card, countdown and free livestream.">',
  'content="Lion Pride Armwrestling League (LPAL): Profi-Armwrestling live aus Köln am 9. Januar 2027. Fight Card, Tickets, Countdown und kostenloser Livestream.">'),
 ('<meta property="og:title" content="The Official Home of the Lion Pride Armwrestling League | LPAL">', '<meta property="og:title" content="Die offizielle Seite der Lion Pride Armwrestling League | LPAL">'),
 ('content="The official home of the Lion Pride Armwrestling League. Fight cards, athletes, results and free livestreams. LPAL 4 · 9 January 2027 · Cologne, Germany.">',
  'content="Die offizielle Seite der Lion Pride Armwrestling League. Fight Cards, Athleten, Ergebnisse und kostenlose Livestreams. LPAL 4 · 9. Januar 2027 · Köln.">'),
 ('<meta property="og:url" content="https://lpal.eu/">', '<meta property="og:url" content="https://lpal.eu/de">\n<meta property="og:locale" content="de_DE">'),
 ('<link rel="canonical" href="https://lpal.eu/">', '<link rel="canonical" href="https://lpal.eu/de">'),
 # header
 ('aria-haspopup="true">Events</a>', 'aria-haspopup="true">Events</a>'),
 ('<p class="drop-label">Upcoming</p>', '<p class="drop-label">Demnächst</p>'),
 ('<span class="drop-sub">Sat 9 Jan 2027 &middot; Cologne, Germany</span>', '<span class="drop-sub">Sa. 9. Jan. 2027 &middot; Köln</span>'),
 ('<p class="drop-label">Past events</p>', '<p class="drop-label">Vergangene Events</p>'),
 ('<span class="drop-sub">Results &amp; replays</span>', '<span class="drop-sub">Ergebnisse &amp; Videos</span>', 3),
 ('class="nav-link">Athletes</a>', 'class="nav-link">Athleten</a>'),
 ('class="nav-link">News</a>', 'class="nav-link">News</a>'),
 ('<a href="de" class="nav-link nav-lang" hreflang="de" lang="de" title="Deutsch">DE</a>', '<a href="./" class="nav-link nav-lang" hreflang="en" lang="en" title="English">EN</a>'),
 ('data-tickets>Buy tickets</a>', 'data-tickets>Tickets kaufen</a>', 2),
 ('class="btn btn-red btn-nav">Watch event</a>', 'class="btn btn-red btn-nav">Event ansehen</a>'),
 ('<a href="#event">Upcoming event</a>', '<a href="#event">Nächstes Event</a>'),
 ('<a href="lpal-3">LPAL 3 results <small>Vienna 2026</small></a>', '<a href="lpal-3">LPAL 3 Ergebnisse <small>Wien 2026</small></a>'),
 ('<a href="lpal-2">LPAL 2 results <small>Vienna 2025</small></a>', '<a href="lpal-2">LPAL 2 Ergebnisse <small>Wien 2025</small></a>'),
 ('<a href="lpal-1">LPAL 1 results <small>Vienna 2025</small></a>', '<a href="lpal-1">LPAL 1 Ergebnisse <small>Wien 2025</small></a>'),
 ('<a href="athletes">Athletes</a>', '<a href="athletes">Athleten</a>'),
 ('<a href="de" hreflang="de" lang="de">Deutsch</a>', '<a href="./" hreflang="en" lang="en">English</a>'),
 ('class="btn btn-red">Watch event</a>\n    </div>\n  </div>\n</header>', 'class="btn btn-red">Event ansehen</a>\n    </div>\n  </div>\n</header>'),
 # hero
 ('<h1 class="sr-only">LPAL 4, Lion Pride Armwrestling League</h1>', '<h1 class="sr-only">LPAL 4, Lion Pride Armwrestling League: Armwrestling live in Köln</h1>'),
 ('<p class="hero-date">Saturday 9 January 2027 &middot; Cologne, Germany</p>', '<p class="hero-date">Samstag, 9. Januar 2027 &middot; Köln</p>'),
 ('<p class="hero-sub">Main event: World title match</p>', '<p class="hero-sub">Hauptkampf: Weltmeisterschaftskampf</p>'),
 ('rel="noopener">Watch event</a>\n        <a class="btn btn-white" href="#event">View fight card</a>', 'rel="noopener">Event ansehen</a>\n        <a class="btn btn-white" href="#event">Zur Fight Card</a>'),
 ('aria-label="Turn sound on"', 'aria-label="Ton an"'),
 # venue + ticket
 ('aria-label="LPAL 4 at Motorworld Cologne, tickets on sale"', 'aria-label="LPAL 4 in der Motorworld Köln, Tickets erhältlich"'),
 ('<p class="kicker">Tickets on sale now</p>', '<p class="kicker">Tickets jetzt erhältlich</p>'),
 ('<h2 class="venue-title">Motorworld Cologne</h2>', '<h2 class="venue-title">Motorworld Köln</h2>'),
 ('<p class="venue-sub">The home of LPAL 4. One stage, one table, a full arena around it.</p>', '<p class="venue-sub">Die Heimat von LPAL 4. Eine Bühne, ein Tisch und eine volle Arena drumherum.</p>'),
 ('alt="Motorworld Cologne from outside at sunset"', 'alt="Die Motorworld Köln von außen bei Sonnenuntergang"'),
 ('<figcaption><span>01</span>Outside</figcaption>', '<figcaption><span>01</span>Außen</figcaption>'),
 ('alt="Visualisation of LPAL 4 inside Motorworld: stage with the table, a full crowd and the raised tribune"', 'alt="Visualisierung von LPAL 4 in der Motorworld: Bühne mit Tisch, volles Publikum und erhöhte Tribüne"'),
 ('<figcaption><span>02</span>Inside · AI visualisation</figcaption>', '<figcaption><span>02</span>Innen · KI-Visualisierung</figcaption>'),
 ('aria-label="Buy tickets for LPAL 4"', 'aria-label="Tickets für LPAL 4 kaufen"'),
 ('<p class="ticket-k">Admit one · LPAL 4</p>', '<p class="ticket-k">Eintrittskarte · LPAL 4</p>'),
 ('<p class="ticket-date">Sat 9 Jan 2027 <i></i> 18:00</p>', '<p class="ticket-date">Sa. 9. Jan. 2027 <i></i> 18:00</p>'),
 ('<p class="ticket-venue">Motorworld Cologne, Germany</p>', '<p class="ticket-venue">Motorworld Köln</p>'),
 ('<p class="ticket-from">from<b>€30</b></p>', '<p class="ticket-from">ab<b>30 €</b></p>'),
 ('<span class="ticket-btn">Buy tickets &rarr;</span>', '<span class="ticket-btn">Tickets kaufen &rarr;</span>'),
 ('<p class="ticket-note">Pick your seat on the hall map</p>', '<p class="ticket-note">Wähle deinen Bereich im Hallenplan</p>'),
 ('<li style="--c:#d3211a">VIP <b>€90</b></li>', '<li style="--c:#d3211a">VIP <b>90 €</b></li>'),
 ('<li style="--c:#c8961a">Gold <b>€60</b></li>', '<li style="--c:#c8961a">Gold <b>60 €</b></li>'),
 ('<li style="--c:#2462c6">General <b>€35</b></li>', '<li style="--c:#2462c6">General <b>35 €</b></li>'),
 ('<li style="--c:#7b8aa3">Fan Access <b>€30</b></li>', '<li style="--c:#7b8aa3">Fan Access <b>30 €</b></li>'),
 # event
 ('<p class="kicker">Upcoming event</p>', '<p class="kicker">Nächstes Event</p>'),
 ('<p class="event-meta"><span>Saturday, 9 January 2027</span><span class="sep">&middot;</span><span>Cologne, Germany</span></p>', '<p class="event-meta"><span>Samstag, 9. Januar 2027</span><span class="sep">&middot;</span><span>Köln, Deutschland</span></p>'),
 ('<p class="event-desc">The biggest LPAL card yet: champions and fan favourites with a combined reach of <strong>5.6M+ followers</strong> on Instagram and TikTok, live from Cologne.</p>',
  '<p class="event-desc">Die größte LPAL Fight Card bisher: Champions und Publikumslieblinge mit zusammen <strong>über 5,6 Mio. Followern</strong> auf Instagram und TikTok, live aus Köln.</p>'),
 ('aria-label="Time until the event"', 'aria-label="Zeit bis zum Event"'),
 ('<small>Days</small>', '<small>Tage</small>'), ('<small>Hrs</small>', '<small>Std</small>'), ('<small>Min</small>', '<small>Min</small>'), ('<small>Sec</small>', '<small>Sek</small>'),
 ('aria-label="5.6 million plus combined followers"><span class="reach-num">5.6M+</span><span class="reach-label">Combined followers<br>Instagram &amp; TikTok</span>',
  'aria-label="über 5,6 Millionen Follower zusammen"><span class="reach-num">5,6 Mio.+</span><span class="reach-label">Follower zusammen<br>Instagram &amp; TikTok</span>'),
 # posters, memory, news
 ('aria-label="LPAL 4 fight posters"', 'aria-label="LPAL 4 Fight-Poster"'),
 ('<p class="kicker">LPAL 4 &middot; 9 January 2027 &middot; Cologne</p>', '<p class="kicker">LPAL 4 &middot; 9. Januar 2027 &middot; Köln</p>'),
 ('<h2 class="st-title">Fight Posters</h2>', '<h2 class="st-title">Fight-Poster</h2>'),
 ('aria-label="Scroll posters left"', 'aria-label="Poster nach links"'), ('aria-label="Scroll posters right"', 'aria-label="Poster nach rechts"'),
 ('aria-label="In loving memory of Ethan Lovei"', 'aria-label="In liebevoller Erinnerung an Ethan Lovei"'),
 ('alt="Ethan Lovei with his arms raised on stage"', 'alt="Ethan Lovei mit erhobenen Armen auf der Bühne"'),
 ('<span class="memory-kicker">In loving memory of our angel</span>', '<span class="memory-kicker">In liebevoller Erinnerung an unseren Engel</span>'),
 ('<span class="memory-btn">Read his story</span>', '<span class="memory-btn">Seine Geschichte</span>'),
 ('<p class="kicker">What\'s happening</p>', '<p class="kicker">Aktuelles</p>'),
 ('aria-label="Scroll stories left"', 'aria-label="Storys nach links"'), ('aria-label="Scroll stories right"', 'aria-label="Storys nach rechts"'),
 ('aria-label="Previous story"', 'aria-label="Vorherige Story"', 2), ('aria-label="Next story"', 'aria-label="Nächste Story"', 2),
 ('aria-label="Close story"', 'aria-label="Story schließen"'),
 # featured
 ('<h2 class="feat-title">Featured LPAL content</h2>', '<h2 class="feat-title">LPAL Highlights</h2>'),
 ('title="Latest video from the LPAL YouTube channel"', 'title="Neuestes Video vom LPAL YouTube-Kanal"'),
 ('<span id="yt-title">Latest upload</span>', '<span id="yt-title">Neuestes Video</span>'),
 ('<h3>Every LPAL match, free on YouTube</h3>', '<h3>Jedes LPAL Match kostenlos auf YouTube</h3>'),
 ('<p>Replays, highlights and behind-the-scenes from every LPAL event. The newest video always plays here first.</p>', '<p>Wiederholungen, Highlights und Blicke hinter die Kulissen von jedem LPAL Event. Das neueste Video läuft immer zuerst hier.</p>'),
 ('rel="noopener">Subscribe on YouTube</a>', 'rel="noopener">Auf YouTube abonnieren</a>'),
 ('<p class="ig-text">Fight announcements, athlete reveals and fight-night moments. The LPAL 4 main event is revealed here first on 25 October.</p>',
  '<p class="ig-text">Match-Ankündigungen, neue Athleten und Momente vom Kampfabend. Der LPAL 4 Hauptkampf wird am 25. Oktober zuerst hier enthüllt.</p>'),
 ('rel="noopener">Follow on Instagram</a>', 'rel="noopener">Auf Instagram folgen</a>'),
 # road to LPAL
 ('aria-label="How to qualify for LPAL"', 'aria-label="So qualifizierst du dich für die LPAL"'),
 ('<p class="kicker">For athletes</p>', '<p class="kicker">Für Athleten</p>'),
 ('<h2 class="road-title">Road to LPAL</h2>', '<h2 class="road-title">Der Weg zur LPAL</h2>'),
 ('<p class="road-lead">Every LPAL event starts long before the lights go down. The LPAL Qualifier is open to athletes who want a place in the league.</p>',
  '<p class="road-lead">Jedes LPAL Event beginnt lange bevor die Lichter ausgehen. Der LPAL Qualifier steht allen Athleten offen, die einen Platz in der Liga wollen.</p>'),
 ('<div class="road-bar"><p>How do I qualify and get the chance to be a part of the Lion Pride?</p></div>', '<div class="road-bar"><p>Wie qualifiziere ich mich und werde Teil der Lion Pride?</p></div>'),
 ('alt="Qualifier match at the table with two referees"', 'alt="Qualifier-Match am Tisch mit zwei Schiedsrichtern"'),
 ('<span class="road-when">Morning</span>', '<span class="road-when">Vormittag</span>'),
 ('<h3>The qualifier tournament</h3>', '<h3>Das Qualifier-Turnier</h3>'),
 ('<p>On the day of every LPAL event, the LPAL Qualifier tournament starts in the morning, hours before the evening show.</p>', '<p>Am Tag jedes LPAL Events startet vormittags das LPAL Qualifier-Turnier, Stunden vor der Abendshow.</p>'),
 ('alt="A qualifier final pulled under the stage lights"', 'alt="Ein Qualifier-Finale im Bühnenlicht"'),
 ('<span class="road-when">Evening</span>', '<span class="road-when">Abend</span>'),
 ('<h3>Finals on the main show</h3>', '<h3>Finals in der Hauptshow</h3>'),
 ('<p>Depending on the event, the 1 to 3 most exciting tournament finals are selected and pulled on the main show as the event\'s opening matches.</p>',
  '<p>Je nach Event werden die 1 bis 3 spannendsten Turnierfinals ausgewählt und als Eröffnungsmatches in der Hauptshow gezogen.</p>'),
 ('alt="Two athletes pulling an opening match on the LPAL stage"', 'alt="Zwei Athleten im Eröffnungsmatch auf der LPAL Bühne"'),
 ('<span class="road-when">Qualified</span>', '<span class="road-when">Qualifiziert</span>'),
 ('<h3>Win and you\'re in</h3>', '<h3>Gewinnen und du bist dabei</h3>'),
 ('<p>Whoever wins one of those selected matches is officially qualified for the upcoming LPAL events.</p>', '<p>Wer eines dieser ausgewählten Matches gewinnt, ist offiziell für die kommenden LPAL Events qualifiziert.</p>'),
 ('<p>Want to pull at the next qualifier? Send us a message on Instagram.</p>', '<p>Du willst beim nächsten Qualifier antreten? Schreib uns auf Instagram.</p>'),
 ('rel="noopener">Message LPAL on Instagram</a>', 'rel="noopener">LPAL auf Instagram schreiben</a>'),
 # follow + footer
 ('<h2 class="follow-title">Every match. Live and free.</h2>', '<h2 class="follow-title">Jedes Match. Live und kostenlos.</h2>'),
 ('<p class="follow-text">Watch LPAL 4 in Cologne live on Kick, and catch every match from LPAL 1, 2 and 3 on YouTube.</p>', '<p class="follow-text">Sieh LPAL 4 aus Köln live auf Kick und alle Matches von LPAL 1, 2 und 3 auf YouTube.</p>'),
 ('rel="noopener">Watch on Kick</a>', 'rel="noopener">Auf Kick ansehen</a>'),
 ('rel="noopener">Replays on YouTube</a>', 'rel="noopener">Videos auf YouTube</a>'),
 ('aria-label="Back to top"', 'aria-label="Nach oben"'),
 ('aria-label="Open menu"', 'aria-label="Menü öffnen"'),
 ('aria-label="LPAL home"', 'aria-label="LPAL Startseite"'),
 ('<p class="card-label">Fight card</p>', '<p class="card-label">Fight Card</p>'),
]

out = src
for p in PAIRS:
    a, b = p[0], p[1]; n = p[2] if len(p) > 2 else 1
    c = out.count(a)
    if c != n: sys.exit(f"Not found {n}x (found {c}x): {a[:90]}")
    out = out.replace(a, b)

# event data in German
m = re.search(r'<script type="application/ld\+json">\n(.*?)\n</script>', out, re.S)
ld = json.loads(m.group(1))
for node in ld["@graph"]:
    if node.get("@type") == "SportsEvent":
        node["name"] = "LPAL 4 – Lion Pride Armwrestling League in Köln"
        node["description"] = "LPAL 4: Profi-Armwrestling live in der Motorworld Köln. 11 Matches mit Weltmeistern und Stars aus 17 Ländern, darunter der erste LPAL-Weltmeisterschaftskampf, Walkouts im WWE-Stil und ein kostenloser Livestream."
        node["url"] = "https://lpal.eu/de"; node["inLanguage"] = "de"
    if node.get("@type") == "WebSite":
        node["url"] = "https://lpal.eu/de"; node["@id"] = "https://lpal.eu/de#website"
out = out.replace(m.group(1), json.dumps(ld, ensure_ascii=False, indent=1))
# German ticket page link
n = out.count('href="tickets"')
if n != 3: sys.exit(f"Expected 3 ticket links, found {n}")
out = out.replace('href="tickets"', 'href="tickets-de"')
(ROOT / "de.html").write_text(out)
print("de.html written")

# ---------------- German tickets page: public/tickets-de.html (lpal.eu/tickets-de) ----------------
tsrc = (ROOT / "tickets.html").read_text()
TPAIRS = [
 ('<html lang="en">', '<html lang="de">'),
 ('<title>LPAL 4 Tickets | Lion Pride Armwrestling League</title>', '<title>LPAL 4 Tickets | Lion Pride Armwrestling League – Armwrestling in Köln</title>'),
 ('content="Tickets for LPAL 4, Saturday 9 January 2027, Motorworld Cologne. Pick your section on the hall map: VIP, Gold, General Access or Fan Access.">',
  'content="Tickets für LPAL 4 am Samstag, 9. Januar 2027 in der Motorworld Köln. Wähle deinen Bereich im Hallenplan: VIP, Gold, General Access oder Fan Access.">'),
 ('<meta property="og:description" content="Saturday 9 January 2027 · Motorworld Cologne. Pick your section on the hall map.">', '<meta property="og:description" content="Samstag, 9. Januar 2027 · Motorworld Köln. Wähle deinen Bereich im Hallenplan.">'),
 ('<meta property="og:url" content="https://lpal.eu/tickets">', '<meta property="og:url" content="https://lpal.eu/tickets-de">\n<meta property="og:locale" content="de_DE">'),
 ('aria-label="LPAL home"', 'aria-label="LPAL Startseite"'),
 ('<b>Sat · 9 Jan 2027 · 18:00</b><i></i><span>Motorworld Cologne<span class="t-hide-m">, Germany</span></span>', '<b>Sa. · 9. Jan. 2027 · 18:00</b><i></i><span>Motorworld Köln</span>'),
 ('<a class="t-lang" href="tickets-de" hreflang="de" lang="de" title="Deutsch">DE</a>', '<a class="t-lang" href="tickets" hreflang="en" lang="en" title="English">EN</a>'),
 ('<a class="t-back" href="/">Back to website</a>', '<a class="t-back" href="de">Zur Website</a>'),
 ('<a class="t-logo" href="/"', '<a class="t-logo" href="de"'),
 ('aria-label="LPAL 4 at Motorworld Cologne"', 'aria-label="LPAL 4 in der Motorworld Köln"'),
 ('aria-label="Motorworld Cologne from outside at sunset"', 'aria-label="Die Motorworld Köln von außen bei Sonnenuntergang"'),
 ('aria-label="Visualisation of LPAL 4 inside Motorworld: stage, table and a full crowd"', 'aria-label="Visualisierung von LPAL 4 in der Motorworld: Bühne, Tisch und volles Publikum"'),
 ('<p class="t-intro-k">Saturday · 9 January 2027 · 18:00</p>', '<p class="t-intro-k">Samstag · 9. Januar 2027 · 18:00</p>'),
 ('<p class="t-intro-h">Motorworld Cologne</p>', '<p class="t-intro-h">Motorworld Köln</p>'),
 ('<p class="t-intro-k">The arena is ready</p>', '<p class="t-intro-k">Die Arena ist bereit</p>'),
 ('<p class="t-intro-h t-intro-big">Take your seat</p>', '<p class="t-intro-h t-intro-big">Nimm Platz</p>'),
 ('<a class="t-intro-btn" href="#t-pick">Pick your seat &darr;</a>', '<a class="t-intro-btn" href="#t-pick">Bereich wählen &darr;</a>'),
 ('aria-label="Scroll down to the tickets"><span>Scroll for tickets</span>', 'aria-label="Nach unten zu den Tickets"><span>Scrollen für Tickets</span>'),
 ('<a class="t-intro-skip" href="#t-pick">Skip to tickets &darr;</a>', '<a class="t-intro-skip" href="#t-pick">Direkt zu den Tickets &darr;</a>'),
 ('<p class="t-intro-ai">Inside: AI visualisation of the planned setup</p>', '<p class="t-intro-ai">Innen: KI-Visualisierung des geplanten Aufbaus</p>'),
 ('<p class="t-note"><b>Important info:</b> no seat numbers. You book a ticket type (VIP, Gold, General Access or Fan Access) and sit anywhere in its areas, first come, first served. Prices are per ticket.</p>',
  '<p class="t-note"><b>Wichtig:</b> keine Platznummern. Du buchst eine Ticketkategorie (VIP, Gold, General Access oder Fan Access) und sitzt überall in ihren Bereichen. Wer zuerst kommt, sitzt vorne. Preise pro Ticket.</p>'),
 ('aria-label="Ticket categories"', 'aria-label="Ticketkategorien"'),
 ('aria-label="Hall map"', 'aria-label="Hallenplan"'),
 ('aria-label="LPAL 4 hall plan with the seating areas"', 'aria-label="LPAL 4 Hallenplan mit den Sitzbereichen"'),
 ('aria-label="Back to the full hall"', 'aria-label="Zurück zur ganzen Halle"'),
 ('aria-label="Zoom in"', 'aria-label="Vergrößern"'), ('aria-label="Zoom out"', 'aria-label="Verkleinern"'), ('aria-label="Show the whole hall"', 'aria-label="Ganze Halle zeigen"'),
 ('<p class="t-hint" id="t-hint">Tap an area to zoom in</p>', '<p class="t-hint" id="t-hint">Bereich antippen zum Vergrößern</p>'),
 ('<span>Buy</span><span></span></button>', '<span>Kaufen</span><span></span></button>'),
 ('aria-label="Main view towards the stage">', 'aria-label="Hauptblick zur Bühne">'),
 ('alt="Visualisation of the LPAL 4 setup: stage with the table in the middle, chairs on the floor and a raised tribune">', 'alt="Visualisierung von LPAL 4: Bühne mit Tisch in der Mitte, Stühle auf dem Boden und erhöhte Tribüne">'),
 ('<p><b>Main view</b>Looking towards the stage · AI visualisation of the planned setup. The real hall, lights and layout can differ.</p>', '<p><b>Hauptblick</b>Blick zur Bühne · KI-Visualisierung des geplanten Aufbaus. Halle, Licht und Aufbau können in Wirklichkeit abweichen.</p>'),
 ('aria-label="Close"', 'aria-label="Schließen"', 2),
]
tout = tsrc
for p in TPAIRS:
    a, b = p[0], p[1]; n = p[2] if len(p) > 2 else 1
    c = tout.count(a)
    if c != n: sys.exit(f"tickets: not found {n}x (found {c}x): {a[:90]}")
    tout = tout.replace(a, b)
(ROOT / "tickets-de.html").write_text(tout)
print("tickets-de.html written")
