# DESIGN-TOKENS.md — トークン仕様

## 構造

```
tokens.css       primitive（原器）+ semantic（役割名、全案共通デフォルト）
pattern-N.css    semantic の一部を上書き（案の人格はここだけで決まる）
```

**原則：HTML構造・コンポーネントCSS（components.css）は5案で完全共有する。案の差は `pattern-N.css` の `:root` 再定義とサイン要素（各案固有のコンポーネント）だけで表現する。** 発注先の実装者はこの原則を破らないこと（案ごとにHTMLやcomponents.cssを分岐させない）。

## Primitive（抜粋）

| トークン | 値 | 用途 |
|---|---|---|
| `--p-night-05`〜`--p-night-100` | `#070912` 〜 `#f5f0e6` | 夜空の階調 |
| `--p-ember-30`〜`--p-ember-70` | `#e2703c` 〜 `#ffd9a0` | 提灯・灯の暖色 |
| `--p-club-red` | `#c8102e` | 浦和レッズ クラブレッド |
| `--p-gold-line` | `#b08d4f` | 金線・罫のアクセント |
| `--p-fs-00`〜`--p-fs-7` | `0.75rem`〜`5.25rem` | タイポスケール原器 |
| `--p-space-1`〜`--p-space-10` | `0.25rem`〜`9rem` | 余白原器（8px基準） |

## Semantic（全案共通デフォルト、pattern-N.cssで上書き）

`--surface-night-deep / --surface-night / --surface-night-raised / --ink-on-night / --accent-ember / --accent-ember-bright / --accent-club / --line-gold / --font-display / --font-body / --font-accent / --motion-fast / --motion-base / --motion-slow / --motion-ease / --radius-card / --radius-pill`

## 案別差分表

| トークン | 01 九灯 | 02 絵巻 | 03 兎 | 04 チケット | 05 輪 |
|---|---|---|---|---|---|
| `--accent-ember` | `#f0a868`（最も彩度高） | `#d98a4a`（抑制） | `#f2c9a0`（淡い） | `#ff8a4d` | `#f0b559`（金寄り） |
| `--accent-club` | 既定 `#c8102e` | 既定 | `#d13a3a`（柔） | `#e2231a`（最強） | `#d1452e` |
| `--radius-card` | 既定 4px | 既定 | **14px（最大）** | **2px（最小）** | 既定 |
| `--motion-ease` | 弾み系 | 減速系（900ms） | 弾み系 | 既定 | 既定 |
| `--font-accent` の主用途 | 提灯番号 | 章番号（縦組み） | ストップ番号 | 巨大日付・チケット番号 | ノードラベル |
| 支配的モチーフ | 提灯・月相 | 縦スクロール月軌道 | 足跡・兎 | 半券・グリッド | 円環・ノード |

## フォント

- 見出し／サイン要素：`Shippori Mincho B1`（和文明朝、伝統感）
- 本文：`Zen Kaku Gothic New`（可読性重視のゴシック）
- 数字・エイブロウ・チケット番号：`Shippori Antique B1`（意匠性の高い等幅寄り数字）
- 読み込み：Google Fonts CDN、`font-display: swap`。本番は日本語サブセット化必須（ASSETS.md参照）。

## モーション原則

- `--motion-fast`(180ms) = ホバー・トグル即応
- `--motion-base`(320ms) = 開閉・展開
- `--motion-slow`(640ms、案2のみ900ms) = スクロール演出・章の切り替え
- `prefers-reduced-motion: reduce` で全モーション変数を0msに強制（tokens.css側で一括対応済み。個別コンポーネントのkeyframesは各pattern-N.cssで追加の無効化を明記）
