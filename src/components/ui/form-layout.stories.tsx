import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FormField, FormLayout, FormSection } from "./form-layout";
import { Input } from "./input";

/**
 * 登録フォーム用の共通レイアウトコンポーネント
 * FormLayout / FormSection / FormField を提供
 */
const meta: Meta<typeof FormLayout> = {
  title: "UI/FormLayout",
  component: FormLayout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FormLayout>;

/** シングルレイアウト（中央配置・最大幅800px） */
export const Default: Story = {
  render: () => (
    <FormLayout>
      <FormSection title="セクションタイトル" description="セクションの説明文です。">
        <FormField label="必須フィールド" required htmlFor="required-field">
          <Input id="required-field" placeholder="入力してください" />
        </FormField>
        <FormField label="任意フィールド" required={false} htmlFor="optional-field">
          <Input id="optional-field" placeholder="任意で入力" />
        </FormField>
      </FormSection>
    </FormLayout>
  ),
};
