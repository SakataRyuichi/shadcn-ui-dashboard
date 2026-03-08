/**
 * モック API の遅延時間（ミリ秒）
 * 本番 API 切り替え時は 0 に設定可能
 */
export const MOCK_DELAY_MS = 800;

/**
 * 指定時間待機してから値を返す Promise
 *
 * @param ms - 待機時間（ミリ秒）
 * @param value - 待機後に返す値
 * @returns 指定時間後に value を resolve する Promise
 *
 * @example
 * ```ts
 * const result = await delay(100, "hello"); // 100ms 後に "hello"
 * ```
 */
export function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
