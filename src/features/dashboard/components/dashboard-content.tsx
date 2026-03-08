"use client";

import { BrandsTable } from "./brands-table";
import { LatestNews } from "./latest-news";
import { SectionHeader } from "./section-header";
import { StatCards } from "./stat-cards";
import { UsersTable } from "./users-table";
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
        <SectionHeader title="ブランド一覧" href="/brands" />
        <BrandsTable showFilters={false} />
      </section>
      <section>
        <SectionHeader title="ユーザー一覧" href="/users" />
        <UsersTable />
      </section>
    </div>
  );
}
