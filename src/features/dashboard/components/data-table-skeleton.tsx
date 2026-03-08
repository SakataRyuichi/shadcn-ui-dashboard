import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  /** 行数 */
  rows?: number;
  /** 列数 */
  columns?: number;
}

/**
 * データテーブルのスケルトン（ゴースト表示）
 */
export function DataTableSkeleton({ rows = 5, columns = 4 }: DataTableSkeletonProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: スケルトンは静的プレースホルダーで並び替えがないため
              <TableHead key={`skeleton-col-${i}`}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: スケルトンは静的プレースホルダーで並び替えがないため
            <TableRow key={`skeleton-row-${rowIndex}`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: スケルトンは静的プレースホルダーで並び替えがないため
                <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                  <Skeleton className="h-4 min-w-16 max-w-32" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
