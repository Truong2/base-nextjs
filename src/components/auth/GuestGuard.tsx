"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthenticationStore from "~/store/authentication/useAuthenticationStore";

interface GuestGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const GuestGuard = ({
  children,
  redirectTo = "/dashboard",
  fallback,
}: GuestGuardProps) => {
  const [isGuest, setIsGuest] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const authenticationToken =
    useAuthenticationStore.getState().authenticationToken;

  useEffect(() => {
    const checkGuest = () => {
      try {
        if (authenticationToken) {
          setIsGuest(false);
          router.push(redirectTo);
          return;
        }

        setIsGuest(true);
      } catch (error) {
        console.error("Guest check failed:", error);
        setIsGuest(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkGuest();
  }, [router, redirectTo]);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      )
    );
  }

  if (!isGuest) {
    return null;
  }

  return <>{children}</>;
};
