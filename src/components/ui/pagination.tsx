import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="ページネーション"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-4", className)} {...props} />;
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}

interface PaginationLinkProps extends React.ComponentProps<"button"> {
  isActive?: boolean;
}

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-transparent text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive &&
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

interface PaginationPreviousProps extends React.ComponentProps<"button"> {
  text?: string;
}

function PaginationPrevious({
  className,
  text = "前へ",
  disabled,
  ...props
}: PaginationPreviousProps) {
  return (
    <button
      type="button"
      aria-label="前のページへ"
      disabled={disabled}
      className={cn(
        "inline-flex h-9 min-w-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-4",
        className,
      )}
      {...props}
    >
      <ChevronLeft className="size-4 shrink-0" aria-hidden />
      <span className="hidden whitespace-nowrap sm:inline">{text}</span>
    </button>
  );
}

interface PaginationNextProps extends React.ComponentProps<"button"> {
  text?: string;
}

function PaginationNext({ className, text = "次へ", disabled, ...props }: PaginationNextProps) {
  return (
    <button
      type="button"
      aria-label="次のページへ"
      disabled={disabled}
      className={cn(
        "inline-flex h-9 min-w-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-4",
        className,
      )}
      {...props}
    >
      <span className="hidden whitespace-nowrap sm:inline">{text}</span>
      <ChevronRight className="size-4 shrink-0" aria-hidden />
    </button>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <span className="text-muted-foreground">…</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
