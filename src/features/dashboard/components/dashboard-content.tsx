"use client";

import { ViewModeToggle } from "@/components/ui/view-mode-toggle";
import { DataTableSortDropdown } from "./data-table-sort-dropdown";
import { BrandsTable } from "./brands-table";
import { LatestNews } from "./latest-news";
import { SectionHeader } from "./section-header";
import { StatCards } from "./stat-cards";
import { SupportSection } from "./support-section";
import { UsersTable } from "./users-table";
import { UsersTableSortDropdown } from "./users-table-sort-dropdown";
import { WelcomeMessage } from "./welcome-message";

/**
 * ダッシュボードのメインコンテンツ
 * 統計カード・テーブルを表示（fetch 中はスケルトン表示）
 */
export function DashboardContent() {
  return (
    <div className="flex flex-col gap-6">
      <WelcomeMessage />
      <section>
        <LatestNews />
      </section>
      <section>
        <SectionHeader title="アクティビティ" />
        <StatCards />
      </section>
      <section>
        <BrandsTable
          showFilters={false}
          showPagination={false}
          limit={5}
          renderHeader={() => (
            <SectionHeader title="ブランド一覧" href="/brands" />
          )}
          renderToolbar={(table, sortOptions) => (
            <div className="flex h-9 items-center gap-2">
              <DataTableSortDropdown table={table} options={sortOptions} />
              <ViewModeToggle />
            </div>
          )}
        />
      </section>
      <section>
        <UsersTable
          showPagination={false}
          limit={5}
          renderHeader={() => (
            <SectionHeader title="ユーザー一覧" href="/users" />
          )}
          renderToolbar={(sortProps) => (
            <div className="flex h-9 items-center gap-2">
              <UsersTableSortDropdown
                sortBy={sortProps.sortBy}
                sortOrder={sortProps.sortOrder}
                onSort={sortProps.onSort}
                onClear={sortProps.onClear}
                options={sortProps.options}
              />
              <ViewModeToggle />
            </div>
          )}
        />
      </section>
      <section>
        <SupportSection />
      </section>
    </div>
  );
}
