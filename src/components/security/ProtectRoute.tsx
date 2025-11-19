"use client";


import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";



type Props = {
    allowedRoles?: string[]; // roles that can access the page
    children: ReactNode;
};

export default function ProtectedRoute({
    allowedRoles = [],
    children,
}: Props) {
    const router = useRouter();
    const userInfo = useSelector((state: RootState) => state?.user?.user);
    console.log(userInfo)

    useEffect(() => {
        if (!userInfo) {
            router.replace("/login");
            return;
        }

        if (userInfo.role === "admin") return;

        if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role)) {
            router.replace("/not-authorized");
            return;
        }

        if (allowedRoles.length > 0 && !(userInfo as any).isProfileComplete) {
            router.replace("/complete-profile");
            return;
        }

    }, [userInfo, allowedRoles, router]);

    // Wait for checks
    if (!userInfo) return null;

    return <>{children}</>;
}
