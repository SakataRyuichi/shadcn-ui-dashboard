"use client";

import { BrandsTable } from "./brands-table";
import { StatCards } from "./stat-cards";
import { UsersTable } from "./users-table";

/**
 * ダッシュボードのメインコンテンツ
 * 統計カード・テーブルを表示（fetch 中はスケルトン表示）
 */
export function DashboardContent() {
  return (
    <div className="flex flex-col gap-6">
      <StatCards />
      <section>
        <h2 className="mb-4 text-lg font-semibold">ブランド一覧</h2>
        <BrandsTable />
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">ユーザー一覧</h2>
        <UsersTable />
      </section>
    </div>
  );
}
