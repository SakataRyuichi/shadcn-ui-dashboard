import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

/**
 * ダッシュボードレイアウト
 * サイドバー・ヘッダー・パンくず・コンテンツ領域を提供
 *
 * @param breadcrumb - パンくずリスト（Commune Engage 以降の項目）
 * @param children - メインコンテンツ
 */
export function DashboardLayout({
  breadcrumb,
  children,
}: {
  breadcrumb: { items: { label: string; href?: string }[] };
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-10 shrink-0 items-center gap-2 border-b bg-background">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-2" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Commune Engage</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumb.items.flatMap((item) => [
                  <BreadcrumbSeparator
                    key={`sep-${item.label}-${item.href ?? "current"}`}
                    className="hidden md:block"
                  />,
                  <BreadcrumbItem key={`${item.label}-${item.href ?? "current"}`}>
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>,
                ])}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
