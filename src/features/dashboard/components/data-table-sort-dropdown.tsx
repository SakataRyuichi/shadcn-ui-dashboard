"use client";

import type { Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface SortOption {
  /** カラムID */
  id: string;
  /** 表示ラベル */
  label: string;
}

interface DataTableSortDropdownProps<TData> {
  table: Table<TData>;
  /** ソート可能なカラムの一覧 */
  options: SortOption[];
}

/**
 * テーブル外に配置するソート用ドロップダウン
 * テーブル・カード両ビューで共通利用可能
 */
export function DataTableSortDropdown<TData>({
  table,
  options,
}: DataTableSortDropdownProps<TData>) {
  const sorting = table.getState().sorting;
  const current = sorting[0];
  const currentOption = options.find((o) => o.id === current?.id);
  const isAsc = current?.desc === false;

  const label = currentOption ? `${currentOption.label} ${isAsc ? "昇順" : "降順"}` : "ソート";

  const handleSort = (columnId: string, desc: boolean) => {
    table.setSorting([{ id: columnId, desc }]);
  };

  const handleClear = () => {
    table.resetSorting();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
          {current ? (
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
            onClick={() => handleSort(opt.id, false)}
            className="text-xs"
          >
            <ArrowUp className="mr-2 size-3" />
            {opt.label} 昇順
          </DropdownMenuItem>
        ))}
        {options.map((opt) => (
          <DropdownMenuItem
            key={`${opt.id}-desc`}
            onClick={() => handleSort(opt.id, true)}
            className="text-xs"
          >
            <ArrowDown className="mr-2 size-3" />
            {opt.label} 降順
          </DropdownMenuItem>
        ))}
        {current && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClear} className="text-xs">
              <ArrowUpDown className="mr-2 size-3" />
              ソート解除
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
