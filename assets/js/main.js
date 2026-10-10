/* ============================================================
   הבילתיס' — לוגיקת האתר
   מרנדר הכל מתוך BILTIS שב-data.js.
   ============================================================ */
(function () {
  "use strict";

  var D  = window.BILTIS || BILTIS;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  };

  var MONTHS = ["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ"];
  function parseDate(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1]-1, +p[2]); }

  /* ---------- כללי ---------- */
  var heroSrcMobile = $("#heroSrcMobile");
  if (heroSrcMobile) heroSrcMobile.srcset = D.heroMobile || D.hero;
  var heroImg = $("#heroImg");
  heroImg.src = D.hero;
  heroImg.alt = D.bandName + " בהופעה";

  var heroLogo = $("#heroLogo");
  heroLogo.src = D.logo;
  heroLogo.alt = D.bandName;

  $("#heroTag").textContent    = D.tagline;
  $("#footYear").textContent   = new Date().getFullYear();

  $("#heroActs").innerHTML = (D.heroLine || []).map(function (a) {
    return "<span>" + esc(a) + "</span>";
  }).join("");

  /* ---------- רצועת ברק ---------- */
  var words = [D.tagline].concat(D.acts || []);
  var run = words.map(function (w, i) {
    return "<span>" + (i === 0 ? "<b>" + esc(w) + "</b>" : esc(w)) + "</span>";
  }).join("");
  $("#tickerTrack").innerHTML = run + run;   /* פעמיים — בשביל לולאה רציפה */

  /* ---------- אודות ---------- */
  $("#aboutLead").textContent = D.about.lead;
  $("#aboutBody").innerHTML   = D.about.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("#aboutPoints").innerHTML = (D.about.points || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
  $("#aboutArea").textContent = D.about.area || "";

  /* ---------- נגנים ---------- */
  $("#membersGrid").innerHTML = D.members.map(function (m, i) {
    return '<li class="member" style="--d:' + (i * 0.06).toFixed(2) + 's">' +
             '<div class="member__shot duo duo--mustard">' +
               '<img src="' + esc(m.image) + '" alt="' + esc(m.name) + '" loading="lazy">' +
             "</div>" +
             '<h3 class="member__name">' + esc(m.name) + "</h3>" +
             '<span class="member__role">' + esc(m.role) + "</span>" +
             (m.bio ? '<p class="member__bio">' + esc(m.bio) + "</p>" : "") +
           "</li>";
  }).join("");

  /* ---------- הופעות ---------- */
  var today = new Date(); today.setHours(0,0,0,0);
  var sorted   = (D.shows || []).slice().sort(function (a,b) { return parseDate(a.date) - parseDate(b.date); });
  var upcoming = sorted.filter(function (s) { return parseDate(s.date) >= today; });
  var past     = sorted.filter(function (s) { return parseDate(s.date) <  today; }).reverse();

  /* כשההופעה היא פשוט הלהקה, המקום הוא הכותרת — אין טעם לחזור על השם בכל שורה */
  function showMain(s) {
    var named = s.title && s.title !== D.bandName;
    var bits = [];
    if (named) bits.push("<b>" + esc(s.venue) + "</b>");
    if (s.city) bits.push(esc(s.city));
    if (s.time) bits.push('<span class="ltr">' + esc(s.time) + "</span>");
    return '<h3 class="show__title">' + esc(named ? s.title : s.venue) + "</h3>" +
           (bits.length ? '<p class="show__where">' + bits.join(" · ") + "</p>" : "");
  }

  function showRow(s, i, isPast) {
    var d = parseDate(s.date);
    var cta = isPast ? ""
      : (s.tickets
          ? '<a class="show__cta" href="' + esc(s.tickets) + '" target="_blank" rel="noopener">כרטיסים</a>'
          : '<span class="show__note">' + esc(s.note || "פרטים בקרוב") + "</span>");
    return '<article class="show reveal-item' + (isPast ? " show--past" : "") +
             '" style="--d:' + (Math.min(i,8) * 0.05).toFixed(2) + 's">' +
             '<div class="show__date">' +
               '<span class="show__day ltr">' + d.getDate() + "</span>" +
               '<span class="show__mon">' + MONTHS[d.getMonth()] +
                 (d.getFullYear() !== today.getFullYear()
                    ? ' <span class="ltr">' + d.getFullYear() + "</span>" : "") + "</span>" +
             "</div>" +
             '<div class="show__main">' + showMain(s) + "</div>" + cta + "</article>";
  }

  $("#showsUpcoming").innerHTML = upcoming.length
    ? upcoming.map(function (s,i) { return showRow(s,i,false); }).join("")
    : '<div class="shows__empty reveal">' +
        "<p>התאריכים הבאים בדרך. רוצים שנגיע אליכם?</p>" +
        '<a href="#contact">להזמנת הופעה</a>' +
      "</div>";

  /* פס ההופעה הבאה בתחתית הפתיחה */
  var nextBar = $("#heroNext");
  if (upcoming.length) {
    var n = upcoming[0], nd = parseDate(n.date);
    nextBar.hidden = false;
    nextBar.innerHTML =
      "<em>ההופעה הבאה</em>" +
      "<b><span class='ltr'>" + nd.getDate() + "." + (nd.getMonth() + 1) + "</span> · " +
      esc(n.venue) + (n.city ? ", " + esc(n.city) : "") + "</b>" +
      (n.note ? "<i>" + esc(n.note) + "</i>" : "");
  }

  if (past.length) {
    $("#showsPastWrap").hidden = false;
    $("#showsPast").innerHTML = past.map(function (s,i) { return showRow(s,i,true); }).join("");
    var pastBtn = $("#pastToggle"), pastBox = $("#showsPast");
    pastBtn.addEventListener("click", function () {
      var open = pastBtn.getAttribute("aria-expanded") === "true";
      pastBtn.setAttribute("aria-expanded", String(!open));
      pastBox.hidden = open;
      if (!open) $$(".reveal-item", pastBox).forEach(function (el) { el.classList.add("is-in"); });
    });
  }

  /* ---------- וידאו ---------- */
  $("#videosGrid").innerHTML = D.videos.map(function (v, i) {
    return '<li class="video" style="--d:' + (i * 0.08).toFixed(2) + 's">' +
             '<button class="video__btn" data-yt="' + esc(v.youtube) +
               '" data-aspect="' + esc(v.aspect || "16/9") +
               '" data-title="' + esc(v.title) + '">' +
               '<span class="duo duo--ink"><img src="' + esc(v.poster) + '" alt="" loading="lazy"></span>' +
               '<span class="video__play" aria-hidden="true"></span>' +
               '<span class="sr">נגן: ' + esc(v.title) + "</span>" +
             "</button>" +
             '<div class="video__meta">' +
               '<h3 class="video__title">' + esc(v.title) + "</h3>" +
               '<span class="video__sub">' + esc(v.meta) + "</span>" +
             "</div></li>";
  }).join("");

  if (D.videos.length === 1) $("#videosGrid").classList.add("videos--single");

  /* ---------- גלריה ---------- */
  $("#galleryGrid").innerHTML = D.gallery.map(function (g, i) {
    return '<button class="shot" data-i="' + i + '" style="--d:' + ((i % 3) * 0.08).toFixed(2) + 's">' +
             '<img src="' + esc(g.thumb || g.src) + '" alt="' +
               esc(g.caption || (D.bandName + " בהופעה")) + '" loading="lazy" decoding="async">' +
           "</button>";
  }).join("");

  /* ---------- קשר ---------- */
  $("#contactNote").textContent = D.contact.note;
  var mail = $("#contactMail");
  mail.textContent = D.contact.email; mail.href = "mailto:" + D.contact.email; mail.classList.add("ltr");
  var phone = $("#contactPhone");
  phone.textContent = D.contact.phone;
  phone.href = "tel:" + D.contact.phone.replace(/[^0-9+]/g, "");
  phone.classList.add("ltr");
  $("#contactSocials").innerHTML = D.contact.socials.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
  }).join("");

  /* ============================================================
     ניווט
     ============================================================ */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > window.innerHeight * 0.6); };
  onScroll(); window.addEventListener("scroll", onScroll, { passive:true });

  var toggle = $("#navToggle"), menu = $("#navMobile");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
    document.body.classList.toggle("lb-open", !open);
  });
  $$("a", menu).forEach(function (a) {
    a.addEventListener("click", function () {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      document.body.classList.remove("lb-open");
    });
  });

  var links = $$(".nav__links a");
  var secs  = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && secs.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin:"-45% 0px -50% 0px" });
    secs.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- חשיפה בגלילה ---------- */
  var revealables = $$(".reveal, .reveal-item, .member, .video, .shot");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        obs.unobserve(e.target);
      });
    }, { rootMargin:"0px 0px -10% 0px", threshold:0.06 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ============================================================
     לייטבוקס
     ============================================================ */
  var lb = $("#lb"), lbStage = $("#lbStage"), lbCap = $("#lbCap"),
      lbPrev = $("#lbPrev"), lbNext = $("#lbNext"), lbClose = $("#lbClose"),
      lastFocus = null, idx = -1;

  function openLb()  { lb.hidden = false; document.body.classList.add("lb-open"); lbClose.focus(); }
  function closeLb() {
    lb.hidden = true; lbStage.innerHTML = ""; lbCap.textContent = "";
    document.body.classList.remove("lb-open"); idx = -1;
    if (lastFocus) lastFocus.focus();
  }
  function showImage(i) {
    var list = D.gallery;
    idx = (i + list.length) % list.length;
    lbStage.innerHTML = '<img src="' + esc(list[idx].src) + '" alt="' + esc(list[idx].caption || "") + '">';
    lbCap.textContent = list[idx].caption || "";
    lbPrev.hidden = lbNext.hidden = list.length < 2;
  }
  function showVideo(id, title, aspect) {
    idx = -1; lbPrev.hidden = lbNext.hidden = true;
    if (!id || id === "YOUTUBE_ID") {
      lbStage.innerHTML = '<div class="lb__msg">כדי להציג את הסרטון, הוסף את מזהה היוטיוב בקובץ ' +
                          "<code>assets/js/data.js</code></div>";
    } else {
      var vertical = (aspect || "16/9") === "9/16";
      lbStage.innerHTML = '<iframe class="' + (vertical ? "lb__vert" : "") +
        '" src="https://www.youtube-nocookie.com/embed/' + esc(id) +
        '?autoplay=1&rel=0" title="' + esc(title) +
        '" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    }
    lbCap.textContent = title;
  }

  $("#galleryGrid").addEventListener("click", function (e) {
    var btn = e.target.closest(".shot"); if (!btn) return;
    lastFocus = btn; showImage(+btn.dataset.i); openLb();
  });
  $("#videosGrid").addEventListener("click", function (e) {
    var btn = e.target.closest(".video__btn"); if (!btn) return;
    lastFocus = btn; showVideo(btn.dataset.yt, btn.dataset.title, btn.dataset.aspect); openLb();
  });

  lbClose.addEventListener("click", closeLb);
  lbPrev.addEventListener("click", function () { if (idx > -1) showImage(idx - 1); });
  lbNext.addEventListener("click", function () { if (idx > -1) showImage(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target === lbStage) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (idx < 0) return;
    if (e.key === "ArrowRight") showImage(idx - 1);   /* RTL: ימינה = אחורה */
    if (e.key === "ArrowLeft")  showImage(idx + 1);
  });
})();
