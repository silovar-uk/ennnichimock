# COMPONENTS.md — コンポーネント目録

全案共通。ファイル: `assets/css/components.css`。

| コンポーネント | クラス | 状態 | 備考 |
|---|---|---|---|
| サイトナビ | `.site-nav` `.site-nav__panel` | 開／閉（モバイル） | `aria-expanded` 連動。860px以上でリンク常時表示に切替 |
| ボタン | `.btn--primary` `.btn--ghost` | hover / focus-visible | プライマリはクラブレッド、ゴーストは枠線のみ |
| カード | `.card` | — | eyebrow / title / body の3層構造 |
| エリアバッジ | `.area-badge--free` `.area-badge--ticket` | — | 無料/チケット必要の視覚区別。全FAQ・スケジュール項目に必須付与 |
| タイムライン | `.timeline` `.timeline__item` | — | 縦の時系列。時刻は `.numeral`（Shippori Antique B1） |
| FAQアコーディオン | `.faq__item` `.faq__q` `.faq__a` | 閉（JS） / 開（JS） / 常時表示（no-JS） | 初期状態はJSでのみ折りたたむ。無効時は本文がそのまま表示される設計を厳守 |
| CTAフッター | `.cta-footer` | — | 全案共通、ページ末尾固定位置 |
| 注記バッジ | `.provisional-flag` | — | 仮情報である間のみ表示。`data-render.js` が `meta.provisional:false` で自動除去 |
| 告知バナー | `.notice-banner` | — | ページ最上部、固定ナビの下 |
| 比較カード（indexのみ） | `.pattern-card` | hover / focus-visible | 5案比較グリッド専用 |

## 案固有コンポーネント（サイン要素）

| 案 | コンポーネント | ファイル |
|---|---|---|
| 01 | `.lantern-rail` `.lantern-btn` `.moon-indicator` `.lantern-detail` | pattern-1.css / pattern-1-lanterns.js |
| 02 | `.chapter` `.moon-track` `.emaki-rule` | pattern-2.css（JSなし、CSSのみで完結） |
| 03 | `.trail` `.discovery-stop` `.usagi-guide` `.legend-panel` | pattern-3.css |
| 04 | `.poster-date` `.ticket-stub` `.nine-grid` `.builder` `.chip` | pattern-4.css / pattern-4-builder.js |
| 05 | `.ring-diagram` `.ring-node` `.circle-grid` `.wave-divider` | pattern-5.css |

## 共通の実装ルール

1. **状態はaria属性で表現する**（`aria-pressed` `aria-expanded` `aria-controls`）。CSSクラスの付け外しだけで状態を表現しない。
2. **JS無効時のフォールバックを先に作る。** 各案のJSは「初期状態を装飾的に変える」処理のみを担当し、コンテンツの出し分けそのものをJSに依存させない（案1・案4のJSコード冒頭コメント参照）。
3. **色・寸法は全てトークン参照。** コンポーネントCSS内にハードコードされた色や余白値を書かない。
