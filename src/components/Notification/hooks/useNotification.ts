import { useInfiniteQuery } from "@tanstack/react-query";

/* ===== Types ===== */
export type NotiType = "message" | "task" | "system";
export interface Noti {
  id: string;
  title: string;
  type: NotiType;
  read: boolean;
  createdAt: string;
}

/* ===== Fake API ===== */
const TITLES: Record<NotiType, string[]> = {
  message: [
    "New message received",
    "You have a new reply",
    "Chat ping from teammate",
  ],
  task: ["Task assigned", "Task completed", "Reminder: due soon"],
  system: [
    "System update available",
    "Security notice",
    "Maintenance window scheduled",
  ],
};

function randPick<T>(arr: T[]): T {
  if (!arr.length) throw new Error("randPick: empty");
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function genNoti(seed: number): Noti {
  const type: NotiType = randPick(["message", "task", "system"]);
  return {
    id: `noti_${seed}_${Math.random().toString(36).slice(2, 7)}`,
    title: randPick(TITLES[type]),
    type,
    read: Math.random() < 0.6 ? false : true,
    createdAt: new Date().toISOString(),
  };
}

async function fakeNotificationApi(page: number, limit: number) {
  const MAX_PAGES = 4;
  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
  await delay(300 + Math.random() * 400);

  const data =
    page <= MAX_PAGES
      ? Array.from({ length: limit }, (_, i) => genNoti((page - 1) * limit + i))
      : [];

  return {
    meta: {
      currentPage: page,
      totalPages: MAX_PAGES,
      totalItems: MAX_PAGES * limit,
    },
    data,
  };
}

export function useNotification(isEnabled: boolean, pageSize = 10) {
  const {
    data: notificationListData,
    fetchNextPage: fetchNextNotificationPage,
    hasNextPage: hasMoreNotifications,
    isFetchingNextPage: isFetchingNextNotificationPage,
  } = useInfiniteQuery({
    queryKey: ["notification"],
    initialPageParam: 1,
    enabled: isEnabled,
    queryFn: async ({ pageParam }) => {
      const res = await fakeNotificationApi(pageParam, pageSize);
      return res;
    },
    getNextPageParam: lastPage => {
      const currentPage = lastPage.meta?.currentPage ?? 1;
      const totalPages = lastPage.meta?.totalPages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const totalNotifications =
    notificationListData?.pages?.reduce(
      (total, page: any) => total + (page?.data?.length || 0),
      0
    ) || 0;

  return {
    notificationListData,
    fetchNextNotificationPage,
    hasMoreNotifications,
    isFetchingNextNotificationPage,
    totalNotifications,
  };
}
