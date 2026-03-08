/**
 * モックデータ定義
 * 本番 API 接続前に仮データとして使用
 */

export interface Brand {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface DashboardStats {
  totalBrands: number;
  totalUsers: number;
  recentActivity: number;
}

export const mockBrands: Brand[] = [
  {
    id: "1",
    name: "サンプルブランドA",
    description: "テスト用ブランドの説明",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "サンプルブランドB",
    description: "2つ目のテストブランド",
    createdAt: "2025-02-20",
  },
  {
    id: "3",
    name: "サンプルブランドC",
    description: "3つ目のサンプルデータ",
    createdAt: "2025-03-01",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "山田 太郎",
    email: "yamada@example.com",
    role: "管理者",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    name: "佐藤 花子",
    email: "sato@example.com",
    role: "一般",
    createdAt: "2025-02-05",
  },
  {
    id: "3",
    name: "鈴木 一郎",
    email: "suzuki@example.com",
    role: "一般",
    createdAt: "2025-03-01",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalBrands: mockBrands.length,
  totalUsers: mockUsers.length,
  recentActivity: 12,
};
