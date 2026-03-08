"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ListPaginationProps {
  /** 総件数 */
  totalCount: number;
  /** 1ページあたりの件数 */
  pageSize?: number;
  /** 現在のページ（0始まり） */
  pageIndex: number;
  /** ページ変更時のコールバック */
  onPageChange: (pageIndex: number) => void;
}

/**
 * 配列データ用のページネーション
 * TanStack Table を使わない一覧で使用
 */
export function ListPagination({
  totalCount,
  pageSize = 10,
  pageIndex,
  onPageChange,
}: ListPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));

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
            onClick={() => onPageChange(Math.max(0, pageIndex - 1))}
            disabled={pageIndex === 0}
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
                onClick={() => onPageChange(item.value)}
              >
                {item.value + 1}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(pageCount - 1, pageIndex + 1))}
            disabled={pageIndex >= pageCount - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
