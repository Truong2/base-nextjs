"use client";

import { ReactNode, memo } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = memo(({ children }: StoreProviderProps) => {
  // This provider can be used to initialize stores or provide store context
  // Currently, Zustand stores are used directly without context
  // But this gives us flexibility to add store initialization logic later

  return <>{children}</>;
});

StoreProvider.displayName = "StoreProvider";
