import { create } from "zustand";

interface MockState {
  /** モック API の遅延時間（ミリ秒） */
  delayMs: number;
  setDelayMs: (ms: number) => void;
}

/**
 * モック API の設定を管理する zustand ストア
 * 開発時に遅延時間を調整可能
 */
export const useMockStore = create<MockState>((set) => ({
  delayMs: 800,
  setDelayMs: (ms) => set({ delayMs: ms }),
}));
