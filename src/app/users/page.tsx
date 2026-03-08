import { DashboardLayout } from "@/components/dashboard-layout";
import { UsersSection } from "@/features/dashboard/components/users-section";

export default function UsersPage() {
  return (
    <DashboardLayout breadcrumb={{ items: [{ label: "ユーザー一覧" }] }}>
      <UsersSection />
    </DashboardLayout>
  );
}
