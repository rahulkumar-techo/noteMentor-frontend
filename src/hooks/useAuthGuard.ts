"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetUserQuery } from "@/feature/user/userApi";

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/upload-notes",
  ];

  const publicRoutes = ["/login", "/register", "/forgot-password"];

  const { data, isLoading, isError } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const user = data?.data || null;

  useEffect(() => {
    if (isLoading) return;

    // ⭐ Skip guard for public pages
    if (publicRoutes.includes(pathname)) return;

    // 🔒 Not logged in → go login
    if (isError || !user) {
      router.replace("/login");
      return;
    }

    // ❌ Profile completed → block /complete-profile
    if (user.isProfileComplete && pathname === "/complete-profile") {
      router.replace("/dashboard");
      return;
    }

    // 🔒 Protected route but profile not complete
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected && !user.isProfileComplete) {
      router.replace("/complete-profile");
      return;
    }

  }, [isLoading, isError, user, pathname, router]);

  return {
    user,
    loading: isLoading,
  };
}
