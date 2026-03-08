import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

/**
 * 入力フィールドコンポーネント
 * フォーム入力用のスタイル付き input 要素
 */
const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/** デフォルトのテキスト入力 */
export const Default: Story = {
  args: {
    placeholder: "入力してください",
  },
};

/** プレースホルダー付き */
export const WithPlaceholder: Story = {
  args: {
    placeholder: "メールアドレスを入力",
  },
};

/** メールタイプ */
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "example@email.com",
  },
};

/** パスワードタイプ */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "パスワード",
  },
};

/** 無効状態 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "無効な入力",
  },
};
