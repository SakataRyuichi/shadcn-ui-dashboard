"use client";

import { useEffect, useState } from "react";
import { MdWavingHand } from "react-icons/md";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

const TYPEWRITER_DELAY_MS = 80;

/**
 * ホーム画面のウェルカムメッセージ
 * タイプライター風アニメーションでユーザー名と挨拶を表示する
 */
export function WelcomeMessage() {
  const { data: user } = useCurrentUser();
  const displayName = user?.name ?? "ゲスト";
  const fullText = `${displayName}さんこんにちは！`;
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
  }, [fullText]);

  useEffect(() => {
    if (displayedText.length >= fullText.length) {
      setIsComplete(true);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayedText(fullText.slice(0, displayedText.length + 1));
    }, TYPEWRITER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [displayedText, fullText]);

  return (
    <div className="flex items-center gap-2 text-3xl font-bold">
      <span>
        {displayedText}
        {!isComplete && (
          <span className="animate-pulse" aria-hidden>
            |
          </span>
        )}
      </span>
      {isComplete && <MdWavingHand className="size-8 text-amber-500" aria-hidden />}
    </div>
  );
}
