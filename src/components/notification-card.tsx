"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Notification } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  /** お知らせデータ */
  notification: Notification;
  /** 一覧表示用（タイトルのみ・リンク付き）か、詳細表示用か */
  variant?: "list" | "detail";
  className?: string;
}

/**
 * 共通のお知らせカード
 * 一覧ではタイトルと日付を表示し、詳細へリンク。詳細では全文を表示。
 */
export function NotificationCard({
  notification,
  variant = "list",
  className,
}: NotificationCardProps) {
  if (variant === "detail") {
    return (
      <article
        className={cn(
          "rounded-xl border border-input bg-blue-25 p-6 shadow-primary ring-1 ring-border",
          className,
        )}
      >
        <header className="mb-4">
          <time className="text-xs text-muted-foreground">{notification.createdAt}</time>
          <h1 className="mt-2 text-lg font-semibold text-foreground">{notification.title}</h1>
        </header>
        <div className="whitespace-pre-wrap text-sm text-foreground/90">{notification.content}</div>
      </article>
    );
  }

  return (
    <Link
      href={`/news/${notification.id}`}
      className={cn(
        "flex w-full items-center gap-2 rounded-xl border border-input bg-blue-25 px-4 py-3 text-left transition-colors hover:bg-blue-25/80",
        !notification.isRead && "ring-1 ring-primary/30",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{notification.title}</p>
        <time className="text-xs text-muted-foreground">{notification.createdAt}</time>
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}
