"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableDateRangeFilter } from "./data-table-date-range-filter";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableSortDropdown, type SortOption } from "./data-table-sort-dropdown";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  /** グローバル検索のプレースホルダー */
  searchPlaceholder?: string;
  /** 検索対象のカラムID */
  searchColumn?: string;
  /** ファセットフィルターの設定 */
  facetedFilters?: {
    columnId: string;
    title: string;
    options: { label: string; value: string; count?: number }[];
  }[];
  /** 日付範囲フィルターの設定（カラムID とタイトル） */
  dateRangeFilter?: {
    columnId: string;
    title?: string;
  };
  /** ソートオプション（指定時はテーブル外にソートUIを表示、テーブル・カード両対応） */
  sortOptions?: SortOption[];
  /** ソートをツールバーに表示するか（false の場合はヘッダー側に表示する想定） */
  showSort?: boolean;
}

/**
 * Tasks サンプルと同様のテーブルツールバー
 * グローバル検索 + ファセットフィルター + 日付範囲フィルター + リセットボタン
 */
export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "検索...",
  searchColumn,
  facetedFilters = [],
  dateRangeFilter,
  sortOptions = [],
  showSort = true,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const searchColumnObj =
    searchColumn && searchColumn.length > 0 ? table.getColumn(searchColumn) : null;

  const dateRangeColumn =
    dateRangeFilter != null ? table.getColumn(dateRangeFilter.columnId) : null;

  const dateRangeValue = dateRangeColumn?.getFilterValue() as
    | { from?: Date; to?: Date }
    | undefined;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {searchColumnObj != null && (
        <Input
          placeholder={searchPlaceholder}
          value={(searchColumnObj.getFilterValue() as string) ?? ""}
          onChange={(e) => searchColumnObj.setFilterValue(e.target.value)}
          className="h-8 w-full text-xs md:w-64"
        />
      )}
      {facetedFilters.map((filter) => {
        const column = table.getColumn(filter.columnId);
        if (!column) return null;

        const selected = (column.getFilterValue() as Set<string>) ?? new Set();
        return (
          <DataTableFacetedFilter
            key={filter.columnId}
            title={filter.title}
            options={filter.options}
            selected={selected}
            onSelectedChange={(value) => column.setFilterValue(value)}
          />
        );
      })}
      {dateRangeColumn != null && dateRangeFilter != null && (
        <DataTableDateRangeFilter
          title={dateRangeFilter.title ?? "登録日"}
          dateRange={dateRangeValue}
          onDateRangeChange={(range) =>
            dateRangeColumn.setFilterValue(
              range?.from != null || range?.to != null ? range : undefined,
            )
          }
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 text-xs lg:px-3"
        >
          リセット
          <X className="ml-2 size-3" />
        </Button>
      )}
      {sortOptions.length > 0 && showSort && (
        <div className="ml-auto">
          <DataTableSortDropdown table={table} options={sortOptions} />
        </div>
      )}
    </div>
  );
}
