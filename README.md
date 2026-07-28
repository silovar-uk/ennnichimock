# 炎日 2026 特設ページ モック（発注仕様つき）

2026年9月19日（土）東京ヴェルディ戦で予定される「炎日」初の秋開催を題材にした、特設ページのデザインモック5案です。**制作会社への発注仕様として使えるレベルまで磨き上げてあります。**

## まず見るもの

- `index.html` — 5案の比較ページ（評価軸つき）
- `spec/SPEC.md` — 発注仕様書（ここから読む）

## モック一覧

1. `pattern-1.html` — 九灯の月夜（参加型／九つの提灯を灯しながら情報を巡る）
2. `pattern-2.html` — 月影絵巻（物語型／縦スクロールで一日を描く）
3. `pattern-3.html` — 月兎の道しるべ（探索型／足跡を追う発見体験）
4. `pattern-4.html` — 9.19 FESTIVAL TICKET（編集型／チケット・ポスターデザイン）
5. `pattern-5.html` — ひとつの輪（共同体型／円環図で団体・来場者・クラブを結ぶ）

## ディレクトリ構成

```
.
├── index.html
├── pattern-1〜5.html
├── assets/
│   ├── css/    tokens.css typography.css base.css components.css pattern-1〜5.css pattern-index.css
│   ├── js/     app.js data-render.js pattern-1-lanterns.js pattern-4-builder.js
│   ├── data/   event.json（全可変値の唯一の出所）
│   ├── svg/    moon-phases.svg chochin.svg yagura.svg usagi.svg patterns.svg
│   └── img/    favicon.svg og-*.svg（プレースホルダー。実写真ではない）
├── spec/
│   ├── SPEC.md            全体仕様（IA・機能要件・非機能要件・スコープ外）
│   ├── DESIGN-TOKENS.md   トークン仕様・案別差分表
│   ├── COMPONENTS.md      コンポーネント目録
│   ├── COPY.md            原稿デッキ（確定/仮/要確認の別）
│   ├── ASSETS.md          写真・フォント・SVGの仕様と権利区分
│   ├── A11Y.md            アクセシビリティ達成基準
│   └── ACCEPTANCE.md      検収チェックリスト
├── PROGRESS.md
└── README.md
```

## 共通方針

- スマートフォン対応（360px〜）
- JavaScriptが動かなくても主要情報を閲覧可能
- `prefers-reduced-motion` 対応
- Webフォント・写真は使用可（詳細は `spec/ASSETS.md`。外部ライブラリ・外部フォント・外部画像を一切使わない制約は解除済み）
- ファーストビュー、固定ナビ、ページ末尾にチケット導線
- 時間・場所・料金・対象・雨天時対応などの必須情報を明記
- 記載されているイベント内容・時間・場所はすべてモック上の仮情報（`assets/data/event.json` に集約）
- 調神社や兎の由来（案3）を本番で掲載する場合は、事実確認・関係者確認を前提とする

## 閲覧方法

`index.html` をブラウザで開くと、5案の比較ページが表示されます。GitHub Pagesを利用する場合は、リポジトリの Pages 設定で `main` ブランチのルートを公開元に設定してください。
