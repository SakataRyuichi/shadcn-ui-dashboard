"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDashboardStats } from "../api/use-dashboard-data";
import { StatCardSkeleton } from "./stat-card-skeleton";

const statItems = [
  { label: "登録ブランド数", key: "totalBrands" as const, suffix: "件" },
  { label: "登録ユーザー数", key: "totalUsers" as const, suffix: "人" },
  { label: "直近アクティビティ", key: "recentActivity" as const, suffix: "件" },
] as const;

export function StatCards() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {statItems.map((item) => (
          <StatCardSkeleton key={item.key} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {statItems.map(({ label, key, suffix }) => (
        <Card key={key} size="sm" className="w-fit min-w-40 shrink-0 gap-1 bg-blue-25 py-3">
          <CardHeader className="px-4 pb-1 pt-0">
            <p className="text-xs text-foreground">{label}</p>
          </CardHeader>
          <CardContent className="px-4 py-0">
            <p className="text-lg font-bold">
              {data?.[key] ?? 0}
              {suffix}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
