"use client";

import { usePathname, useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { MENU_KEYS, ROUTE_URL } from "~/constants";
import { cn } from "~/utils/utils";
import Image from "next/image";
import { IconDashboard, IconUp, IconHelp, IconContact } from "~/assets/svg";

interface SidebarProps {
  collapsed?: boolean;
}

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const Sidebar: FC<SidebarProps> = ({ collapsed = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Get active menu key based on current path
  const getActiveMenuKey = () => {
    const path = pathname;
    // Remove language prefix (en/ja) from path
    const pathWithoutLang = path.replace(/^\/(en|ja)/, "");

    if (pathWithoutLang.startsWith(ROUTE_URL.DASHBOARD))
      return MENU_KEYS.DASHBOARD;
    if (pathWithoutLang.startsWith(ROUTE_URL.ADMIN_MANAGEMENT))
      return MENU_KEYS.ADMIN_MANAGEMENT;
    return "";
  };

  const menuItems: MenuItem[] = [
    {
      key: MENU_KEYS.DASHBOARD,
      label: "Dashboard",
      icon: <IconDashboard />,
    },
    {
      key: MENU_KEYS.ADMIN_MANAGEMENT,
      label: "Admin Management",
    },
  ];

  const handleMenuClick = (key: string) => {
    // Handle navigation based on menu key
    switch (key) {
      case MENU_KEYS.DASHBOARD:
        router.push(ROUTE_URL.DASHBOARD);
        break;
      case MENU_KEYS.ADMIN_MANAGEMENT:
        router.push(ROUTE_URL.ADMIN_MANAGEMENT);
        break;

      default:
        router.push(`/${key}`);
    }
  };

  const toggleSubmenu = (key: string) => {
    setExpandedMenus(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive =
      getActiveMenuKey() === item.key ||
      item.children?.some(child => getActiveMenuKey() === child.key);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.key);
    const showTooltip = collapsed && hoveredItem === item.key;

    return (
      <div key={item.key} className="relative">
        <div className="group relative">
          <button
            onMouseEnter={() => {
              if (collapsed) {
                setHoveredItem(item.key);
              }
            }}
            onMouseLeave={() => {
              if (collapsed) {
                setHoveredItem(null);
              }
            }}
            onClick={() => {
              if (hasChildren) {
                toggleSubmenu(item.key);
              } else {
                handleMenuClick(item.key);
              }
            }}
            className={cn(
              "content-13 relative flex w-full items-center rounded-lg px-[10px] py-2 transition-colors",
              {
                "bg-background-neutral-100 text-content-neutral-800": isActive,
                "text-content-neutral-700 hover:bg-background-neutral-100 hover:text-content-neutral-800":
                  !isActive,
                "justify-center": collapsed,
                "justify-start": !collapsed,
              }
            )}
          >
            <span
              className={cn("h-4 w-4 flex-shrink-0", {
                "mr-2": !collapsed,
              })}
            >
              {item.icon}
            </span>
            {!collapsed && (
              <>
                <span className="mr-[5px] text-left">{item.label}</span>
                {hasChildren && (
                  <IconUp
                    className={cn(
                      "transition-transform duration-200",
                      isExpanded ? "rotate-180" : "rotate-0"
                    )}
                  />
                )}
              </>
            )}
          </button>

          {/* Tooltip  */}
          {showTooltip && (
            <div
              className="fixed whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white shadow-lg"
              style={{
                left: collapsed ? "5rem" : "16rem",
                top: `${(document.querySelector(`[data-menu-key="${item.key}"]`)?.getBoundingClientRect().top || 0) + window.scrollY + 5}px`,
                transform: "translateY(0)",
              }}
            >
              {item.label}
              <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-800"></div>
            </div>
          )}
        </div>

        {/* Add data attribute for tooltip positioning */}
        <div
          data-menu-key={item.key}
          className="pointer-events-none absolute inset-0"
        ></div>

        {/* Submenu */}
        {hasChildren && !collapsed && isExpanded && (
          <div className="mt-1 flex">
            <div className="mx-[18px] border border-input-neutral-600"></div>
            <div className="flex flex-col gap-[2px]">
              {item.children!.map(child => {
                const isChildActive = getActiveMenuKey() === child.key;
                return (
                  <button
                    key={child.key}
                    onClick={() => handleMenuClick(child.key)}
                    className={cn(
                      "flex w-full items-center py-[6.5px] text-sm transition-colors",
                      {
                        "subtitle-13 text-title-neutral-900": isChildActive,
                        "content-13 text-content-neutral-700 hover:text-title-neutral-900":
                          !isChildActive,
                      }
                    )}
                  >
                    <span>{child.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex h-full flex-col px-3 pb-3">
      {/* Logo */}
      <div className="py-5">
        <div
          className={cn("flex items-center", {
            "justify-center": collapsed,
            "space-x-3": !collapsed,
          })}
        >
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <Image
                src="/logo.png"
                alt="Logo"
                width={101}
                height={32}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="">
          <div className="flex items-center gap-2 px-[10px] py-2 text-content-neutral-700">
            <IconHelp />
            <span className="content-13">Help</span>
          </div>
          <div className="flex items-center gap-2 px-[10px] py-2 text-content-neutral-700">
            <IconContact />
            <span className="content-13">Contact</span>
          </div>
          <span className="content-10 px-[10px] text-content-neutral-700">
            Terms & Privacy
          </span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
