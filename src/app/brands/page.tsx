import { DashboardLayout } from "@/components/dashboard-layout";
import { BrandsSection } from "@/features/dashboard/components/brands-section";

export default function BrandsPage() {
  return (
    <DashboardLayout breadcrumb={{ items: [{ label: "ブランド一覧" }] }}>
      <BrandsSection />
    </DashboardLayout>
  );
}
