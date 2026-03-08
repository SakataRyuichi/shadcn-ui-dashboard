import { create } from "zustand";

interface BrandRegisterModalState {
  /** モーダルの開閉状態 */
  isOpen: boolean;
  /** モーダルを開く */
  open: () => void;
  /** モーダルを閉じる */
  close: () => void;
}

/**
 * ブランド登録モーダルの開閉状態を管理する zustand ストア
 *
 * サイドバーメニュー・ブランド一覧の「新規登録」ボタンなど、
 * 複数箇所から同じモーダルを開けるようにする。
 */
export const useBrandRegisterModalStore = create<BrandRegisterModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
