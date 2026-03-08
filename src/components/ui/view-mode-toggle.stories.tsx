import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeToggle } from "./view-mode-toggle";

/**
 * 一覧表示スタイル切り替えコンポーネント
 * テーブル表示とカード表示を切り替える
 */
const meta: Meta<typeof ViewModeToggle> = {
  title: "UI/ViewModeToggle",
  component: ViewModeToggle,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ViewModeToggle>;

/** デフォルト（テーブル/カード切り替え） */
export const Default: Story = {};
