"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

import { Card, CardHeader } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { SectionHeader } from "./section-header";

const supportItems = [
  {
    title: "Engageの使い方",
    href: "/support/usage",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=240&fit=crop",
    imageAlt: "Engageの使い方",
  },
  {
    title: "お問い合わせ",
    href: "/support/contact",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=240&fit=crop",
    imageAlt: "お問い合わせ",
  },
] as const;

/**
 * サポートセクション
 * Engageの使い方・お問い合わせを縦型カードで表示
 */
export function SupportSection() {
  return (
    <section>
      <SectionHeader title="サポート" />
      <div className="flex flex-wrap gap-4">
        {supportItems.map(({ title, href, image, imageAlt }) => (
          <Link key={href} href={href} className="block w-full min-w-0 sm:w-64">
            <Card className="gap-0 overflow-hidden border-0 bg-blue-25 p-0 ring-1 ring-border transition-shadow-soft hover:shadow-primary-lg">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                />
              </div>
              <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 pb-4 pt-4">
                <span className="text-base font-semibold text-foreground">{title}</span>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
