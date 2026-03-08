"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { User } from "@/lib/mock/data";
import { useUserSelectionStore } from "@/stores/use-user-selection-store";
import { useListViewModeStore } from "@/stores/use-list-view-mode-store";
import { ViewModeToggle } from "@/components/ui/view-mode-toggle";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "../api/use-dashboard-data";
import { DataTableSkeleton } from "./data-table-skeleton";
import { ListPagination } from "./list-pagination";
import { SelectionActionsBar } from "./selection-actions-bar";
import type { SortOrder } from "./users-table-sort-dropdown";
import { UsersCardView } from "./users-card-view";
import { UsersTableSortDropdown } from "./users-table-sort-dropdown";

const PAGE_SIZE = 10;

type UserSortKey = keyof Pick<User, "id" | "name" | "email" | "role" | "createdAt">;

export interface UsersTableSortProps {
  sortBy: string | null;
  sortOrder: SortOrder;
  onSort: (columnId: string, desc: boolean) => void;
  onClear: () => void;
  options: { id: string; label: string }[];
}

interface UsersTableProps {
  /** ページネーションを表示するか。デフォルト: true（ホームでは false） */
  showPagination?: boolean;
  /** 表示件数の上限（ホームなどで指定、未指定時は全件またはページネーションに従う） */
  limit?: number;
  /** 選択モードを有効にするか。デフォルト: false */
  enableSelectionMode?: boolean;
  /** レイヤー1: タイトル行（タイトルと新規登録を並べて表示） */
  renderHeader?: (sortProps: UsersTableSortProps) => React.ReactNode;
  /**
   * レイヤー2: ツールバー行の左側（選択UI）。
   * 指定時は [選択 | Separator | ソート | ViewModeToggle] の順で表示。
   */
  renderToolbarLeft?: (ctx: {
    selectionActive: boolean;
    selectedCount: number;
    enterSelectionMode: () => void;
    cancelSelection: () => void;
  }) => React.ReactNode;
  /** レイヤー2: ツールバー行の全体を上書き（ダッシュボード等で使用） */
  renderToolbar?: (sortProps: UsersTableSortProps) => React.ReactNode;
}

function sortUsers(users: User[], sortBy: UserSortKey | null, sortOrder: SortOrder): User[] {
  if (!sortBy || !sortOrder) return users;
  return [...users].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const cmp = String(aVal ?? "").localeCompare(String(bVal ?? ""), undefined, {
      numeric: true,
    });
    return sortOrder === "asc" ? cmp : -cmp;
  });
}

