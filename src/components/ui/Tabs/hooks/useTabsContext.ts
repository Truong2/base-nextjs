import {
  type Dispatch,
  type SetStateAction,
  useContext,
  createContext,
} from "react";
import { type TabDetail } from "../types";

export type TabsContextType = {
  tabs: Array<TabDetail>;
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
};

const TabsContext = createContext<TabsContextType | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabsContext must be within TodoProvider");
  }

  return context;
};

export { TabsContext, useTabsContext };
