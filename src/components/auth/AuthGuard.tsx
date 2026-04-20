"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearLocalStorage } from "~/utils";
import { useLogout } from "~/store/authentication/selector";
import useAuthenticationStore from "~/store/authentication/useAuthenticationStore";
import { ROUTE_URL } from "~/constants";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const logout = useLogout();
  const token = useAuthenticationStore.getState().authenticationToken;

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (!token) {
          clearLocalStorage();
          logout();
          router.push(ROUTE_URL.LOGIN);
          return;
        }
      } catch (_error) {
        clearLocalStorage();
        logout();
        router.push(ROUTE_URL.LOGIN);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      )
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
};
