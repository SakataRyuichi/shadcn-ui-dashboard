import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * clsx と tailwind-merge を組み合わせてクラス名をマージする関数
 * 条件付きクラスを安全にマージし、Tailwind の競合を解決する
 *
 * @param inputs - マージするクラス名（文字列、オブジェクト、配列など）
 * @returns マージされたクラス名文字列
 *
 * @example
 * ```ts
 * cn("px-2 py-1", "px-4") // => "py-1 px-4"
 * cn({ "text-red-500": true }) // => "text-red-500"
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
