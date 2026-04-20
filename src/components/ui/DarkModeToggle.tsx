"use client";
import { Moon, Sun } from "lucide-react";
import { useAppStore } from "~/store";

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
};
