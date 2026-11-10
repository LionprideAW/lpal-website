// LPAL Edit Contest: register / log in, then manage your own links.
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var API = "/api/contest/";

  function call(path, body) {
    return fetch(API + path, {
      method: body ? "POST" : "GET",
      headers: body ? { "content-type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined,
      credentials: "same-origin"
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { d._status = r.status; return d; }); })
      .catch(function () { return { error: "net", _status: 0 }; });
  }
  function show(el, msg) { el.textContent = msg; el.hidden = !msg; }
  function fmtDate(ms) { try { return new Date(ms).toLocaleDateString(undefined, { day: "numeric", month: "short" }); } catch (e) { return ""; } }

  var MSG = {
    exists: "There is already a profile with this email. Please log in.",
    fields: "Please fill in the marked fields.",
    too_young: "You need to be at least 13 years old to take part.",
    wrong: "Wrong email or password.",
    locked: "Too many wrong tries. Please wait 15 minutes and try again.",
    bad_link: "This doesn't look like an Instagram Reel or TikTok link. Open your post, tap Share → Copy link and paste it here.",
    dup_own: "You already added this link.",
    dup_other: "This link was already submitted by another participant. Only submit your own edits.",
    max: "You reached the maximum of 30 links.",
    closed: "The contest has ended.",
    login: "Please log in again.",
    net: "Connection problem. Please try again.",
    server: "Something went wrong. Please try again in a minute."
  };
  var msg = function (d) { return MSG[d.error] || MSG.server; };

  // copy caption
  $("#c-copy-btn").addEventListener("click", function () {
    var t = $("#c-caption").textContent, b = this;
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () {
      b.textContent = "Copied ✓"; setTimeout(function () { b.textContent = "Copy"; }, 1800);
    }).catch(function () {
      var r = document.createRange(); r.selectNodeContents($("#c-caption")); var s = getSelection(); s.removeAllRanges(); s.addRange(r);
    });
  });

  // tabs
  function tab(name) {
    document.querySelectorAll(".c-tab").forEach(function (t) { t.classList.toggle("is-on", t.dataset.tab === name); });
    $("#c-register").hidden = name !== "register";
    $("#c-login").hidden = name !== "login";
  }
  document.querySelectorAll(".c-tab").forEach(function (t) { t.addEventListener("click", function () { tab(t.dataset.tab); }); });
  document.querySelectorAll("[data-go]").forEach(function (a) { a.addEventListener("click", function () { if (!$("#c-out").hidden) tab(a.dataset.go); }); });

  // under 18 → guardian block
  var reg = $("#c-register");
  function age(v) {
    var b = new Date(v + "T00:00:00"); if (isNaN(b)) return null;
    var n = new Date(), y = n.getFullYear() - b.getFullYear();
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) y--;
    return y;
  }
  reg.dob.addEventListener("change", function () { var a = age(reg.dob.value); $("#c-guardian").hidden = !(a !== null && a < 18); });

  function mark(form, fields) {
    form.querySelectorAll(".bad").forEach(function (e) { e.classList.remove("bad"); });
    Object.keys(fields || {}).forEach(function (k) {
      var sel = k === "handles" ? '[data-f="handles"]' : k === "accept" ? '[data-f="accept"]' : k === "guardian" ? "#c-guardian .c-field, #c-guardian .c-check" : null;
      if (sel) form.querySelectorAll(sel).forEach(function (e) { e.classList.add("bad"); });
      else if (form[k]) form[k].closest(".c-field").classList.add("bad");
    });
  }

  reg.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = reg, btn = f.querySelector("button[type=submit]");
    var body = {
      name: f.name.value, email: f.email.value, password: f.password.value, dob: f.dob.value, country: f.country.value,
      instagram: f.instagram.value, tiktok: f.tiktok.value, accept: f.accept.checked, promo_ok: f.promo_ok.checked,
      guardian_name: f.guardian_name.value, guardian_email: f.guardian_email.value, guardian_consent: f.guardian_consent.checked
    };
    btn.disabled = true;
    call("register", body).then(function (d) {
      btn.disabled = false;
      if (d.ok) { load(); return; }
      mark(f, d.fields); show($("#c-reg-err"), msg(d));
      if (d.error === "exists") tab("login");
    });
  });

  var lg = $("#c-login");
  lg.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = lg.querySelector("button[type=submit]"); btn.disabled = true;
    call("login", { email: lg.email.value, password: lg.password.value }).then(function (d) {
      btn.disabled = false;
      if (d.ok) { lg.password.value = ""; load(); } else show($("#c-login-err"), msg(d));
    });
  });

  $("#c-logout").addEventListener("click", function () { call("logout", {}).then(load); });

  // links
  var add = $("#c-add");
  add.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = add.querySelector("button"); btn.disabled = true;
    show($("#c-add-err"), ""); $("#c-add-ok").hidden = true;
    call("link", { url: add.url.value }).then(function (d) {
      btn.disabled = false;
      if (d.ok) { add.url.value = ""; render(d.links); $("#c-add-ok").hidden = false; setTimeout(function () { $("#c-add-ok").hidden = true; }, 4000); }
      else { show($("#c-add-err"), msg(d)); if (d.error === "login") load(); }
    });
  });

  function render(links) {
    var ul = $("#c-links"); ul.innerHTML = "";
    (links || []).forEach(function (l) {
      var li = document.createElement("li");
      var p = document.createElement("span"); p.className = "c-plat " + l.platform; p.textContent = l.platform === "tiktok" ? "TikTok" : "Instagram";
      var a = document.createElement("a"); a.href = l.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = l.url.replace(/^https:\/\/(www\.)?/, "");
      var t = document.createElement("time"); t.textContent = fmtDate(l.created_at);
      var del = document.createElement("button"); del.type = "button"; del.className = "c-del"; del.textContent = "Remove";
      del.addEventListener("click", function () {
        if (!confirmRemove(del)) return;
        call("link-delete", { id: l.id }).then(function (d) { if (d.ok) render(d.links); });
      });
      li.append(p, a, t, del); ul.appendChild(li);
    });
    var n = (links || []).length;
    $("#c-count").textContent = n ? "(" + n + ")" : "";
    $("#c-empty").hidden = n > 0;
  }
  // two taps to remove (no browser dialogs)
  function confirmRemove(btn) {
    if (btn.dataset.sure) return true;
    btn.dataset.sure = "1"; btn.textContent = "Sure?";
    setTimeout(function () { delete btn.dataset.sure; btn.textContent = "Remove"; }, 3000);
    return false;
  }

  function load() {
    call("me").then(function (d) {
      var u = d.user;
      $("#c-out").hidden = !!u; $("#c-in").hidden = !u;
      document.querySelectorAll("[data-go]").forEach(function (a) { a.hidden = !!u && a.classList.contains("c-link-top"); });
      var top = document.querySelector(".c-cta-top"); top.textContent = u ? "My profile" : "Join";
      document.querySelectorAll(".c-hero-btns [data-go]").forEach(function (a) { a.textContent = u ? "Go to my profile" : "Join the contest"; });
      if (!u) return;
      $("#c-hello").textContent = "Hi " + u.name.split(" ")[0] + "!";
      var h = [];
      if (u.instagram) h.push("Instagram @" + u.instagram);
      if (u.tiktok) h.push("TikTok @" + u.tiktok);
      $("#c-handles").textContent = h.join(" · ");
      render(d.links);
      $("#c-closed").hidden = d.open !== false;
      add.hidden = d.open === false;
    });
  }
  load();
})();
