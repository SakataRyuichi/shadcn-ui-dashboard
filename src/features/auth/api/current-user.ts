/**
 * 現在ログイン中のユーザー API
 * 本番では認証 API から取得する想定
 */

/**
 * 現在ユーザー API レスポンス型
 */
export interface CurrentUserResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

/**
 * 現在ユーザーを取得する（API レスポンス形式）
 * 本番では fetch('/api/auth/me') 等に置き換え
 *
 * @returns 現在ユーザーの API レスポンス
 */
export async function getCurrentUser(): Promise<CurrentUserResponse> {
  // モック: 遅延をシミュレート（本番 API では不要）
  await new Promise((resolve) => setTimeout(resolve, 0));

  return {
    id: "current-user-1",
    name: "SakataRyuichi",
    email: "sakata.ryuichi@commune.co.jp",
    avatar: "/avatars/sakata-ryuichi.png",
  };
}
