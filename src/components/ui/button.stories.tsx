import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

/**
 * ボタンコンポーネント
 * 様々なバリアントとサイズをサポート
 */
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/** デフォルトのプライマリボタン */
export const Default: Story = {
  args: {
    children: "ボタン",
  },
};

/** アウトラインスタイル */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "アウトライン",
  },
};

/** セカンダリスタイル */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "セカンダリ",
  },
};

/** ゴーストスタイル */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "ゴースト",
  },
};

/** 破壊的アクション用 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "削除",
  },
};

/** リンクスタイル */
export const Link: Story = {
  args: {
    variant: "link",
    children: "リンク",
  },
};

/** 小さいサイズ */
export const Small: Story = {
  args: {
    size: "sm",
    children: "小さい",
  },
};

/** 大きいサイズ */
export const Large: Story = {
  args: {
    size: "lg",
    children: "大きい",
  },
};

/** 無効状態 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "無効",
  },
};
