"use client";

import { FullScreenModalContent, FullScreenModalRoot } from "@/components/ui/full-screen-modal";
import { useBrandRegisterModalStore } from "@/stores/use-brand-register-modal-store";

import { BrandRegisterForm } from "@/features/dashboard/components/brand-register-form";

/**
 * ブランド登録モーダル
 * グローバルストアで開閉を制御し、サイドバー・ブランド一覧など複数箇所から表示可能
 */
export function BrandRegisterModal() {
  const { isOpen, close } = useBrandRegisterModalStore();

  return (
    <FullScreenModalRoot open={isOpen} onOpenChange={(open) => !open && close()}>
      <FullScreenModalContent open={isOpen} title="新規ブランド登録">
        <BrandRegisterForm onCancel={close} />
      </FullScreenModalContent>
    </FullScreenModalRoot>
  );
}
