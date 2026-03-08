import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

/**
 * 折りたたみ可能なコンテンツコンポーネント
 * 展開・折りたたみ時にアニメーション付きで表示
 */
const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "初期状態で開いているか",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

/** 基本的な折りたたみ */
export const Default: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">展開/折りたたみ</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border p-4">
          <p className="text-sm">
            折りたたみ可能なコンテンツです。展開・折りたたみ時にアニメーションが適用されます。
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/** 初期状態で開いている */
export const DefaultOpen: Story = {
  render: (args) => (
    <Collapsible {...args} defaultOpen>
      <CollapsibleTrigger asChild>
        <Button variant="outline">展開/折りたたみ</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border p-4">
          <p className="text-sm">初期状態で開いているコンテンツです。</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
