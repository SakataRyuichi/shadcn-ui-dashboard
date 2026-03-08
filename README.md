# shadcn/ui Dashboard

ダッシュボードのデザイン検討用プロジェクトです。

## 技術構成

### コア
- **pnpm** - パッケージマネージャー
- **mise** - ランタイム・ツールバージョン管理
- **Next.js** - React フレームワーク（App Router）
- **TypeScript** - 型安全

### 状態管理・データ
- **zustand** - クライアント状態管理（軽量・シンプル）
- **TanStack Query** - サーバー状態・データフェッチ・キャッシュ
- **TanStack Table** - ヘッドレスなデータテーブル（ソート・フィルタ・ページネーション）

### UI・フォーム
- **Tailwind CSS** - スタイリング
- **shadcn/ui** - UI コンポーネント
- **Motion** - アニメーション（Radix と公式連携）
- **React Hook Form** - フォーム管理
- **Zod** - スキーマバリデーション（`@hookform/resolvers` で連携）
- **date-fns** - 日付処理

### 開発ツール
- **Biome** - リンター・フォーマッター
- **TSDoc** - ドキュメントコメント

## セットアップ

### 1. 前提条件

- [mise](https://mise.jdx.dev/) をインストール
- [pnpm](https://pnpm.io/) は mise 経由で自動インストール

### 2. 環境セットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd shadcn-ui-dashboard

# mise で Node.js 22 と pnpm 9 をインストール（.mise.toml に定義）
mise install

# 依存関係をインストール
pnpm install
```

### 3. Cursor MCP（shadcn/ui）の設定

このプロジェクトには `.cursor/mcp.json` が含まれています。

1. Cursor でプロジェクトを開く
2. **Settings** → **MCP** で shadcn サーバーを有効化
3. 緑のドットが表示されれば接続完了

有効化後、チャットで「shadcn の button を追加して」などの自然言語でコンポーネントを追加できます。

### 4. 開発サーバー起動

```bash
pnpm dev
```

ブラウザで http://localhost:3333 を開く

---

## 開発コマンド

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | 本番ビルド |
| `pnpm start` | 本番サーバー起動 |
| `pnpm lint` | リント実行 |
| `pnpm lint:fix` | リント + 自動修正 |
| `pnpm format` | フォーマット実行 |

---

## shadcn/ui コンポーネントの追加

```bash
# 単一コンポーネント
npx shadcn@latest add button

# 複数コンポーネント
npx shadcn@latest add button card input

# データテーブル用
npx shadcn@latest add table
```

`components.json` でスタイル（new-york）やエイリアス（`@/components`）が設定済みです。

---

## 設定ファイル一覧

| ファイル | 用途 |
|----------|------|
| `.mise.toml` | Node.js / pnpm のバージョン指定 |
| `.cursor/mcp.json` | Cursor 用 shadcn MCP サーバー設定 |
| `biome.json` | リンター・フォーマッター設定（Tailwind 対応） |
| `components.json` | shadcn/ui CLI 設定（スタイル、エイリアス） |
| `tsconfig.json` | TypeScript 設定（`@/*` パスエイリアス） |
| `next.config.ts` | Next.js 設定 |
| `postcss.config.mjs` | PostCSS 設定（Tailwind v4） |

---

## おすすめの追加ライブラリ・構成

### ルーティング
Next.js App Router を採用。ファイルベースルーティング（`app/` ディレクトリ）でルートを定義します。

### ダッシュボード向け
| ライブラリ | 用途 | 特徴 |
|------------|------|------|
| **TanStack Virtual** | 仮想スクロール | 大量データのリスト/グリッドを 60fps で描画 |
| **Recharts** / **Chart.js** | グラフ | ダッシュボードのチャート（shadcn Chart は Recharts ベース） |

### フォーム・バリデーション
| ライブラリ | 用途 | 備考 |
|------------|------|------|
| **TanStack Form** | フォーム | 型安全、React Hook Form の代替候補 |

※ Zod, @hookform/resolvers, date-fns は既に導入済み

### ユーティリティ
| ライブラリ | 用途 |
|------------|------|
| **immer** | zustand と組み合わせた immutable 更新 |
| **nanoid** | ユニーク ID 生成 |
| **sonner** / **react-hot-toast** | トースト通知（shadcn Sonner あり） |

### 開発体験
| ライブラリ | 用途 |
|------------|------|
| **TanStack Query DevTools** | クエリのデバッグ・可視化 |
| **@tanstack/router-devtools** | ルートの可視化 |

### 推奨パッケージ追加例

```bash
# 開発時のみ（クエリのデバッグ）
pnpm add -D @tanstack/react-query-devtools

# ルーティング
pnpm add @tanstack/react-router

# 仮想スクロール（大量データ用）
pnpm add @tanstack/react-virtual
```

※ zod, date-fns, @hookform/resolvers, motion は既に導入済み
