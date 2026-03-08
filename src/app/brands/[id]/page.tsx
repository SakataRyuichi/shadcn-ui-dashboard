import { DashboardLayout } from "@/components/dashboard-layout";
import { BrandDetailContent } from "@/features/dashboard/components/brand-detail-content";

type BrandDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { id } = await params;

  return (
    <DashboardLayout
      breadcrumb={{
        items: [{ label: "ブランド一覧", href: "/brands" }, { label: "ブランド詳細" }],
      }}
    >
      <BrandDetailContent brandId={id} />
    </DashboardLayout>
  );
}
