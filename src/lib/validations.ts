import { z } from "zod";

/**
 * Zod スキーマの例
 * React Hook Form と @hookform/resolvers で使用
 *
 * @example
 * ```tsx
 * import { zodResolver } from "@hookform/resolvers/zod";
 * import { useForm } from "react-hook-form";
 *
 * const form = useForm({
 *   resolver: zodResolver(exampleSchema),
 *   defaultValues: { name: "" },
 * });
 * ```
 */
export const exampleSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
});

export type ExampleFormValues = z.infer<typeof exampleSchema>;
