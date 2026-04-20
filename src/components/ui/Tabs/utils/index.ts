import { type TabsContextType } from "../hooks/useTabsContext";

export const handleSwipeLeft = <Breakpoint = "lg">(
  tabsContext: TabsContextType,
  breakpoint: Breakpoint
) => {
  const { tabs, currentTab, setCurrentTab } = tabsContext || {};

  if (breakpoint !== "lg" || !tabs || tabs.length <= 1) {
    return;
  }

  const firstTabValue = tabs[0];

  const currentTabIndex = tabs.findIndex(({ value }) => value === currentTab);
  const nextTabIndex = currentTabIndex + 1;
  const nextTabValue = tabs[nextTabIndex];

  if (nextTabIndex <= tabs.length - 1) {
    setCurrentTab(nextTabValue?.value ?? "");
    return;
  }

  setCurrentTab(firstTabValue?.value ?? "");
};

export const handleSwipeRight = <Breakpoint = "lg">(
  tabsContext: TabsContextType,
  breakpoint: Breakpoint
) => {
  const { tabs, currentTab, setCurrentTab } = tabsContext || {};

  if (breakpoint !== "lg" || !tabs || tabs.length <= 1) {
    return;
  }

  const lastTabValue = tabs[tabs.length - 1];
  const currentTabIndex = tabs.findIndex(({ value }) => value === currentTab);
  const prevTabIndex = currentTabIndex - 1;
  const prevTabValue = tabs[prevTabIndex];

  if (prevTabIndex < 0) {
    setCurrentTab(lastTabValue?.value ?? "");
    return;
  }

  setCurrentTab(prevTabValue?.value ?? "");
};

export const calcDomNodeDistantToMiddleOfScreen = (domNode: HTMLDivElement) => {
  const distantToMiddleOfScreen = domNode.offsetLeft + domNode.clientWidth / 2;
  const middleOfScreen = window.innerWidth / 2;
  const marginLeft = parseInt(window.getComputedStyle(domNode).marginLeft, 10);
  const marginRight = parseInt(window.getComputedStyle(domNode).marginLeft, 10);

  return (
    middleOfScreen - distantToMiddleOfScreen - 1.5 * (marginLeft + marginRight)
  );
};
