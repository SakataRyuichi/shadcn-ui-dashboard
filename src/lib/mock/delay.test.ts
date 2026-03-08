import { describe, expect, it, vi } from "vitest";
import { delay } from "./delay";

describe("delay", () => {
  it("指定時間後に値を返す", async () => {
    vi.useFakeTimers();
    const promise = delay(100, "hello");
    vi.advanceTimersByTime(100);
    await expect(promise).resolves.toBe("hello");
    vi.useRealTimers();
  });

  it("0ms の場合は即座に値を返す", async () => {
    const result = await delay(0, 42);
    expect(result).toBe(42);
  });

  it("オブジェクトを返せる", async () => {
    vi.useFakeTimers();
    const obj = { id: 1, name: "test" };
    const promise = delay(50, obj);
    vi.advanceTimersByTime(50);
    await expect(promise).resolves.toEqual(obj);
    vi.useRealTimers();
  });
});
