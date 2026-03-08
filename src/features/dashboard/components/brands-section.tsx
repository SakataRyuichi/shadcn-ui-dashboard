"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  FullScreenModalContent,
  FullScreenModalRoot,
} from "@/components/ui/full-screen-modal";
import { BrandRegisterForm } from "./brand-register-form";
import { BrandsTable } from "./brands-table";
import { SectionHeader } from "./section-header";

/**
 * ブランド一覧セクション
 * 新規登録ボタンと全画面モーダルを提供
 */
export function BrandsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section>
        <SectionHeader
          title="ブランド一覧"
          action={
            <Button onClick={() => setIsModalOpen(true)} size="sm">
              <Plus className="size-4" aria-hidden />
              新規登録
            </Button>
          }
        />
        <BrandsTable />
      </section>

      <FullScreenModalRoot open={isModalOpen} onOpenChange={setIsModalOpen}>
        <FullScreenModalContent open={isModalOpen} title="新規ブランド登録">
          <BrandRegisterForm onCancel={() => setIsModalOpen(false)} />
        </FullScreenModalContent>
      </FullScreenModalRoot>
    </>
  );
}
