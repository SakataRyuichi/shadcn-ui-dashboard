import { create } from "zustand";

interface SidebarMenuState {
  /** 各メニューグループの展開状態（キー: メニュータイトル） */
  openMenus: Record<string, boolean>;
  /** メニューの展開状態を設定する */
  setMenuOpen: (key: string, open: boolean) => void;
  /** メニューが展開されているか取得（未設定時は defaultValue を返す） */
  isMenuOpen: (key: string, defaultValue: boolean) => boolean;
}

/**
 * サイドバーメニューの展開状態を管理する zustand ストア
 *
 * ページ遷移時も展開状態を維持し、下層ページではアクティブな親メニューを展開したままにする。
 */
export const useSidebarMenuStore = create<SidebarMenuState>((set, get) => ({
  openMenus: {},
  setMenuOpen: (key, open) =>
    set((state) => ({
      openMenus: { ...state.openMenus, [key]: open },
    })),
  isMenuOpen: (key, defaultValue) => {
    const { openMenus } = get();
    return openMenus[key] ?? defaultValue;
  },
}));
