import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

/**
 * トグルグループコンポーネント
 * 複数選択肢から1つを選ぶ UI（テーブル/カード切り替えなど）
 */
const meta: Meta<typeof ToggleGroup> = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

/** テーブル/カード切り替え風 */
export const ViewMode: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="table" className="rounded-lg border p-0.5">
      <ToggleGroupItem value="table" aria-label="テーブル表示" className="h-7 px-2">
        <List className="size-3.5" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="card" aria-label="カード表示" className="h-7 px-2">
        <LayoutGrid className="size-3.5" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
