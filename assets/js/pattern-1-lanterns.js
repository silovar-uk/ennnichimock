/**
 * PATTERN 01 — 九灯の月夜
 * 提灯を灯す/消すと、月相インジケータが 0〜9 で連動する。
 * JS無効時：HTML側で全9項目がすでに開いた状態のフォールバック文書になっていること（別途 <details> 相当で担保）。
 */
(function () {
  "use strict";
  var buttons = document.querySelectorAll("[data-lantern-btn]");
  var moonUse = document.querySelector("[data-moon-use]");
  var moonLabel = document.querySelector("[data-moon-label]");
  if (!buttons.length) return;

  function litCount() {
    return document.querySelectorAll('[data-lantern-btn][aria-pressed="true"]').length;
  }

  function updateMoon() {
    var count = litCount();
    if (moonUse) moonUse.setAttribute("href", "assets/svg/moon-phases.svg#moon-" + count);
    if (moonLabel) {
      moonLabel.textContent = count + " / 9 灯— " + (count === 0 ? "新月" : count === 9 ? "満月" : "月齢 " + count);
    }
  }

  /* 初期状態はJSでのみ「消灯」にする。JS無効時はHTMLの初期状態（全項目可視）のまま。 */
  buttons.forEach(function (btn) {
    btn.setAttribute("aria-pressed", "false");
    var detail = document.getElementById(btn.getAttribute("aria-controls"));
    if (detail) detail.hidden = true;
  });

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!pressed));
      var detail = document.getElementById(btn.getAttribute("aria-controls"));
      if (detail) detail.hidden = pressed;
      updateMoon();
    });
  });

  updateMoon();
})();
