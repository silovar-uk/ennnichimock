/**
 * 炎日 2026 — data-render.js
 * event.json を fetch し、data-src="path.to.key" を持つ要素へ値を反映する。
 * 注意：HTMLの初期値がすでに正であることが前提（この処理は「上書き確認」であり「初期表示の生成」ではない）。
 * fetch失敗時（file://で開いた場合等）は何もせず、静的値をそのまま表示する。
 */
(function () {
  "use strict";

  function getByPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      if (acc == null) return undefined;
      var m = key.match(/^(\w+)\[(\d+)\]$/);
      if (m) return acc[m[1]] ? acc[m[1]][Number(m[2])] : undefined;
      return acc[key];
    }, obj);
  }

  fetch("assets/data/event.json")
    .then(function (res) {
      if (!res.ok) throw new Error("event.json fetch failed");
      return res.json();
    })
    .then(function (data) {
      document.querySelectorAll("[data-src]").forEach(function (el) {
        var value = getByPath(data, el.getAttribute("data-src"));
        if (value === undefined || value === null) return;
        el.textContent = value;
      });
      if (data.meta && data.meta.provisional === false) {
        document.querySelectorAll(".provisional-flag").forEach(function (el) {
          el.remove();
        });
        document.querySelectorAll("[data-provisional]").forEach(function (el) {
          el.removeAttribute("data-provisional");
        });
      }
    })
    .catch(function () {
      /* 静的フォールバックのまま。エラーをコンソールに出す必要はない（意図した挙動）。 */
    });
})();
