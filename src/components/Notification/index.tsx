import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { useNotification, type NotiType } from "./hooks/useNotification";

const typeToColor: Record<NotiType, string> = {
  message: "bg-blue-500",
  task: "bg-green-500",
  system: "bg-yellow-500",
};
const LOAD_THRESHOLD = 0.85;
const Notification: React.FC = () => {
  const [open, setOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const {
    notificationListData,
    fetchNextNotificationPage,
    hasMoreNotifications,
    isFetchingNextNotificationPage,
    totalNotifications,
  } = useNotification(open, 10);

  const items = useMemo(
    () => notificationListData?.pages?.flatMap((p: any) => p?.data ?? []) ?? [],
    [notificationListData]
  );

  // kéo chạm đáy thì gọi fetchNextNotificationPage()
  const onScrollCheck = useCallback(() => {
    const el = scrollAreaRef.current;
    if (!el || isFetchingNextNotificationPage || !hasMoreNotifications) return;

    const { scrollTop, clientHeight, scrollHeight } = el;
    const ratio = (scrollTop + clientHeight) / scrollHeight;
    if (ratio >= LOAD_THRESHOLD) {
      fetchNextNotificationPage();
    }
  }, [
    isFetchingNextNotificationPage,
    hasMoreNotifications,
    fetchNextNotificationPage,
  ]);

  // gắn listener scroll khi mở
  useEffect(() => {
    if (!open) return;
    const el = scrollAreaRef.current;
    if (!el) return;

    const handler = () => requestAnimationFrame(onScrollCheck);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [open, onScrollCheck]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.25l-1.5 1.5V19h15v-1.5l-1.5-1.5V9.75a6 6 0 00-6-6z"
            />
          </svg>

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            6
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0">
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Notifications</h4>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Mark all as read
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Total: {totalNotifications}
          </div>
        </div>

        {/* Scroll Area */}
        <div ref={scrollAreaRef} className="max-h-60 overflow-y-auto px-2 pb-2">
          <ul className="space-y-1">
            {items.map((item: any) => (
              <li
                key={item.id}
                className="flex items-start space-x-3 rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                <div
                  className={`mt-2 h-2 w-2 rounded-full ${typeToColor[item.type as NotiType]}`}
                />
                <div className="flex-1">
                  <p
                    className={`text-sm ${item.read ? "font-normal" : "font-medium"}`}
                  >
                    {item.title}
                  </p>
                </div>
                {!item.read && (
                  <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center py-3">
            {isFetchingNextNotificationPage ? (
              <span className="animate-pulse text-xs text-gray-500">
                Loading…
              </span>
            ) : hasMoreNotifications ? (
              <span className="text-[10px] text-gray-400">
                Scroll to load more
              </span>
            ) : (
              <span className="text-[10px] text-gray-400">
                No more notifications
              </span>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
