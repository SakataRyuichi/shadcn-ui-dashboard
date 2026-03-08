"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBrands, fetchDashboardStats, fetchUsers } from "./mock-api";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  brands: () => [...dashboardKeys.all, "brands"] as const,
  users: () => [...dashboardKeys.all, "users"] as const,
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

export function useUsers() {
  return useQuery({
    queryKey: dashboardKeys.users(),
    queryFn: fetchUsers,
  });
}
