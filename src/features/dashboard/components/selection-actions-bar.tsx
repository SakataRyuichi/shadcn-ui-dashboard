"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectionActionsBarProps {
  /** 選択件数 */
  selectedCount: number;
  /** 削除ボタンクリック時（中身は空でOK） */
  onDelete?: () => void;
  /** キャンセルボタンクリック時（選択解除・選択モード終了） */
  onCancel: () => void;
}

/**
 * 選択モード時に表示するアクションバー
 * 削除・キャンセルボタンを表示
 */
export function SelectionActionsBar({
  selectedCount,
  onDelete,
  onCancel,
}: SelectionActionsBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{selectedCount} 件選択中</span>
      <Button
        variant="destructive"
        size="sm"
        className="h-8 gap-2 text-xs"
        onClick={onDelete}
      >
        <Trash2 className="size-3" />
        削除
      </Button>
      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={onCancel}>
        キャンセル
      </Button>
    </div>
  );
}
