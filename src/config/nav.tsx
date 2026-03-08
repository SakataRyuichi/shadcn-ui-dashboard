import { Bell, BookOpen, Home, type LucideIcon, Settings, ShieldCheck, Users } from "lucide-react";

/**
 * パンくず・ページタイトル用のラベル→アイコン対応
 * サイドバーメニュー（app-sidebar.tsx）と同一のアイコンを使用
 */
export const labelToIcon: Record<string, LucideIcon> = {
  // ホーム
  ホーム: Home,
  ダッシュボード: Home,
  // ブランド（ShieldCheck）
  ブランド: ShieldCheck,
  ブランド一覧: ShieldCheck,
  ブランド登録: ShieldCheck,
  ブランド詳細: ShieldCheck,
  // ユーザー（Users）
  ユーザー: Users,
  ユーザー一覧: Users,
  ユーザー登録: Users,
  // 設定（Settings）
  設定: Settings,
  // お知らせ（Bell）
  お知らせ: Bell,
  詳細: Bell,
  // その他（BookOpen）
  その他: BookOpen,
  スクリプト: BookOpen,
  利用規約: BookOpen,
};
