"use client";

import { useEffect, useCallback, Suspense } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

interface NProgressProviderProps {
  children: React.ReactNode;
}

// Separate component for search params to avoid Suspense issues
function NProgressWithSearchParams() {
  const pathname = usePathname();

  // Debounced progress start
  const startProgress = useCallback(() => {
    NProgress.start();
  }, []);

  // Debounced progress complete
  const completeProgress = useCallback(() => {
    NProgress.done();
  }, []);

  useEffect(() => {
    // Start progress bar when route changes
    startProgress();

    // Complete progress bar after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      completeProgress();
    }, 300);

    return () => {
      clearTimeout(timer);
      completeProgress();
    };
  }, [pathname, startProgress, completeProgress]);

  return null;
}

export const NProgressProvider = ({ children }: NProgressProviderProps) => {
  // Configure NProgress
  useEffect(() => {
    NProgress.configure({
      showSpinner: false, // Hide spinner, only show progress bar
      minimum: 0.1, // Minimum percentage
      easing: "ease", // Easing function
      speed: 500, // Animation speed
      trickle: true, // Increment progress bar
      trickleSpeed: 200, // How often to increment
    });
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <NProgressWithSearchParams />
      </Suspense>
      {children}
    </>
  );
};
