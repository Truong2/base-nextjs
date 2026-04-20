/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  type ComponentPropsWithoutRef,
  useState,
  forwardRef,
  useLayoutEffect,
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ReactElement,
} from "react";
import { cn } from "~/utils/utils";
import { TabsContext, useTabsContext } from "./hooks/useTabsContext";
// import TabsSidebar from "~/assets/images/tabs-sidebar.png";
// import TabsSidebarMobile from "~/assets/images/tabs-sidebar-mobile.png";
import Image from "next/image";
import { type TabDetail } from "./types";
import tailwindConfig from "../../../../tailwind.config";
import useBreakpoint from "use-breakpoint";
import { useSwipeable } from "react-swipeable";
import { type PanInfo, motion, useAnimate, useAnimation } from "framer-motion";
import {
  calcDomNodeDistantToMiddleOfScreen,
  handleSwipeLeft,
  handleSwipeRight,
} from "./utils";

const Tabs = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & {
    defaultValue?: string;
    tabs: Array<TabDetail>;
  }
>(({ className, defaultValue, tabs, ...props }, ref) => {
  const [currentTab, setCurrentTab] = useState(defaultValue ?? "");

  return (
    <TabsContext.Provider
      value={{
        tabs,
        currentTab,

        setCurrentTab,
      }}
    >
      <div
        ref={ref}
        className={cn(
          "flex flex-col overflow-hidden rounded-[10px] shadow-[1px_1px_15px_0px_#00000014] lg:flex-row",
          className
        )}
        {...props}
      />
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    const arrayChildren = Children.toArray(children);

    const lgBreakpoint = tailwindConfig.theme.container.screens.lg;
    const { breakpoint } = useBreakpoint({
      lg: 0,
      xl: parseInt(lgBreakpoint, 10),
    });

    const parentElementRef = useRef<HTMLDivElement | null>(null);
    const childrenRefArray = useRef<Array<HTMLDivElement>>([]);

    const tabsContext = useTabsContext();
    const { currentTab, tabs } = tabsContext;

    const [scope, animate] = useAnimate();

    const controls = useAnimation();
    const onDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const { velocity } = info;

      if (velocity.x > 0) {
        handleSwipeRight(tabsContext, breakpoint);
      } else if (velocity.x < -0) {
        handleSwipeLeft(tabsContext, breakpoint);
      }
    };

    useLayoutEffect(() => {
      if (breakpoint !== "lg") {
        if (parentElementRef.current) {
          parentElementRef.current.scrollLeft = 0;
        }

        void (async () => {
          await animate(scope.current, { x: 0 });
        })();

        return;
      }

      const currentTabIndex = tabs?.findIndex(
        ({ value }) => value === currentTab
      );
      const currentTabDomNode = childrenRefArray.current[currentTabIndex];

      if (!!currentTabDomNode) {
        void (async () => {
          await animate(scope.current, {
            x: calcDomNodeDistantToMiddleOfScreen(currentTabDomNode),
          });
        })();
      }
    }, [tabs, currentTab, breakpoint]);

    return (
      <div
        ref={ref}
        className={cn(
          "bg-secondary relative min-w-0 p-[0_24px] lg:min-w-[289px] lg:p-[25px_0]",
          className
        )}
        {...props}
      >
        {/* <Image
          src={TabsSidebar}
          alt=""
          className="absolute bottom-0 left-0 hidden w-full lg:block"
        />
        <Image
          src={TabsSidebarMobile}
          alt=""
          className="absolute bottom-0 left-0 block h-full w-full object-cover lg:hidden"
        /> */}

        <motion.div
          ref={parentElementRef}
          className="flex w-auto py-[24px] lg:w-full lg:py-0"
          onDragEnd={onDragEnd}
          {...(breakpoint === "lg" && { drag: "x" })}
          dragConstraints={{ left: 10, right: 10 }}
          animate={controls}
        >
          <div
            ref={scope}
            className="lg:translate-x-[0px]! flex w-auto lg:block lg:w-full"
          >
            <div className="block w-[20vw] lg:hidden" />
            {Children.map(arrayChildren, (child, index) => {
              if (!isValidElement(child)) {
                return null;
              }

              return cloneElement(child as ReactElement<any>, {
                key: index,
                ref: (el: HTMLDivElement | null): void => {
                  if (el && !childrenRefArray.current[index]) {
                    childrenRefArray.current[index] = el;
                  }
                },
              });
            })}
            <div className="block w-[20vw] lg:hidden" />
          </div>
        </motion.div>
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { currentTab, setCurrentTab } = useTabsContext();

  return (
    <div
      ref={ref}
      className={cn(
        "font-semiBold z-1 relative m-[0_12px] cursor-pointer overflow-hidden text-[20px] leading-[27px] text-white opacity-50 lg:m-0 lg:p-[13px_21px] lg:text-[24px] lg:leading-[32px]",
        {
          "opacity-100": value === currentTab,
          "before:bg-orange before:absolute before:left-0 before:top-0 before:hidden before:h-full before:w-[5px] before:content-[''] before:lg:block":
            value === currentTab,
          "": value === currentTab,
        },
        className
      )}
      onClick={() => setCurrentTab(value)}
      {...props}
    >
      {children}

      {value === currentTab && (
        // Arrow
        <div className="absolute right-0 top-[50%] hidden h-[20px] w-[20px] translate-x-[50%] translate-y-[-50%] lg:block">
          <div className="h-full w-full rotate-[45deg] bg-white" />
        </div>
      )}
    </div>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContentWrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, _ref) => {
  const tabsContext = useTabsContext();
  const { tabs, currentTab, setCurrentTab } = tabsContext;

  const lgBreakpoint = tailwindConfig.theme.container.screens.lg;
  const { breakpoint } = useBreakpoint({
    lg: 0,
    xl: parseInt(lgBreakpoint, 10),
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipeLeft(tabsContext, breakpoint);
    },
    onSwipedRight: () => {
      handleSwipeRight(tabsContext, breakpoint);
    },
  });

  return (
    <div
      className={cn(
        "relative flex-1 bg-white p-[24px_16px_58px] lg:p-[40px_64px]",
        className
      )}
      {...props}
      {...handlers}
    >
      {children}
      {tabs && tabs.length > 1 && (
        <div className="absolute bottom-[24px] left-[50%] flex translate-x-[-50%] lg:hidden">
          {tabs.map(({ value }) => (
            <div
              key={value}
              onClick={() => setCurrentTab(value)}
              className={cn(
                "bg-navy mx-[4px] h-[10px] w-[10px] cursor-pointer rounded-[50%] opacity-50",
                {
                  "opacity-100": currentTab === value,
                }
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
});
TabsContentWrapper.displayName = "TabsContentWrapper";

const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & { value: string }
>(({ className, value, ...props }, ref) => {
  const { currentTab } = useTabsContext();

  return (
    currentTab === value && (
      <div ref={ref} className={cn(className)} {...props} />
    )
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContentWrapper, TabsContent };

// Segmented Control Component (like Day/Week/Month selector)
interface SegmentedControlProps {
  items: Array<{ value: string; label: string; content?: React.ReactNode }>;
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
  showContent?: boolean;
}

const SegmentedControl = ({
  items,
  activeTab,
  onChange,
  className,
  showContent = false,
}: SegmentedControlProps) => {
  const activeItem = items.find(item => item.value === activeTab);

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm",
          className
        )}
      >
        {items.map(item => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
              {
                "bg-blue-600 text-white shadow-sm": item.value === activeTab,
                "text-gray-700 hover:bg-gray-50 hover:text-gray-900":
                  item.value !== activeTab,
              }
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Render content if showContent is true and content exists */}
      {showContent && activeItem?.content && (
        <div className="mt-4">{activeItem.content}</div>
      )}
    </div>
  );
};

export { SegmentedControl };
