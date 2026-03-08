"use client";

import { MdWavingHand } from "react-icons/md";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

/**
 * ホーム画面のウェルカムメッセージ
 * ユーザー名と挨拶を表示する
 */
export function WelcomeMessage() {
  const { data: user } = useCurrentUser();
  const displayName = user?.name ?? "ゲスト";

  return (
    <div className="flex items-center gap-2 text-3xl font-bold">
      <span>{displayName}さんこんにちは！</span>
      <MdWavingHand className="size-8 text-amber-500" aria-hidden />
    </div>
  );
}
