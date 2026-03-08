"use client";

import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { parse, startOfDay } from "date-fns";
import type { Brand, BrandStatus } from "@/lib/mock/data";
import { BrandStatusBadge } from "./brand-status-badge";

/**
 * マルチセレクト用のカスタムフィルター関数
 * filterValue が Set で空でない場合、その Set に含まれる値のみ表示
 */
export const multiSelectFilterFn: FilterFn<Brand> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId) as string;
  const selected = filterValue as Set<string> | undefined;
  if (!selected || selected.size === 0) return true;
  return selected.has(value);
};

/** 日付範囲フィルターの値の型 */
export interface DateRangeFilterValue {
  from?: Date;
  to?: Date;
}

function toDate(d: Date | string | undefined): Date | undefined {
  if (d == null) return undefined;
  if (d instanceof Date) return d;
  try {
    return parse(String(d).slice(0, 10), "yyyy-MM-dd", new Date());
  } catch {
    return undefined;
  }
}

/**
 * 日付範囲用のカスタムフィルター関数
 * createdAt など YYYY-MM-DD 形式の文字列を対象
 */
export const dateRangeFilterFn: FilterFn<Brand> = (row, columnId, filterValue) => {
  const range = filterValue as DateRangeFilterValue | undefined;
  if (!range || (!range.from && !range.to)) return true;

  const value = row.getValue(columnId) as string;
  if (!value) return false;

  let rowDate: Date;
  try {
    rowDate = startOfDay(parse(value, "yyyy-MM-dd", new Date()));
  } catch {
    return false;
  }

  const from = toDate(range.from);
  const to = toDate(range.to);
  if (from != null && rowDate < startOfDay(from)) return false;
  if (to != null && rowDate > startOfDay(to)) return false;
  return true;
};

/** フィルター用のステータスラベル */
export const statusLabels: Record<BrandStatus, string> = {
  active: "有効",
  inactive: "無効",
  pending: "保留中",
};

/**
 * ブランドテーブルのカラム定義
 */
export const brandsTableColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "id",
    header: "ID",
    filterFn: multiSelectFilterFn,
    sortingFn: "alphanumeric",
    cell: ({ row }) => (
      <span className="font-mono text-muted-foreground">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "ブランド名",
    sortingFn: "alphanumeric",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "description",
    header: "説明",
    filterFn: multiSelectFilterFn,
    sortingFn: "alphanumeric",
    cell: ({ row }) => <span className="text-foreground">{row.getValue("description")}</span>,
  },
  {
    accessorKey: "status",
    header: "ステータス",
    filterFn: multiSelectFilterFn,
    sortingFn: "alphanumeric",
    cell: ({ row }) => {
      const status = row.getValue("status") as BrandStatus;
      return <BrandStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "登録日",
    filterFn: dateRangeFilterFn,
    sortingFn: "alphanumeric",
    cell: ({ row }) => <span>{row.getValue("createdAt")}</span>,
  },
];
