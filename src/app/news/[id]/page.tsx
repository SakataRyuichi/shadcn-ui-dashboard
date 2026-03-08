"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { NotificationCard } from "@/components/notification-card";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/features/dashboard/api/use-dashboard-data";

export default function NewsDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const { data: notification, isLoading } = useNotification(id);

  if (isLoading) {
    return (
      <DashboardLayout
        breadcrumb={{ items: [{ label: "お知らせ", href: "/news" }, { label: "詳細" }] }}
      >
        <div className="h-48 animate-pulse rounded-xl bg-muted/50" />
      </DashboardLayout>
    );
  }

  if (!notification) {
    return (
      <DashboardLayout
        breadcrumb={{ items: [{ label: "お知らせ", href: "/news" }, { label: "詳細" }] }}
      >
        <div className="rounded-xl border py-12 text-center text-sm text-muted-foreground">
          お知らせが見つかりません。
        </div>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/news">一覧に戻る</Link>
        </Button>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      breadcrumb={{
        items: [{ label: "お知らせ", href: "/news" }, { label: "詳細" }],
      }}
    >
      <div className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" className="-ml-2 w-fit" asChild>
          <Link href="/news" className="gap-2">
            <ChevronLeft className="size-4" />
            一覧に戻る
          </Link>
        </Button>
        <NotificationCard notification={notification} variant="detail" />
      </div>
    </DashboardLayout>
  );
}
