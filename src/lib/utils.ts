import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS のクラス名をマージするユーティリティ
 * @param inputs - クラス名またはクラス名の条件付きオブジェクト
 * @returns マージされたクラス名文字列
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
