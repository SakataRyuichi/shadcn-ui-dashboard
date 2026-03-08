import { describe, expect, it } from "vitest";
import { getCurrentUser } from "./current-user";

describe("getCurrentUser", () => {
  it("API レスポンス形式で現在ユーザーを返す", async () => {
    const user = await getCurrentUser();

    expect(user).toEqual({
      id: "current-user-1",
      name: "SakataRyuichi",
      email: "sakata.ryuichi@commune.co.jp",
      avatar: "/avatars/sakata-ryuichi.png",
    });
  });

  it("必須フィールドが全て含まれる", async () => {
    const user = await getCurrentUser();

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("avatar");
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.avatar).toBe("string");
  });
});
