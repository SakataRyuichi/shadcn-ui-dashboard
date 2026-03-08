"use client";

import type { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

/**
 * テーブル用ページネーション
 * TanStack Table の pagination 状態と連携
 */
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const { pageIndex } = table.getState().pagination;

  if (pageCount <= 1) {
    return null;
  }

  type PageItem = { type: "page"; value: number } | { type: "ellipsis"; id: string };

  const getPageItems = (): PageItem[] => {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => ({ type: "page" as const, value: i }));
    }
    if (pageIndex <= 2) {
      return [
        { type: "page" as const, value: 0 },
        { type: "page" as const, value: 1 },
        { type: "page" as const, value: 2 },
        { type: "page" as const, value: 3 },
        { type: "ellipsis" as const, id: "ellipsis-end" },
        { type: "page" as const, value: pageCount - 1 },
      ];
    }
    if (pageIndex >= pageCount - 3) {
      return [
        { type: "page" as const, value: 0 },
        { type: "ellipsis" as const, id: "ellipsis-start" },
        { type: "page" as const, value: pageCount - 4 },
        { type: "page" as const, value: pageCount - 3 },
        { type: "page" as const, value: pageCount - 2 },
        { type: "page" as const, value: pageCount - 1 },
      ];
    }
    return [
      { type: "page" as const, value: 0 },
      { type: "ellipsis" as const, id: "ellipsis-start" },
      { type: "page" as const, value: pageIndex - 1 },
      { type: "page" as const, value: pageIndex },
      { type: "page" as const, value: pageIndex + 1 },
      { type: "ellipsis" as const, id: "ellipsis-end" },
      { type: "page" as const, value: pageCount - 1 },
    ];
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>
        {getPageItems().map((item) =>
          item.type === "ellipsis" ? (
            <PaginationItem key={item.id}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${item.value}`}>
              <PaginationLink
                isActive={pageIndex === item.value}
                onClick={() => table.setPageIndex(item.value)}
              >
                {item.value + 1}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
