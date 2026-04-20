"use client";

import { composeProviders } from "./ComposeProviders";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { MessageProvider } from "~/components/ui/Message";
import { StoreProvider } from "./StoreProvider";
import { NProgressProvider } from "./NProgressProvider";

// Compose all providers in the correct order
// Most outer provider first, most inner provider last
export const AppProvider = composeProviders(
  StoreProvider, // Store management (outermost)
  QueryProvider, // Query management
  ThemeProvider, // Theme management
  NProgressProvider, // Navigation progress bar
  MessageProvider // Message notifications (innermost - directly wraps children)
);
