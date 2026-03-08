import { DashboardLayout } from "@/components/dashboard-layout";

export default function BrandRegisterPage() {
  return (
    <DashboardLayout
      breadcrumb={{
        items: [{ label: "ブランド一覧", href: "/brands" }, { label: "ブランド登録" }],
      }}
    >
      <div />
    </DashboardLayout>
  );
}
