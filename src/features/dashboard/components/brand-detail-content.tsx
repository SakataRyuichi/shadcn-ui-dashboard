"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBrand } from "../api/use-dashboard-data";
import { BrandStatusBadge } from "./brand-status-badge";

interface BrandDetailContentProps {
  brandId: string;
}

/**
 * ブランド詳細のメインコンテンツ
 * ブランド情報を表示し、存在しない場合はエラー表示
 */
export function BrandDetailContent({ brandId }: BrandDetailContentProps) {
  const { data: brand, isLoading, isError } = useBrand(brandId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !brand) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">ブランドが見つかりませんでした。</p>
        <Button asChild variant="outline">
          <Link href="/brands">ブランド一覧に戻る</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/brands">← 一覧に戻る</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">{brand.name}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">ID</p>
            <p className="font-mono text-sm">{brand.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">説明</p>
            <p className="text-sm">{brand.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ステータス</p>
            <BrandStatusBadge status={brand.status} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">登録日</p>
            <p className="text-sm">{brand.createdAt}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
