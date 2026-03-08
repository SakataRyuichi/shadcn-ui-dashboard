"use client";

import { CheckCircle2, CircleX, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BrandStatus } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  BrandStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  active: {
    label: "有効",
    icon: CheckCircle2,
    className:
      "bg-green-500/10 text-green-700 dark:text-green-400 [&_svg]:text-green-600 dark:[&_svg]:text-green-400",
  },
  inactive: {
    label: "無効",
    icon: CircleX,
    className: "bg-muted text-muted-foreground [&_svg]:text-muted-foreground",
  },
  pending: {
    label: "保留中",
    icon: Clock,
    className:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400 [&_svg]:text-amber-600 dark:[&_svg]:text-amber-400",
  },
};

interface BrandStatusBadgeProps {
  status: BrandStatus;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * ブランドのステータスをアイコン付きで表示するバッジ
 */
export function BrandStatusBadge({ status, className }: BrandStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="secondary"
      className={cn("inline-flex items-center gap-1.5 font-normal", config.className, className)}
    >
      <Icon className="size-3.5 shrink-0" />
      <span>{config.label}</span>
    </Badge>
  );
}
