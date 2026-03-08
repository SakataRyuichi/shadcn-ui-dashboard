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
      <div className="grid gap-4 md:grid-cols-3">
        {statItems.map((item) => (
          <StatCardSkeleton key={item.key} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statItems.map(({ label, key, suffix }) => (
        <Card key={key}>
          <CardHeader className="pb-2">
            <p className="text-sm text-foreground">{label}</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {data?.[key] ?? 0}
              {suffix}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
