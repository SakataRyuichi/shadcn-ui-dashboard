import NextLink from "next/link";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * リンクコンポーネント
 * 常にシャドーを表示し、hover 時はより強くする
 */
function Link({ className, href, ...props }: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg shadow-primary transition-shadow-soft hover:shadow-primary-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Link };
