"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDashboardStats } from "../api/use-dashboard-data";
import { StatCardSkeleton } from "./stat-card-skeleton";

const statItems = [
  { label: "登録ブランド数", key: "totalBrands" as const, suffix: "件" },
  { label: "登録ユーザー数", key: "totalUsers" as const, suffix: "人" },
  { label: "直近アクティビティ", key: "recentActivity" as const, suffix: "件" },
] as const;

const COUNT_UP_DURATION_MS = 600;

/**
 * 0 から target までカウントアップする値を返す
 */
function useCountUp(target: number, enabled: boolean): number {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    setDisplayValue(0);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / COUNT_UP_DURATION_MS, 1);
      // easeOutQuart で自然な減速
      const eased = 1 - (1 - progress) ** 4;
      setDisplayValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, enabled]);

  return displayValue;
}

export function StatCards() {
  const { data, isLoading } = useDashboardStats();
  const totalBrands = data?.totalBrands ?? 0;
  const totalUsers = data?.totalUsers ?? 0;
  const recentActivity = data?.recentActivity ?? 0;

  const animatedBrands = useCountUp(totalBrands, !isLoading);
  const animatedUsers = useCountUp(totalUsers, !isLoading);
  const animatedActivity = useCountUp(recentActivity, !isLoading);

  const animatedValues = {
    totalBrands: animatedBrands,
    totalUsers: animatedUsers,
    recentActivity: animatedActivity,
  };

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
              {animatedValues[key]}
              {suffix}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
