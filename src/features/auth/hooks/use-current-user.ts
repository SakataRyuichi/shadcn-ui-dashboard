"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/current-user";

/**
 * 現在ログイン中のユーザーを取得するフック
 * API レスポンスを TanStack Query でキャッシュ
 *
 * @returns 現在ユーザーのクエリ結果
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
}
