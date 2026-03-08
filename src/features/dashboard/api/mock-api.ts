import {
  type Brand,
  type DashboardStats,
  mockBrands,
  mockDashboardStats,
  mockNotifications,
  mockUsers,
  type Notification,
  type User,
} from "@/lib/mock/data";
import { delay } from "@/lib/mock/delay";
import { useMockStore } from "@/stores/use-mock-store";

function getDelayMs() {
  return useMockStore.getState().delayMs;
}

/**
 * ダッシュボード統計を取得（モック）
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
  return delay(getDelayMs(), mockDashboardStats);
}

/**
 * ブランド一覧を取得（モック）
 */
export async function fetchBrands(): Promise<Brand[]> {
  return delay(getDelayMs(), mockBrands);
}

/**
 * ID でブランドを取得（モック）
 */
export async function fetchBrandById(id: string): Promise<Brand | null> {
  const brand = mockBrands.find((b) => b.id === id) ?? null;
  return delay(getDelayMs(), brand);
}

/**
 * ユーザー一覧を取得（モック）
 */
export async function fetchUsers(): Promise<User[]> {
  return delay(getDelayMs(), mockUsers);
}

/**
 * お知らせ一覧を取得（モック）
 */
export async function fetchNotifications(): Promise<Notification[]> {
  return delay(getDelayMs(), mockNotifications);
}

/**
 * ID でお知らせを取得（モック）
 */
export async function fetchNotificationById(id: string): Promise<Notification | null> {
  const notification = mockNotifications.find((n) => n.id === id) ?? null;
  return delay(getDelayMs(), notification);
}
