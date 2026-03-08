"use client";

import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Brand } from "@/lib/mock/data";
import { useBrands } from "../api/use-dashboard-data";
import { brandsTableColumns, statusLabels } from "./brands-table-columns";
import { DataTableSkeleton } from "./data-table-skeleton";
import { DataTableToolbar } from "./data-table-toolbar";

function getFacetedOptions(
  data: Brand[],
  accessorKey: keyof Brand,
  labelMap?: Record<string, string>,
) {
  const map = new Map<string, number>();
  for (const row of data) {
    const v = row[accessorKey];
    if (v != null && v !== "") {
      const s = String(v);
      map.set(s, (map.get(s) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([value, count]) => ({
      label: labelMap?.[value] ?? value,
      value,
      count,
    }));
}

interface BrandsTableProps {
  /** フィルター（検索・ファセット・日付範囲）を表示するか。デフォルト: true */
  showFilters?: boolean;
}

export function BrandsTable({ showFilters = true }: BrandsTableProps) {
  const router = useRouter();
  const { data, isLoading } = useBrands();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns: brandsTableColumns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const brands = data ?? [];
  const facetedFilters = useMemo(
    () => [
      {
        columnId: "id",
        title: "ID",
        options: getFacetedOptions(brands, "id"),
      },
      {
        columnId: "status",
        title: "ステータス",
        options: getFacetedOptions(brands, "status", statusLabels),
      },
    ],
    [brands],
  );

  if (isLoading) {
    return <DataTableSkeleton rows={3} columns={5} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {showFilters && (
        <DataTableToolbar
          table={table}
          searchPlaceholder="ブランド名で検索..."
          searchColumn="name"
          facetedFilters={facetedFilters}
          dateRangeFilter={{ columnId: "createdAt", title: "登録日" }}
        />
      )}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => router.push(`/brands/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={brandsTableColumns.length} className="h-24 text-center">
                  該当するブランドがありません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
