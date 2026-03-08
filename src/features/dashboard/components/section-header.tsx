import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type * as React from "react";

interface SectionHeaderProps {
  /** セクションのタイトル */
  title: string;
  /** ナビゲーション先のURL（指定時のみ矢印アイコンを表示） */
  href?: string;
  /** タイトル右端に表示するアクション（ボタンなど） */
  action?: React.ReactNode;
}

/**
 * セクションのタイトルとオプションのナビゲーションを表示するヘッダー
 * href を指定した場合、タイトルの隣に右矢印アイコンを表示し、クリックで遷移する
 * action を指定した場合、タイトル右端に配置する
 */
export function SectionHeader({ title, href, action }: SectionHeaderProps) {
  const titleContent = href ? (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-foreground/80"
    >
      <span>{title}</span>
      <ChevronRight className="size-5 shrink-0" aria-hidden />
    </Link>
  ) : (
    <h2 className="text-lg font-semibold">{title}</h2>
  );

  if (action) {
    return (
      <div className="mb-4 flex items-center justify-between gap-4">
        {titleContent}
        {action}
      </div>
    );
  }

  return <div className="mb-4">{titleContent}</div>;
}
