"use client";

import { useEffect } from "react";
import { useAppStore } from "~/store";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
};
