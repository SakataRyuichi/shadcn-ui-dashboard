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
 * デフォルトは全メニュー展開。ページ遷移時も展開状態を維持する。
 */
export const useSidebarMenuStore = create<SidebarMenuState>((set, get) => ({
  openMenus: {
    ブランド: true,
    ユーザー: true,
    その他: true,
  },
  setMenuOpen: (key, open) =>
    set((state) => ({
      openMenus: { ...state.openMenus, [key]: open },
    })),
  isMenuOpen: (key, _defaultValue) => {
    const { openMenus } = get();
    return openMenus[key] ?? true;
  },
}));
