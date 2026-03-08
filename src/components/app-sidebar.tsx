"use client";

import { BookOpen, ChevronRight, Home, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { EngageLogo } from "@/components/engage-logo";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { NavUser } from "@/components/nav-user";
import { useSidebar } from "@/components/ui/sidebar";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
} from "@/components/ui/sidebar";

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
      url: "#",
      icon: <ShieldCheck className="size-4" />,
      items: [
        { title: "ブランド登録", url: "#" },
        { title: "ブランド一覧", url: "#" },
      ],
    },
    {
      title: "ユーザー",
      url: "#",
      icon: <Users className="size-4" />,
      items: [
        { title: "ユーザー登録", url: "#" },
        { title: "ユーザー一覧", url: "#" },
      ],
    },
    {
      title: "その他",
      url: "#",
      icon: <BookOpen className="size-4" />,
      items: [
        { title: "スクリプト", url: "#" },
        { title: "利用規約", url: "#" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: user, isLoading } = useCurrentUser();
  const { state } = useSidebar();
  const pathname = usePathname();
  const isCollapsed = state === "collapsed";

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
                  defaultOpen={false}
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
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>{subItem.title}</a>
                            </SidebarMenuSubButton>
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
