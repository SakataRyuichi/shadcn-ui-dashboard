"use client";

import type { ColumnDef, Table as TanStackTable } from "@tanstack/react-table";
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewModeToggle } from "@/components/ui/view-mode-toggle";
import type { Brand } from "@/lib/mock/data";
import { useBrandSelectionStore } from "@/stores/use-brand-selection-store";
import { useListViewModeStore } from "@/stores/use-list-view-mode-store";
import { useBrands } from "../api/use-dashboard-data";
import { BrandsCardView } from "./brands-card-view";
import { brandsTableColumns, statusLabels } from "./brands-table-columns";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSkeleton } from "./data-table-skeleton";
import { DataTableSortDropdown } from "./data-table-sort-dropdown";
import { DataTableToolbar } from "./data-table-toolbar";
import { SelectionActionsBar } from "./selection-actions-bar";

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
  /** ページネーションを表示するか。デフォルト: true（ホームでは false） */
  showPagination?: boolean;
  /** 表示件数の上限（ホームなどで指定、未指定時は全件またはページネーションに従う） */
  limit?: number;
  /** 選択モードを有効にするか。デフォルト: false */
  enableSelectionMode?: boolean;
  /** レイヤー1: タイトル行（タイトルと新規登録を並べて表示） */
  renderHeader?: (
    table: TanStackTable<Brand>,
    sortOptions: { id: string; label: string }[],
  ) => React.ReactNode;
  /**
   * レイヤー2: ツールバー行の左側（選択UI）。
   * 指定時は [選択 | Separator | フィルター | ソート | ViewModeToggle] の順で表示。
   */
  renderToolbarLeft?: (ctx: {
    selectionActive: boolean;
    selectedCount: number;
    enterSelectionMode: () => void;
    cancelSelection: () => void;
  }) => React.ReactNode;
  /**
   * レイヤー2: ツールバー行の全体を上書き（ダッシュボード等で使用）。
   * 指定時は DataTableToolbar は表示しない。
   */
  renderToolbar?: (
    table: TanStackTable<Brand>,
    sortOptions: { id: string; label: string }[],
  ) => React.ReactNode;
}

