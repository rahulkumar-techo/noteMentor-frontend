"use client";

import ProtectedPage from "@/components/wrappers/ProtectedPage";

export default function ProtectedLayout({ children }:any) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
