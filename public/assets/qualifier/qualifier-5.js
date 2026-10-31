/* LPAL Qualifier presented by TitanGrip: registration page */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var ENTRY = { none: 60, fan: 50, ga: 45, gold: 40, vip: 30 }, ONE_ARM_OFF = 10;
  var TICKET = { fan: 30, ga: 35, gold: 60, vip: 90 };
  var TIER_EN = { fan: "Fan", ga: "General", gold: "Gold", vip: "VIP" };
  function entryFor(tier, arms) { return ENTRY[tier] - (arms && arms !== "both" ? ONE_ARM_OFF : 0); }
  var CLASSES = { senior: ["-77", "-85", "-95", "-110", "+110"], amateur: ["-80", "+80"], women: ["-60", "-70", "+70"] };
  var EVENT_DAY = [2027, 1, 9];

  /* ---------- German texts (English is in the HTML) ---------- */
  var DE = {
    nav_register: "Anmelden",
    hero_kicker: "Samstag · 9. Januar 2027 · MOTORWORLD Köln",
    hero_title: "Qualifier-Turnier",
    presented: "präsentiert von",
    hero_lead: "Zieh dich auf die LPAL 4 Bühne. Unser Scouting-Team wählt 4 Athleten aus dem Turnier für Super Matches in den Prelims der Abendshow.",
    f_start_k: "Start", f_start: "11:30 Uhr",
    f_end_k: "Ende", f_end: "ca. 15:00–16:00 Uhr",
    f_where_k: "Ort",
    f_live_k: "Live", f_live: "auf unserem Kick-Kanal",
    hero_btn: "Jetzt anmelden",
    prize_kicker: "Worum es geht",
    prize_title: "Vom Turnier auf die LPAL 4 Bühne",
    prize_big: "Athleten kommen in die Prelims von LPAL 4",
    prize_p1: "Unser Scouting-Team schaut sich das ganze Turnier an und wählt 4 Athleten für Super Matches in den Prelims der LPAL 4 Abendshow.",
    prize_p2: "Das kann ein Turnierfinale sein oder die Sieger zweier verschiedener Gewichtsklassen, zum Beispiel der Sieger der −85 kg gegen den Sieger der −95 kg. Das Scouting-Team entscheidet am Tag des Events.",
    prize_p3: "Nur die Senior-Klassen der Männer und die Frauenklassen können sich später für die Liga qualifizieren.",
    sch_kicker: "Ablauf",
    sch_title: "Wiegen und Turnier",
    sch_fri_d: "Fr · 8. Jan 2027 · 18:00–21:00", sch_fri_h: "Wiegen im Hotel",
    sch_sat_d: "Sa · 9. Jan 2027 · 09:00–11:00", sch_sat_h: "Wiegen in der Halle", sch_tol: "1 kg Toleranz nur an diesem Tag",
    sch_start_d: "Sa · 9. Jan 2027 · 11:30", sch_start_h: "Turnierstart", sch_start_p: "Ende ca. 15:00–16:00 · live auf Kick",
    sch_eve_d: "Sa · 9. Jan 2027 · 18:00", sch_eve_h: "LPAL 4 Abendshow", sch_eve_p: "Die 4 ausgewählten Athleten ziehen ihre Super Matches in den Prelims.",
    cls_kicker: "Kategorien",
    cls_title: "Gewichtsklassen · linker und rechter Arm",
    div_senior: "Senior Männer", div_women: "Frauen", div_amateur: "Amateur Männer",
    cls_can_q: "Kann sich für die Liga qualifizieren",
    cls_women_note: "Noch nicht final. Schreib uns im Kommentarfeld, welche Klasse zu dir passt.",
    price_title: "Startgebühr",
    arm_one: "Ein Arm", arm_both: "Beide Arme", arm_left: "Linker Arm", arm_right: "Rechter Arm",
    with_ticket: "mit einem LPAL 4 Event-Ticket",
    tix_k: "Bleib zur Abendshow",
    tix_p: "Kauf zuerst dein LPAL 4 Ticket und spar bis zu 10 € bei der Startgebühr. Wir finden dein Ticket automatisch über deine E-Mail.",
    tix_btn: "LPAL 4 Ticket holen",
    rules_kicker: "Gut zu wissen",
    rules_title: "Regeln",
    rule_heavy: "<b>Zu schwer?</b> Wenn du mehr wiegst als deine Klasse erlaubt, startest du in der nächstschwereren Klasse.",
    rule_tol: "<b>Toleranz:</b> 1 kg, nur beim Wiegen am Samstag in der Halle. Am Freitag im Hotel gibt es keine Toleranz.",
    rule_age: "<b>Kein Mindestalter.</b> Unter 18 braucht ein Elternteil oder eine erziehungsberechtigte Person (18+), die für dich unterschreibt.",
    rule_id: "<b>Bring deinen Ausweis</b> zum Wiegen mit.",
    rule_refund: "<b>Rückerstattung:</b> wird noch festgelegt.",
    form_kicker: "Online-Anmeldung",
    form_title: "Melde dich zum Qualifier an",
    cancelled: "Zahlung abgebrochen. Es wurde nichts abgebucht. Du kannst es unten erneut versuchen.",
    lg_you: "Über dich",
    l_first: "Vorname", l_last: "Nachname", l_email: "E-Mail", l_dob: "Geburtsdatum", l_country: "Land",
    l_insta: "Instagram", l_club: "Verein oder Team", optional: "(optional)",
    lg_guardian: "Elternteil oder Erziehungsberechtigte(r)",
    guardian_help: "Der Athlet ist am Turniertag unter 18. Deshalb muss ein Elternteil oder eine erziehungsberechtigte Person (18+) für ihn unterschreiben.",
    l_gname: "Name des Elternteils / Erziehungsberechtigten", l_gemail: "E-Mail des Elternteils / Erziehungsberechtigten",
    guardian_consent: "Ich bin Elternteil oder erziehungsberechtigt (18+) für diesen Athleten. Ich erlaube die Teilnahme und akzeptiere die Regeln in seinem Namen.",
    lg_cat: "Kategorie", l_class: "Gewichtsklasse", l_arms: "Arm",
    pick_div_first: "Wähle zuerst eine Kategorie.",
    women_hint: "Die Frauenklassen sind noch nicht final. Wähle die passendste und schreib uns unten im Kommentarfeld, welche Klassen für dich passen würden.",
    lg_ticket: "Abend-Ticket für LPAL 4",
    tk_idle: "Gib oben deine E-Mail ein, wir prüfen dein Ticket automatisch.",
    tk_other: "Ticket mit einer anderen E-Mail gekauft? Ticketcode eingeben",
    tk_buy: "Noch kein Ticket? Hol dir eins und spar bis zu 10 €",
    l_code: "Ticketcode (steht in deiner Ticket-E-Mail)",
    tk_check: "Prüfen",
    lg_comment: "Fragen oder Wünsche",
    comment_help: "Möchtest du uns etwas sagen oder fragen? Schreib es hier.",
    accept: "Ich nehme auf eigene Verantwortung teil und akzeptiere die Turnier- und Wiegeregeln. Ich bin einverstanden, dass die LPAL das Turnier filmt und fotografiert und die Aufnahmen nutzt, auch im Livestream auf Kick.",
    sum_k: "Du zahlst",
    submit: "Weiter zur Zahlung",
    secure: "Sichere Zahlung mit Stripe: Karte, Apple Pay, Google Pay und mehr. Deine Daten werden nur für die Organisation des Turniers verwendet.",
    done_title: "Du bist angemeldet!",
    done_p1: "Du bekommst eine Zahlungsbestätigung per E-Mail. Komm mit deinem Ausweis zu einem der Wiegetermine:",
    done_fri: "Fr 8. Jan, 18:00–21:00 · V8 Hotel Köln @ MOTORWORLD",
    done_sat: "Sa 9. Jan, 09:00–11:00 · MOTORWORLD (1 kg Toleranz)",
    done_tix: "Bring deine Leute mit: Freunde und Familie können dir zuschauen und danach zur LPAL 4 Abendshow bleiben.",
    done_tix_btn: "Tickets für LPAL 4",
    checking_pay: "Wir prüfen deine Zahlung…",
    ask_k: "Fragen?", ask_p: "Schreib uns auf Instagram oder per E-Mail.",
    pt_title: "Startgebühr:", pt_sub: "Kauf ein Abend-Ticket dazu und dein Start wird günstiger.",
    pt_th1: "Abend-Ticket", pt_th2: "LPAL 4 Ticket", pt_th3: "Turnier-Start", pt_th4: "Du zahlst", pt_none: "Kein Ticket",
    plan_note: "Wo du mit welchem LPAL 4 Ticket sitzt",
    pt_arm: "<b>Nur ein Arm?</b> Dein Turnier-Start kostet 10 € weniger. Die Preise oben gelten für beide Arme.",
    why_hall: "<b>Nach dem Turnier wird die Halle geräumt.</b> Eine Stunde später öffnen die Türen für LPAL 4, und nur wer ein Abend-Ticket hat, kommt wieder rein.",
    why_have: "<b>Du hast schon ein Ticket?</b> Gib im Formular deine E-Mail ein. Wir finden dein Ticket automatisch und du bekommst denselben Preis für den Turnier-Start.",
    why_picked: "<b>Für ein Super Match ausgewählt?</b> Wir erstatten dir Startgebühr und Abend-Ticket.",
    why_fair: "Dein Ticket hat keinen Einfluss auf die Auslosung oder das Scouting.",
    show_help: "Nach dem Turnier wird die Halle geräumt. Mit einem Abend-Ticket kommst du zur LPAL 4 Show wieder rein, und dein Start wird günstiger.",
    show_have: "Ich habe schon ein LPAL 4 Ticket", show_have_p: "Wir prüfen es über deine E-Mail",
    show_none: "Kein Abend-Ticket", show_none_p: "Nur Turnier, nach dem Turnier musst du gehen"
  };
  var MSG = {
    en: {
      tk_checking: "Checking your LPAL 4 ticket…",
      tk_found: "{tier} ticket found. Your tournament entry: €{price}.",
      tk_found_n: "{n} free LPAL 4 tickets found. Using your {tier} ticket, tournament entry: €{price}.",
      ticket_plus: "LPAL 4 ticket €{t} + tournament entry €{e}",
      plan_cap: "Your seats with a {tier} ticket",
      sum_entry: "Tournament entry",
      entry_only: "Entry €{e}",
      have_entry: "Your {tier} ticket · tournament entry €{e}",
      e_have: "We couldn't find your LPAL 4 ticket. Check your email or ticket code, or pick another option.",
      e_sold_out: "This ticket category is sold out. Please pick another one.",
      done_ticket: "Your {tier} evening ticket: <b>{code}</b>. Show it at the entrance.",
      done_ticket_wait: "Your {tier} evening ticket is being issued and will be sent to {email}.",
      sum_ticket: "LPAL 4 ticket ({tier})",
      tk_none: "No LPAL 4 ticket found with this email.",
      tk_none_code: "We couldn't find this ticket code. Check the code in your ticket email, or register at the normal price.",
      tk_used: "This ticket has already been used for a discount.",
      tk_used_email: "The LPAL 4 tickets of this email have already been used for a discount.",
      tk_error: "We couldn't check tickets right now. Try again in a minute, or register at the normal price.",
      tk_off: "The ticket check is not connected yet.",
      sum_pick: "Pick your category, arm and evening ticket",
      sum_disc: "LPAL 4 ticket discount",
      e_fields: "Please fill in the marked fields.",
      e_ticket_used: "This ticket was just used for another registration. We removed the discount, please check the price and try again.",
      e_ticket_nf: "We couldn't confirm your ticket. We removed the discount, please check the price and try again.",
      e_pay: "Payment is not available right now. Please try again in a few minutes.",
      e_off: "Online payment is not connected yet (test version).",
      e_net: "Connection problem. Please try again.",
      test: "Test version · Stripe test mode · no real payments",
      off: "Test version · payment not connected yet",
      paying: "Opening payment…",
      done_sum: "{div} {cls} kg · {arms} · €{amt}",
      not_paid: "We couldn't confirm the payment yet. If you paid, refresh this page in a minute."
    },
    de: {
      tk_checking: "Wir prüfen dein LPAL 4 Ticket…",
      tk_found: "{tier} Ticket gefunden. Dein Turnier-Start: {price} €.",
      tk_found_n: "{n} freie LPAL 4 Tickets gefunden. Mit deinem {tier} Ticket kostet der Turnier-Start {price} €.",
      ticket_plus: "LPAL 4 Ticket {t} € + Turnier-Start {e} €",
      plan_cap: "Deine Plätze mit einem {tier} Ticket",
      sum_entry: "Turnier-Start",
      entry_only: "Start {e} €",
      have_entry: "Dein {tier} Ticket · Turnier-Start {e} €",
      e_have: "Wir haben dein LPAL 4 Ticket nicht gefunden. Prüf deine E-Mail oder den Ticketcode, oder wähle eine andere Option.",
      e_sold_out: "Diese Ticketkategorie ist ausverkauft. Bitte wähle eine andere.",
      done_ticket: "Dein {tier} Abend-Ticket: <b>{code}</b>. Zeig es am Eingang.",
      done_ticket_wait: "Dein {tier} Abend-Ticket wird ausgestellt und an {email} geschickt.",
      sum_ticket: "LPAL 4 Ticket ({tier})",
      tk_none: "Kein LPAL 4 Ticket mit dieser E-Mail gefunden.",
      tk_none_code: "Diesen Ticketcode haben wir nicht gefunden. Prüf den Code in deiner Ticket-E-Mail oder melde dich zum normalen Preis an.",
      tk_used: "Dieses Ticket wurde schon für einen Rabatt verwendet.",
      tk_used_email: "Die LPAL 4 Tickets dieser E-Mail wurden schon für einen Rabatt verwendet.",
      tk_error: "Wir können die Tickets gerade nicht prüfen. Versuch es gleich nochmal oder melde dich zum normalen Preis an.",
      tk_off: "Die Ticketprüfung ist noch nicht verbunden.",
      sum_pick: "Wähle Kategorie, Arm und Abend-Ticket",
      sum_disc: "LPAL 4 Ticket-Rabatt",
      e_fields: "Bitte fülle die markierten Felder aus.",
      e_ticket_used: "Dieses Ticket wurde gerade für eine andere Anmeldung verwendet. Wir haben den Rabatt entfernt, prüf den Preis und versuch es nochmal.",
      e_ticket_nf: "Wir konnten dein Ticket nicht bestätigen. Wir haben den Rabatt entfernt, prüf den Preis und versuch es nochmal.",
      e_pay: "Die Zahlung ist gerade nicht verfügbar. Bitte versuch es in ein paar Minuten nochmal.",
      e_off: "Die Online-Zahlung ist noch nicht verbunden (Testversion).",
      e_net: "Verbindungsproblem. Bitte versuch es nochmal.",
      test: "Testversion · Stripe Testmodus · keine echten Zahlungen",
      off: "Testversion · Zahlung noch nicht verbunden",
      paying: "Zahlung wird geöffnet…",
      done_sum: "{div} {cls} kg · {arms} · {amt} €",
      not_paid: "Wir konnten die Zahlung noch nicht bestätigen. Wenn du bezahlt hast, lade die Seite in einer Minute neu."
    }
  };

  var params = new URLSearchParams(location.search);
  var lang = params.get("lang") === "de" ? "de" : (params.get("lang") === "en" ? "en" : ((navigator.language || "").toLowerCase().indexOf("de") === 0 ? "de" : "en"));
  var EN = {};
  $$("[data-t]").forEach(function (el) { if (!(el.dataset.t in EN)) EN[el.dataset.t] = el.innerHTML; });
  function m(k, vars) { var s = MSG[lang][k] || MSG.en[k] || k; for (var v in vars) s = s.split("{" + v + "}").join(vars[v]); return s; }
  function text(k) { return lang === "de" && DE[k] ? DE[k] : EN[k]; }

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-t]").forEach(function (el) { var v = text(el.dataset.t); if (v != null) el.innerHTML = v; });
    $("#q-lang").textContent = lang === "de" ? "EN" : "DE";
    $("#q-lang").setAttribute("aria-label", lang === "de" ? "English" : "Deutsch");
    renderClasses(); updateSummary(); renderTicket(); renderBar();
  }

  /* ---------- config: test mode / connected? ---------- */
  var cfg = { payments: "off", tickets: false };
  function renderBar() {
    var bar = $("#q-testbar");
    if (cfg.payments === "live") { bar.hidden = true; return; }
    bar.hidden = false;
    bar.className = "q-testbar" + (cfg.payments === "off" ? " off" : "");
    bar.textContent = m(cfg.payments === "off" ? "off" : "test");
  }

  /* ---------- form logic ---------- */
  var form = $("#q-form");
  var tk = { state: "idle", available: 0, code: "", via: "", tier: null };

  function val(name) { var el = form.elements[name]; if (!el) return ""; if (el.length && !el.tagName) { var c = $$("input[name=" + name + "]:checked", form)[0]; return c ? c.value : ""; } return el.type === "checkbox" ? el.checked : el.value.trim(); }

  function renderClasses() {
    var div = val("division"), box = $("#q-classes"), cur = val("weight_class");
    if (!div) { box.innerHTML = '<p class="q-help">' + text("pick_div_first") + "</p>"; $("#q-women-hint").hidden = true; return; }
    box.innerHTML = CLASSES[div].map(function (c) {
      var label = c.replace("-", "−") + " kg";
      return '<label><input type="radio" name="weight_class" value="' + c + '"' + (c === cur ? " checked" : "") + "><span>" + label + "</span></label>";
    }).join("");
    $("#q-women-hint").hidden = div !== "women";
    var help = $("#q-comment-help");
    help.innerHTML = div === "women"
      ? (lang === "de" ? "Passen die Frauenklassen für dich? Welche Klassen würdest du dir wünschen? Fragen? Schreib es hier." : "Do the women's classes suit you? Which classes would you like? Any questions? Write them here.")
      : text("comment_help");
  }

  function ageOnEvent(dob) {
    var p = dob.split("-").map(Number); if (p.length !== 3 || !p[0]) return null;
    var a = EVENT_DAY[0] - p[0];
    if (EVENT_DAY[1] < p[1] || (EVENT_DAY[1] === p[1] && EVENT_DAY[2] < p[2])) a--;
    return a;
  }
  function updateGuardian() {
    var a = ageOnEvent(val("dob") || "");
    $("#q-guardian").hidden = !(a !== null && a < 18 && a >= 0);
  }

  function hasDiscount() { return tk.state === "found"; }
  function currentTier() {
    var show = val("show");
    if (TICKET[show]) return show;
    if (show === "none") return "none";
    if (show === "have") return hasDiscount() ? tk.tier : null;
    return null;
  }
  function renderShows() {
    var arms = val("arms");
    Object.keys(TICKET).forEach(function (t) {
      var e = entryFor(t, arms);
      $('[data-show="' + t + '"]').textContent = m("ticket_plus", { t: TICKET[t], e: e }).replace(/€(\d+)/g, function (_, n) { return money(n); }).replace(/(\d+) €/g, "$1 €");
      $('[data-total="' + t + '"]').textContent = money(TICKET[t] + e);
    });
    $('[data-total="none"]').textContent = money(entryFor("none", arms));
    if (hasDiscount()) {
      var e = entryFor(tk.tier, arms);
      $("#q-have-p").textContent = m("have_entry", { tier: TIER_EN[tk.tier], e: e });
      $("#q-have-t").textContent = money(e);
    } else { $("#q-have-p").innerHTML = text("show_have_p"); $("#q-have-t").textContent = ""; }
    $("#q-tk").hidden = val("show") !== "have";
    // hall plan: where you sit with the chosen ticket
    var sh = val("show"), pt = TICKET[sh] ? sh : (sh === "have" && hasDiscount() ? tk.tier : null), fig = $("#q-plan-pick");
    fig.hidden = !pt;
    if (pt) { var src = "assets/qualifier/plan/plan-" + pt + ".webp"; if ($("#q-plan-img").getAttribute("src") !== src) $("#q-plan-img").setAttribute("src", src);
      $("#q-plan-img").alt = m("plan_cap", { tier: TIER_EN[pt] }); $("#q-plan-cap").textContent = m("plan_cap", { tier: TIER_EN[pt] }); }
  }
  function updateSummary() {
    renderShows();
    var arms = val("arms"), div = val("division"), cls = val("weight_class"), tier = currentTier();
    var line = $("#q-sum-line"), n = $("#q-sum-n");
    if (!arms || !tier) { line.textContent = m("sum_pick"); n.textContent = lang === "de" ? "– €" : "€–"; return; }
    var entry = entryFor(tier, arms), ticket = TICKET[val("show")] || 0;
    var first = [];
    if (div) first.push(text("div_" + div) + (cls ? " " + cls.replace("-", "−") + " kg" : ""));
    first.push(text("arm_" + arms));
    var html = esc(m("sum_entry") + " · " + first.join(" · ")) + ": " + money(entry);
    if (ticket) html += "<br>" + esc(m("sum_ticket", { tier: TIER_EN[val("show")] })) + ": " + money(ticket);
    line.innerHTML = html;
    n.textContent = money(entry + ticket);
  }
  function money(v) { return lang === "de" ? v + " €" : "€" + v; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- ticket check ---------- */
  var lastEmail = "", tkTimer = 0, tkSeq = 0;
  function renderTicket() {
    var box = $("#q-tk"), msg = $("#q-tk-msg");
    box.dataset.state = tk.state;
    if (tk.state === "idle") msg.innerHTML = text("tk_idle");
    else if (tk.state === "checking") msg.textContent = m("tk_checking");
    else if (tk.state === "found") { var pr = entryFor(tk.tier, val("arms")); msg.textContent = tk.available > 1 ? m("tk_found_n", { n: tk.available, tier: TIER_EN[tk.tier], price: pr }) : m("tk_found", { tier: TIER_EN[tk.tier], price: pr }); }
    else if (tk.state === "none") msg.textContent = m(tk.via === "code" ? "tk_none_code" : "tk_none");
    else if (tk.state === "used") msg.textContent = m(tk.via === "code" ? "tk_used" : "tk_used_email");
    else if (tk.state === "error") msg.textContent = m("tk_error");
    else if (tk.state === "off") msg.textContent = m("tk_off");
    $("#q-tk-actions").hidden = tk.state === "found" && tk.via === "email";
  }
  function setTk(s) { for (var k in s) tk[k] = s[k]; renderTicket(); updateSummary(); }

  function checkTicket(body, via) {
    if (!cfg.tickets) { setTk({ state: "off", via: via }); return; }
    var seq = ++tkSeq;
    setTk({ state: "checking", via: via });
    fetch("/api/qualifier/ticket", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (seq !== tkSeq) return;
        if (d.error) return setTk({ state: d.error === "not_ready" ? "off" : "error" });
        if (d.available > 0) {
          // ticket found: pre-select "I already have a ticket" if nothing is chosen yet
          var cur = val("show");
          if (!cur) { var r = $('input[name=show][value=have]', form); r.checked = true; }
          setTk({ state: "found", available: d.available, code: body.code || "", tier: d.tier || "ga" });
        }
        else setTk({ state: d.found ? "used" : "none", available: 0, code: "", tier: null });
      })
      .catch(function () { if (seq === tkSeq) setTk({ state: "error" }); });
  }
  function onEmail() {
    var e = (form.elements.email.value || "").trim().toLowerCase();
    if (e === lastEmail) return;
    lastEmail = e;
    if (tk.via === "code" && tk.state === "found") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) { tkSeq++; setTk({ state: "idle", via: "", code: "" }); return; }
    checkTicket({ email: e }, "email");
  }
  form.elements.email.addEventListener("input", function () { clearTimeout(tkTimer); tkTimer = setTimeout(onEmail, 700); });
  form.elements.email.addEventListener("blur", function () { clearTimeout(tkTimer); onEmail(); });
  $("#q-tk-codebtn").addEventListener("click", function () { $("#q-tk-code").hidden = false; $("#q-code").focus(); });
  function codeGo() {
    var c = $("#q-code").value.replace(/\s+/g, "");
    if (c.length < 4) { $("#q-code").classList.add("is-bad"); return; }
    $("#q-code").classList.remove("is-bad");
    checkTicket({ code: c }, "code");
  }
  $("#q-code-go").addEventListener("click", codeGo);
  $("#q-code").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); codeGo(); } });

  /* ---------- events ---------- */
  form.addEventListener("change", function (e) {
    var n = e.target.name;
    if (n === "division") renderClasses();
    if (n === "dob") updateGuardian();
    if (n === "show" || n === "arms") renderTicket();
    clearBad(e.target);
    updateSummary();
  });
  form.elements.dob.addEventListener("input", updateGuardian);
  form.addEventListener("input", function (e) { clearBad(e.target); });
  function clearBad(el) {
    var f = el.closest(".is-bad"); if (f) f.classList.remove("is-bad");
    if (!$(".is-bad", form)) $("#q-err").hidden = true;
  }

  function fieldBox(name) {
    var el = form.elements[name];
    if (name === "division") return $("#q-div");
    if (name === "weight_class") return $("#q-classes");
    if (name === "arms") return $(".q-seg-arms");
    if (name === "show") return $("#q-shows");
    if (!el) return null;
    return el.closest(".q-field") || el.closest(".q-check") || el;
  }
  function showErr(msg, fields) {
    $$(".is-bad", form).forEach(function (x) { x.classList.remove("is-bad"); });
    (fields || []).forEach(function (f) { var b = fieldBox(f); if (b) b.classList.add("is-bad"); });
    var box = $("#q-err"); box.textContent = msg; box.hidden = false;
    var first = $(".is-bad", form) || box;
    first.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function localCheck() {
    var bad = [];
    ["first_name", "last_name", "country"].forEach(function (k) { if (!val(k)) bad.push(k); });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("email"))) bad.push("email");
    var a = ageOnEvent(val("dob") || "");
    if (a === null || a < 8 || a > 90) bad.push("dob");
    if (!val("division")) bad.push("division");
    else if (!val("weight_class")) bad.push("weight_class");
    if (!val("arms")) bad.push("arms");
    if (!val("show")) bad.push("show");
    if (a !== null && a < 18) {
      if (!val("guardian_name")) bad.push("guardian_name");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("guardian_email"))) bad.push("guardian_email");
      if (!val("guardian_consent")) bad.push("guardian_consent");
    }
    if (!val("accept_rules")) bad.push("accept_rules");
    return bad;
  }

  var busy = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    var bad = localCheck();
    if (bad.length) return showErr(m("e_fields"), bad);
    if (val("show") === "have" && !hasDiscount()) return showErr(m("e_have"));
    if (cfg.payments === "off") return showErr(m("e_off"));
    var body = {
      lang: lang, first_name: val("first_name"), last_name: val("last_name"), email: val("email"), dob: val("dob"),
      country: val("country"), instagram: val("instagram"), club: val("club"), division: val("division"),
      weight_class: val("weight_class"), arms: val("arms"), guardian_name: val("guardian_name"), guardian_email: val("guardian_email"),
      guardian_consent: !!val("guardian_consent"), accept_rules: !!val("accept_rules"), comment: form.elements.comment.value,
      show: val("show"), code: val("show") === "have" && tk.via === "code" ? tk.code : ""
    };
    busy = true;
    var btn = $("#q-submit"); btn.disabled = true; btn.firstElementChild.textContent = m("paying");
    fetch("/api/qualifier/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d.url) { location.href = res.d.url; return; }
        busy = false; btn.disabled = false; btn.firstElementChild.textContent = text("submit");
        var err = res.d.error;
        if (err === "invalid") showErr(m("e_fields"), res.d.fields);
        else if (err === "ticket_used" || err === "ticket_not_found") { setTk({ state: err === "ticket_used" ? "used" : "none", available: 0 }); showErr(m(err === "ticket_used" ? "e_ticket_used" : "e_ticket_nf")); }
        else if (err === "not_ready") showErr(m("e_off"));
        else if (err === "sold_out") showErr(m("e_sold_out"), ["show"]);
        else showErr(m("e_pay"));
      })
      .catch(function () { busy = false; btn.disabled = false; btn.firstElementChild.textContent = text("submit"); showErr(m("e_net")); });
  });

  /* ---------- return from Stripe ---------- */
  function afterPayment(sid) {
    form.hidden = true; $("#q-checking").hidden = false;
    $("#register").scrollIntoView();
    var tries = 0;
    (function poll() {
      fetch("/api/qualifier/status?session_id=" + encodeURIComponent(sid)).then(function (r) { return r.json(); }).then(function (d) {
        if (d.paid) {
          $("#q-checking").hidden = true; $("#q-done").hidden = false;
          $("#q-done-sum").textContent = m("done_sum", { div: text("div_" + d.division), cls: String(d.weight_class).replace("-", "−"), arms: text("arm_" + d.arms), amt: (d.amount / 100).toFixed(0) });
          $("#q-done").dataset.ok = "1";
          var tl = $("#q-done-ticket");
          if (d.ticket_code) { tl.innerHTML = m("done_ticket", { tier: TIER_EN[d.show], code: esc(d.ticket_code) }); tl.hidden = false; }
          else if (d.ticket_pending) { tl.textContent = m("done_ticket_wait", { tier: TIER_EN[d.show], email: d.email }); tl.hidden = false; }
        } else if (++tries < 6) setTimeout(poll, 2000);
        else { $("#q-checking").textContent = m("not_paid"); }
      }).catch(function () { if (++tries < 6) setTimeout(poll, 2000); else $("#q-checking").textContent = m("not_paid"); });
    })();
  }

  /* ---------- countries for autocomplete ---------- */
  var COUNTRIES = "Albania,Armenia,Austria,Azerbaijan,Belarus,Belgium,Bosnia and Herzegovina,Brazil,Bulgaria,Canada,Croatia,Cyprus,Czech Republic,Denmark,Egypt,Estonia,Finland,France,Georgia,Germany,Greece,Hungary,Iceland,India,Iran,Ireland,Israel,Italy,Ivory Coast,Kazakhstan,Kosovo,Kyrgyzstan,Latvia,Lebanon,Liechtenstein,Lithuania,Luxembourg,Malta,Moldova,Montenegro,Morocco,Netherlands,North Macedonia,Norway,Poland,Portugal,Romania,Russia,Serbia,Slovakia,Slovenia,Spain,Sweden,Switzerland,Tunisia,Turkey,Ukraine,United Kingdom,United States,Uzbekistan";
  $("#q-countries").innerHTML = COUNTRIES.split(",").map(function (c) { return '<option value="' + c + '">'; }).join("");

  $("#q-lang").addEventListener("click", function () {
    lang = lang === "de" ? "en" : "de";
    var u = new URL(location.href); u.searchParams.set("lang", lang); history.replaceState(null, "", u);
    applyLang();
  });

  applyLang();
  fetch("/api/qualifier/config").then(function (r) { return r.json(); }).then(function (d) {
    cfg = d; renderBar(); if (tk.state === "off" && cfg.tickets) { lastEmail = ""; onEmail(); }
  }).catch(function () { renderBar(); });

  if (params.get("paid")) afterPayment(params.get("paid"));
  if (params.get("cancelled")) $("#q-cancelled").hidden = false;
})();
