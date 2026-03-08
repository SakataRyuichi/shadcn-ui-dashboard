import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 統計カードのスケルトン（ゴースト表示）
 */
export function StatCardSkeleton() {
  return (
    <Card size="sm" className="w-fit min-w-40 shrink-0 gap-1 bg-blue-25 py-3">
      <CardHeader className="px-4 pb-1 pt-0">
        <Skeleton className="h-3 w-20" />
      </CardHeader>
      <CardContent className="px-4 py-0">
        <Skeleton className="h-5 w-14" />
      </CardContent>
    </Card>
  );
}
