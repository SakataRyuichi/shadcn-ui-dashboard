"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormField, FormLayout, FormSection } from "@/components/ui/form-layout";
import { Input } from "@/components/ui/input";

/**
 * ブランド登録フォームの値
 */
export interface BrandRegisterFormValues {
  brandCd: string;
  brandName: string;
  lineChannelId: string;
  lineChannelSecret: string;
  liffId: string;
  tenantCode: string;
  authGroupCode: string;
  clientId: string;
  clientSecret: string;
}

const initialValues: BrandRegisterFormValues = {
  brandCd: "",
  brandName: "",
  lineChannelId: "",
  lineChannelSecret: "",
  liffId: "",
  tenantCode: "",
  authGroupCode: "",
  clientId: "",
  clientSecret: "",
};

/** 必須項目 */
const REQUIRED_FIELDS: (keyof BrandRegisterFormValues)[] = [
  "brandCd",
  "brandName",
];

interface BrandRegisterFormProps {
  /** キャンセル時のコールバック（モーダル閉じ等） */
  onCancel?: () => void;
}

/**
 * ブランド登録フォーム
 * 共通化された FormLayout / FormSection / FormField を使用
 */
export function BrandRegisterForm({ onCancel }: BrandRegisterFormProps) {
  const [values, setValues] = useState<BrandRegisterFormValues>(initialValues);

  const updateField = (field: keyof BrandRegisterFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = useMemo(() => {
    return REQUIRED_FIELDS.every((field) => values[field].trim() !== "");
  }, [values]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // 仮実装: 実際の登録処理は未実装
    console.log("Form submitted:", values);
  };

  const handleCancel = () => {
    setValues(initialValues);
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1 overflow-auto">
        <FormLayout className="pb-20">
          <FormSection title="ブランド情報" description="ブランドの基本情報を入力してください。">
          <FormField
            label="ブランドCD"
            required
            error
            errorMessage="ブランドCDを入力してください"
            htmlFor="brandCd"
          >
            <Input
              id="brandCd"
              value={values.brandCd}
              onChange={updateField("brandCd")}
              placeholder="commune"
            />
          </FormField>
          <FormField label="ブランド名" required htmlFor="brandName">
            <Input
              id="brandName"
              value={values.brandName}
              onChange={updateField("brandName")}
              placeholder="コミューン"
            />
          </FormField>
          <FormField label="LINEチャネルID" required={false} htmlFor="lineChannelId">
            <Input
              id="lineChannelId"
              value={values.lineChannelId}
              onChange={updateField("lineChannelId")}
              placeholder="0000000000"
            />
          </FormField>
          <FormField label="LINEチャネルシークレット" required={false} htmlFor="lineChannelSecret">
            <Input
              id="lineChannelSecret"
              type="password"
              value={values.lineChannelSecret}
              onChange={updateField("lineChannelSecret")}
              placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            />
          </FormField>
          <FormField label="LIFF ID" required={false} htmlFor="liffId">
            <Input
              id="liffId"
              value={values.liffId}
              onChange={updateField("liffId")}
              placeholder="0000000000-XXXXXXXX"
            />
          </FormField>
        </FormSection>

        <FormSection
          title="Commune共通認証基盤設定"
          description="共有認証基盤で作成したテナント情報を入力してください。"
        >
          <FormField label="テナントコード" required={false} htmlFor="tenantCode">
            <Input
              id="tenantCode"
              value={values.tenantCode}
              onChange={updateField("tenantCode")}
              placeholder="tenant-code"
            />
          </FormField>
          <FormField label="認証グループコード" required={false} htmlFor="authGroupCode">
            <Input
              id="authGroupCode"
              value={values.authGroupCode}
              onChange={updateField("authGroupCode")}
              placeholder="group-code"
            />
          </FormField>
          <FormField label="クライアントID" required={false} htmlFor="clientId">
            <Input
              id="clientId"
              value={values.clientId}
              onChange={updateField("clientId")}
              placeholder="client-id"
            />
          </FormField>
          <FormField label="クライアントシークレット" required={false} htmlFor="clientSecret">
            <Input
              id="clientSecret"
              type="password"
              value={values.clientSecret}
              onChange={updateField("clientSecret")}
              placeholder="client-secret"
            />
          </FormField>
        </FormSection>
        </FormLayout>
        {/* コンテンツが続くことを示すグラデーション（決定ボタン直上に固定） */}
        <div
          className="pointer-events-none sticky bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </div>

      <div className="shrink-0 border-t bg-background px-8 py-4">
        <div className="mx-auto flex max-w-[800px] justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleCancel} className="min-w-28">
            キャンセル
          </Button>
          <Button type="submit" disabled={!isFormValid} className="min-w-28">
            登録
          </Button>
        </div>
      </div>
    </form>
  );
}