export function UsersTable({
  showPagination = true,
  limit,
  enableSelectionMode = false,
  renderHeader,
  renderToolbar,
  renderToolbarLeft,
}: UsersTableProps = {}) {
  const { data, isLoading } = useUsers();
  const mode = useListViewModeStore((s) => s.mode);
  const isSelectionMode = useUserSelectionStore((s) => s.isSelectionMode);
  const toggleSelectionMode = useUserSelectionStore((s) => s.toggleSelectionMode);
  const selectedIds = useUserSelectionStore((s) => s.selectedIds);
  const toggleSelection = useUserSelectionStore((s) => s.toggleSelection);
  const selectAll = useUserSelectionStore((s) => s.selectAll);
  const cancelSelection = useUserSelectionStore((s) => s.cancelSelection);
  const [pageIndex, setPageIndex] = useState(0);
  const [sortBy, setSortBy] = useState<UserSortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const users = data ?? [];
  const sortedUsers = useMemo(() => sortUsers(users, sortBy, sortOrder), [users, sortBy, sortOrder]);
  const selectionActive = enableSelectionMode && isSelectionMode;
  const displayUsers =
    limit && !selectionActive
      ? sortedUsers.slice(0, limit)
      : showPagination && !selectionActive
        ? sortedUsers.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
        : sortedUsers;

  const handleSortFromDropdown = (columnId: string, desc: boolean) => {
    setSortBy(columnId as UserSortKey);
    setSortOrder(desc ? "desc" : "asc");
    setPageIndex(0);
  };

  const handleClearSort = () => {
    setSortBy(null);
    setSortOrder(null);
    setPageIndex(0);
  };

  const sortOptions = [
    { id: "id", label: "ID" },
    { id: "name", label: "名前" },
    { id: "email", label: "メールアドレス" },
    { id: "role", label: "ロール" },
    { id: "createdAt", label: "登録日" },
  ];

  const sortProps: UsersTableSortProps = {
    sortBy,
    sortOrder,
    onSort: handleSortFromDropdown,
    onClear: handleClearSort,
    options: sortOptions,
  };

  const selectionCtx = enableSelectionMode
    ? {
        selectionActive,
        selectedCount: selectedIds.size,
        enterSelectionMode: toggleSelectionMode,
        cancelSelection,
      }
    : undefined;

  const renderToolbarRow = () => {
    if (renderToolbar) {
      return (
        <div className="flex h-9 w-full items-center justify-end gap-2">
          {renderToolbar(sortProps)}
        </div>
      );
    }
    if (renderToolbarLeft && selectionCtx) {
      return (
        <div className="flex h-9 w-full items-center gap-2">
          {renderToolbarLeft(selectionCtx)}
          <Separator
            orientation="vertical"
            className="h-4 shrink-0 self-center data-[orientation=vertical]:self-center"
          />
          <div className="ml-auto flex items-center gap-2">
            <UsersTableSortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSortFromDropdown}
              onClear={handleClearSort}
              options={sortOptions}
            />
            <ViewModeToggle />
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <DataTableSkeleton rows={3} columns={5} />;
  }

  if (mode === "card") {
    return (
      <div className="flex flex-col gap-4">
        {renderHeader && !selectionActive && renderHeader(sortProps)}
        {renderToolbarRow()}
        {!renderToolbar && !renderToolbarLeft && selectionActive && selectedIds.size > 0 && (
          <div className="flex justify-end">
            <SelectionActionsBar
              selectedCount={selectedIds.size}
              onCancel={cancelSelection}
            />
          </div>
        )}
        {!renderToolbar && !renderToolbarLeft && !selectionActive && !renderHeader && (
          <div className="flex justify-end">
            <UsersTableSortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSortFromDropdown}
              onClear={handleClearSort}
              options={sortOptions}
            />
          </div>
        )}
        <UsersCardView
          users={displayUsers}
          selectionMode={selectionActive}
          selectedIds={selectedIds}
          onToggleSelection={toggleSelection}
        />
        {showPagination && !selectionActive && (
          <ListPagination
            totalCount={users.length}
            pageSize={PAGE_SIZE}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {renderHeader && !selectionActive && renderHeader(sortProps)}
      {renderToolbarRow()}
      {!renderToolbar && !renderToolbarLeft && selectionActive && selectedIds.size > 0 && (
        <div className="flex justify-end">
          <SelectionActionsBar
            selectedCount={selectedIds.size}
            onCancel={cancelSelection}
          />
        </div>
      )}
      {!renderToolbar && !renderToolbarLeft && !selectionActive && !renderHeader && (
        <div className="flex justify-end">
          <UsersTableSortDropdown
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSortFromDropdown}
            onClear={handleClearSort}
            options={sortOptions}
          />
        </div>
      )}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {selectionActive && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      displayUsers.length > 0 &&
                      displayUsers.every((u) => selectedIds.has(u.id))
                    }
                    onCheckedChange={() =>
                      selectAll(displayUsers.map((u) => u.id))
                    }
                    aria-label="すべて選択"
                    className="translate-y-0.5"
                  />
                </TableHead>
              )}
              <TableHead>ID</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>ロール</TableHead>
              <TableHead>登録日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => {
                  if (selectionActive) {
                    toggleSelection(user.id);
                  }
                }}
              >
                {selectionActive && (
                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                    className="w-10"
                  >
                    <Checkbox
                      checked={selectedIds.has(user.id)}
                      onCheckedChange={() => toggleSelection(user.id)}
                      aria-label={`${user.name}を選択`}
                      className="translate-y-0.5"
                    />
                  </TableCell>
                )}
                <TableCell className="font-mono text-muted-foreground">
                  {user.id}
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showPagination && !selectionActive && (
        <ListPagination
          totalCount={users.length}
          pageSize={PAGE_SIZE}
          pageIndex={pageIndex}
          onPageChange={setPageIndex}
        />
      )}
    </div>
  );
}
