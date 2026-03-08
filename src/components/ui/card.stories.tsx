import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

/**
 * カードコンポーネント
 * ヘッダー、タイトル、説明、コンテンツ、フッター、アクションを組み合わせて使用
 */
const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

/** 基本的なカード */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文です。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>カードのメインコンテンツがここに表示されます。</p>
      </CardContent>
      <CardFooter>
        <Button>アクション</Button>
      </CardFooter>
    </Card>
  ),
};

/** アクションボタン付き */
export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>アクション付きカード</CardTitle>
        <CardDescription>ヘッダー右側にアクションボタンを配置</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            編集
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>カードの内容</p>
      </CardContent>
    </Card>
  ),
};

/** 小さいサイズ */
export const Small: Story = {
  render: (args) => (
    <Card {...args} size="sm">
      <CardHeader>
        <CardTitle>コンパクトカード</CardTitle>
      </CardHeader>
      <CardContent>
        <p>小さいサイズのカードです。</p>
      </CardContent>
    </Card>
  ),
};