function createSelectionColumn(
  selectedIds: Set<string>,
  onToggle: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnDef<Brand> {
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
  return {
    id: "select",
    header: () => (
      <Checkbox
        checked={allSelected}
        onCheckedChange={() => onSelectAll(allIds)}
        aria-label="すべて選択"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.has(row.original.id)}
        onCheckedChange={() => onToggle(row.original.id)}
        aria-label={`${row.original.name}を選択`}
        className="translate-y-0.5"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

export function BrandsTable({
  showFilters = true,
  showPagination = true,
  limit,
  enableSelectionMode = false,
  renderHeader,
  renderToolbar,
  renderToolbarLeft,
}: BrandsTableProps) {
  const router = useRouter();
  const { data, isLoading } = useBrands();
  const isSelectionMode = useBrandSelectionStore((s) => s.isSelectionMode);
  const selectedIds = useBrandSelectionStore((s) => s.selectedIds);
  const toggleSelection = useBrandSelectionStore((s) => s.toggleSelection);
  const selectAll = useBrandSelectionStore((s) => s.selectAll);
  const cancelSelection = useBrandSelectionStore((s) => s.cancelSelection);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns: brandsTableColumns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: limit ?? (showPagination ? 10 : 50) },
    },
    state: {
      columnFilters,
      sorting,
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

  const sortOptions = [
    { id: "id", label: "ID" },
    { id: "name", label: "ブランド名" },
    { id: "description", label: "説明" },
    { id: "status", label: "ステータス" },
    { id: "createdAt", label: "登録日" },
  ];

  const mode = useListViewModeStore((s) => s.mode);
  const selectionActive = enableSelectionMode && isSelectionMode;
  const toggleSelectionMode = useBrandSelectionStore((s) => s.toggleSelectionMode);
  const filteredBrands = (
    selectionActive ? table.getPrePaginationRowModel().rows : table.getRowModel().rows
  ).map((row) => row.original);
  const columns = useMemo(() => {
    if (!selectionActive) return brandsTableColumns;
    const selectionCol = createSelectionColumn(
      selectedIds,
      toggleSelection,
      selectAll,
      filteredBrands.map((b) => b.id),
    );
    return [selectionCol, ...brandsTableColumns];
  }, [selectionActive, selectedIds, toggleSelection, selectAll, filteredBrands]);

  const tableWithSelection = useReactTable({
    data: data ?? [],
    columns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: selectionActive ? 9999 : (limit ?? (showPagination ? 10 : 50)),
      },
    },
    state: {
      columnFilters,
      sorting,
    },
  });

  const displayTable = selectionActive ? tableWithSelection : table;

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
          {renderToolbar(table, sortOptions)}
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
          {showFilters && !selectionActive && (
            <DataTableToolbar
              table={table}
              searchPlaceholder="ブランド名で検索..."
              searchColumn="name"
              facetedFilters={facetedFilters}
              dateRangeFilter={{ columnId: "createdAt", title: "登録日" }}
              sortOptions={sortOptions}
              showSort={false}
            />
          )}
          <div className="ml-auto flex items-center gap-2">
            <DataTableSortDropdown table={table} options={sortOptions} />
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
      <div className="flex flex-col gap-2">
        {renderHeader && renderHeader(table, sortOptions)}
        {renderToolbarRow()}
        {!renderToolbar && !renderToolbarLeft && selectionActive && selectedIds.size > 0 && (
          <div className="flex justify-end">
            <SelectionActionsBar selectedCount={selectedIds.size} onCancel={cancelSelection} />
          </div>
        )}
        {!renderToolbar && !renderToolbarLeft && showFilters && !selectionActive && (
          <DataTableToolbar
            table={table}
            searchPlaceholder="ブランド名で検索..."
            searchColumn="name"
            facetedFilters={facetedFilters}
            dateRangeFilter={{ columnId: "createdAt", title: "登録日" }}
            sortOptions={sortOptions}
            showSort={!renderHeader}
          />
        )}
        <BrandsCardView
          brands={filteredBrands}
          selectionMode={selectionActive}
          selectedIds={selectedIds}
          onToggleSelection={toggleSelection}
        />
        {showPagination && !selectionActive && <DataTablePagination table={table} />}
      </div>
    );
  }

  const colSpan = selectionActive ? columns.length : brandsTableColumns.length;

  return (
    <div className="flex flex-col gap-2">
      {renderHeader && renderHeader(table, sortOptions)}
      {renderToolbarRow()}
      {!renderToolbar && !renderToolbarLeft && selectionActive && selectedIds.size > 0 && (
        <div className="flex justify-end">
          <SelectionActionsBar selectedCount={selectedIds.size} onCancel={cancelSelection} />
        </div>
      )}
      {!renderToolbar && !renderToolbarLeft && showFilters && !selectionActive && (
        <DataTableToolbar
          table={table}
          searchPlaceholder="ブランド名で検索..."
          searchColumn="name"
          facetedFilters={facetedFilters}
          dateRangeFilter={{ columnId: "createdAt", title: "登録日" }}
          sortOptions={sortOptions}
          showSort={!renderHeader}
        />
      )}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {displayTable.getHeaderGroups().map((headerGroup) => (
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
            {displayTable.getRowModel().rows?.length ? (
              displayTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => {
                    if (selectionActive) {
                      toggleSelection(row.original.id);
                    } else {
                      router.push(`/brands/${row.original.id}`);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={
                        selectionActive && cell.column.id === "select"
                          ? (e) => e.stopPropagation()
                          : undefined
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={colSpan} className="h-24 text-center">
                  該当するブランドがありません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && !selectionActive && <DataTablePagination table={table} />}
    </div>
  );
}
