import type * as React from "react";
import { cloneElement, isValidElement } from "react";

import { cn } from "@/lib/utils";

/**
 * 登録フォーム用のシングルレイアウト
 * 画面中央配置、最大幅800px
 * 他の登録画面でも共通利用
 */
function FormLayout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-layout"
      className={cn("mx-auto flex w-full max-w-[800px] flex-col gap-8", className)}
      {...props}
    />
  );
}

/**
 * フォーム内のセクション
 * タイトルと説明で区切りを明確にする
 */
function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** セクションタイトル */
  title: string;
  /** セクション説明（任意） */
  description?: string;
}) {
  return (
    <div
      data-slot="form-section"
      className={cn("flex flex-col gap-4 rounded-lg border border-border p-6", className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

/**
 * 必須/任意のバッジ
 */
function FormFieldBadge({ required }: { required: boolean }) {
  return (
    <span
      data-slot="form-field-badge"
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium",
        required ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
      )}
    >
      {required ? "必須" : "任意"}
    </span>
  );
}

/**
 * フォームフィールド（ラベル・必須/任意・入力）
 */
function FormField({
  label,
  required = false,
  error = false,
  errorMessage,
  htmlFor,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** フィールドラベル */
  label: string;
  /** 必須項目か */
  required?: boolean;
  /** バリデーションエラー等の失敗状態（Input に赤枠を表示） */
  error?: boolean;
  /** エラー時に表示するメッセージ */
  errorMessage?: string;
  /** ラベルと紐づく入力のid */
  htmlFor?: string;
}) {
  const childWithError =
    error && isValidElement(children)
      ? cloneElement(children as React.ReactElement<{ "aria-invalid"?: boolean }>, {
          "aria-invalid": true,
        })
      : children;

  return (
    <div data-slot="form-field" className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center gap-2">
        <label
          htmlFor={htmlFor}
          className={cn("text-sm font-semibold", error ? "text-destructive" : "text-foreground")}
        >
          {label}
        </label>
        <FormFieldBadge required={required} />
      </div>
      {childWithError}
      {error && errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export { FormLayout, FormSection, FormField, FormFieldBadge };
