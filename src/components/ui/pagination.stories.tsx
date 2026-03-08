import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

/**
 * ページネーションコンポーネント
 * 一覧の下部に配置してページ切り替えを提供
 */
const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/** デフォルト（前へ・ページ番号・次へ） */
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => {}} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => {}}>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => {}}>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => {}} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
