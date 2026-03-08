"use client";

import { Bell, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * ヘッダー右上のアクションボタン（お知らせ・更新）
 */
export function HeaderActions() {
  return (
    <div className="flex items-center gap-2 pr-4">
      <Button variant="ghost" size="icon-sm" asChild aria-label="お知らせ">
        <Link href="/news">
          <Bell className="size-4" aria-hidden />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="更新"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
