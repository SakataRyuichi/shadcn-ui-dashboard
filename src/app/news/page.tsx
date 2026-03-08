"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { NotificationCard } from "@/components/notification-card";
import { useNotifications } from "@/features/dashboard/api/use-dashboard-data";
import { DataTableSkeleton } from "@/features/dashboard/components/data-table-skeleton";
import { SectionHeader } from "@/features/dashboard/components/section-header";

export default function NewsPage() {
  const { data: notifications, isLoading } = useNotifications();

  return (
    <DashboardLayout breadcrumb={{ items: [{ label: "お知らせ" }] }}>
      <section>
        <SectionHeader title="お知らせ一覧" />
        {isLoading ? (
          <DataTableSkeleton rows={5} columns={1} />
        ) : (
          <div className="flex flex-col gap-4">
            {notifications?.length === 0 ? (
              <div className="rounded-xl border py-12 text-center text-sm text-muted-foreground">
                お知らせはありません。
              </div>
            ) : (
              notifications?.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  variant="list"
                />
              ))
            )}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
