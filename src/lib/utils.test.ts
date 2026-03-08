import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("複数のクラス名をマージする", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("Tailwind の競合するクラスは後者が優先される", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("条件付きオブジェクトを正しく処理する", () => {
    expect(cn({ "text-red-500": true, "bg-blue-500": false })).toBe("text-red-500");
  });

  it("undefined や null を無視する", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("配列を展開する", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});
