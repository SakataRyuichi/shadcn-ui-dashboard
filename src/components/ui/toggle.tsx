"use client";

import { Toggle as TogglePrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const toggleVariants = {
  variant: {
    default: "bg-muted hover:bg-muted/80",
    outline: "border border-input bg-transparent hover:bg-muted hover:text-foreground",
  },
  size: {
    sm: "h-7 px-2 text-xs [&_svg]:size-3",
    default: "h-9 px-3 [&_svg]:size-4",
    lg: "h-10 px-4 [&_svg]:size-4",
  },
};

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: keyof typeof toggleVariants.variant;
  size?: keyof typeof toggleVariants.size;
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-muted data-[state=on]:text-foreground",
        toggleVariants.variant[variant],
        toggleVariants.size[size],
        className,
      )}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
