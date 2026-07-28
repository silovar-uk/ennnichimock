# PROGRESS.md

## 実施内容（フェーズ0〜11 一括実施）

- トークン基盤を3層構成で新設（`tokens.css`／primitive→semantic→pattern override）。5案のCSSは `pattern-N.css` による上書きのみで人格を分離し、`base.css` `typography.css` `components.css` は完全共有化した。
- 和文組版（`typography.css`）：行長・行間・`palt`・`line-break: strict`・`text-wrap: pretty`（対応ブラウザ）・`word-break: auto-phrase`（対応ブラウザ、フォールバック込み）を導入。
- Webフォント・写真を解禁する前提でフォント方針（Shippori Mincho B1 / Zen Kaku Gothic New / Shippori Antique B1）を確定し、CDN読み込みで実装。サブセット化は本番実装項目としてASSETS.mdに明記（このリポジトリの範囲では未実施）。
- 全可変値を `assets/data/event.json` に集約し、`data-src` / `data-provisional` によるマークと `data-render.js`（progressive enhancement、JS無効時は静的値がそのまま正しく表示される）を実装。
- オリジナルSVGライブラリ（月相・提灯・櫓・兎・青海波・輪モチーフ）を新規作成し、`<use href="external.svg#id">` の外部参照方式で全案から共有。
- 5案それぞれにサイン要素を実装：
  - 01 提灯トグル×月相連動（`pattern-1-lanterns.js`）
  - 02 スクロール駆動の月の軌道（`animation-timeline: scroll()`、`@supports` フォールバック済み）
  - 03 足跡トレイル＋兎ガイド＋由来紹介（要事実確認の注記付き）
  - 04 チケット半券コンポーネント＋モデルコースビルダー（`pattern-4-builder.js`、外部送信なし）
  - 05 円環図＋参加団体グリッド
- 比較ページ（`index.html`）を評価軸（実装難度・拡張性・訴求の方向性・向いている用途）つきで再設計。
- 仕様書一式を新設：`spec/SPEC.md` `DESIGN-TOKENS.md` `COMPONENTS.md` `COPY.md` `ASSETS.md` `A11Y.md` `ACCEPTANCE.md`。
- OGP画像・favicon の軽量SVGプレースホルダーを同梱。実写真ではない旨をASSETS.mdに明記。

## 判断した点

- 「外部ライブラリ・フォント・画像不使用」の制約は依頼に基づき解除。Webフォント（Google Fonts CDN）と写真枠（規格のみ、実写真は含まず）を許可する方針に変更した。
- 5案の差はトークン層とサイン要素のみで表現し、HTML構造・共通コンポーネントは完全共有とする設計判断をした（発注仕様としての一貫性と保守性を優先）。
- 外部SVG参照方式（`<use href="file.svg#id">`）を採用し、CSSカスタムプロパティが完全には継承されない制約はハードコードのフォールバック値で吸収した（ASSETS.mdに明記）。

## 未解決の確認事項（発注前に人間が決めるべき項目）

- 写真素材の調達方法（クラブ保有／制作会社調達／プロカメラマン契約）— 未確定
- 案3の由来紹介文（月と兎、地域伝承）の掲載可否 — 事実確認・関係者確認が未了
- チケット購入導線の実際の遷移先URL — 未確定
- 採用する案の数（1案のみか、複数案の出し分けか）— 未確定
- アクセス解析・広告タグの有無 — 未確定

## 次にやるとよいこと（本番移行時）

- 写真素材確定後、OGP画像・ヒーロー画像を実写真で差し替え、`ASSETS.md` のレスポンシブ画像仕様に沿って実装する。
- Webフォントの自社配信化とサブセット化（現状はGoogle Fonts CDN読み込みのみ）。
- `ACCEPTANCE.md` のLighthouse実測値を埋め、検収を行う。
