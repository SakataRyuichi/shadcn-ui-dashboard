"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { BrandRegisterModal } from "@/components/brand-register-modal";

/**
 * TanStack Query の QueryClientProvider
 * クライアントコンポーネントで QueryClient を管理
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <BrandRegisterModal />
    </QueryClientProvider>
  );
}
