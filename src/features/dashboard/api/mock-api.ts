import {
  type Brand,
  type DashboardStats,
  mockBrands,
  mockDashboardStats,
  mockUsers,
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
 * ユーザー一覧を取得（モック）
 */
export async function fetchUsers(): Promise<User[]> {
  return delay(getDelayMs(), mockUsers);
}
