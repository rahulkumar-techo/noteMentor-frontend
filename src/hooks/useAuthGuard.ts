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

  const { data, isLoading, isError } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const user = data?.data || null;

  useEffect(() => {
    if (isLoading) return;

    // 🔒 If user NOT logged in → redirect to login
    if (isError || !user) {
      router.replace("/login");
      return;
    }

    // ❌ If user is COMPLETE but tries to visit /complete-profile → block it
    if (user.isProfileComplete === true && pathname === "/complete-profile") {
      router.replace("/dashboard");
      return;
    }

    // 🔒 If route is protected AND profile NOT complete → redirect
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected && user.isProfileComplete === false) {
      router.replace("/complete-profile");
      return;
    }

  }, [isLoading, isError, user, pathname, router]);

  return {
    user,
    loading: isLoading,
  };
}
