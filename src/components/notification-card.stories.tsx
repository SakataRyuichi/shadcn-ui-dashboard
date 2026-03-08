import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Notification } from "@/lib/mock/data";
import { NotificationCard } from "./notification-card";

const sampleNotification: Notification = {
  id: "1",
  title: "デザインをリニューアルしました！",
  content:
    "Commune Engage のデザインをリニューアルしました。より使いやすく、見やすくなっています。ぜひ新しいインターフェースをお試しください。",
  createdAt: "2025-03-08",
  isRead: false,
};

const readNotification: Notification = {
  ...sampleNotification,
  isRead: true,
};

/**
 * 共通のお知らせカード
 * 一覧表示・詳細表示の2バリアント
 */
const meta: Meta<typeof NotificationCard> = {
  title: "Components/NotificationCard",
  component: NotificationCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["list", "detail"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationCard>;

/** 一覧表示（未読） */
export const ListUnread: Story = {
  args: {
    notification: sampleNotification,
    variant: "list",
  },
};

/** 一覧表示（既読） */
export const ListRead: Story = {
  args: {
    notification: readNotification,
    variant: "list",
  },
};

/** 詳細表示 */
export const Detail: Story = {
  args: {
    notification: sampleNotification,
    variant: "detail",
  },
};

/** 一覧複数表示 */
export const ListMultiple: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <NotificationCard notification={sampleNotification} variant="list" />
      <NotificationCard notification={readNotification} variant="list" />
    </div>
  ),
};
