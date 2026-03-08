"use client";

import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import type * as React from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** アニメーション完了までの待機時間（ms） */
const ANIMATION_DURATION = 400;

function FullScreenModalRoot({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="full-screen-modal" open={open} onOpenChange={onOpenChange} {...props} />;
}

function FullScreenModalPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="full-screen-modal-portal" {...props} />;
}

function FullScreenModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="full-screen-modal-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-md duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-open:animate-in data-open:fade-in-0 data-open:ease-[cubic-bezier(0.34,1.56,0.64,1)] data-closed:animate-out data-closed:fade-out-0 data-closed:ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        className,
      )}
      {...props}
    />
  );
}

interface FullScreenModalContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  /** モーダルの開閉状態（アニメーション制御に使用） */
  open: boolean;
  /** モーダルタイトル */
  title?: string;
  /** メインコンテンツ（アニメーション完了後に表示） */
  children: React.ReactNode;
  /** ゴースト表示用のスケルトン（アニメーション中に表示） */
  ghost?: React.ReactNode;
}

function FullScreenModalContent({
  className,
  children,
  ghost,
  open,
  title,
  ...contentProps
}: FullScreenModalContentProps) {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    if (open) {
      setIsContentReady(false);
      const timer = setTimeout(() => setIsContentReady(true), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
    setIsContentReady(false);
  }, [open]);

  const defaultGhost = (
    <div className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );

  return (
    <FullScreenModalPortal>
      <FullScreenModalOverlay />
      <DialogPrimitive.Content
        data-slot="full-screen-modal-content"
        className={cn(
          "fixed left-0 right-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-2xl bg-background shadow-lg",
          "top-[50px]",
          "data-open:animate-in data-open:slide-in-from-bottom-10 data-open:duration-400 data-open:ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "data-closed:animate-out data-closed:slide-out-to-bottom-10 data-closed:duration-300 data-closed:ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          className,
        )}
        {...contentProps}
      >
        <DialogPrimitive.Close asChild>
          <Button
            variant="ghost"
            size="icon-lg"
            className="absolute right-4 top-4 size-12 rounded-full"
            aria-label="閉じる"
          >
            <X className="size-6" />
          </Button>
        </DialogPrimitive.Close>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {title && (
            <div className="shrink-0 border-b px-8 py-6 pr-20">
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
          )}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-8 pt-6">
            {isContentReady ? children : ghost ?? defaultGhost}
          </div>
        </div>
      </DialogPrimitive.Content>
    </FullScreenModalPortal>
  );
}

export { FullScreenModalRoot, FullScreenModalContent };
