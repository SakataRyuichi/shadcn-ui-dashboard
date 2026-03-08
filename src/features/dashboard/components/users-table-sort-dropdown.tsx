"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortOrder = "asc" | "desc" | null;

export interface UsersSortOption {
  id: string;
  label: string;
}

interface UsersTableSortDropdownProps {
  sortBy: string | null;
  sortOrder: SortOrder;
  onSort: (columnId: string, desc: boolean) => void;
  onClear: () => void;
  options: UsersSortOption[];
}

/**
 * ユーザーテーブル用のソートドロップダウン
 * テーブル・カード両ビューで共通利用可能
 */
export function UsersTableSortDropdown({
  sortBy,
  sortOrder,
  onSort,
  onClear,
  options,
}: UsersTableSortDropdownProps) {
  const currentOption = options.find((o) => o.id === sortBy);
  const isAsc = sortOrder === "asc";

  const label = currentOption ? `${currentOption.label} ${isAsc ? "昇順" : "降順"}` : "ソート";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
          {sortOrder ? (
            isAsc ? (
              <ArrowUp className="size-3" />
            ) : (
              <ArrowDown className="size-3" />
            )
          ) : (
            <ArrowUpDown className="size-3" />
          )}
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 text-xs">
        {options.map((opt) => (
          <DropdownMenuItem
            key={`${opt.id}-asc`}
            onClick={() => onSort(opt.id, false)}
            className="text-xs"
          >
            <ArrowUp className="mr-2 size-3" />
            {opt.label} 昇順
          </DropdownMenuItem>
        ))}
        {options.map((opt) => (
          <DropdownMenuItem
            key={`${opt.id}-desc`}
            onClick={() => onSort(opt.id, true)}
            className="text-xs"
          >
            <ArrowDown className="mr-2 size-3" />
            {opt.label} 降順
          </DropdownMenuItem>
        ))}
        {sortBy && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClear} className="text-xs">
              <ArrowUpDown className="mr-2 size-3" />
              ソート解除
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
