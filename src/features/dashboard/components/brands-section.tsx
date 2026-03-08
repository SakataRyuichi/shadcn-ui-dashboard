"use client";

import { CheckSquare, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBrandRegisterModalStore } from "@/stores/use-brand-register-modal-store";
import { BrandsTable } from "./brands-table";
import { SectionHeader } from "./section-header";
import { SelectionActionsBar } from "./selection-actions-bar";

/**
 * ブランド一覧セクション
 * レイヤー1: タイトル + 新規登録
 * レイヤー2: 選択 | 区切り | フィルター | ソート | UI切替
 */
export function BrandsSection() {
  const openModal = useBrandRegisterModalStore((s) => s.open);

  return (
    <section>
      <BrandsTable
        enableSelectionMode
        renderHeader={() => (
          <SectionHeader
            title="ブランド一覧"
            action={
              <Button onClick={openModal} size="default" className="h-9">
                <Plus className="size-4" aria-hidden />
                新規登録
              </Button>
            }
          />
        )}
        renderToolbarLeft={(ctx) =>
          ctx.selectionActive ? (
            <SelectionActionsBar selectedCount={ctx.selectedCount} onCancel={ctx.cancelSelection} />
          ) : (
            <Button
              variant="outline"
              size="default"
              className="h-9 gap-2"
              onClick={ctx.enterSelectionMode}
            >
              <CheckSquare className="size-4" aria-hidden />
              選択
            </Button>
          )
        }
      />
    </section>
  );
}
