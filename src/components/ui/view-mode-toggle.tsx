"use client";

import { LayoutGrid, List } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { ListViewMode } from "@/stores/use-list-view-mode-store";
import { useListViewModeStore } from "@/stores/use-list-view-mode-store";

interface ViewModeToggleProps {
  className?: string;
}

/**
 * 一覧表示のスタイル切り替え（テーブル/カード）
 * shadcn ToggleGroup ベース、サイズは小さめ
 */
export function ViewModeToggle({ className }: ViewModeToggleProps) {
  const { mode, setMode } = useListViewModeStore();

  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(v) => v && setMode(v as ListViewMode)}
      className={cn("rounded-lg border p-0.5", className)}
    >
      <ToggleGroupItem value="table" aria-label="テーブル表示" className="h-7 px-2">
        <List className="size-3.5" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="card" aria-label="カード表示" className="h-7 px-2">
        <LayoutGrid className="size-3.5" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
