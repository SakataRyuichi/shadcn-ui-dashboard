import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrandStatusBadge } from "./brand-status-badge";

/**
 * ブランドステータスバッジ
 * 各ステータスに応じたアイコンとラベルを表示
 */
const meta: Meta<typeof BrandStatusBadge> = {
  title: "Features/Dashboard/BrandStatusBadge",
  component: BrandStatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["active", "inactive", "pending"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof BrandStatusBadge>;

/** 有効 */
export const Active: Story = {
  args: {
    status: "active",
  },
};

/** 無効 */
export const Inactive: Story = {
  args: {
    status: "inactive",
  },
};

/** 保留中 */
export const Pending: Story = {
  args: {
    status: "pending",
  },
};

/** 全ステータス一覧 */
export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <BrandStatusBadge status="active" />
      <BrandStatusBadge status="inactive" />
      <BrandStatusBadge status="pending" />
    </div>
  ),
};
