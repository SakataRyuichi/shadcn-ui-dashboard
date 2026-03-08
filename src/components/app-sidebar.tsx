"use client";

import { BookOpen, ChevronRight, Home, Settings, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { EngageLogo } from "@/components/engage-logo";
import { NavUser } from "@/components/nav-user";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useBrandRegisterModalStore } from "@/stores/use-brand-register-modal-store";
import { useSidebarMenuStore } from "@/stores/use-sidebar-menu-store";

// サイドメニュー構成（docs/requirements/sidebar-menu.md 参照）
const data = {
  navMain: [
    {
      title: "ホーム",
      url: "/",
      icon: <Home className="size-4" />,
    },
    {
      title: "ブランド",
      url: "/brands",
      icon: <ShieldCheck className="size-4" />,
      items: [
        { title: "ブランド登録", url: "/brands/register", openModal: "brandRegister" as const },
        { title: "ブランド一覧", url: "/brands" },
      ],
    },
    {
      title: "ユーザー",
      url: "/users",
      icon: <Users className="size-4" />,
      items: [
        { title: "ユーザー登録", url: "/users/register" },
        { title: "ユーザー一覧", url: "/users" },
      ],
    },
    {
      title: "その他",
      url: "#",
      icon: <BookOpen className="size-4" />,
      items: [
        { title: "スクリプト", url: "/scripts" },
        { title: "利用規約", url: "/terms" },
      ],
    },
  ],
};

/** 現在のパスが指定メニューの配下かどうかを判定する */
function isPathUnderMenu(
  pathname: string,
  item: { url: string; items?: { url: string }[] },
): boolean {
  if (!item.items) return false;
  return item.items.some((sub) => pathname === sub.url || pathname.startsWith(`${sub.url}/`));
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: user, isLoading } = useCurrentUser();
  const { state } = useSidebar();
  const pathname = usePathname();
  const isCollapsed = state === "collapsed";
  const { setMenuOpen, isMenuOpen } = useSidebarMenuStore();
  const openBrandRegisterModal = useBrandRegisterModalStore((s) => s.open);

  // 下層ページに遷移した際、アクティブな親メニューを展開状態にする
  useEffect(() => {
    for (const item of data.navMain) {
      if ("items" in item && item.items && isPathUnderMenu(pathname, item)) {
        setMenuOpen(item.title, true);
        break;
      }
    }
  }, [pathname, setMenuOpen]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-14 min-w-0 items-center justify-start px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <EngageLogo collapsed={isCollapsed} />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) =>
              "items" in item && item.items ? (
                <Collapsible
                  key={item.title}
                  asChild
                  open={isMenuOpen(item.title, isPathUnderMenu(pathname, item))}
                  onOpenChange={(open) => setMenuOpen(item.title, open)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            {"openModal" in subItem && subItem.openModal === "brandRegister" ? (
                              <SidebarMenuSubButton
                                onClick={openBrandRegisterModal}
                                isActive={false}
                              >
                                {subItem.title}
                              </SidebarMenuSubButton>
                            ) : (
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            )}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url
                        ? "data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:[&_svg]:text-primary-foreground data-[active]:hover:bg-primary/90 data-[active]:hover:text-primary-foreground data-[active]:hover:[&_svg]:text-primary-foreground"
                        : undefined
                    }
                  >
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="設定"
              isActive={pathname === "/settings"}
              className={
                pathname === "/settings"
                  ? "data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:[&_svg]:text-primary-foreground data-[active]:hover:bg-primary/90 data-[active]:hover:text-primary-foreground data-[active]:hover:[&_svg]:text-primary-foreground"
                  : undefined
              }
            >
              <Link href="/settings">
                <Settings className="size-4" />
                <span>設定</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="mx-2" />
        {user ? (
          <NavUser user={user} />
        ) : isLoading ? (
          <NavUser
            user={{
              name: "読み込み中...",
              email: "",
              avatar: "",
            }}
          />
        ) : null}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
