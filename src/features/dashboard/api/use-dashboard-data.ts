"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchBrandById,
  fetchBrands,
  fetchDashboardStats,
  fetchNotificationById,
  fetchNotifications,
  fetchUsers,
} from "./mock-api";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  brands: () => [...dashboardKeys.all, "brands"] as const,
  brand: (id: string) => [...dashboardKeys.all, "brand", id] as const,
  users: () => [...dashboardKeys.all, "users"] as const,
  notifications: () => [...dashboardKeys.all, "notifications"] as const,
  notification: (id: string) => [...dashboardKeys.all, "notification", id] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: fetchDashboardStats,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: dashboardKeys.brands(),
    queryFn: fetchBrands,
  });
}

export function useBrand(id: string | null) {
  return useQuery({
    queryKey: dashboardKeys.brand(id ?? ""),
    queryFn: () => {
      if (!id) throw new Error("id is required");
      return fetchBrandById(id);
    },
    enabled: !!id,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: dashboardKeys.users(),
    queryFn: fetchUsers,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: dashboardKeys.notifications(),
    queryFn: fetchNotifications,
  });
}

export function useNotification(id: string | null) {
  return useQuery({
    queryKey: dashboardKeys.notification(id ?? ""),
    queryFn: () => {
      if (!id) throw new Error("id is required");
      return fetchNotificationById(id);
    },
    enabled: !!id,
  });
}
