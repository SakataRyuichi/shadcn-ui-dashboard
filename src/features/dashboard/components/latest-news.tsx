"use client";

import { ArrowRight, PartyPopper } from "lucide-react";

import { Link } from "@/components/ui/link";

/**
 * 最新のお知らせ
 * クラッカーアイコン・メッセージ・アローアイコンを配置したリンクカード
 * 画面幅の50%までに制限
 */
export function LatestNews() {
  return (
    <div className="w-full max-w-[50%]">
      <Link
        href="/news"
        className="flex w-full items-center gap-2 rounded-xl border border-input bg-blue-25 px-3 py-2 text-foreground"
      >
        <PartyPopper className="size-5 shrink-0 text-amber-500" aria-hidden />
        <span className="flex-1 text-sm font-medium">デザインをリニューアルしました！</span>
        <ArrowRight className="size-4 shrink-0" aria-hidden />
      </Link>
    </div>
  );
}
