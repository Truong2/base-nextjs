import { useRouter } from "next/navigation";
import type { FC } from "react";
import { ROUTE_URL } from "~/constants";

import Notification from "~/components/Notification";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { AuthService } from "~/services";
import useAuthenticationStore from "~/store/authentication/useAuthenticationStore";

const Header: FC<{ onHamburgerClick?: () => void }> = ({
  onHamburgerClick,
}) => {
  const router = useRouter();
  const { user, actions } = useAuthenticationStore();

  const { mutate: _postMutate } = AuthService.usePost<{
    user: any;
    accessToken: string;
    refreshToken: string;
  }>(
    { url: "/logout" },
    {
      onSuccess: () => {
        actions.logout();
        router.push(ROUTE_URL.LOGIN);
      },
    }
  );

  const handleUserMenuClick = (action: string) => {
    switch (action) {
      case "logout":
        // postMutate({ data: {} });
        actions.logout();
        router.push(ROUTE_URL.LOGIN);
        break;
      case "profile":
        router.push(ROUTE_URL.PROFILE);
        break;
      case "settings":
        console.log("Settings clicked");
        break;
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      {/* Left Section - Breadcrumb */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onHamburgerClick}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white md:hidden"
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center space-x-4">
        {/* Notifications Popover with bell icon trigger */}
        <Notification />

        {/* User Menu with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-600">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <svg
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">
                {user?.email || "Admin User"}
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-1">
            <button
              onClick={() => handleUserMenuClick("profile")}
              className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <span>Profile</span>
            </button>
            <button
              onClick={() => handleUserMenuClick("settings")}
              className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <span>Settings</span>
            </button>
            <div className="my-1 border-t" />
            <button
              onClick={() => handleUserMenuClick("logout")}
              className="flex w-full items-center space-x-2 rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <span>Logout</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
