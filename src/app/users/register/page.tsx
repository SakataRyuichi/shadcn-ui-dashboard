import { DashboardLayout } from "@/components/dashboard-layout";

export default function UserRegisterPage() {
  return (
    <DashboardLayout
      breadcrumb={{
        items: [{ label: "ユーザー一覧", href: "/users" }, { label: "ユーザー登録" }],
      }}
    >
      <div />
    </DashboardLayout>
  );
}
