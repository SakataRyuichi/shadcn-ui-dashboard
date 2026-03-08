import { DashboardLayout } from "@/components/dashboard-layout";
import { SectionHeader } from "@/features/dashboard/components/section-header";

export default function SettingsPage() {
  return (
    <DashboardLayout breadcrumb={{ items: [{ label: "設定" }] }}>
      <section>
        <SectionHeader title="設定" />
        <p className="text-sm text-muted-foreground">設定画面は準備中です。</p>
      </section>
    </DashboardLayout>
  );
}
