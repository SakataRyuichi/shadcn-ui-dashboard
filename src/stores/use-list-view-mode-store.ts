import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ListViewMode = "table" | "card";

const STORAGE_KEY = "list-view-mode";

interface ListViewModeState {
  /** 一覧の表示スタイル */
  mode: ListViewMode;
  /** 表示スタイルを切り替え */
  setMode: (mode: ListViewMode) => void;
}

/**
 * 一覧表示のスタイル（テーブル/カード）を管理する zustand ストア
 * 最後に選択した表示を localStorage で永続化
 */
export const useListViewModeStore = create<ListViewModeState>()(
  persist(
    (set) => ({
      mode: "table",
      setMode: (mode) => set({ mode }),
    }),
    { name: STORAGE_KEY },
  ),
);
