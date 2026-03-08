/**
 * モックデータ定義
 * 本番 API 接続前に仮データとして使用
 */

export type BrandStatus = "active" | "inactive" | "pending";

export interface Brand {
  id: string;
  name: string;
  description: string;
  status: BrandStatus;
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

const brandPrefixes = [
  "サンプルブランド",
  "テストブランド",
  "デモブランド",
  "サンクス",
  "エンゲージ",
  "コミューン",
  "スタジオ",
  "ラボ",
  "ワークス",
  "クリエイティブ",
];

const statuses: BrandStatus[] = ["active", "inactive", "pending"];

function generateBrands(count: number): Brand[] {
  return Array.from({ length: count }, (_, i) => {
    const id = String(i + 1);
    const prefix = brandPrefixes[i % brandPrefixes.length];
    const group = Math.floor(i / brandPrefixes.length);
    const name = group > 0 ? `${prefix} ${group + 1}` : prefix;
    return {
      id,
      name,
      description: `ID ${id} のテスト用ブランド説明です。`,
      status: statuses[i % statuses.length],
      createdAt: `2025-${String(Math.floor(i / 10) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    };
  });
}

const userNames = [
  "山田",
  "佐藤",
  "鈴木",
  "高橋",
  "田中",
  "伊藤",
  "渡辺",
  "中村",
  "小林",
  "加藤",
  "吉田",
  "山本",
  "松本",
  "井上",
  "木村",
  "林",
  "斎藤",
  "清水",
  "山崎",
  "森",
  "阿部",
  "池田",
  "橋本",
  "石川",
  "前田",
  "藤田",
  "岡田",
  "後藤",
  "長谷川",
  "村上",
];

const userSuffixes = [
  "太郎",
  "花子",
  "一郎",
  "次郎",
  "三郎",
  "美咲",
  "翔太",
  "さくら",
  "健太",
  "優子",
];

const roles = ["管理者", "一般", "編集者", "閲覧者"];

function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => {
    const id = String(i + 1);
    const nameIdx = i % userNames.length;
    const suffixIdx = Math.floor(i / userNames.length) % userSuffixes.length;
    const name = `${userNames[nameIdx]} ${userSuffixes[suffixIdx]}`;
    const email = `user${i + 1}@example.com`;
    return {
      id,
      name,
      email,
      role: roles[i % roles.length],
      createdAt: `2025-${String(Math.floor(i / 10) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    };
  });
}

export const mockBrands: Brand[] = generateBrands(50);
export const mockUsers: User[] = generateUsers(50);

export const mockDashboardStats: DashboardStats = {
  totalBrands: mockBrands.length,
  totalUsers: mockUsers.length,
  recentActivity: 12,
};
