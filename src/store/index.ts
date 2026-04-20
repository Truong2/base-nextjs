import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        isDarkMode: false,
        toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
      }),
      {
        name: "app-storage",
      }
    )
  )
);
