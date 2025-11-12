"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Navbar from "@/components/navigations/Navbar";
import { Toaster } from "react-hot-toast";
// import GlobalLoader from "../GlobalLoader";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "../settings/theme-provider";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      <Provider store={store}>
        {!isDashboard && <Navbar />}
        <Toaster />
        {/* <GlobalLoader /> */}
        {children}
      </Provider>
    </ThemeProvider>

  );
}
