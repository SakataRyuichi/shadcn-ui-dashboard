import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EngageLogo } from "./engage-logo";

/**
 * Commune Engage ロゴコンポーネント
 * サイドバー展開時はフルロゴ、縮小時は左端シンボルのみ表示
 */
const meta: Meta<typeof EngageLogo> = {
  title: "Components/EngageLogo",
  component: EngageLogo,
  tags: ["autodocs"],
  argTypes: {
    collapsed: {
      control: "boolean",
      description: "サイドバー縮小時は true",
    },
  },
};

export default meta;

type Story = StoryObj<typeof EngageLogo>;

/** 展開時（フルロゴ・左詰め） */
export const Expanded: Story = {
  args: {
    collapsed: false,
  },
};

/** 縮小時（左端シンボルのみ） */
export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
};
