/**
 * PATTERN 04 — 9.19 FESTIVAL TICKET
 * 選択項目に応じておすすめタイムラインを組み替える。
 * 個人情報・外部APIは使用しない。処理はすべてブラウザ内で完結する。
 * JS無効時：HTML側にすでに全項目を含むデフォルトのタイムラインが表示されているため、機能欠落なし。
 */
(function () {
  "use strict";
  var form = document.querySelector("[data-builder-form]");
  var result = document.querySelector("[data-builder-result]");
  if (!form || !result) return;

  var PLAN = {
    odori:  { time: "16:40", label: "浦和おどり総踊り", detail: "櫓を囲んで参加" },
    geinou: { time: "15:00", label: "伝統芸能ステージ", detail: "和太鼓・よさこい・阿波踊り" },
    gourmet:{ time: "14:30", label: "グルメエリア", detail: "キッチンカーで秋の味覚を" },
    ennichi:{ time: "14:15", label: "縁日エリア", detail: "射的・輪投げ・金魚すくい" }
  };

  function render() {
    var checked = Array.prototype.slice
      .call(form.querySelectorAll("input[type=checkbox]:checked"))
      .map(function (el) { return el.value; });

    var items = checked.map(function (key) { return PLAN[key]; }).filter(Boolean);
    items.sort(function (a, b) { return a.time.localeCompare(b.time); });
    items.push({ time: "18:00", label: "スタジアム開場", detail: "" });
    items.push({ time: "18:30", label: "キックオフ", detail: "浦和レッズ vs 東京ヴェルディ" });

    result.innerHTML = "";
    var ol = document.createElement("ol");
    ol.className = "timeline";
    items.forEach(function (it) {
      var li = document.createElement("li");
      li.className = "timeline__item";
      li.innerHTML =
        '<span class="timeline__time numeral">' + it.time + "</span><h3>" + it.label + "</h3>" +
        (it.detail ? '<p class="card__body">' + it.detail + "</p>" : "");
      ol.appendChild(li);
    });
    result.appendChild(ol);
  }

  form.addEventListener("change", render);
  render();
})();
