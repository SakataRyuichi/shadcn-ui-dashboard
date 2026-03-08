import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight } from "lucide-react";

import { Link } from "./link";

/**
 * リンクコンポーネント
 * hover 時にシャドーを付けることを必須とする
 */
const meta: Meta<typeof Link> = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "リンク先URL",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

/** デフォルトのリンク */
export const Default: Story = {
  args: {
    href: "/",
    children: "リンクテキスト",
  },
};

/** カード風スタイル（hover でシャドー表示） */
export const CardStyle: Story = {
  args: {
    href: "/",
    className: "flex items-center gap-3 rounded-xl border border-input bg-card px-4 py-3",
    children: (
      <>
        <span>デザインをリニューアルしました！</span>
        <ArrowRight className="size-4 shrink-0" aria-hidden />
      </>
    ),
  },
};
