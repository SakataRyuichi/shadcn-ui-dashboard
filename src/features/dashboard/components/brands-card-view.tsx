"use client";

import { useRouter } from "next/navigation";

import type { Brand } from "@/lib/mock/data";
import { Checkbox } from "@/components/ui/checkbox";
import { BrandStatusBadge } from "./brand-status-badge";

interface BrandsCardViewProps {
  /** 表示するブランド一覧（フィルター済み） */
  brands: Brand[];
  /** 選択モードが有効か */
  selectionMode?: boolean;
  /** 選択中のID一覧 */
  selectedIds?: Set<string>;
  /** 選択トグル時のコールバック */
  onToggleSelection?: (id: string) => void;
}

/**
 * ブランド一覧のカード表示
 * 1段目: メイン情報（ブランド名・ステータス）、2段目: サブ情報（説明・登録日）
 * 選択モード時はカード全体クリックで選択、チェックボックスを表示
 */
export function BrandsCardView({
  brands,
  selectionMode = false,
  selectedIds = new Set(),
  onToggleSelection,
}: BrandsCardViewProps) {
  const router = useRouter();

  if (brands.length === 0) {
    return (
      <div className="rounded-xl border py-12 text-center text-sm text-muted-foreground">
        該当するブランドがありません。
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {brands.map((brand) => (
        <button
          key={brand.id}
          type="button"
          onClick={() => {
            if (selectionMode && onToggleSelection) {
              onToggleSelection(brand.id);
            } else if (!selectionMode) {
              router.push(`/brands/${brand.id}`);
            }
          }}
          className={`group block w-full cursor-pointer overflow-hidden rounded-xl border-0 bg-blue-10 p-0 text-left shadow-primary ring-1 ring-border transition-shadow-soft hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            selectionMode && selectedIds.has(brand.id) ? "ring-2 ring-primary" : ""
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {selectionMode && (
                <Checkbox
                  checked={selectedIds.has(brand.id)}
                  aria-label={`${brand.name}を選択`}
                  className="shrink-0"
                  onCheckedChange={() => onToggleSelection?.(brand.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <span className="font-semibold text-foreground">{brand.name}</span>
            </div>
            <BrandStatusBadge status={brand.status} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border px-4 py-2">
            <p className="text-xs text-slate-600 line-clamp-2">{brand.description}</p>
            <span className="text-xs text-slate-600">ID: {brand.id}</span>
            <span className="text-xs text-slate-600">登録日: {brand.createdAt}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
