"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBrandRegisterModalStore } from "@/stores/use-brand-register-modal-store";
import { BrandsTable } from "./brands-table";
import { SectionHeader } from "./section-header";

/**
 * ブランド一覧セクション
 * 新規登録ボタンでモーダルを開く（グローバルストアで制御）
 */
export function BrandsSection() {
  const openModal = useBrandRegisterModalStore((s) => s.open);

  return (
    <section>
      <SectionHeader
        title="ブランド一覧"
        action={
          <Button onClick={openModal} size="sm">
            <Plus className="size-4" aria-hidden />
            新規登録
          </Button>
        }
      />
      <BrandsTable />
    </section>
  );
}
