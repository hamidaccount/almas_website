/* Almas Website — Vanilla JS, config-driven, zero build step. */
(function () {
  "use strict";
  var C = window.CONFIG || {};

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function waLink(message) {
    var n = (C.contact && C.contact.waNumber) || "93770700511";
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(message);
  }
  function openWa(message) {
    showToast("واتساپ باز می‌شود؛ لطفاً پیام را بررسی و ارسال کنید.");
    window.setTimeout(function () { window.open(waLink(message), "_blank", "noopener"); }, 450);
  }
  // Normalize Dari/Persian/Arabic variants so search matches regardless of keyboard.
  function norm(s) {
    return String(s || "")
      .replace(/[\u200C\u200D\uFEFF]/g, "")
      .replace(/[يىې]/g, "ی")
      .replace(/[كک]/g, "ک")
      .replace(/ة/g, "ه")
      .replace(/[أإآ]/g, "ا")
      .replace(/ؤ/g, "و")
      .replace(/۰-۹]/g, function (d) { return String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)); })
      .replace(/[0-9۰-۹]/g, function (d) {
        var fa = "۰۱۲۳۴۵۶۷۸۹"; var en = "0123456789";
        var i = en.indexOf(d); if (i > -1) return fa[i];
        return d;
      })
      .trim();
  }
  function catLabel(id) {
    var cats = C.categories || [];
    for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i].label;
    return id;
  }

  /* Shared <img> builder: config-driven src, lazy loading, graceful SVG fallback. */
  function thumb(src, alt, cls) {
    var img = document.createElement("img");
    img.className = cls || "thumb";
    img.src = src || "assets/food-1.svg";
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", function h() {
      img.removeEventListener("error", h);
      if (img.src.indexOf("food-1.svg") === -1) img.src = "assets/food-1.svg";
    });
    return img;
  }

  /* ---------- hydrate static business info ---------- */
  function hydrate() {
    var b = C.business || {}, ct = C.contact || {}, loc = C.location || {};
    document.querySelectorAll("[data-cfg-business]").forEach(function (el) { el.textContent = b.name || ""; });
    document.querySelectorAll("[data-cfg-tagline]").forEach(function (el) { el.textContent = b.tagline || ""; });
    document.querySelectorAll("[data-cfg-hero-title]").forEach(function (el) { el.textContent = b.heroTitle || ""; });
    document.querySelectorAll("[data-cfg-hero-copy]").forEach(function (el) { el.textContent = b.heroCopy || ""; });
    document.querySelectorAll("[data-cfg-phone-display]").forEach(function (el) { el.textContent = ct.phoneDisplay || ""; });
    document.querySelectorAll("[data-cfg-phone-link]").forEach(function (el) { el.setAttribute("href", "tel:" + (ct.phoneLink || "+93770700511")); });
    document.querySelectorAll("[data-cfg-address]").forEach(function (el) { el.textContent = loc.address || ""; });
    document.querySelectorAll("[data-cfg-hours]").forEach(function (el) { el.textContent = loc.hours || ""; });
    document.querySelectorAll("[data-cfg-landmark]").forEach(function (el) { el.textContent = loc.landmark || ""; });
    // Config-driven hero background (luxury dark overlay stays in CSS).
    var hero = document.querySelector(".hero");
    if (hero && b.heroImage) hero.style.setProperty("--hero-img", 'url("' + b.heroImage + '")');
    var exp = $("expPhoto");
    if (exp && b.restaurantImage) {
      var ei = document.createElement("img");
      ei.src = b.restaurantImage; ei.alt = "فضای رستورانت الماس";
      ei.loading = "lazy"; ei.decoding = "async";
      exp.appendChild(ei);
    }
    var sp = $("searchInput"); if (sp && C.ui) sp.placeholder = C.ui.searchPlaceholder || "جستجو در منیو…";
  }

  /* ---------- menu render + filter + search ---------- */
  var activeCat = "all";
  function renderMenu() {
    var grid = $("menuGrid"); if (!grid) return;
    var q = norm($("searchInput") ? $("searchInput").value : "");
    var items = (C.menu || []).filter(function (m) {
      var okCat = activeCat === "all" || m.category === activeCat;
      if (!okCat) return false;
      if (!q) return true;
      return norm(m.name).indexOf(q) > -1 || norm(m.desc).indexOf(q) > -1;
    });
    grid.innerHTML = "";
    if (!items.length) {
      var d = document.createElement("p");
      d.className = "empty";
      d.textContent = "نتیجه‌ای برای جستجو یافت نشد. واژه دیگری را جستجو کنید یا در واتساپ بپرسید.";
      grid.appendChild(d);
      return;
    }
    items.forEach(function (m) {
      var card = document.createElement("article");
      card.className = "dish";
      // Photo thumbnail (config-driven, lazy). Fixed aspect-ratio handled in CSS.
      var media = document.createElement("div");
      media.className = "media";
      media.appendChild(thumb(m.image, "عکس " + m.name));
      if (m.priceAf) {
        var pb = document.createElement("span");
        pb.className = "price-badge";
        pb.textContent = m.priceAf + " " + ((C.ui && C.ui.currencySuffix) || "افغانی");
        media.appendChild(pb);
      } else if (m.badge) {
        var bb = document.createElement("span");
        bb.className = "price-badge ghost";
        bb.textContent = m.badge;
        media.appendChild(bb);
      }
      card.appendChild(media);
      var body = document.createElement("div");
      body.className = "dish-body";
      var h = document.createElement("h3"); h.textContent = m.name;
      var c = document.createElement("span"); c.className = "cat"; c.textContent = catLabel(m.category);
      var p = document.createElement("p"); p.textContent = m.desc || "";
      body.appendChild(h); body.appendChild(c);
      if (m.badge && m.priceAf) {
        var bdg = document.createElement("span"); bdg.className = "badge"; bdg.textContent = m.badge;
        body.appendChild(bdg);
      }
      body.appendChild(p);
      var pr = document.createElement("div"); pr.className = "price";
      pr.textContent = m.priceAf ? m.priceAf + " " + ((C.ui && C.ui.currencySuffix) || "افغانی") : "قیمت در رستورانت";
      body.appendChild(pr);
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "btn btn-wa btn-small";
      btn.textContent = (C.ui && C.ui.orderButton) || "سفارش در واتساپ";
      btn.setAttribute("aria-label", "سفارش " + m.name + " در واتساپ");
      btn.addEventListener("click", function () {
        openWa("سلام وقت بخیر! می‌خواهم «" + m.name + "» سفارش بدهم. لطفاً قیمت و زمان آماده شدن را بگویید. — " + (C.business ? C.business.name : ""));
      });
      body.appendChild(btn);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }
  function renderFilters() {
    var box = $("filters"); if (!box) return;
    box.innerHTML = "";
    (C.categories || []).forEach(function (cat) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = cat.label;
      b.setAttribute("aria-pressed", String(cat.id === activeCat));
      b.addEventListener("click", function () {
        activeCat = cat.id;
        box.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        renderMenu();
      });
      box.appendChild(b);
    });
  }

  /* ---------- rooms render ---------- */
  function renderRooms() {
    var grid = $("roomGrid"); if (!grid) return;
    var g = C.guesthouse || {}; var rooms = g.rooms || [];
    grid.innerHTML = "";
    rooms.forEach(function (r) {
      var card = document.createElement("article");
      card.className = "room-card" + (r.badge ? " featured" : "");
      // Photo thumbnail (config-driven, lazy) with AFN price badge overlay.
      var media = document.createElement("div");
      media.className = "media";
      media.appendChild(thumb(r.image, "عکس " + r.name));
      var pb = document.createElement("span");
      pb.className = "price-badge";
      pb.textContent = r.priceAf + " " + (g.currency || "افغانی") + " " + (g.perNight || "فی شبانه‌روز");
      media.appendChild(pb);
      card.appendChild(media);
      var body = document.createElement("div");
      body.className = "room-body";
      var t = document.createElement("span"); t.className = "room-type";
      t.textContent = r.type === "family" ? "فامیلی" : "مردانه / انفرادی";
      var h = document.createElement("h3"); h.textContent = r.name;
      var pr = document.createElement("div"); pr.className = "room-price";
      pr.innerHTML = "";
      var strong = document.createElement("span"); strong.textContent = r.priceAf + " " + (g.currency || "افغانی");
      var sm = document.createElement("small"); sm.textContent = " " + (g.perNight || "فی شبانه‌روز") + " • " + (r.capacity || "");
      pr.appendChild(strong); pr.appendChild(sm);
      var p = document.createElement("p"); p.textContent = r.desc || "";
      body.appendChild(t); body.appendChild(h); body.appendChild(pr);
      if (r.badge) {
        var bdg = document.createElement("span"); bdg.className = "badge";
        bdg.style.cssText = "display:inline-block;font-size:12px;font-weight:700;color:#0d2529;background:var(--gold-light);border-radius:999px;padding:2px 12px;width:fit-content";
        bdg.textContent = r.badge; body.appendChild(bdg);
      }
      body.appendChild(p);
      if (r.amenities && r.amenities.length) {
        var ul = document.createElement("ul"); ul.className = "amen";
        r.amenities.forEach(function (a) {
          var li = document.createElement("li"); li.textContent = a; ul.appendChild(li);
        });
        body.appendChild(ul);
      }
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "btn btn-wa btn-small";
      btn.textContent = (C.ui && C.ui.reserveButton) || "ریزرف اطاق در واتساپ";
      btn.setAttribute("aria-label", "ریزرف " + r.name + " در واتساپ");
      btn.addEventListener("click", function () {
        openWa("سلام وقت بخیر! برای ریزرف «" + r.name + "» (" + r.priceAf + " افغانی " + (g.perNight || "فی شبانه‌روز") + ") معلومات می‌خواهم. تاریخ ورود و ظرفیت را لطفاً بگویید.");
      });
      body.appendChild(btn);
      card.appendChild(body);
      grid.appendChild(card);
    });
    var note = $("floorsNote"); if (note) note.textContent = g.floorsNote || "";
  }

  /* ---------- nav + booking scroll ---------- */
  function goToBooking() {
    var bk = $("booking"); if (!bk) return;
    bk.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(function () { var f = $("fullName"); if (f) f.focus({ preventScroll: true }); }, 550);
    var nl = $("navlinks"); if (nl) nl.classList.remove("open");
    var mb = $("menuBtn"); if (mb) mb.setAttribute("aria-expanded", "false");
  }

  /* ---------- reservation form ---------- */
  function bindForm() {
    var form = $("reserveForm"); if (!form) return;
    var typeSel = $("reqType"), roomSel = $("roomKind");
    // Populate selects from config
    if (typeSel && C.requestTypes) {
      typeSel.innerHTML = "";
      C.requestTypes.forEach(function (t) {
        var o = document.createElement("option"); o.textContent = t; o.value = t;
        typeSel.appendChild(o);
      });
    }
    if (roomSel && C.roomTypes) {
      roomSel.innerHTML = "";
      C.roomTypes.forEach(function (t) {
        var o = document.createElement("option"); o.textContent = t; o.value = t;
        roomSel.appendChild(o);
      });
    }
    var ci = $("checkin");
    if (ci) {
      var td = new Date();
      var s = td.getFullYear() + "-" + String(td.getMonth() + 1).padStart(2, "0") + "-" + String(td.getDate()).padStart(2, "0");
      ci.min = s;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var v = function (id) { var el = $(id); return el ? String(el.value || "").trim() : ""; };
      var lines = [
        "سلام وقت بخیر! درخواست جدید از وب‌سایت " + ((C.business && C.business.name) || "") + ":",
        "———————————",
        "نام و تخلص: " + v("fullName"),
        "شماره تماس: " + v("phone"),
        "نوع درخواست: " + v("reqType"),
        "نوع اطاق: " + v("roomKind"),
        "تعداد نفر: " + v("persons"),
        "تاریخ ورود: " + (v("checkin") || "—"),
        "تعداد شب: " + v("nights"),
        "توضیحات: " + (v("notes") || "—")
      ];
      openWa(lines.join("\n"));
    });
  }

  /* ---------- misc ---------- */
  var toastTimer = null;
  function showToast(msg) {
    var t = $("toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  function bindNav() {
    var mb = $("menuBtn"), nl = $("navlinks");
    if (mb && nl) {
      mb.addEventListener("click", function () {
        var open = nl.classList.toggle("open");
        mb.setAttribute("aria-expanded", String(open));
      });
      nl.addEventListener("click", function (e) {
        if (e.target.tagName === "A") { nl.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }
      });
    }
    document.querySelectorAll("[data-book]").forEach(function (b) {
      b.addEventListener("click", goToBooking);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    hydrate();
    renderFilters();
    renderMenu();
    renderRooms();
    bindForm();
    bindNav();
    var si = $("searchInput");
    if (si) si.addEventListener("input", renderMenu);
  });
})();
