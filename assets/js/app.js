/**
 * 炎日 2026 — app.js
 * 全案共通の「装飾」レイヤー。JSが無効でもコンテンツ到達に影響しないことが必須要件。
 * ここに機能要件（チケット購入・お知らせ等）を書かない。
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js-enabled");
  if (reduceMotion) document.documentElement.classList.add("reduce-motion");

  /* ---------- モバイルナビ開閉 ---------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navPanel = document.querySelector("[data-nav-panel]");
  if (navToggle && navPanel) {
    navToggle.addEventListener("click", function () {
      var isOpen = navPanel.hasAttribute("hidden") === false;
      if (isOpen) {
        navPanel.setAttribute("hidden", "");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        navPanel.removeAttribute("hidden");
        navToggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  /* ---------- FAQ アコーディオン ----------
     HTML側はすでに <p> が可視のフォールバック構造。
     JS有効時のみ開閉式に強化する（プログレッシブエンハンスメント）。 */
  document.querySelectorAll("[data-faq-item]").forEach(function (item) {
    var q = item.querySelector("[data-faq-q]");
    var a = item.querySelector("[data-faq-a]");
    if (!q || !a) return;
    q.setAttribute("aria-expanded", "false");
    a.dataset.open = "false";
    a.style.maxHeight = "0px";
    q.addEventListener("click", function () {
      var expanded = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", String(!expanded));
      a.dataset.open = String(!expanded);
      a.style.maxHeight = !expanded ? a.scrollHeight + "px" : "0px";
    });
  });

  /* ---------- スクロール連動の視覚強化（対応ブラウザのみ・reduced-motionでは無効） ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }
})();
