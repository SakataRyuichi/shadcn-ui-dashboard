"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Commune Engage ロゴコンポーネント
 * サイドバーの展開/縮小に応じて表示を切り替える
 *
 * @param collapsed - サイドバー縮小時は true。左端のシンボルのみ表示
 * @param className - 追加のクラス名
 */
export function EngageLogo({
  collapsed = false,
  className,
}: {
  collapsed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-start",
        collapsed ? "size-8 overflow-hidden" : "h-8 min-w-0",
        className,
      )}
    >
      <Image
        src="/logo-engage.svg"
        alt="Commune Engage"
        width={160}
        height={40}
        className={cn(
          "h-8 object-contain object-left",
          collapsed ? "w-40 shrink-0" : "w-auto max-w-full",
        )}
        style={
          collapsed
            ? {
                // 左端シンボルのみ表示（viewBox 160x40 の左 40x40 = 25%）
                clipPath: "inset(0 75% 0 0)",
              }
            : undefined
        }
      />
    </div>
  );
}
