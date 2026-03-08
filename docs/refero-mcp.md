# Refero MCP 使い方ガイド

Refero MCP は、AI エージェントが実プロダクトの UI/UX を参照できるようにする MCP サーバーです。12万以上のスクリーンと8千以上のユーザーフローにアクセスし、デザインの質を高めることができます。

**参照**: [Refero MCP](https://refero.design/mcp)

---

## 概要

### なぜ Refero MCP か

AI モデルはコードやロジックには強い一方で、プロダクトデザインの知識が不足しがちです。レイアウトの良し悪し、コンバージョンにつながるパターン、実際のアプリの作り方といった情報にアクセスできません。

Refero MCP はこのギャップを埋め、エージェントに以下を提供します：

- **125,000+ スクリーン**: Web / iOS の実プロダクト画面
- **8,000+ ユーザーフロー**: サインアップから解約までのステップ
- **構造化メタデータ**: 説明、UX パターン、UI パターン、レイアウトなど

### できること

- 競合や業界標準の UI/UX を調査
- 類似画面・フローを検索して参考にする
- レイアウト、パターン、コンポーネント構成を把握してから実装する

---

## インストール

### 1. Refero Pro サブスクリプション

MCP 利用には **Refero Pro** プランが必要です。

- [Pricing](https://refero.design/pricing) で Pro プランにアップグレード

### 2. MCP サーバーを接続

利用するツール（Cursor / Claude Code / その他 MCP 対応ツール）の MCP 設定に Refero を追加します。

**Cursor の場合**:

1. **Settings** → **Features** → **MCP**
2. **Add New MCP Server** をクリック
3. Refero の設定を追加（詳細は [Refero MCP](https://refero.design/mcp) の「Connect your tool」を参照）

### 3. 初回認証

初回の Refero 呼び出し時にブラウザが開きます。Refero アカウントでサインインすると、以降は自動で認証されます。

### 4. 動作確認

次のようなプロンプトで試します：

- 「Find onboarding flows from fintech apps」
- 「Show me how Linear handles empty states」

---

## 利用可能なツール

### 1. `refero_search_screens` — スクリーン検索

UI スクリーンをセマンティック検索します。

| パラメータ | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `query` | string | ✅ | 検索クエリ（画面種別、パターン、企業名、画面上のテキストなど） |
| `platform` | enum | ✅ | `web` または `ios` |
| `limit` | number | - | 1〜50（デフォルト: 20） |
| `offset` | number | - | ページネーション用オフセット |

**検索例**:

- `pricing page` — 料金ページ
- `login form` — ログインフォーム
- `empty state` — 空状態
- `Notion` — Notion の画面
- `dashboard with charts` — チャート付きダッシュボード

**返却データ**:

- `screen_id`, `platform`, `url`, `thumbnail_url`
- `page_types`, `ux_patterns`, `ui_elements`
- `description`, `site_name`, `site_categories`
- `fonts`

### 2. `refero_get_screen` — スクリーン詳細取得

`screen_id` でスクリーンの詳細を取得します。

| パラメータ | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `screen_id` | number | ✅ | スクリーン ID（`refero_search_screens` で取得） |
| `image_size` | enum | - | `none` / `thumbnail` / `full`（デフォルト: `none`） |
| `include_similar` | boolean | - | 類似スクリーンを含めるか（デフォルト: `true`） |
| `similar_limit` | number | - | 類似スクリーン数（1〜20、デフォルト: 4） |

**返却データ**:

- `content.description` — 画面の詳細説明
- `content.layout` — レイアウト構造
- `content.functions` — ユーザーができる操作
- `page_types`, `ux_patterns`, `ui_elements`
- `fonts`, `site` 情報

### 3. `refero_search_flows` — フロー検索

ユーザーフロー（複数画面の連続）を検索します。

| パラメータ | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `query` | string | ✅ | フロー種別、企業名、アクションなど |
| `platform` | enum | ✅ | `web` または `ios` |
| `limit` | number | - | 1〜50（デフォルト: 10） |
| `offset` | number | - | ページネーション用オフセット |

**検索例**:

- `onboarding` — オンボーディング
- `checkout` — チェックアウト
- `sign up` — サインアップ
- `cancel subscription` — 解約フロー

**返却データ**:

- `flow_id`, `flow_name`, `screens_count`
- `description` — フローの説明
- `problem` — 解決するユーザー課題
- `steps_preview` — 各ステップのサムネイル
- `site_name`, `site_categories`

### 4. `refero_get_flow` — フロー詳細取得

`flow_id` でフローの詳細を取得します。

| パラメータ | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `flow_id` | number | ✅ | フロー ID（`refero_search_flows` で取得） |

**返却データ**:

- 全ステップの画面と説明
- 各ステップの `goal`, `action`, `system_response`
- ユーザー課題の説明
- 関連検索クエリ

---

## 使用例

### 例 1: 料金ページの参考を探す

```
「SaaS の料金ページのデザインを参考にして、3カラムのプラン比較を実装して」
```

1. `refero_search_screens` で `pricing page SaaS` を検索
2. 候補から `refero_get_screen` で詳細を取得
3. レイアウト・パターンを参考に実装

### 例 2: オンボーディングフローを調査

```
「fintech アプリのオンボーディングフローを調べて、同様のステップを設計して」
```

1. `refero_search_flows` で `onboarding fintech` を検索
2. `refero_get_flow` でフロー詳細を取得
3. ステップ構成と画面遷移を参考に設計

### 例 3: 空状態のパターンを集める

```
「ダッシュボードの空状態（empty state）のデザインパターンをいくつか見せて」
```

1. `refero_search_screens` で `empty state dashboard` を検索
2. 複数スクリーンの `description` と `ui_elements` を比較
3. 共通パターンを抽出して実装

---

## Refero Skill

Refero は、エージェント用のデザイン手法を提供する **Refero Skill** も公開しています。

- いきなりコードを書かず、まず参考を調査
- パターンを抽出してからデザイン
- タイポグラフィ、色、余白、モーションのルールを適用

**インストール**:

```bash
npx skills add https://github.com/referodesign/refero_skill
```

---

## データ概要

| 項目 | 内容 |
|------|------|
| Web スクリーン | 63,000+ |
| iOS スクリーン | 61,000+ |
| ユーザーフロー | 8,000+ |
| 更新頻度 | 週次 |

---

## リンク

- [Refero MCP](https://refero.design/mcp) — 公式 MCP ページ
- [How It Works](https://refero.design/how-it-works) — 検索の仕組み
- [Pricing](https://refero.design/pricing) — 料金プラン
- [Live Demo](https://demo.refero.design/) — デモ
- [Refero Skill](https://github.com/referodesign/refero_skill) — GitHub
