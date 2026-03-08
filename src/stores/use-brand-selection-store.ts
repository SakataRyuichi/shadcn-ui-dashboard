import { create } from "zustand";

interface BrandSelectionState {
  /** 選択モードが有効か */
  isSelectionMode: boolean;
  /** 選択中のID一覧 */
  selectedIds: Set<string>;
  /** 選択モードを切り替える */
  toggleSelectionMode: () => void;
  /** 選択モードを終了する */
  exitSelectionMode: () => void;
  /** 指定IDの選択をトグル */
  toggleSelection: (id: string) => void;
  /** 全選択 */
  selectAll: (ids: string[]) => void;
  /** 選択をクリア */
  clearSelection: () => void;
  /** 選択をクリアして選択モードを終了 */
  cancelSelection: () => void;
}

export const useBrandSelectionStore = create<BrandSelectionState>((set) => ({
  isSelectionMode: false,
  selectedIds: new Set(),

  toggleSelectionMode: () =>
    set((state) => ({
      isSelectionMode: !state.isSelectionMode,
      selectedIds: new Set(),
    })),

  exitSelectionMode: () =>
    set({
      isSelectionMode: false,
      selectedIds: new Set(),
    }),

  toggleSelection: (id) =>
    set((state) => {
      const next = new Set(state.selectedIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { selectedIds: next };
    }),

  selectAll: (ids) =>
    set((state) => {
      const current = state.selectedIds;
      const allSelected = ids.every((id) => current.has(id));
      return {
        selectedIds: allSelected ? new Set() : new Set(ids),
      };
    }),

  clearSelection: () => set({ selectedIds: new Set() }),

  cancelSelection: () =>
    set({
      isSelectionMode: false,
      selectedIds: new Set(),
    }),
}));
