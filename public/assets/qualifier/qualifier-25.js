/* LPAL Qualifier presented by TitanGrip: registration page */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var ENTRY = { none: 60, fan: 50, ga: 50, gold: 40, vip: 30 }, ONE_ARM_OFF = 20;
  var TICKET = { fan: 30, ga: 35, gold: 60, vip: 90 };
  var TIER_EN = { fan: "Fan", ga: "General", gold: "Gold", vip: "VIP" };
  function entryFor(tier, arms) { return ENTRY[tier] - (arms && arms !== "both" ? ONE_ARM_OFF : 0); }
  var CLASSES = { senior: ["-77", "-85", "-95", "-110", "+110"], amateur: ["-80", "+80"], women: ["-60", "-70", "+70"] };
  var EVENT_DAY = [2027, 1, 9];

  var MSG = {
    en: {
      comment_help_women: "Do the women's classes suit you? Which classes would you like? Any questions? Write them here.",
      tk_checking: "Checking your LPAL 4 ticket…",
      tk_found: "{tier} ticket found. Your tournament entry: €{price}.",
      tk_found_n: "{n} free LPAL 4 tickets found. Using your {tier} ticket, tournament entry: €{price}.",
      ticket_plus: "LPAL 4 ticket €{t} + tournament entry €{e}",
      plan_cap: "Your seats with a {tier} ticket",
      b_name: "{tier} bundle", b_what: "Tournament entry + {tier} ticket", b_instead: "instead of {sum}", b_save: "You save {s}",
      b_detail: "{e} entry + {t} ticket", b_entry: "Tournament entry {e}", b_card: "Tournament entry + {tier} ticket", b_card_save: "instead of {sum} · save {s}",
      have_line: "<b>Already bought an LPAL 4 ticket?</b> You still get the bundle price and only pay the rest as tournament entry: {list}. We find your ticket by your email.",
      sum_bundle: "{tier} bundle: tournament entry + LPAL 4 ticket", sum_instead: "instead of {sum}, you save {s}",
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
    }
  };

  var params = new URLSearchParams(location.search);
  // languages: English is built into the page, the others load from assets/qualifier/i18n/<code>.json
  var LANGS = [["en", "English"], ["de", "Deutsch"], ["fr", "Français"], ["it", "Italiano"], ["pl", "Polski"], ["cs", "Čeština"], ["sk", "Slovenčina"],
    ["sr", "Srpski"], ["uk", "Українська"], ["ru", "Русский"], ["ka", "ქართული"]];
  var I18N_V = "2";
  var CODES = LANGS.map(function (l) { return l[0]; });
  function pickLang() {
    var q = (params.get("lang") || "").toLowerCase();
    if (CODES.indexOf(q) > -1) return q;
    var nav = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < nav.length; i++) {
      var c = String(nav[i] || "").toLowerCase().split("-")[0];
      if (c === "hr" || c === "bs" || c === "me" || c === "sh") c = "sr";
      if (CODES.indexOf(c) > -1) return c;
    }
    return "en";
  }
  var lang = pickLang();
  var L = { t: {}, m: {} }, CACHE = {};
  var EN = {};
  $$("[data-t]").forEach(function (el) { if (!(el.dataset.t in EN)) EN[el.dataset.t] = el.innerHTML; });
  function m(k, vars) { var s = (lang !== "en" && L.m[k]) || MSG.en[k] || k; for (var v in vars) s = s.split("{" + v + "}").join(vars[v]); return s; }
  function text(k) { return lang !== "en" && L.t[k] ? L.t[k] : EN[k]; }
  function loadLang(code, done) {
    if (code === "en") { L = { t: {}, m: {} }; return done(); }
    if (CACHE[code]) { L = CACHE[code]; return done(); }
    fetch("assets/qualifier/i18n/" + code + ".json?v=" + I18N_V).then(function (r) { return r.json(); })
      .then(function (d) { CACHE[code] = { t: d.t || {}, m: d.m || {} }; L = CACHE[code]; done(); })
      .catch(function () { lang = "en"; L = { t: {}, m: {} }; done(); });
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-t]").forEach(function (el) { var v = text(el.dataset.t); if (v != null) el.innerHTML = v; });
    $("#q-lang").value = lang;
    var pl = $("#q-pol-lang"); pl.hidden = lang === "en" || !L.t.pol_en; pl.textContent = L.t.pol_en || "";
    $$(".q-show-n[data-bname]").forEach(function (b) { b.textContent = m("b_name", { tier: TIER_EN[b.dataset.bname] }); });
    renderClasses(); updateSummary(); renderTicket(); renderBar(); renderPrices(); showPlan();
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
      ? m("comment_help_women")
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
      $('[data-show="' + t + '"]').textContent = m("b_card", { tier: TIER_EN[t] });
      $('[data-total="' + t + '"]').textContent = money(TICKET[t] + e);
      $('[data-save="' + t + '"]').textContent = m("b_card_save", { sum: money(TICKET[t] + entryFor("none", arms)), s: money(entryFor("none", arms) - e) });
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
    if (!arms || !tier) { line.textContent = m("sum_pick"); n.textContent = lang === "en" ? "€–" : "– €"; return; }
    var entry = entryFor(tier, arms), ticket = TICKET[val("show")] || 0;
    var first = [];
    if (div) first.push(text("div_" + div) + (cls ? " " + cls.replace("-", "−") + " kg" : ""));
    first.push(text("arm_" + arms));
    var html;
    if (ticket) {
      var full = entryFor("none", arms) + ticket;
      html = "<b>" + esc(m("sum_bundle", { tier: TIER_EN[val("show")] })) + "</b><br>" + esc(first.join(" · ")) +
        '<br><span class="q-sum-save">' + esc(m("sum_instead", { sum: money(full), s: money(full - entry - ticket) })) + "</span>";
    } else html = esc(m("sum_entry") + " · " + first.join(" · ")) + ": " + money(entry);
    line.innerHTML = html;
    n.textContent = money(entry + ticket);
  }
  function money(v) { return lang === "en" ? "€" + v : v + " €"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- price section (steps 1-3) ---------- */
  var priceArms = "both";
  function renderPrices() {
    var a = priceArms === "both" ? "both" : "left", none = entryFor("none", a);
    $("#q-p-entry").textContent = money(none);
    $$(".q-tixl [data-pick]").forEach(function (b) { b.querySelector("b").textContent = money(TICKET[b.dataset.pick]); });
    $$(".q-armtog button").forEach(function (b) { b.classList.toggle("on", b.dataset.arm === priceArms); });
    $("#q-bundles").innerHTML = ["fan", "ga", "gold", "vip"].map(function (t) {
      var e = entryFor(t, a), sum = none + TICKET[t];
      return '<button type="button" class="q-bund' + (planPick === t ? " on" : "") + '" data-pick="' + t + '"><p class="q-bund-n">' + esc(m("b_name", { tier: TIER_EN[t] })) + '</p><p class="q-bund-w">' + esc(m("b_what", { tier: TIER_EN[t] })) + "</p>" +
        '<p class="q-bund-e">' + esc(m("b_entry", { e: money(e) })) + "</p>" +
        '<p class="q-bund-p"><b>'  + money(e + TICKET[t]) + '</b><s>' + esc(m("b_instead", { sum: money(sum) })) + "</s></p>" +
        '<p class="q-bund-save">' + esc(m("b_save", { s: money(sum - e - TICKET[t]) })) + "</p></button>";
    }).join("");
    $("#q-pt-have").innerHTML = m("have_line", { list: ["fan", "ga", "gold", "vip"].map(function (t) { return TIER_EN[t] + " " + money(entryFor(t, a)); }).join(" · ") });
  }
  $$(".q-armtog button").forEach(function (b) { b.addEventListener("click", function () { priceArms = b.dataset.arm; renderPrices(); }); });

  // tap a ticket or bundle: the hall plan below shows where you sit (tap again: whole hall)
  var planPick = null;
  function showPlan() {
    var img = $("#q-plan-main-img"), cap = $("#q-plan-main-cap");
    img.setAttribute("src", "assets/qualifier/plan/plan-" + (planPick || "all") + ".webp");
    cap.textContent = planPick ? m("plan_cap", { tier: TIER_EN[planPick] }) : text("plan_note");
    cap.classList.toggle("on", !!planPick);
    $$("#q-pt [data-pick]").forEach(function (b) { b.classList.toggle("on", b.dataset.pick === planPick); b.setAttribute("aria-pressed", b.dataset.pick === planPick ? "true" : "false"); });
  }
  $("#q-pt").addEventListener("click", function (e) {
    var b = e.target.closest("[data-pick]"); if (!b) return;
    planPick = planPick === b.dataset.pick ? null : b.dataset.pick;
    showPlan();
    if (planPick) { var f = $("#q-plan-main"), r = f.getBoundingClientRect(); if (r.top > innerHeight * .75 || r.bottom < 80) f.scrollIntoView({ behavior: "smooth", block: "center" }); }
  });
  // preload the highlighted plans so switching is instant
  ["fan", "ga", "gold", "vip"].forEach(function (t) { var i = new Image(); i.src = "assets/qualifier/plan/plan-" + t + ".webp"; });

  var pol = $("#q-pol"), polFrom = null;
  function polOpen() { polFrom = document.activeElement; pol.hidden = false; document.body.style.overflow = "hidden"; $("#q-pol-body").scrollTop = 0; $("#q-pol-x").focus(); }
  function polClose() { pol.hidden = true; document.body.style.overflow = ""; if (polFrom) polFrom.focus(); }
  $$(".q-pol-open").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); polOpen(); }); });
  $("#q-pol-x").addEventListener("click", polClose);
  pol.addEventListener("click", function (e) { if (e.target === pol) polClose(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !pol.hidden) polClose(); });
  $("#q-pol-ok").addEventListener("click", function () { form.elements.accept_policy.checked = true; clearBad(form.elements.accept_policy); polClose(); });

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
    if (n === "arms") { priceArms = e.target.value === "both" ? "both" : "one"; renderPrices(); }
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
    if (!val("accept_policy")) bad.push("accept_policy");
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
      guardian_consent: !!val("guardian_consent"), accept_rules: !!val("accept_rules"), accept_policy: !!val("accept_policy"), promo_ok: !!val("promo_ok"), comment: form.elements.comment.value,
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

  $("#q-lang").innerHTML = LANGS.map(function (l) { return '<option value="' + l[0] + '">' + l[1] + "</option>"; }).join("");
  $("#q-lang").addEventListener("change", function () {
    lang = this.value;
    var u = new URL(location.href); u.searchParams.set("lang", lang); history.replaceState(null, "", u);
    loadLang(lang, applyLang);
  });

  applyLang();
  if (lang !== "en") loadLang(lang, applyLang);
  fetch("/api/qualifier/config").then(function (r) { return r.json(); }).then(function (d) {
    cfg = d; renderBar(); if (tk.state === "off" && cfg.tickets) { lastEmail = ""; onEmail(); }
  }).catch(function () { renderBar(); });

  if (params.get("paid")) afterPayment(params.get("paid"));
  if (params.get("cancelled")) $("#q-cancelled").hidden = false;
})();
