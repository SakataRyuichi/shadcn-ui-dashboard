"use client";

import type { User } from "@/lib/mock/data";
import { Checkbox } from "@/components/ui/checkbox";

interface UsersCardViewProps {
  /** 表示するユーザー一覧 */
  users: User[];
  /** 選択モードが有効か */
  selectionMode?: boolean;
  /** 選択中のID一覧 */
  selectedIds?: Set<string>;
  /** 選択トグル時のコールバック */
  onToggleSelection?: (id: string) => void;
}

/**
 * ユーザー一覧のカード表示
 * 1段目: メイン情報（名前）、2段目: サブ情報（メール・ロール・登録日）
 * 選択モード時はカード全体クリックで選択、チェックボックスを表示
 */
export function UsersCardView({
  users,
  selectionMode = false,
  selectedIds = new Set(),
  onToggleSelection,
}: UsersCardViewProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border py-12 text-center text-sm text-muted-foreground">
        該当するユーザーがありません。
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <button
          key={user.id}
          type="button"
          onClick={() => {
            if (selectionMode && onToggleSelection) {
              onToggleSelection(user.id);
            }
          }}
          className={`block w-full cursor-pointer overflow-hidden rounded-xl border-0 bg-blue-10 p-0 text-left shadow-primary ring-1 ring-border transition-shadow-soft hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            selectionMode && selectedIds.has(user.id) ? "ring-2 ring-primary" : ""
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-3">
            {selectionMode && (
              <Checkbox
                checked={selectedIds.has(user.id)}
                aria-label={`${user.name}を選択`}
                className="shrink-0"
                onCheckedChange={() => onToggleSelection?.(user.id)}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <span className="font-semibold text-foreground">{user.name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border px-4 py-2">
            <span className="text-xs text-slate-600">{user.email}</span>
            <span className="text-xs text-slate-600">{user.role}</span>
            <span className="text-xs text-slate-600">登録日: {user.createdAt}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
