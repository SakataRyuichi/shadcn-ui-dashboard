"use client";

import { CheckSquare, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UsersTable } from "./users-table";
import { SectionHeader } from "./section-header";
import { SelectionActionsBar } from "./selection-actions-bar";

/**
 * ユーザー一覧セクション
 * レイヤー1: タイトル + 新規登録
 * レイヤー2: 選択 | 区切り | ソート | UI切替
 */
export function UsersSection() {
  return (
    <section>
      <UsersTable
        enableSelectionMode
        renderHeader={() => (
          <SectionHeader
            title="ユーザー一覧"
            action={
              <Button size="default" className="h-9">
                <Plus className="size-4" aria-hidden />
                新規登録
              </Button>
            }
          />
        )}
        renderToolbarLeft={(ctx) =>
          ctx.selectionActive ? (
            <SelectionActionsBar
              selectedCount={ctx.selectedCount}
              onCancel={ctx.cancelSelection}
            />
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
